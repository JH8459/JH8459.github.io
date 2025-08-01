---
emoji: 📚
title: 'Node.js - code: ERR_HTTP_HEADERS_SENT 에러 핸들링'
date: '2022-02-09'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Node.js - code: ERR_HTTP_HEADERS_SENT

---

- Project 진행 중 쿠키가 강제로 삭제된 상황에서 로그아웃 API 요청시 `code: 'ERR_HTTP_HEADERS_SENT'` 에러를 겪고 서버가 죽어버리는 문제가 발생했었고 리팩토링 과정에서 해결한 과정을 짧게 글로 남겨보려 한다.

  우선 해당 에러는 한번의 Request(요청)에 2개 이상의 Response(응답)이 존재하는 경우 발생하는 에러이다.

  ```
  Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
  ```

  생각 보다 정직(?)하게 에러 메시지를 송출해 준다.

<br>
<br>

#### 1-1. 에러발생 원인

---

- 우선 에러가 무엇을 뜻하는지는 알았다.

  그렇다면 왜 발생했는지 코드를 뜯어보았다.

  > **controller/authentication/logout.js**
  >
  > ![스크린샷, 2022-02-09 11-31-35](https://user-images.githubusercontent.com/83164003/153110704-f562c05e-890a-4512-a358-f2cc3e431102.png)

  ```js
  // 로그인 인증검사
  await userAuth(req, res);
  ```

- 로그인 여부를 인증하는 코드에서 미들웨어 `userAuth` 함수를 호출하고 있으며 이 미들웨어 함수는 다음과 같이 구성되어 있다.

  > **middlewares/authorized/userAuth.js**
  >
  > ![스크린샷, 2022-02-09 11-42-11](https://user-images.githubusercontent.com/83164003/153112382-26f6e9dd-73c9-487e-bfa3-76c388d160e9.png)

  에러가 발생하는 시점은 로그인 상태 중 쿠키가 강제로 삭제되어(웹 브라우져에서 쿠키 초기화 등등의 이유로 인하여) 쿠키에 `accessToken`은 비어있지만 `client` 상태는 로그인 상태이기 때문에 로그아웃 요청은 진행이 가능하며, 로그아웃 요청시 2번의 응답결과가 발생되는 경우이다.

- `userAuth` 미들웨어의 응답결과

  ```js
  res.status(401).json({ message: 'AccessToken Is Empty!' });
  ```

- `logout` 컨트롤러의 응답결과

  ```js
  res.status(200).json({ message: 'Logout Success!' });
  ```

- 위 두 `response`가 서버에서 보내고 있기 때문에 발생하였다.

  그렇기에 `userAuth` 로그인 검증 미들웨어 함수를 수정해 주었다.

  > **middlewares/authorized/userAuth.js**
  >
  > ![스크린샷, 2022-02-10 17-21-56](https://user-images.githubusercontent.com/83164003/153366836-2657fc2c-a046-4d42-9b68-9ee1b155e054.png)

- `return`문 뒤에 `response` 응답 결과를 담지 않고 유효하지 않은 `accessToken`이 담겨있는 경우에는 `false`값을 반환하며 유효한 `accessToken`이 담겨있는 경우에는 `userInfo` 유저 정보값을 반환해주는 함수로 변경해주었다.

  > **controller/authentication/logout.js**
  >
  > ![스크린샷, 2022-02-10 17-23-13](https://user-images.githubusercontent.com/83164003/153367164-a5686917-ab22-498f-9dce-81e6542afd04.png)

  그 뒤 `userAuth` 검증 값을 `userInfo` 변수에 담은 뒤 해당 변수에 담기는 값이 `false`일 경우에는 상태코드 200번과 함께 메세지를 반환해주었다.

  이로써 우선 응답결과는 하나의 요청에 하나의 응답만 주어서 에러는 해결하였다.

---

- 서버 변경점에 맞춰 클라이언트 코드도 수정해보려 한다.

- 로그인 검증이 필요한 `axios` API 요청의 아래에 `response` 응답값의 결과가 만약 상태코드 200번 && 에러메시지가 나오는 경우, 메인페이지로 리다이렉트 & 로그인 모달 팝업 상태로 변경하여 다시 로그인을 유도하는 방면으로 코드를 수정해봐야겠다.

- 로그아웃 외에 로그인 검증이 필요한 API 요청의 서버 & 클라이언트 코드들 또한 모두 수정해봐야 겠다.

  <br>
  <br>

## 🤔 Understanding

- 기본에 충실하지 못하여서 발생한 에러라서 솔직히 부끄러운 에러라 생각이 든다.

  같은 실수를 하지않게끔 글로 남겨본다.

<br>
<br>

```toc

```
