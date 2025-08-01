---
emoji: 📚
title: JWT (JSON WEB TOKEN)
date: '2022-03-10'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- **JWT** (JSON Web Token)을 알아보고 학습한 내용을 글로 남겨보려 한다.

<br>
<br>

### 1. 쿠키 vs 세션?

---

- 기본적으로 서버와 클라이언트가 데이터를 주고 받는과정은 웹 상에서 HTTP 프로토콜로 처리된다.

- 다만 HTTP 프로토콜 특성에는 **"상태를 유지 않는다. (Stateless)"**, **"연결을 유지 않는다. (Connectionless)"** 라는 특성이 존재한다.

- 위 두가지 특성때문에 "로그인" 상태를 유지한다는 것은 기본적인 HTTP 환경에서는 많은 어려움이 발생할 수 밖에 없다.

- 상태를 유지하지 않고 연결이 유지되지 않는 웹 환경상 로그인 검증이 필요한 API 요청 마다 매번 인증을 해주어야 하기 때문이다.

  따라서 위 불편함을 해소하고자 쿠키와 세션이 등장하였다.

<br>
<br>

#### 1-1. 쿠키

---

- 간단하게 말하자면 클라이언트가 웹사이트에 접속 할 때 그 사이트가 사용하게 되는 작은 기록 파일이다.

  <center><img width="175" src="https://user-images.githubusercontent.com/83164003/157880051-3bf9cd6e-c1e7-43cb-bbec-9b51143414e9.png"/></center>

  > 쿠키 표준안인 RFC 2109에 따르면 쿠키는 300개까지 만들 수 있으며, 최대 크기는 4,096바이트이고, 하나의 호스트나 도메인에서 최대 20개까지 만들 수 있다.

- 위에서 언급한 상태를 유지하지 않고 연결을 유지하지 않는 HTTP 특성상 로그인 상태를 유지하려면 로그인 정보를 어딘가에 저장해서 계속 활용해야 할 필요가 있었다.

- 그러므로 서버는 최초 로그인시 클라이언트에 로그인정보를 응답할 때 로그인 유저의 인증 정보를 응답 헤더(Cookie)에 저장하여 전달하는 방식으로 로그인 상태를 유지할 수 있게되었다.

- 다만, 쿠키에 온전히 아이디와 비밀번호를 그대로 담아 전달하는 방식은 보안 이슈가 발생할 수 있으며, 쿠키는 브라우저마다 쿠키에 대한 지원 형태가 다르므로 브라우저간 공유또한 어렵다는 단점이 명확히 존재한다.

<br>
<br>

#### 1-2. 세션

---

- 사실 이 방식또한 쿠키라는 작은 기록 파일에 로그인한 유저의 인증 정보를 담은 뒤 주고 받아 로그인 정보를 계속 유지하는 것까지는 동일하다.

- 다만, 쿠키가 탈취되더라도 민감정보를 보호하기 위해 등장한게 세션이다.

- 아이디나 비밀번호등 민감정보들은 세션 ID를 달아 특정 서버 내 세션 저장소에 저장하고, 이 세션 ID값을 쿠키에 담아 클라이언트가 쿠키를 요청할 때마다 서버는 세션 저장소에 해당 세션 ID가 있는지 확인 후 있다면 정보와 동일한지 확인 후 반환해주는 과정으로 로그인 검증이 진행이 된다.

  다만 이 세션방식 또한 세션 저장소가 필수적으로 존재해야 하므로 이를 사용하기 위한 비용 증가가 불가피하다. 또한 "매번" 로그인 정보를 담고 있는 세션 저장소를 왔다 갔다하며 세션 ID를 조회하여 로그인 검증이 이뤄저야 하므로 DB 접근 횟수가 자연스레 증가할 수 밖에 없다. 그러므로 당연히 이에 따라 서버의 응답속도 저하는 이뤄질 수 밖에 없다.

- 때문에 서버의 메모리나 저장 공간이라는 서버의 자원을 소모한다라는 명확한 단점이 존재한다.

<br>
<br>

#### 2. 토큰

---

- 위에서 쿠키를 그대로 활용하는 것과 세션을 사용할 때의 단점을 보완하고자 등장하였다.

- 토큰 방식은 사용자가 로그인을 하면 서버에서 토큰을 발행하여 클라이언트로 보내어 브라우저의 저장소(로컬 스토리지, 쿠키 등)에 토큰을 유지시키는 방법이다.

- 쿠키를 그대로 활용하는 방법과는 다르게 암호화하여 정보를 저장할 수 있으며, 세션과 다르게 서버에 저장하지 않기 때문에 서버의 비용절감 및 서버의 확장성 또한 향상이 가능하다.

- 다만, 이 토큰 방식 또한 요청 헤더에 토큰이 담겨 전달되므로 토큰의 크기가 커질수록 트래픽 크기에 영향을 미칠수 있다. 또한 토큰은 클라이언트에서 관리되므로 브라우저에 스크립트를 삽입해 공격하는 XSS(Cross-Site Scripting)에 취약하다는 단점이 존재한다.

<br>
<br>

#### 2-1. JWT 란?

---

![스크린샷, 2022-03-11 22-24-35](https://user-images.githubusercontent.com/83164003/157876319-279921b6-3613-4502-bc35-97134d95baf5.png)

- **J**SON **W**eb **T**oken의 줄임말로 전자 서명 된 URL-safe (URL로 이용할 수있는 문자 만 구성된)의 JSON이다.

- 전자 서명은 JSON 의 변조를 체크 할 수 있게되어 있으며, JWT는 속성 정보 (Claim)를 JSON 데이터 구조로 표현한 토큰으로 RFC7519 표준이다.

- JWT는 서버와 클라이언트 간 정보를 주고 받을 때 HTTP 요청 헤더에 JSON 토큰을 넣은 후 서버는 별도의 인증 과정없이 헤더에 포함되어 있는 JWT 정보가 유효한지 검증하여 인증하는 형태로 사용된다.

- ![99DB103A5A50BD9732FA29](https://user-images.githubusercontent.com/83164003/157891513-6b9a5e94-7a39-4cf6-ab3d-dabf468b9e9d.png)

- JWT는 `.`을 기준으로 세 파트로 나뉜다.

  - **Header** : 헤더에는 JWT를 어떻게 검증하는지에 대한 내용이 들어가 있다. (어떤 알고리즘인지, 토큰의 타입 등)

  - **PayLoad**: 페이로드에는 토큰에 담아서 우리가 보내고자 하는 데이터가 담겨있다.

    > PayLoad에 담긴 정보의 조각은 **클레임(Claim)**이라 부르며 키-값쌍으로 이루어져 있다. 또한 PayLoad에는 여러개의 클레임을 담을 수 있다.

  - **Signature**: 시그니처에는 위 헤더와 페이로드를 합친 문자열을 서명한 값이다. 서명은 헤더의 담긴 알고리즘과 부여된 `Secret Key`로 생성되어 암호화 되어 있다.

<br>
<br>

## 🤔 Understanding

- HTTP의 비상태성, 비연결성 두가지 특성으로 인해 로그인 정보를 유지시키기 위해 고안된 방법들이 굉장히 많구나라는걸 느꼈다.

- 사실 잘 모르고 JWT를 사용하였다. 적절한 유지 방법을 서버 설계시 항상 염두해 두고 개발에 임해야 할 듯하다.

<br>
<br>

```toc

```
