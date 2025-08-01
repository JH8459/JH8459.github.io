---
emoji: 📚
title: 자주쓰이는 HTTP 메소드 & HTTP 상태 코드
date: '2022-03-15'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 자주 쓰이는 HTTP 요청 메소드와 요청에 대한 처리 결과값을 나타내는 HTTP 상태 코드를 알아보고 학습한 내용을 글로 남겨보려 한다.

<br>
<br>

### 1. HTTP 메소드

---

![logo](https://user-images.githubusercontent.com/83164003/158408637-b2ae60a9-8074-435b-bbe6-4aa4e409c142.png)

- HTTP 메소드는 클라이언트가 서버에게 사용자 요청의 목적/종류를 알리는 수단이다.

- 최초의 HTTP에서 메소드의 종류는 GET 메소드 하나뿐이었고 그마저도 HTML 문서만 응답해주었지만, 이후 다양한 사용자 요청의 목적과 종류를 알리는 메소드들이 생겨났다.

<br>
<br>

#### 1-1. HTTP 메소드 종류

---

- **GET** : 리소스를 조회하는 용도이다.

  - URL(URI) 형식으로 서버 측 리소스를 요청한다.

- **HEAD**: GET과 비슷하지만 메시지 부분(본문)을 제외하고, 상태 줄과 헤더만 반환한다.

  - 실제 리소스(문서)를 요청하는 것이 아니라, 리소스 정보를 요청한다.

- **POST** : 요청 데이터 처리, 주로 데이터 등록에 사용한다.

  - 요청 데이터를 HTTP 바디에 담아 웹서버로 전송한다.

- **PUT** : POST와 비슷하지만 리소스를 대체 혹은 갱신 위주로 사용한다.

  - 통상적으로 보다 세밀한 POST를 더 많이 사용한다.

- **PATCH** : 리소스를 일부만 변경하는 용도이다.

- **DELETE** : 리소스 삭제하는 용도이다.

- **OPTIONS**: 대상 리소스에 대한 통신 가능 옵션을 설명하는 용도이다. (주로 CORS에서 사용)

- **CONNECT**: 대상 자원으로 식별되는 서버에 대한 터널을 설정한다. (주로 사용하지 않는다)

- **TRACE**: 대상 리소스에 대한 경로를 따라 메시지 루프백 테스트를 수행한다. (주로 사용하지 않는다)

<br>
<br>

### 2. HTTP 상태 코드

---

<center><img src="https://user-images.githubusercontent.com/83164003/158411952-9a9aa7c9-04b3-461a-97a1-a3b663531867.png"/></center><br>

- HTTP 상태코드는 클라이언트가 서버에게 요청을 보냈을때 서버는 응답을 보낸다.

  그에 대한 응답의 결과를 크게 5개의 범주의 상태코드와 함께 반환하여 보내준다.

  - 1xx(Informational response) : 서버가 요청을 받았으며 프로세스를 계속하라는 의미

  - 2xx(Success) : 서버가 요청을 성공적으로 받았으며 인식하고 수용했다는 의미

  - 3xx(Redirection message) : 요청 완료를 위해 추가 작업 조치가 필요하다는 의미

  - 4xx(Client error response) : 요청의 문법이 잘못되었거나 요청을 처리할 수 없다는 의미

  - 5xx(Server errors) : 서버의 이유로 인해 유효한 요청에 대한 응답을 실패했다는 의미

<br>
<br>

#### 2-1. 자주 쓰이는 HTTP 상태 코드 종류

---

- 이중 자주 쓰이는 상태코드를 꼽으라면 2xx 성공 코드와 4xx 클라이언트 에러 코드, 그리고 5xx 서버 에러 코드를 자주 볼 수 있는 상태코드라 꼽을 수 있다.

  각 자리수 중에서 대표하는 상태 코드를 꼽아서 정리해보았다.

<br>
<br>

#### 2-2. 2xx(Success) 코드

---

- 200(OK): 서버가 요청을 성공적으로 처리했을 시

- 201(Created): 요청을 성공적으로 처리하였으며 새로운 리소스가 생성되었을때, 일반적으로 POST나 PUT 요청 메소드 이후에 받게 된다.

- 202(Accepted): 서버가 요청을 접수했지만 아직 처리하지는 못했을 때

- 203(Non-Authoritative Information): 요청을 성공적으로 처리했지만 다른 소스에서 수신된 정보를 제공, 검증이 되지 않은 상태

- 204(No Content): 서버가 요청을 성공적으로 처리했지만 콘텐츠가 없을 때

<br>
<br>

#### 2-2. 4xx(Client error response) 코드

---

- 400(Bad Request): 잘못된 문법으로 요청을 보냄

- 401(Unauthorized): 유효하지 않은 권한으로 요청을 보냄(ex. 토큰이 만료 된 이후 로그인이 필요한 API 요청이 들어옴)

- 402(Payment Required): 서버가 요청을 접수했지만 아직 처리하지는 못했을 때

- 403(Forbidden): 서버가 요청을 거부할 때, 클라이언트가 요청한 컨텐츠에 대해 접근할 권한이 없음 (ex. 특정 IP가 차단되었는데 해당 IP로 요청이 들어옴)

- 404(Not Found): 서버가 요청한 URI를 찾을 수 없음, 서버에 존재하지 않는 페이지에 대한 요구를 할 때

- 405(Method Not Allowed): 클라이언트가 보낸 메소드가 해당 URI에서 지원하지 않음 (ex. POST 메소드로만 요청이 가능한데 이를 지키지 않고 GET으로 요청이 들어옴)

- 409(Conflict): 서버가 요청을 수행하는 중에 충돌이 발생했을 때 (ex. 이미 서버에 존재하는 ID값으로 회원가입 요청이 들어옴)

<br>
<br>

#### 2-3. 5xx(Server errors) 코드

---

- 500(Internal Server Error): 서버에 오류가 발생하여 요청을 수행할 수 없을 경우

<br>
<br>

## 오늘 느낀 점

- 사실 HTTP 메소드도 이렇게 많은 종류가 있는 줄 몰랐다. ~~(GET, POST, PATCH, DELETE만 써봄..)~~<

  조금 규모가 큰 서버를 개발하는 경우에는 다양한 HTTP 메소드를 염두하고 개발을 진행해야 할 듯하다.

- 그리고 상태 코드 또한 의미하는 바를 정확히 모르고 그냥 관행처럼 썼다.

  상태 코드를 때에 따라 명확히 사용한다면, 에러 메시지를 적을 이유도 없이 그 의미 전달이 충분히 전달 될 듯 하다라는 생각이 들었다.

- 자주 사용하는 상태 코드들은 기억해 두는 것이 좋을 듯 하다.

<br>
<br>

```toc

```
