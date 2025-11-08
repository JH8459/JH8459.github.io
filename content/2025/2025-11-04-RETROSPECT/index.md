---
emoji: 🤔
title: 첫 오픈 소스 PR 기여 후기 (MikroORM Redis Cache Adapter)
date: '2025-11-04'
author: JH8459
categories: Retrospect
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-04/retrospect/thumbnail.png
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-04/retrospect/merge.png"/>

## 첫 오픈 소스 PR 기여 후기

### 1. 계기 – MikroORM의 캐시 동작 방식에 대한 궁금증 🤔

현재 사내 프로젝트들은 MikroORM을 사용하고 있다.  

데이터베이스 변경 사항이 적은 항목들에 접근 시 불필요한 중복 쿼리를 줄이기 위해 **쿼리 결과 캐싱(Query Cache)** 기능을 활성화했는데, 문득 캐시가 "실제로 어디에 저장되고 있는가?" 가 궁금해졌다.

공식 문서를 살펴보니 기본 캐시 구현체는 **In-Memory 기반**으로 되어 있었다. 즉, 애플리케이션 프로세스가 종료되면 캐시 데이터도 함께 사라지는 구조였다.  

> 💡 참고: [MikroORM 공식 문서 - Caching](https://mikro-orm.io/docs/caching/)

이는 단일 서버에서는 큰 문제가 되지 않지만, 여러 인스턴스가 동시에 배포되는 환경에서는 캐시가 서로 다른 상태를 유지하게 되는 문제로 이어질 수 있었다.

무엇보다 In-Memory 캐시 구조상 개발자가 캐시를 직접 비우거나 제어할 수 없는 점이 꽤 답답하게 느껴졌다.

<br>
<br>

### 2. Redis 기반 캐시 어댑터 라이브러리

---

기존 **MikroORM**은 자체적으로 Redis 캐시 기능을 제공하지 않기에 외부에서 사용할 수 있는 **서드 파티 캐시 어댑터**를 찾아보기로 했다.

하지만 생각보다 선택지는 많지 않았다. MikroORM 자체의 사용자층이 비교적 적다 보니, Redis를 지원하는 캐시 어댑터도 거의 없었다.  

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-04/retrospect/trend.png"/>

<center><strong>MikroORM</strong>은 node.js ORM 중 낮은 사용량으로 유명하다. 😂</center>
<br><br>

레퍼런스를 탐색했고 그 과정에서 [`mikro-orm-cache-adapter-redis`](https://github.com/ramiel/mikro-orm-cache-adapter-redis) 라는 프로젝트를 발견하게 되었다.

하지만 내부 구현을 살펴보니 간단한 내부 구조에 비해 **Promise와 Stream 이벤트를 혼용한 복잡한 비동기 로직**으로 구현되어 있었다.  

```ts
// 기존 코드 (일부 발췌)
const stream = client.scanStream({ match: `${this.keyPrefix}:*`, count: 100 });
return new Promise((resolve, reject) => {
  stream.on('data', (keys) => {
    ...
  });
  stream.on('end', resolve);
});
```

코드를 읽고 이해하는 데 꽤 어려움이 느껴졌고, 결국 더 명확한 흐름으로 개선할 수 있겠다는 생각이 들어 **리팩토링 PR을 올리기로 결정**했다.  

<br>
<br>

### 3. 리팩토링

---

Node.js 16 이상에서는 `for await...of` 문법을 통해 `AsyncIterable`을 직관적으로 순회할 수 있다.

이 패턴을 도입하면 기존 이벤트 기반 로직을 훨씬 깔끔하게 표현할 수 있다.

그래서 직접 개선한 코드는 아래와 같다.

```ts
// 개선된 코드
async clear(): Promise<void> {
  const stream = this.client.scanStream({
    match: `${this.keyPrefix}:*`,
    count: 100,
  });

  for await (const keys of stream as AsyncIterable<string[]>) {
    if (!keys.length) continue;

    const pipeline = this.client.pipeline();
    for (const key of keys) pipeline.del(key);
    await pipeline.exec();
  }
}
```

이제 캐시 삭제 흐름이 한눈에 파악 가능하고,
await 기반으로 예외 흐름 제어도 자연스러워졌다.

<br>
<br>

### 4. “바퀴를 다시 만들지 않는다”

---

개발 업계에는 이런 격언이 있다.

> “Don’t reinvent the wheel.” (이미 잘 만들어진 바퀴를 다시 만들지 마라.)

Redis 캐시 어댑터를 새로 개발하는 대신, 이미 존재하는 라이브러리를 개선하여 사용하는 것이 생태계(?)에 기여하면서도 실무에도 도움이 되는 방향이라 생각했다.

그래서 기존 레포지토리에 PR(Pull Request) 을 올리기로 했다.

- [PR #10 - refactor(clear): simplify clear() with async iterator + pipeline](https://github.com/ramiel/mikro-orm-cache-adapter-redis/pull/10)

<br>
<br>

PR을 올린 후, 며칠 뒤 리포지토리의 Maintainer가 리뷰를 남겨주었다.

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-04/retrospect/pr.png"/>

<center>리뷰는 빠르게 마무리되었고 곧바로 머지되었다. 👍</center>
<br><br>

이후 해당 프로젝트의 기여자 목록에 내 이름이 추가되었고, 처음으로 오픈소스 라이브러리에 이름을 남길 수 있었다.

<br>
<br>

## 🤔 Understanding

이번 경험을 통해 느낀 점은 단순하다.

> “오픈소스 기여는 거창한 일이 아니라, 작은 불편함을 개선하는 것부터 시작된다.”

처음엔 단순히 코드가 복잡해 보였을 뿐이었지만, 그 작은 개선이 실제로 오픈소스에 반영되면서 나 또한 오픈소스 생태계의 일원이 되었다는 뿌듯함을 느꼈다.

앞으로도 바퀴를 다시 만들지 않으면서 더 좋은 코드를 기여할 수 있는 개발자가 되기 위해 노력하려 한다.

<br>
<br>