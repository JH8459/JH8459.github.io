---
emoji: 🔥
title: ALL-CON Refactoring 2일차 - 민감정보 암호화
date: '2022-02-08'
author: JH8459
categories: Project
---

![github-blog.png](../../assets/common/PROJECT.jpeg)

<br>

## ⚒️ Refactoring

- 어제 오후까지 프로젝트 리팩토링 우선순위를 정하여 각자 Task를 선별하였다.

- 팀 프로젝트 Repository를 이제는 더이상 수강생이 아니기 때문에 Private ⮕ Public으로 전환을 하였다.

  그 과정에서 기존 Repository에서 새로운 Repository로 이전을 해야해서 오늘은 시간을 소비하였다.

- 우선 어제 혼자 학습한 내용은 블로그 후기로 정리를 해두었다.

  - <a href="https://blog.jh8459.com/2022-02-07-TIL/" target="_blank">Crypto 모듈로 비밀번호 암호화하기</a>

- 오늘은 문제점 2~3을 마저 해결해보려한다.

<br>
<br>

## 1. 미처 해결하지 못한 문제점

### 1-1. 문제점 2

---

- 비밀번호 찾기 & 콘친인증시 발송되는 6자리 난수코드 또한 암호화 하지않고 그대로 서버에서 DB로 저장을 한다.

  ![스크린샷, 2022-02-07 13-41-06](https://user-images.githubusercontent.com/83164003/152725583-d719287c-ad5e-4670-acc5-1d71928abcc8.png)

- 물론 DB에 저장된 난수코드 값은 3분 이후 `expired`값으로 초기화 되게끔 셋팅을 해두었기 때문에 비밀번호를 그대로 DB에 저장하는 경우 보다는 위험성은 낮다.

  하지만 위험의 여지가 있다는 사실은 변함이 없다.

<br>
<br>

### 1-2. 문제점 3

---

- 비밀번호 찾기 인증코드 입력 후 새로운 비밀번호 입력시 & 프로필 수정하기 진입 후 새로운 비밀번호 입력시 입력된 새로운 비밀번호들 또한 암호화 하지않고 그대로 서버에서 DB로 저장을 한다.

  ![스크린샷, 2022-02-07 13-43-50](https://user-images.githubusercontent.com/83164003/152726131-a6872096-1f35-452d-b8fd-2e73bf5087a9.png)

- `req.body`로 입력받은 `email`, `password`을 DB로 바로 집어 넣는다 😅.

  실제로 소셜로그인 방식이 아닌 위와 같이 회원가입이 진행된 유저들의 DB는 다음처럼 보인다. ~~(테스트 계정입니다.)~~

<center><img src="https://user-images.githubusercontent.com/83164003/152727993-ef2867c5-9ecd-4c6b-8581-b16fdd38382e.png"/></center><br>

<br>
<br>

## 2. 해결과정

### 2-1. 문제점 2 해결과정

---

- 6자리 난수코드들 또한 암호화 해주었다.

  난수코드는 3분 뒤 `expired`값으로 초기화되므로 레인보우 테이블과 대조하기에 어렵다고 생각되어, 이 과정에서는 Salt를 첨가한 해싱과정까지는 불필요하다 판단하였다.

  ```js
  // 'sha256' 알고리즘으로 confirmNumber을 'base64' 문자열 형식으로 해싱한다
  const hashedNumber = crypto.createHash('sha256').update(String(confirmNumber)).digest('base64');
  ```

  3분뒤 초기화되는 짧은 유효기간의 DB정보이기때문에 조금더 가벼운 알고리즘을 통하여 해싱을 해주었다.

- 간단한 해싱과정만 거친 뒤 DB에 저장을 하였다.

<br>
<br>

### 2-2. 문제점 3 해결과정

---

- Crypto 모듈로 비밀번호 암호화였으며 종합 과정은 1번 문제점 유사하게 해결하였다.

  ![스크린샷, 2022-02-08 16-33-04](https://user-images.githubusercontent.com/83164003/152939747-9b7d7cce-b433-49d2-9a45-b77f7e490c8d.png)

  아래의 민감정보를 다루는 영역들에서 테스트 결과 이제 더이상 DB에 비밀번호를 바로 저장하지 않는걸 확인하였다.

  - 회원가입시 비밀번호 입력값

  - 회원정보 수정시 새로운 비밀번호 입력값

  - 비밀번호 초기화 이후 새로운 비밀번호 입력값

  - 콘친 인증 & 이메일 인증 코드 6자리 난수값

  물론 DB를 보호하기 위해 기본 내장 모듈만 이용한 최소한의 보안장치만 걸어둔 서버이지만, 앞으로는 보안에 중점을 항상 1순위로 두어야겠다는 교훈을 얻었다.

- 내일부터는 Client 0순위였던 TypeScript 문법 코드 유지보수 혹은 Server의 1순위였던 토큰이 사라져도 로그아웃이 되지 않는 현상, 둘 중 하나를 리팩토링 해 봐야겠다.

<br>
<br>

```toc

```
