---
emoji: 📚
title: HTTP와 네트워크, SSR과 CSR
date: '2021-09-02'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. HTTP/네트워크

---

<br>
<br>

#### 1-1. 클라이언트-서버 아키텍처

---

- 클라이언트-서버 아키텍처는 리소스가 존재하는 곳과, 리소스를 사용하는 앱을 분리시킨 네트워크 모델이다.

  리소스를 사용하는 앱이 바로 **"클라이언트"**, 리소스가 제공(serve)하는 곳은 **"서버"** 라고 부른다.

  클라이언트와 서버로만 이루어진 모델을 2-Tier 아키텍처라고 부르기도 한다.

  ![클라이언트-서버 아키텍처](https://user-images.githubusercontent.com/83164003/131768527-fd46d641-6172-48e5-a547-1625cc3a6537.png)

- 일반적으로 서버는 리소스를 전달해주는 역할만 담당한다.

  리소스를 저장하는 공간을 별도로 마련해 두는데, 이 공간을 **"데이터베이스"** 라고 부른다.

  이처럼 기존 2티어 아키텍처에 데이터베이스가 추가된 형태를 3티어 아키텍처라고 일컫는다.

<br>
<br>

#### 1-2. HTTP 프로토콜이란?

---

- HTTP(Hypertext Transfer Protocol)는 웹을 개발하는 사람이라면 누구나 다 알아야 하는 통신 프로토콜이다.

  **프로토콜**이란 상호 간에 정의한 규칙을 의미하며 특정 기기 간에 데이터를 주고받기 위해 정의되어 있다.

  웹에서는 브라우저와 서버 간에 데이터를 주고받기 위한 방식으로 HTTP 프로토콜을 사용하고 있다.

- HTTP 프로토콜의 특징은 상태가 없는(stateless) 프로토콜이다.

  여기서 "상태가 없다"라는 말은 데이터를 주고 받기 위한 각각의 데이터 요청이 서로 독립적으로 관리가 된다는 말이다.

  즉, 이전 데이터 요청과 다음 데이터 요청이 서로 관련이 없이 독립적이다.

  이러한 특징 덕택에 서버는 세션과 같은 별도의 추가 정보를 관리하지 않아도 되고, 다수의 요청 처리 및 서버의 부하를 줄일 수 있는 성능 상의 이점이 생긴다.

<br>
<br>

#### 1-3. URL와 URI

---

- URL은 Uniform Resource Locator의 줄임말로, 네트워크 상에서 웹 페이지, 이미지, 동영상 등의 파일이 위치한 정보를 나타낸다.

  URI는 **U**niform **R**esource **I**dentifier의 줄임말로, 일반적으로 URL의 기본 요소인 scheme, hosts, url-path에 더해 query, bookmark를 포함한다.

  브라우저의 검색창을 클릭하면 나타나는 주소가 URI이다. URI는 URL을 포함하는 상위개념이므로 `'URL은 URI다.'` 는 '참'이고, `'URI는 URL이다.'` 는 '거짓'이다.

  `http://www.google.com:80/search?q=JavaScript` 를 브라우저의 검색창에 입력하면, 구글에서 JavaScript를 검색한 결과가 나타난다. 이를 자세히 살펴 보면 다음과 같은 특징을 갖는다.

  ![스크린샷, 2021-09-02 11-46-06](https://user-images.githubusercontent.com/83164003/131773354-a25d92e9-1d99-4226-aab3-af8589ebc612.png)

<br>
<br>

#### 1-4. HTTP Request & HTTP Response

---

- HTTP로 데이터를 주고받기 위해서는 아래와 같이 요청(Request)을 보내고 응답(Response)을 받아야 합니다.

  ![request-response](https://user-images.githubusercontent.com/83164003/131771279-0f128cc4-9b64-491a-8e92-ccab232618a7.png)

  이때 서버는 요청을 받은 클라이언트에게 리소스를 잘 활용할 수 있도록 인터페이스(interface)를 제공해줘야 한다.

  이것을 **API, 애플리케이션 프로그래밍 인터페이스(Application Programming Interface)** 라고 한다.

- 앞에서 살펴본 URL을 이용하면 서버에 특정 데이터를 요청할 수 있다.

  여기서 요청하는 데이터에 특정 동작을 수행하고 싶으면 HTTP 요청 메서드(Http Request Methods)를 이용한다.

  일반적으로 HTTP 요청 메서드는 HTTP Verbs라고도 불리우며 아래와 같이 주요 메서드를 갖고 있다.

  1. **GET** : 존재하는 자원에 대한 요청

  2. **POST** : 새로운 자원을 생성

  3. **PUT(PATCH)** : 존재하는 자원에 대한 변경

  4. **DELETE** : 존재하는 자원에 대한 삭제

- 다양한 요청 메서드는 해당 문서에서 참조하자. <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Methods" target="_blank">참조 : MDN</a>

<br>
<br>

#### 1-5. HTTP 메세지 포맷

---

- 앞서서 말한 내용을 요약하면, HTTP는 특정 상태를 유지하지 않으며 웹 브라우저와 웹 서버의 소통을 위해 디자인되었으며 (1-2. HTTP 프로토콜이란?) 클라이언트-서버 모델에서 클라이언트가 HTTP messages 양식에 맞춰 요청을 보내면, 서버도 HTTP messages 양식에 맞춰 응답한다 배웠다. (1-4. HTTP Request & HTTP Response).

  HTTP messages는 요청(Requests)과 응답(Responses)에서 다음과 같은 구조를 지닌다.

  ![IMVji3YEl-1620275072422](https://user-images.githubusercontent.com/83164003/131782679-b80595d6-76eb-491c-a776-e07345a72fa8.png)

  1. **start line** : start line에는 요청이나 응답의 상태를 나타내며, 항상 첫 번째 줄에 위치한다. 응답에서는 status line이라고 부른다.

  2. **HTTP headers** : 요청을 지정하거나, 메시지에 포함된 본문을 설명하는 헤더의 집합.

  3. **empty line** : 요청에 대한 모든 메타 정보가 전송되었음을 알리는 빈 줄

  4. **body** : 요청과 관련된 데이터나 응답과 관련된 데이터 또는 문서를 포함한다. 요청과 응답의 유형에 따라 선택적으로 사용된다.

  이 중 start line과 HTTP headers를 묶어 요청이나 응답의 헤드(head)라고 하고, **payload**는 body라고 이야기합니다.

  > 페이로드(영어: payload)는 사용에 있어서 전송되는 데이터를 뜻한다.
  >
  > 페이로드는 전송의 근본적인 목적이 되는 데이터의 일부분으로 그 데이터와 함께 전송되는 헤더와 메타데이터와 같은 데이터는 제외한다. <a href = "https://ko.wikipedia.org/wiki/%ED%8E%98%EC%9D%B4%EB%A1%9C%EB%93%9C_(%EC%BB%B4%ED%93%A8%ED%8C%85)" target="_blank">참조 : MDN</a>

<br>
<br>

#### 1-6. HTTP 요청 (Request)

---

- HTTP 요청은 서버가 특정 동작을 취하게끔 만들기 위해 클라이언트에서 전송하는 메시지라는걸 위에서 학습하였다. 이 메세지의 내용은 다음과 같이 이루어져 있다.

- **시작줄**

  1. 수행할 작업(GET, PUT, POST 등)이나 방식(HEAD or OPTIONS)을 설명하는 HTTP method를 나타낸다.

     예를 들어 GET method는 리소스를 받아야 하고, POST method는 데이터를 서버로 전송한다.

  2. 요청 대상(일반적으로 URL이나 URI) 또는 프로토콜, 포트, 도메인의 절대 경로는 요청 컨텍스트에 작성된다.

     이 요청 형식은 HTTP method 마다 다르다.

  3. HTTP 버전마다 메시지의 구조가 다르다.

     이를 위해 HTTP 버전을 함께 입력한다.

- **헤더** : 요청의 Headers는 기본 구조를 따른다.

  대소문자 구분 없는 문자열과 콜론(:), 값을 입력합니다.

  값은 헤더에 따라 다르다. 여러 종류의 헤더가 있으며 참조를 통해 확인하자. <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Headers" target="_blank">참조 : MDN </a>

- **바디** : 요청의 본문은 HTTP messages 구조의 마지막에 위치한다.

  하지만, 모든 요청에 body가 필요하지는 않는다. `GET`, `HEAD`, `DELETE`, `OPTIONS`처럼 서버에 리소스를 요청하는 경우에는 본문이 필요하지 않는다.

  `POST`나 `PUT`과 같은 일부 요청은 존재하는 자원에 대한 변경 및 업데이트가 필요하므로 사용된다.

<br>
<br>

#### 1-7. HTTP 응답(Responses)

---

- 전반적인 내용은 요청과 비슷하지만 다른점만 서술해보았다.

- **시작줄**

  1. 현재 프로토콜의 버전(HTTP/1.1)

  2. 상태 코드 : 요청의 결과를 코드번호로 나타낸다 (200, 302, 404 ETC...)

  3. 상태 텍스트 : 상태 코드에 대한 설명

- 특히 이 **상태 코드**를 통하여 에러처리를 할 수 있기 때문에 프론트엔드 클라이언트 개발자에겐 가장 중요한 정보이다.

  주요 상태 코드는 200번대부터 500번대까지 다양하게 있지만 주요한 상태 코드만 몇 개 살펴보자면,

  - 2xx : 200번대의 상태 코드는 대부분 요청에 대한 응답 성공을 의미한다.

  - 3xx : 300번대의 상태 코드는 대부분 클라이언트가 이전 주소로 데이터를 요청하여 서버에서 새 URL로 리다이렉트를 유도하는 경우이다.

  - 4xx : 400번대 상태 코드는 대부분 클라이언트의 코드가 잘못된 경우이다. 유효하지 않은 자원을 요청했거나 요청이나 권한이 잘못된 경우 발생한다. 가장 익숙한 상태 코드는 404 코드이다. 요청한 자원이 서버에 없다는 의미이다.

    ![404오류](https://user-images.githubusercontent.com/83164003/131798212-b4c3f98e-17a0-4ea8-9414-5e0857881efa.jpg)

    ~~웹페이지에서 종종 겪는 404 에러 출력 메세지~~

  - 5xx : 500번대 상태 코드는 서버 쪽에서 오류가 난 경우이다.

<br>
<br>

### 2. SSR과 CSR

---

<br>
<br>

#### 2-1. SSR(Server Side Rendering)

---

- 웹 페이지를 브라우저에서 렌더링하는 대신에, 서버에서 렌더링하는 경우를 일컫는다.

  ![ssr](https://user-images.githubusercontent.com/83164003/131885519-a5955b8e-b07b-405d-977b-24f1bb2bc8e2.png)

  브라우저가 서버의 URI로 `GET` 요청을 보내면, 서버는 정해진 웹 페이지 파일을 브라우저로 전송한다.

  그리고 서버의 웹 페이지가 브라우저에 도착하면 완전히 렌더링하게 된다.

  서버에서 웹 페이지를 브라우저로 보내기 전에, 서버에서 완전히 렌더링했기 때문에 `Server Side Rendering` 이라고 한다.

  웹 페이지의 내용에 데이터베이스의 데이터가 필요한 경우, 서버는 데이터베이스의 데이터를 불러온 다음 웹 페이지를 완전히 렌더링 된 페이지로 변환한 후에 브라우저에 응답으로 보낸다.

  웹 페이지를 살펴보던 사용자가, 브라우저의 다른 경로로 이동하면 브라우저가 다른 경로로 이동할 때마다 서버는 이 작업을 다시 수행한다.

<br>
<br>

#### 2-2. CSR(Client Side Rendering)

---

- SSR이 서버 측에서 페이지를 렌더링한다면, CSR은 클라이언트에서 페이지를 렌더링한다.

  ![csr](https://user-images.githubusercontent.com/83164003/131885634-9f8422f1-7124-4df9-80a4-052dee53c0d5.png)

  브라우저의 요청을 서버로 보내면 서버는 웹 페이지를 렌더링하는 대신, 웹 페이지의 골격이 될 단일 페이지를 클라이언트에 보낸다. 이때 서버는 웹 페이지와 함께 JavaScript 파일을 보내어서 클라이언트가 웹 페이지를 받으면, 웹 페이지와 함께 전달된 JavaScript 파일은 브라우저에서 웹 페이지를 완전히 렌더링 된 페이지로 바꾸게된다.

  웹 페이지에 필요한 내용이 데이터베이스에 저장된 데이터인 경우에는 브라우저는 데이터베이스에 저장된 데이터를 가져와서 웹 페이지에 렌더링을 해야 한다. 이를 위해 API가 사용된다. 웹 페이지를 렌더링하는 데에 필요한 데이터를 클라이언트는 서버에 API 요청으로 해결할 수 있다.

  마지막으로, 브라우저가 다른 경로로 이동하면 SSR과 다르게 서버가 웹 페이지를 다시 보내지 않는다. 브라우저는 브라우저가 요청한 경로에 따라 페이지를 다시 렌더링하며, 이때 보이는 웹 페이지의 파일은 맨 처음 서버로부터 전달받은 웹 페이지 파일과 동일한 파일이다.

<br>
<br>

#### 2-3. SSR과 CSR의 차이점

---

- 우선 속도적인 측면을 보면, 웹 페이지 로딩의 종류는 두 가지로 나눌 수 있다. 하나는 웹 사이트의 가장 첫 페이지를 로딩하는 것 그리고, 다른 하나는 나머지를 로딩하는 것을 꼽을 수 있다.

  **첫 페이지 로딩시간**은
  CSR의 경우 HTML, CSS와 모든 스크립트들을 한 번에 불러온다. 반면 SSR은 필요한 부분의 HTML과 스크립트만 불러오게 된다. 따라서 평균적으로 SSR이 더 빠르다.

  **나머지 로딩 시간**은
  첫 페이지를 로딩한 후, 사이트의 다른 곳으로 이동하는 식의 동작을 가정하자. CSR은 이미 첫 페이지 로딩할 때 나머지 부분을 구성하는 코드를 받아왔기 때문에 빠르다.
  반면, SSR은 첫 페이지를 로딩한 과정을 정확하게 다시 실행한다. 그래서 더 느리다.

- 검색 엔진은 자동화된 프로그램 '크롤러'로 웹 사이트들을 읽는다.

  CSR은 웹 페이지와 함께 전달 된 자바스크립트를 실행시켜 동적으로 컨텐츠가 생성되기 때문에 자바스크립트가 실행 되어야 올바른 리소스가 바뀌게 된다. 하지만 SSR은 애초에 서버 사이드에서 컴파일되어 클라이언트로 넘어오기 때문에 크롤러에 대응하기 용이하다.

<br>
<br>

## 🤔 Understanding

- HTTP 란, 서버-클라이언트간의 상호간에 협의 된 규칙으로 자원을 주고받는 일련의 과정들을 학습하였다.

  약간... 구조적인 내용의 학습이었다. 문법이나 코드기술등이 아닌 원초적이고 근본적인 내용이랄까??

  우선 오늘 학습내용을 최대한 요약하자면,

  > 클라이언트는 특정된 "요청 메서드"로 서버에 자원을 요구하고, 서버는 해당 요청을 "응답 코드"가 포함된 응답으로 답변을 한다.
  >
  > 이때 상호간에 대화(?)는 프로토콜이라는 상호간에 규정된 규칙으로 이뤄진다.

  정도로 말할 수 있다.

  ![http-full-structure](https://user-images.githubusercontent.com/83164003/131799035-50dbb592-e5a4-4f1d-aeb0-45f29ce6f41e.png)

  해당 사진의 흐름으로 "서버-클라이언트 간에 Request & Responses가 이뤄진다." 라는 내용은 머릿속에 집어넣었다 생각한다.

- SSR 과 CSR이 언제 필요하며, 각각의 장단점은 짚고 넘어갔다. SSR이 다시 각광을 받는 듯한 분위기던데.. 조금 더 공부가 필요할 듯 하다.

<br>
<br>

```toc

```
