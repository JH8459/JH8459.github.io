---
emoji: 📚
title: Crypto 모듈로 비밀번호 암호화하기
date: '2022-02-07'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 문제점

---

- 민감한 정보를 다룰 때 가장 중요한 부분은 바로 **_보안_** 이다.

- Final Project를 진행하며 보안에는 신경을 전혀 쓰지 않고 빠르게 기능적인 측면만 완성시키는데 급급하였다.

  그렇기에 당연히 보안에는 구멍이 너무나도 크게 뚫려있었고, 리팩토링 기간 동안 보안적인 측면에서 조금더 안전하게 민감정보들을 DB로 저장하는 방법을 찾아본 내용을 글로 남겨보았다.

  <center><img src="https://user-images.githubusercontent.com/83164003/152727053-d5bb15b0-0585-4ad9-8bad-afe23b59bd1d.jpg"/></center><br>

- 우선, 가장 심각한 문제를 꼽자면 클라이언트에서 받은 입력값들 혹은 서버에서 제공하는 인증코드들을 암호화 하지않고 그대로 DB로 저장을 하고 있다.

  그렇기에 만약 DB가 해킹당하는 사태시에는 아무런 보호조치를 받지 못한채로 민감정보들이 그대로 유출이 될 수 밖에 없다.

- 최악의 경우 또한 대비해두어야 한다 생각한다. DB가 해킹되어 탈취 당했을 경우 최소한의 대처가 가능하도록 민감정보 암호화를 해보려 한다.

<br>
<br>

#### 1-1. 문제점 1

---

- 우선 실제 코드를 다시 뜯어보고 가장 큰 보안 구멍 세군데를 찾아냈다.

- 첫번째로는 회원가입시 클라이언트에서 받은 입력값을 암호화 하지않고 그대로 서버에서 DB로 저장을 한다.

  ![스크린샷, 2022-02-07 13-29-19](https://user-images.githubusercontent.com/83164003/152724691-bcc27a1d-ad7c-4390-ad0c-2d2889bb2220.png)

  `req.body`로 입력받은 `email`, `password`, `username`을 중복검사만 진행 한 뒤 아무런 암호화 작업없이 DB로 바로 집어 넣는다.

- 솔직히 비밀번호를 입력받은 그대로 서버에서 DB로 저장하는 행위는 범죄 방조 행위와 비슷하다 생각한다.. ~~(분명히 문제가 될 여지가 있다는걸 알면서도 모른척 한 행위니까 😅)~~

<br>
<br>

#### 1-2. 문제점 2

---

- 두번째로는 비밀번호 찾기 & 콘친인증시 발송되는 6자리 난수코드 또한 암호화 하지않고 그대로 서버에서 DB로 저장을 한다.

  ![스크린샷, 2022-02-07 13-41-06](https://user-images.githubusercontent.com/83164003/152725583-d719287c-ad5e-4670-acc5-1d71928abcc8.png)

- 물론 DB에 저장된 난수코드 값은 3분 이후 `expired`값으로 초기화 되게끔 셋팅을 해두었기 때문에 위의 비밀번호를 그대로 DB에 저장하는 경우 보다는 위험성은 낮다.

  하지만 위험의 여지가 있다는 사실은 변함이 없다.

<br>
<br>

#### 1-2. 문제점 3

---

- 마지막 세번째로는 비밀번호 찾기 인증코드 입력 후 새로운 비밀번호 입력시 & 프로필 수정하기에서 새로운 비밀번호 입력시 입력된 새로운 비밀번호들 또한 암호화 하지않고 그대로 서버에서 DB로 저장을 한다.

  ![스크린샷, 2022-02-07 13-43-50](https://user-images.githubusercontent.com/83164003/152726131-a6872096-1f35-452d-b8fd-2e73bf5087a9.png)

  `req.body`로 입력받은 `email`, `password`을 DB로 바로 집어 넣는다.

  회원가입 부분과 유사하게 로직을 구성하였다 😅.

- 실제로 소셜로그인 방식이 아닌 위와 같이 회원가입이 진행된 유저들의 DB는 다음처럼 보인다. ~~(테스트 계정입니다.)~~

  <center><img src="https://user-images.githubusercontent.com/83164003/152727993-ef2867c5-9ecd-4c6b-8581-b16fdd38382e.png"/></center><br>

  프로젝트 리팩토링 기간동안 가장 신경 못썼던 보안에 중점을 두고 수정해보려 한다.

<br>
<br>

### 2. 암호화란?

---

- 암호화에는 단방향 암호화와 양방향 암호화, 크게 두 가지 방법이 있다.

- 간단하게 설명하자면 단방향 암호화는 암호화가 진행이 되면 복호화(암호화된 문자열을 다시 원래 문자열로 돌려놓는 것)할 수 없고, 양방향 암호화는 복호화해서 원래의 비밀번호를 알 수 있다.

- 다만, 대부분의 사이트는 비밀번호를 찾을 때 원래의 비밀번호를 알려주는 것이 아닌 재설정한다.

  현재 리팩토링중인 Project도 비밀번호를 되찾아 주는 것이 아닌 비밀번호 재설정을 하기 때문에 양방향 암호화는 굳이 필요없으므로 단방향 암호화를 사용했다.

<br>
<br>

#### 2-1. 해시 함수와 Salt

---

- 단방향 암호화의 가장 간단한 방식은 해시 함수를 사용하는 것이다.

- 또한 이미 보안이 뚫린 해시 함수가 존재하며, 이는 `MD5`, `SHA-1`, `HAS-180`로 해당 알고리즘은 사용해선 안된다.

  (보다 안전한 `SHA-256`, `SHA-512` 등을 사용하자)

  하지만, 단순하게 해시 함수만 사용해서 암호화를 하면 절대 안 된다.

  > 예를 들면 같은 비밀번호 '1234'를 쓰는 유저들의 해싱값들은 항상 같은 해시 결과값을 나타내기 때문에, 만약 해커가 모든 암호에 대해 어떤 결과가 나올지 데이터베이스화 해두었다면 결과만 보고도 원래 암호를 유추해낼 수 있다는 문제가 있다.
  >
  > > 이러한 데이터베이스를 **_레인보우 테이블_** 이라고 한다.

- 그렇기에 **Salt**라는 특정 값을 통해서 위에서 나온 결과를 변형해 주거나 해시 함수를 여러번 돌려 주어서 결과값을 변형해 주어야 한다. (혹은 둘다 사용해도 된다.)

  비밀번호에 Salt 문자열을 붙여서 그것을 수 만번 반복 해싱을 한다면 알고리즘을 해독하는데 길게는 수만년의 시간이 걸리게 될 수도 있다.

<br>
<br>

#### 2-2. Crypto vs Bcrypt

---

- 우선 암호화를 왜 해야하는지? 그리고 어떤 방식으로 암호화가 진행되는지 알아보았으니 Node.js 환경에서 많이 쓰이는 암호화 방식을 찾아보았다.

- 검색해보니 Node.js에서 기본 패키지로 제공하는 Native 모듈인 Crypto 모듈을 사용하는 방법과 Bcrypt의 Blowfish 알고리즘을 사용한 방법이 주를 이뤘다.

- 우선 Bcrypt는 Blowfish 알고리즘은 계산 비용이 많이들며 설정한 키값 만큼 반복 해싱 사용 (일반적으로 4,096회 정도지만 하드웨어 퍼포먼스에 따라 유동적이다. <a href="https://stackoverflow.com/questions/6951867/nodejs-bcrypt-vs-native-crypto" target="_blank">출처 : Stack Overflow</a> )이 가능하기 때문에 설정값에 따라서 해싱에 엄청난 비용이 든다고 추측된다.

- 하드 웨어 가 뒷받침 된다면 Bcrypt는 보안적인 측면에서 보다 안전하다 생각되지만 현재 Project의 서버 환경은 AWS Free-Tier EC2를 사용하고 있기 때문에 서버 부하가 너무 강한 해싱 알고리즘은 피해야 된다고 생각한다.

- 강한 알고리즘을 선택하지 않는다면 Bcrypt가 아닌 Crypto 모듈로도 충분하기 때문에 Crypto 모듈을 선택하여 암호화를 진행하였다. ~~(Node.js 기본 패키지로 들어간 이유가 다 있다고 생각하자..)~~

<br>
<br>

### 3. Crypto 암호화 과정

---

- crypto의 기본 내장 메소드를 이용해서 암호화 한다

  - `createHash()` : 사용할 알고리즘
  - `update()` : 암호화할 비밀번호
  - `digest()` : 인코딩 방식

  ```js
  /* 생략 */
  const { password } = req.body;

  // 'sha512' 알고리즘으로 req.body로 전달받은 password를 'base64' 문자열 형식으로 해싱한다
  const hash = crypto.createHash('sha512').update(password).digest('base64');
  ```

- 위와 같이 사용하면 우선 해시 알고리즘만 사용하여 암호화가 가능하다.

  다만, 위에서 언급하였듯이 Salt 첨가 혹은 반복 해싱작업이 없어서 **레인보우 테이블**로 비밀번호 유추가 가능하기 때문에 반쪽짜리 무늬만 해싱과정이다.

  따라서 비밀번호는 해시 알고리즘에 유저마다 부여된 고유의 Salt 값을 더해 생성해 주어서 해싱을 해주어야 한다.

- 로그인을 할 경우 각각 고유 Salt값이 있어야 해싱되어 DB에 저장된 비밀번호가 해독이 가능하므로 Salt값 또한 DB에 저장할 수 있도록 Sequelize ORM Migration을 통하여 DB 스키마를 수정해주었다.

  ![스크린샷, 2022-02-07 16-43-31](https://user-images.githubusercontent.com/83164003/152745787-010fd874-9862-498b-9143-b7a079e312e6.png)

  > `Users`테이블에 `userSalt` 컬럼을 추가해 주었다.
  >
  > OAuth 2.0으로 회원가입시 `password`값을 받지 않고 있으므로 `NULL`을 허용해야 한다.

- 이제 준비는 끝나었으니 회원가입시 비밀번호 암호화를 진행해보자.

<br>
<br>

#### 3-1. Salt가 더해진 암호화 과정

---

- Salt 생성에서는 crypto 모듈의 `randomBytes()` 메소드를 사용하였으며 비밀번호 암호화는 `pbkdf2()` 메소드를 사용하였다.

  > **pbkdf2 (Password-Based Key Derivation Function Version 2)** : 사용자 패스워드에 해시함수, 솔트(Salt), 반복 횟수 등을 지정하여 패스워드에 대한 다이제스트(Digest)를 생성하는 함수

- 해시값을 구할때, 작업이 끝날때까지 기다려 주어야 하므로 비동기 콜백 함수의 형태로 사용하거나 `new Promise()` 형태로 감싸주어야 한다.

  하지만 코드의 가독성을 높히기 위해 Node.js 내장 모듈인 `util` 의 `promisify()`를 사용하였다.

  ![스크린샷, 2022-02-07 21-07-34](https://user-images.githubusercontent.com/83164003/152785259-f62fc6bd-addd-4799-9126-3aaeb1431c56.png)

- 이제 위 해싱과정을 통하여 패스워드는 임의의 64바이트 문자열 Salt가 더해진 `sha512` 알고리즘으로 106,699회 해싱 후 64바이트 문자열로 복호화 된다.

- 이제 로그인시 입력 비밀번호값에 DB에 저장된 Salt값 `userSalt`로 똑같이 복호화 해준 뒤 패스워드값을 비교해주어서 검증해주는 과정을 마친다면 로그인 검증또한 완료된다.

  ![스크린샷, 2022-02-07 21-43-25](https://user-images.githubusercontent.com/83164003/152790303-1f7d0eab-eb76-46ae-8b16-88af8ff47e14.png)

- 우선 입력된 `email` 값과 일치하는 유저정보를 찾은 뒤 `userSalt`값을 불러 온 뒤 입력한 `password`에 동일하게 해싱을 해주어 일치하는 패스워드인지 검증을 해주는 절차로 구성하였다.

- 일단 오늘은 이렇게 **문제점 1**을 해결하였다. 빠른 시일 내로 비밀번호에 관련된 보안 구멍을 모두 위와 같은 로직으로 수정해봐야겠다.

<br>
<br>

## 🤔 Understanding

- 신경을 안써도 너무 안썼다..

  생각보다 코드는 간단하게 작성하여 해결하였지만, 개념들을 모두 처음부터 학습하며 두가지 모듈을 비교해가며 내 프로젝트에 적용하는 시간은 짧지 않았다.

- 물론 수정한 코드 또한 철통보안이라고 생각하지 않는다.

  다만 DB가 탈취되었을 때, 적나라하게 모든 비밀번호가 유출되는 경우보다는 훨씬 보안이 향상되었다 생각한다.

- 프로젝트에 해싱 알고리즘을 적용하는 동안 여러 해커들에게 보안이 뚫린 알고리즘이라던지 알고리즘별 퍼포먼스가 하드웨어에 미치는 영향이라던지 흥미로운 부분들이 많아서 재밌었다.

- 문제점 2 ~ 3은 내일 해결 해 봐야겠다.

<br>
<br>

```toc

```
