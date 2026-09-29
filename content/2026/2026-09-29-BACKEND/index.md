---
emoji: 📚
title: "테스트가 가끔 남의 앱에 요청을 보내고 있었다"
date: '2026-09-29'
author: JH8459
categories: Backend
thumbnail:
---

<!-- TODO: 썸네일 이미지 추가 -->

## 📚 Overview

사내 NestJS 프로젝트의 e2e 테스트가 가끔 한 건씩 깨졌다. 다시 돌리면 통과했다. 흔한 flaky 테스트처럼 보였는데, 실패한 응답을 열어보니 이상했다. 우리 서버가 만들 수 없는 응답이었다.

원인은 supertest 안에 있었다. 찾아보니 같은 증상의 이슈가 이미 있었고, 수정도 머지되어 있었다. 그런데 그 수정은 같은 날 다른 이유로 되돌려져 있었다.

- 09-22 19:11 — 같은 증상을 고친 PR 머지 ([supertest#896](https://github.com/forwardemail/supertest/pull/896))
- 09-22 21:30 — 다른 문제를 피하려고 그 수정을 되돌린 커밋이 v7.3.0 으로 릴리스 ([71dc5fb](https://github.com/forwardemail/supertest/commit/71dc5fbee7313c82cf0623d9e49f04a50283dca7))
- 09-29 15:32 — 회귀 이슈 등록 ([supertest#906](https://github.com/forwardemail/supertest/issues/906))
- 09-29 15:37 — 수정 PR 등록 ([supertest#907](https://github.com/forwardemail/supertest/pull/907))

이 글은 가끔 깨지는 테스트 하나에서 시작해 업스트림에 이슈와 PR 을 올리기까지의 기록이다. 지난 [mikro-orm#8292](https://blog.jh8459.com/2026-09-22-BACKEND/) 때는 재현과 이슈만 올렸는데, 이번에는 수정까지 직접 해봤다.

<br>
<br>

### 1. 우리 서버가 만들 수 없는 응답

---

처음 눈에 띈 건 rate limit 을 검증하는 테스트였다. 한도를 다 채울 때까지 300번 가까이 요청을 보내고, 마지막 한 번에 429 가 오는지 확인한다. 이 테스트가 여덟 번 돌리면 두 번쯤 깨졌다. 실패 메시지는 `429 를 기대했는데 400 을 받았다` 였다.

카운터가 하나 모자랐다는 뜻이다. 중간 어딘가에서 요청 한 건이 집계되지 않았다. 처음에는 카운터 쪽 경쟁 조건을 의심했는데, 실패한 회차의 응답을 하나씩 찍어보니 방향이 달라졌다.

집계되지 않은 그 한 건의 응답에는 `x-ratelimit-*` 헤더가 하나도 없었다. rate limit 이 걸린 경로라 우리 서버가 응답했다면 반드시 붙어 있어야 하는 헤더다. 본문도 우리 형식이 아니었다. 어떤 회차에는 처음 보는 형식의 401 JSON 이, 어떤 회차에는 404 가, 어떤 회차에는 `socket hang up` 이 왔다.

**요청이 우리 앱에 닿지 않았다.** 가드도 미들웨어도 거치지 않았으니 헤더가 없는 게 당연했다. 그렇다면 그 요청은 어디로 갔을까.

헤더만으로는 어디로 갔는지까지 알 수 없었다. 그래서 테스트 프로세스에 진단 로그를 하나 붙였다. 루프백으로 보낸 요청에 응답이 오면, 그 포트를 LISTEN 하고 있는 프로세스를 `lsof` 로 찾아서 테스트 프로세스 자신이 아니면 기록한다.

처음에는 헤더로 판정하려고 했다. `x-ratelimit-*` 가 없으면 우리 앱이 아니라고 보는 식이었는데, 돌려보니 정상 응답까지 전부 걸렸다. 이 헤더는 rate limit 이 걸린 경로에만 붙기 때문이다. 앱이 붙이는 헤더를 추측으로 고르는 것보다, 운영체제에게 포트 주인을 묻는 편이 확실했다.

진단 로그를 켠 채로 캠페인 API 를 다루는 스펙(요청 300여 건)을 몇 번 돌려보니, 요청이 새는 장면이 실제로 찍혔다.

```
[e2e] GET /v2/campaigns/46 → 404  앱이 아닌 다른 프로세스가 응답함
[e2e]   body: {"error":"Not found"}                    ← 데스크톱 앱의 내장 서버
[e2e] POST /v2/advertiser/campaigns → 404  앱이 아닌 다른 프로세스가 응답함
[e2e]   body: <!doctype html><title>404 Not Found</title>...   ← DB 클라이언트의 내장 웹 서버
[e2e] POST /v2/advertiser/campaigns → 401  앱이 아닌 다른 프로세스가 응답함
[e2e]   body: {"type":"error","error":{"type":"authentication_error",...}}   ← 에디터 확장이 띄운 로컬 서버
```

응답한 쪽은 전부 로컬에 떠 있던 개발 도구였다. 데스크톱 앱, DB 클라이언트, 에디터 확장이 각자 `127.0.0.1` 의 임시 포트를 하나씩 쥐고 있었고, 요청이 그중 어디에 걸리느냐에 따라 같은 버그가 404 로도, 인증 오류로도 보였다. 처음에 원인을 인증이나 라우팅 쪽에서 찾았던 것도 이 때문이다.

진단 로그는 요청마다 `lsof` 를 부르느라 스펙 실행 시간을 세 배쯤 늘렸다. 그래서 여기서 본 빈도를 평소 빈도로 읽지는 않았다. 실제로 일어난다는 것까지만 이 로그의 몫으로 봤다.

<br>
<br>

### 2. 받는 주소와 거는 주소

---

우리 e2e 헬퍼는 Nest 앱을 `init()` 까지만 하고 `listen()` 은 하지 않는다. `getHttpServer()` 로 꺼낸 서버를 그대로 supertest 에 넘긴다. 이러면 supertest 가 요청을 보낼 때마다 직접 서버를 띄운다.

supertest 7.3.0 의 해당 부분을 줄이면 이렇다.

```js
// lib/test.js — serverAddress()
app.listen(0);                // 호스트 생략 → '::' 와일드카드로 바인드

let host = addr.address;
if (host === '::') host = '127.0.0.1';   // 연결은 IPv4 루프백으로
```

서버는 모든 주소(`::`)에서 받고, 요청은 `127.0.0.1` 로 건다. 받는 주소와 거는 주소가 다르다.

macOS 에서는 이 차이가 문제가 된다. 다른 프로세스가 `127.0.0.1:P` 를 쥐고 있어도, 같은 포트 `P` 에 와일드카드로 바인드하는 것이 성공한다. Node 가 서버 소켓에 `SO_REUSEADDR` 를 켜고, BSD 계열은 주소와 포트가 정확히 같은 경우만 충돌로 보기 때문이다. 그리고 `127.0.0.1:P` 로 들어온 연결은 더 구체적인 바인드, 그러니까 다른 프로세스 쪽으로 간다.

직접 확인해봤다.

```js
const http = require('http');

const other = http.createServer((req, res) => res.end('other process'));
other.listen(0, '127.0.0.1', () => {
  const port = other.address().port;
  const app = http.createServer((req, res) => res.end('app'));

  app.listen(port, () => {
    console.log(app.address());  // { address: '::', family: 'IPv6', port }
    http.get(`http://127.0.0.1:${port}/`, (res) => { /* other process */ });
    http.get(`http://[::1]:${port}/`, (res) => { /* app */ });
  });
});
```

같은 포트에 바인드가 둘 다 성공하고, `127.0.0.1` 로 건 요청은 다른 프로세스가, `::1` 로 건 요청은 우리 앱이 받았다.

남은 질문은 `listen(0)` 이 정말로 남이 쥔 포트를 골라주느냐였다. 다른 프로세스 역할로 `127.0.0.1` 리스너 3,000개를 열어두고 `listen(0)` 을 20,000번 반복했다. 3,000개 포트가 전부 한 번씩 배정됐다. 임시 포트 할당기는 `127.0.0.1` 에만 걸린 포트를 피하지 않는다. 같은 조건에서 `listen(0, '127.0.0.1')` 로 바꾸면 한 번도 겹치지 않았다.

우리 스위트는 요청을 만드는 곳만 2,700군데가 넘는다. 요청마다 포트를 새로 잡으니, 로컬에 떠 있는 앱이 많을수록 어느 한 번은 남의 포트에 걸린다. Linux 에서는 LISTEN 중인 소켓과 바인드가 충돌해서 이 일이 생기지 않는다고 한다. CI 에서 거의 보이지 않았던 이유다.

<br>
<br>

### 3. 이미 고쳐졌던 버그

---

원인을 알고 나서 supertest 이슈를 찾아보니 같은 증상이 이미 올라와 있었다([#894](https://github.com/forwardemail/supertest/issues/894)). 분석도 거의 같았다. 이 이슈는 [#896](https://github.com/forwardemail/supertest/pull/896) 으로 고쳐져 닫혀 있었다.

#896 의 수정은 연결 쪽을 서버에 맞추는 것이었다. 서버가 `::` 에 바인드했으면 `::1` 로 건다. 위 실험에서 `::1` 로 건 요청은 우리 앱이 받았으니 맞는 방향이다.

그런데 우리가 쓰는 7.2.2 도, 최신인 7.3.0 도 여전히 `127.0.0.1` 로 걸고 있었다. 커밋 이력을 따라가 보니 #896 이 머지되고 두 시간 남짓 뒤에 메인테이너가 여러 수정을 한데 묶은 커밋([71dc5fb](https://github.com/forwardemail/supertest/commit/71dc5fbee7313c82cf0623d9e49f04a50283dca7))을 올렸고, 거기서 매핑이 다시 `127.0.0.1` 로 돌아가 있었다. 커밋 메시지에 이유가 적혀 있었다. Node 26 에서 SuperAgent 가 IPv6 루프백으로 요청할 때 타임아웃이 나는 문제를 피하기 위해서였다.

되돌린 쪽에도 이유가 있었던 셈이다. 다만 서버는 여전히 `listen(0)` 으로 와일드카드에 바인드하고 있었으니, #894 의 조건이 그대로 돌아왔다.

회귀를 CI 가 잡지 못한 이유도 보였다. #896 이 넣은 회귀 테스트는 `::1` 에만 바인드한 서버를 미리 띄워서 supertest 에 넘긴다. 이미 떠 있는 서버를 받으면 supertest 는 `listen(0)` 을 호출하지 않는다. 테스트가 문제의 경로를 지나가지 않으니, 그 경로가 되돌려져도 테스트는 계속 통과했다.

이 단계에서 한 번 헛디뎠다. 7.2.2 와 7.3.0 을 같은 조건으로 20,000번씩 돌렸더니 7.3.0 에서 다른 프로세스로 간 요청이 3,557건 나왔다. 7.2.2 는 6건이었다. 7.3.0 이 훨씬 나빠졌다고 결론을 내리려다가 한 번 더 돌렸는데, 이번에는 7.3.0 이 5,000번 중 1건이었다. 앞선 실행들이 남긴 TIME_WAIT 소켓이 1만 개를 넘겨 있었고, 결과는 커널의 임시 포트 카운터가 어디쯤 있느냐에 따라 크게 달라졌다.

그래서 버전 간 크기 비교는 버렸다. 원인을 말할 때는 매번 같은 결과가 나오는 실험, 그러니까 위의 같은 포트 실험과 3,000개 포트 실험만 근거로 쓰기로 했다.

<br>
<br>

### 4. 한 줄로는 안 됐던 수정

---

두 조건을 같이 만족하는 방법은 단순해 보였다. 받는 쪽도 `127.0.0.1` 로 고정하면 된다. 받는 주소와 거는 주소가 같아지고, IPv6 는 아예 쓰지 않으니 Node 26 문제도 건드리지 않는다.

먼저 회귀 테스트를 썼다. #896 테스트가 놓친 경로를 지나가도록, supertest 가 직접 서버를 띄우게 하고 그 서버가 어디에 바인드했는지 응답으로 돌려받는다.

```js
it('should bind the ephemeral server to the address it connects to', function() {
  const server = http.createServer(function(req, res) {
    res.end(server.address().address);
  });

  return supertest(server)
    .get('/')
    .expect(200, '127.0.0.1');
});
```

다른 프로세스로 요청이 가는지를 직접 확인하는 테스트는 확률에 기대야 한다. 앞에서 숫자가 흔들리는 걸 본 뒤라, 바인드 주소와 연결 주소가 같은지만 확인하기로 했다. master 에서는 `expected '127.0.0.1', got '::'` 로 실패했다.

그리고 `app.listen(0)` 을 `app.listen(0, '127.0.0.1')` 로 바꿨다. 137개 테스트 중 114개가 깨졌다.

```
TypeError: Cannot read properties of null (reading 'address')
    at Test.serverAddress (lib/test.js)
```

호스트를 생략한 `listen(0)` 은 동기로 바인드해서, 바로 다음 줄의 `app.address()` 가 포트를 돌려준다. 호스트를 주면 주소 해석을 거치느라 비동기가 되고, 그 시점의 `app.address()` 는 `null` 이다. #896 의 PR 본문에 "기존의 동기 바인드는 유지한다"는 문장이 있었는데, 이 제약을 말한 것이었다.

다행히 7.3.0 에는 서버가 `listening` 을 낼 때까지 요청 전송을 미루는 로직이 이미 들어와 있었다. 그래서 URL 을 두 단계로 나눴다. 요청 객체를 만들 때는 호스트와 경로만 채우고, 전송 직전에 포트를 채운다.

```js
// serverAddress() — 아직 포트를 모르면 호스트와 경로만 넣어둔다
if (!addr) {
  this._serverPath = path;
  return protocol + '://127.0.0.1' + path;
}

// end() — listening 이후, 전송 직전에 포트까지 채운다
if (this._serverPath !== undefined) {
  this.url = this.formatServerUrl(server, server.address(), this._serverPath);
  this._serverPath = undefined;
}
```

호스트와 경로를 먼저 넣어두는 데도 이유가 있었다. supertest 의 agent 는 요청을 만드는 순간 `new URL(req.url)` 로 쿠키를 고른다. 이때 필요한 건 호스트와 경로뿐이라, 포트가 비어 있어도 쿠키 처리는 그대로 동작한다.

변경은 `lib/test.js` 에 31줄, 테스트 12줄이다. macOS 에서 Node 22.17, 24.11, 26.10 모두 137개가 통과했다. 수정 전 master 에서는 Node 26 으로 열 번을 돌려 열 번 모두 새 테스트 하나만 실패했다. 테스트가 확률에 기대지 않는다는 뜻이기도 하다.

<br>
<br>

### 5. 이슈와 PR, 그리고 우리 쪽 우회

---

이슈는 새로 열었다. #894 는 닫혀 있어서, 거기에 댓글을 달면 메인테이너가 놓칠 수 있다고 생각했다. 본문에는 #896 이후 무엇이 되돌려졌는지, 왜 #896 의 테스트가 그걸 잡지 못했는지, 그리고 Node 내장 `http` 만 쓰는 20줄짜리 재현을 넣었다. 이번에는 재현 저장소를 따로 만들지 않았다. 재현이 파일 하나로 끝났고, PR 의 회귀 테스트가 수정 전 실패와 수정 후 통과를 그대로 보여주기 때문이다.

본문에서 가장 신경 쓴 부분은 71dc5fb 를 탓하지 않는 것이었다. 메인테이너는 Node 26 문제를 피하려고 `127.0.0.1` 을 택했고, 이 PR 은 그 선택을 그대로 두고 받는 쪽만 맞춘다. 되돌려 달라는 요청이 아니라, 그 선택 위에서 원래 문제도 막자는 제안이 되도록 썼다.

PR 을 올리기 전에 이 저장소가 외부 PR 을 어떻게 다루는지 먼저 봤다. #896 은 이슈 작성자도 메인테이너도 아닌 사람이 올려서 머지됐다. 반면 같은 날 71dc5fb 가 올라가면서 외부 기여자의 PR 일곱 개가 "superseded" 로 닫혔다. 메인테이너가 여러 PR 의 내용을 자기 커밋 하나로 다시 만들어 넣는 방식이다. 그래서 이번 PR 도 그대로 머지되기보다 흡수될 가능성이 있다. 그래도 버그가 고쳐지는 쪽으로는 손해가 없다고 봤다.

업스트림이 고쳐지기를 기다릴 필요는 없다. e2e 헬퍼에서 서버를 한 번만, 루프백에 띄워두면 된다.

```ts
await app.init();
await app.listen(0, '127.0.0.1');
```

이미 listen 중인 서버를 받으면 supertest 는 요청마다 서버를 띄우지 않고 그 포트를 그대로 쓴다. 호스트를 루프백으로 고정했으니 남의 포트와 겹칠 일도 없다. 같은 서버로 20,000번 요청하는 스크립트에서 7.2.2, 7.3.0 모두 다른 프로세스로 간 요청이 0건이었다. 우리 프로젝트에는 이 한 줄을 넣을 예정이다.

<!-- TODO: 프로젝트 반영 후 결과로 갱신 -->

<br>
<br>

## 🤔 Understanding

- **가끔 깨지는 테스트는 실패한 응답부터 열어본다.** 이번에는 재시도하면 통과하니 넘어가기 쉬웠다. 응답에 우리 헤더가 없다는 걸 본 순간부터 조사 방향이 코드에서 네트워크로 바뀌었다. 누가 응답했는지를 확인할 때는 헤더 같은 추측보다 포트 주인을 직접 묻는 쪽이 오판이 없었다.
- **확률로 잰 숫자는 한 번의 실행으로 판단하지 않는다.** 한 번의 실행으로 버전을 비교했다면 7.3.0 이 크게 나빠졌다는 틀린 결론을 이슈에 적을 뻔했다. 원인을 말할 때는 결과가 매번 같은 실험을 따로 만들어두는 편이 안전했다.
- **회귀 테스트는 문제가 난 경로를 실제로 지나가야 한다.** #896 의 테스트는 수정 방식이 맞는지는 확인했지만, 문제가 된 `listen(0)` 경로는 지나가지 않았다. 그래서 수정이 되돌려져도 초록색이었다. 이번 PR 의 테스트는 그 경로를 지나가도록 만들었다.

<br>

**참고 자료**

- [supertest #894 — Supertest attempts to bind a port that is already in use on a Mac, causing random failures](https://github.com/forwardemail/supertest/issues/894)
- [supertest #896 — fix: match ephemeral server address family](https://github.com/forwardemail/supertest/pull/896)
- [supertest 71dc5fb — fix: stabilize ephemeral server requests and assertions](https://github.com/forwardemail/supertest/commit/71dc5fbee7313c82cf0623d9e49f04a50283dca7)
- [supertest #906 — macOS: requests can still reach another local process after #896](https://github.com/forwardemail/supertest/issues/906)
- [supertest #907 — fix: bind ephemeral server to the loopback address it connects to](https://github.com/forwardemail/supertest/pull/907)
- [nodejs/node #26274 — Multiple binds to the same port](https://github.com/nodejs/node/issues/26274)
