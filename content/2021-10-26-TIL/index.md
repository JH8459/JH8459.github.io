---
emoji: 📚
title: 인터넷 프로토콜, HTTP 헤더, 웹 캐시
date: '2021-10-26'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 인터넷 프로토콜

---

<br>
<br>

#### 1-1. IP와 IP Packet

---

- IP 패킷에서 패킷은 pack과 bucket이 합쳐진 단어로 소포로 비유할 수 있다. IP 패킷은 우체국 송장처럼 전송 데이터를 무사히 전송하기 위해 출발지 IP, 목적지 IP와 같은 정보가 포함되어 있으며 데이터를 전달하는 통신의 단위이다.

  ![스크린샷, 2021-10-26 16-00-27](https://user-images.githubusercontent.com/83164003/138825068-009e4ba1-8fda-4b99-a212-807c3e789a45.png)

- **클라이언트 패킷 전달** 과정을 살펴보면 다음과 같다.

  - 클라이언트가 IP 패킷을 인터넷 상의 노드에 던진다.
  - 인터넷 상의 노드(컴퓨터)들은 모두 IP 프로토콜을 따르기 때문에 해당 패킷의 정보(출발지, 목적지)를 이해할 수 있다.
  - 중간 노드들은 목적지 노드가 어디있는지 서로 물어가면서 해당 패킷을 전달한다. (라우팅 과정)

  위 과정을 통해 복잡한 인터넷 망 사이에서도 정확한 목적지로 패킷을 전송할 수 있다.

  ![스크린샷, 2021-10-26 17-44-49](https://user-images.githubusercontent.com/83164003/138843412-075e4290-60f1-4dab-9c6c-ebcbdceb3c46.png)

- **서버 패킷 전달** 과정또한 클라이언트와 마찬가지로 이뤄지며, 패킷 단위 데이터로 통신이 이뤄진다.

  ![스크린샷, 2021-10-26 17-45-57](https://user-images.githubusercontent.com/83164003/138843489-1b89909f-3b7f-45a4-8102-7b26d702c491.png)

<br>
<br>

##### IP 프로토콜 한계

---

- 정확한 출발지와 목적지를 파악할 수 있다는 점에서 IP 프로토콜은 적절한 통신 방법으로 보이지만 단점도 명확하다.

  - **비연결성** : 만약 패킷을 받을 대상이 없거나 서비스 불능 상태여도 클라이언트는 서버의 상태를 파악할 방법이 없기 때문에 패킷을 그대로 전송하게 된다.

  ![스크린샷, 2021-10-26 17-46-25](https://user-images.githubusercontent.com/83164003/138843593-38235e14-8e51-4d3e-b6cf-1176fb6b2a88.png)

  - **비신뢰성** : 중간에 있는 서버가 데이터를 전달하던 중 장애가 생겨 패킷이 중간에 소실되더라도 클라이언트는 이를 파악할 방법이 없다.

  ![스크린샷, 2021-10-26 17-46-59](https://user-images.githubusercontent.com/83164003/138843686-c69809c1-7bfd-4e2f-8692-51e82a11904f.png)

  - **비신뢰성(패킷 전달 순서 문제)** : 전송하려는 패킷의 용량이 매우 큰 경우 (대략 1500Byte 정도가 넘으면 해당 내용을 끊어서 보낸다), 이러한 경우 전송하려는 패킷들의 순서가 중요하다.

    그러나 IP프로토콜에서는 하나의 데이터에 연관된 패킷들이 각각 다른 경로로 전송될 수 있다. 따라서 도착하는 순서도 보장되지 않는다.

    ![스크린샷, 2021-10-26 17-47-33](https://user-images.githubusercontent.com/83164003/138843811-620d17a3-5d7c-48e2-9b5e-8514afb46c66.png)

<br>
<br>

#### 1-2. TCP / UDP

---

- 네트워크 프로토콜 계층은 다음과 같이 OSI 7계층과 TCP/IP 4 계층으로 나눌 수 있다.

  ![osi7](https://user-images.githubusercontent.com/83164003/138831221-93740d56-e01a-4a86-ad31-4e0ecf309f6c.PNG)

  IP 프로토콜 보다 더 높은 계층에 TCP 프로토콜이 존재하기 때문에 앞서 다룬 IP 프로토콜에서 발생했던 수많은 문제들(패킷의 순서가 꼬이고, 유실되는 등의 문제)을 TCP 프로토콜이 해결해준다.

- 우선 FLOW CHART를 보면 다음과 같다.

  ![스크린샷, 2021-10-26 17-48-27](https://user-images.githubusercontent.com/83164003/138843963-4d1975f0-d6af-423b-91ae-40063ecb1884.png)

  - 응용프로그램이 HTTP 프로토콜을 통하여 'Hello World' 메시지 생성함.

  - SOCKET 라이브러리를 통해 OS계층에 HTTP 메시지 전달됨.

  - TCP Layer 에서는 Hello, world 메시지에 TCP 세그먼트를 씌운다.

  - TCP 세그먼트가 씌워진 HTTP 메세지를 IP 계층으로 전달(받은 메시지 위에 또
    IP와 관련된 데이터들을 씌운다). ➡ TCP/IP 패킷이 생성됨.

  - 이렇게 생성된 TCP/IP 패킷은 LAN 카드와 같은 물리적 계층을 지나기 위해 이더넷 프레임 워크에 포함되어 서버로 전송함.

  > TCP 세그먼트란?
  >
  > ![스크린샷, 2021-10-26 18-01-14](https://user-images.githubusercontent.com/83164003/138846259-8a7c7f61-98be-42f3-bc5b-b5bedb174451.png)
  >
  > TCP 세그먼트에는 IP 패킷의 출발지 IP와 목적지 IP 정보를 보완할 수 있는 출발지 PORT, 목적지 PORT, 전송 제어, 순서, 검증 정보 등을 포함한다. ➡ IP에서 해결이 안되었던 순서 제어문제 등이 해결된다.

<br>
<br>

##### TCP 특징

---

- 전송 제어 프로토콜(Transmission Control Protocol) 이다. 다음과 같은 특징을 갖기 때문에 TCP는 같은 계층에 속한 UDP에 비해 상대적으로 신뢰할 수 있는 프로토콜이며, 현재 대부분 TCP를 사용한다.

  - **연결 지향 - TCP 3 way handshake (가상 연결)** : <a href="https://www.sciencedirect.com/topics/computer-science/three-way-handshake" target="_blank">링크</a> 참조.

  - **데이터 전달 보증 (패킷 소실 문제 해결)** : TCP는 데이터 전송이 성공적으로 이루어진다면 이에 대한 응답을 돌려주기 때문에 IP 패킷의 한계인 비연결성을 보완이 가능하다.

  - **순서 보장 (패킷 순서 문제 해결)** : TCP는 패킷이 순서대로 도착하지 않는다면 TCP 세그먼트에 있는 정보를 토대로 다시 패킷 전송을 요청할 수 있다. 이를 통해 IP 패킷의 한계인 비신뢰성(순서를 보장하지 않음)을 보완할 수 있게된다.

<br>
<br>

##### UDP 특징

---

- 사용자 데이터그램 프로토콜(User Datagram Protocol) 이다. UDP는 IP 프로토콜에 PORT, 체크섬 필드 정보만 추가된 단순한 프로토콜이다.

  - **비 연결 지향** : 3 way handshake 방식을 사용하지 않기 때문에 TCP와 비교해 빠른 속도를 보장한다.

  > 체크섬(checksum)은 중복 검사의 한 형태로, 오류 정정을 통해, 공간(전자 통신)이나 시간(기억 장치) 속에서 송신된 자료의 무결성을 보호하는 단순한 방법이다.

- HTTP3는 UDP를 사용하며, 이미 여러 기능이 구현된 TCP 보다는 하얀 도화지처럼 커스터마이징이 가능하다는 장점이 있다.

<br>
<br>

#### 1-3. HTTP

---

- HTTP(HyperText Transfer Protocol)는 W3 상에서 정보를 주고받을 수 있는 프로토콜이다. 주로 TCP를 사용하고 HTTP/3 부터는 UDP를 사용하고 있다.
- HTTP는 다음과 같은 특징을 갖는다.

  - **클라이언트 서버 구조** : 클라이언트가 서버에 요청을 보내면 서버는 그에 대한 응답을 보내는 클라이언트 서버 구조이다.

    ![스크린샷, 2021-10-26 20-18-58](https://user-images.githubusercontent.com/83164003/138867669-7a214209-dd9a-4900-ae20-789a74310f60.png)

  - **무상태 프로토콜(Stateless)** : HTTP에서는 서버가 클라이언트의 상태를 보존하지 않는 무상태 프로토콜이다. (무상태성을 보완하기 위하여 나온게 브라우저 상태를 유지할 수 있게 하는 쿠키, 세션, 토큰.. 등 이다.)
  - **비연결성(Connectionless)** : 비 연결성을 가지는 HTTP에서는 실제로 요청을 주고 받을 때만 연결을 유지하고, 응답을 주고나면 TCP/IP 연결을 끊는다. 이를 통해 최소한의 자원으로 서버 유지를 가능하게 한다.

<br>
<br>

### 2. HTTP 헤더

---

HTTP 헤더는 HTTP 전송에 필요한 모든 부가정보를 (메시지 바디의 내용, 바디의 크기, 압축, 인증, 요청 클라이언트, 서버 정보, 캐시 관리 정보 등) 넣는 영역이다.

<br>
<br>

#### 2-1. 표현 헤더(Representation Headers)

---

![스크린샷, 2021-10-26 20-38-42](https://user-images.githubusercontent.com/83164003/138870358-1a07dcc6-27c6-4135-9a9c-363b012ea17d.png)

- 과거의 헤더는 위와 같이 분류하였다. 하지만 이런 엔티티 헤더 스펙은 1999년 RFC2616 스펙에서 나온 스펙인데, 이 스펙은 2014년 RFC7230~7235가 등장하면서 폐기된다.

  그 이후 엔티티라는 표현은 표현이라는 용어가 사용된다.

  > Entity 헤더: 엔티티 바디 정보로 컨텐츠 타입이나 길이같은 메세지 바디에 들어가는 내용에 관련된 헤더가 들어가는 헤더

  ![스크린샷, 2021-10-26 20-39-30](https://user-images.githubusercontent.com/83164003/138870447-1665c3d1-779a-46ac-aac2-0946d78200c7.png)

  현재의 헤더는 왜 엔티티를 표현이라고 바꿔서 말하는 것일까? 예를들어 회원 조회 내역을 응답할 때 이를 HTML로 표현할 수도 있고, JSON으로 표현해 전달할 수도 있다. 그래서 이렇게 실제 전달하는 것을 표현이라고 용어를 정의했다.

<br>
<br>

##### 표현

---

- 회원이라는 리소스가 있을 때 이를 HTML 혹은 JSON으로 전달할 것인지는 클라이언트와 서버간에 송/수신할 때 이 리소스를 무엇으로 표현할지 알려주고, 표현한다.
- 다음은 표현 데이터의 형식, 압축 방식, 자연 언어, 길이등을 설명하는 헤더이다.

  ![스크린샷, 2021-10-26 20-46-57](https://user-images.githubusercontent.com/83164003/138871569-6945463f-309a-4e69-bc1a-a011bf99a84b.png)

  - **Cotent-Type** : 표현 데이터의 형식

    ![스크린샷, 2021-10-26 20-51-31](https://user-images.githubusercontent.com/83164003/138872131-8f749694-5cd3-4eeb-ab92-71675be97d56.png)

  - **Cotent-Encoding** : 표현 데이터의 압축 방식

    ![스크린샷, 2021-10-26 20-52-01](https://user-images.githubusercontent.com/83164003/138872204-ed2e6c79-6a6c-46e3-8060-414cfedd1330.png)

  - **Cotent-Language** : 표현 데이터의 자연 언어

    ![스크린샷, 2021-10-26 20-52-51](https://user-images.githubusercontent.com/83164003/138872327-df90b55d-19d8-4806-8917-d6e10efcd19d.png)

  - **Cotent-Length** : 표현 데이터의 길이

    ![스크린샷, 2021-10-26 20-53-20](https://user-images.githubusercontent.com/83164003/138872369-34b500e2-5ccb-4f81-9188-0518f2a21c77.png)

  - 표현 헤더는 요청, 응답 둘 다 사용한다.

<br>
<br>

#### 2-2. HTTP 주요 헤더

---

![jkpVF5HFF-1622794687505](https://user-images.githubusercontent.com/83164003/138873301-e2f39ab6-300b-4570-a959-9b22aff92e6a.png)

<br>
<br>

##### 요청(Request)에서 사용되는 헤더

---

- **From** : 유저 에이전트의 이메일 정보.

  - 일반적으로 잘 사용하지 않는다.
  - 검색 엔진에서 주로 사용한다.

- **Referer** (referrer의 오탈자이지만 스펙으로 굳어짐): 현재 요청된 페이지의 이전 웹 페이지 주소.

  - A → B로 이동하는 경우 B를 요청할 때 Referer: A 를 포함해서 요청한다.
  - Referer 를 사용하면 유입경로 수집 가능하다.

- **User-Agent** : 유저 에이전트 애플리케이션 정보(웹 브라우저 정보, 등등).

  - 통계 정보를 나타낼 수 있다.
  - 어떤 종류의 브라우저에서 장애가 발생하는지 파악이 가능하다.

- **Host** : 요청한 호스트 정보(도메인).

  - 하나의 서버가 여러 도메인을 처리해야 할 때 호스트 정보를 명시하기 위해 사용한다.
  - 하나의 IP 주소에 여러 도메인이 적용되어 있을 때 호스트 정보를 명시하기 위해 사용한다.

- **Origin** : 서버로 POST 요청을 보낼 때, 요청을 시작한 주소를 나타냄

  - 여기서 요청을 보낸 주소와 받는 주소가 다르면 CORS 에러가 발생한다.
  - 응답 헤더의 Access-Control-Allow-Origin와 관련있다.

- **Authorization** : 인증 토큰(`ex) JWT`)을 서버로 보낼 때 사용하는 헤더.

<br>
<br>

##### 응답(Response)에서 사용되는 헤더

---

- **Server** : 요청을 처리하는 ORIGIN 서버의 소프트웨어 정보.

- **Date** : 메시지가 발생한 날짜와 시간.

- **Location** : 페이지 리디렉션.

  - 웹 브라우저는 3xx 응답의 결과에 `Location` 헤더가 있으면, `Location` 위치로 리다이렉트(자동 이동)
  - 201(Created): `Location` 값은 요청에 의해 생성된 리소스 URI.
  - 3xx(Redirection): `Location` 값은 요청을 자동으로 리디렉션하기 위한 대상 리소스를 가리킨다.

- **Allow** : 허용 가능한 HTTP 메서드. `ex) Allow: GET, HEAD, PUT`

- **Retry-After** : 유저 에이전트가 다음 요청을 하기까지 기다려야 하는 시간.

<br>
<br>

#### 2-3. 콘텐츠 협상 헤더

---

- 클라이언트가 선호하는 표현 요청

- 클라이언트와 서버간에 클라이언트가 원하는 우선순위대로 맞춰서 서버에서 되는대로 표현 데이터를 만들어 주는 것, 클라이언트에서 요청시에만 작성하는 것이기에 요청에만 사용한다.

  - **Accept** : 클라이언트가 선호하는 미디어 타입 전달.
  - **Accept_Charset** : 클라이언트가 선호하는 문자 인코딩.
  - **Accept-Encoding** : 클라이언트가 선호하는 압축 인코딩.
  - **Accept-Language** : 클라이언트가 선호하는 자연 언어.

<br>
<br>

##### 콘텐츠 협상 예시

---

**Accept-Language 적용 전**

![스크린샷, 2021-10-26 21-18-48](https://user-images.githubusercontent.com/83164003/138877538-fb4edfd0-6732-4949-a520-b8c8e7acbb6f.png)

- 한국어 브라우저에서 특정 웹사이트에 접속했을 때 콘텐츠 협상(Accept-Language)이 안되있을 경우, 서버에서는 딱히 우선순위같은게 없기에 기본언어로 설정된 영어로 응답한다.

**Accept-Language 적용 전**

![스크린샷, 2021-10-26 21-18-57](https://user-images.githubusercontent.com/83164003/138877543-baae5d62-db0c-4c2c-9229-b01481cf0306.png)

- 클라이언트에서 Accept-Language로 KO를 작성해 요청하면 서버에서는 해당 우선순위 언어를 지원할 수 있기 때문에 해당 언어인 한국어로 된 응답을 작성해 반환해준다.

**Accept-Language 복잡한 예시**

위처럼 지원하는 언어를 요청하는 단순한 경우라면 문제가 없다. 하지만, 서버에서 지원하는 언어가 여러개인데 내가 최우선으로 선호하는 언어는 적용되지 않는다면 어떻게 해야하는가?

![스크린샷, 2021-10-26 21-23-15](https://user-images.githubusercontent.com/83164003/138878111-0ae50979-b0e4-46ff-ae13-a6d2d4e668bd.png)

- 클라이언트에서는 한국어를 선호하기에 Accept-Language에 한국어를 요청했다.
- 하지만 서버에서는 한국어를 지원하지 않는상황이고 기본 언어는 독일어로 되어있다.
- 클라이언트에서는 독일어는 너무 어렵기 때문에 한국어가 안되면 영어라도 나오길 바란다면? ➡ 우선순위를 사용해야 한다.

<br>
<br>

##### 협상과 우선순위

---

**Quality Values(q)**

![스크린샷, 2021-10-26 21-28-25](https://user-images.githubusercontent.com/83164003/138878896-e7980921-32b7-4e93-a045-687560ce1e0e.png)

- Quality Values(q) 값 사용

- 0~1, 1에 가까울수록(클수록) 높은 우선순위를 가진다.

- 생략하면 1

- Accept-Language: ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7

  1. ko-KR;q=1 (q생략)
  2. ko;q=0.9
  3. en-US;q=0.8
  4. en:q=0.7

**Accept-Language 복잡한 예시 ➡ 우선 순위 적용 후**

![스크린샷, 2021-10-26 21-30-09](https://user-images.githubusercontent.com/83164003/138879224-fcae9330-814e-4729-a32a-679e603d7a13.png)

- 1순위인 한국어를 서버에서는 지원하지 않는다.

- 2순위인 영어를 서버에서는 지원한다.

- 서버에서는 우선순위에있는 영어를 독일어보다 선호하기에 영어로 응답한다.

<br>
<br>

### 3. 웹 캐시

---

<br>
<br>

#### 3-1. 캐시의 기본 원리 및 적용

---

<br>
<br>

1. 캐시가 없을 때

   - **첫번째 요청**

     ![스크린샷, 2021-10-26 21-33-56](https://user-images.githubusercontent.com/83164003/138879750-b4fa393c-289e-4794-8b51-2105eec6410e.png)

     - 클라이언트에서 star.jpg 이미지를 요청한다.
     - 서버에서는 해당 이미지가 있으면 응답을 줘야하는데, 이미지의 HTTP 헤더+바디를 합쳐 대략 1.1M정도 용량의 데이터를 응답한다.
     - 클라이언트에서는 해당 이미지를 응답 받아 사용한다.

   - **두번째 요청**

     ![스크린샷, 2021-10-26 21-35-40](https://user-images.githubusercontent.com/83164003/138879976-76d661e6-55aa-4cc8-9822-0fcd11698828.png)

     - 클라이언트에서는 star.jpg 이미지를 다시 한 번 요청한다.
     - 서버에서는 동일한 이미지를 다시 1.1M정도 용량의 데이터를 응답해준다.
     - 클라이언트에서는 해당 이미지를 응답 받아 사용한다.

       > **동일한 이미지를 요청하는데 네트워크를 통해 같은 데이터를 또 다운받아야 한다. 용량이 클 수록 비용이 커지고 브라우저의 로딩속도가 느려진다.**

<br>
<br>

2. 캐시가 적용되었을 때

   - **첫번째 요청**

     ![스크린샷, 2021-10-26 21-39-44](https://user-images.githubusercontent.com/83164003/138880693-1f0ea555-8be9-45c0-8245-b87b5738278d.png)

     - 헤더에 `cache-controll` 속성을 넣어주어 캐시가 유효한 시간을 넣어준다.

     - 위에서는 60초로 설정해 60초 동안은 해당 캐시가 유효하다는 의미다.

   - **두번째 요청**

     ![스크린샷, 2021-10-26 21-41-46](https://user-images.githubusercontent.com/83164003/138880874-7fb81ffa-9ee1-42da-b384-a0a58d743814.png)

     - 두 번째 요청할때는 우선 캐시를 조회한다.

     - 캐시가 존재하고 아직 60초 이내이기에 유효한 캐시가 있어서 해당 캐시에서 자료를 가져온다.

     - 유효시간이 초과된다면? ➡ 이 경우에는 다시 서버에 요청을하고 60초간 유효한 star.jpg 이미지를 응답받아서 캐시를 업데이트 해준다. 이때 다시 네트워크 다운로드는 발생한다.

       > **캐시 덕분에 캐시 가능 시간동안 네트워크를 사용하지 않아도 되어서 비싼 네트워크 사용량을 줄일 수 있다.**
       >
       > **또한 브라우저 로딩 속도가 매우 빠르므로 사용자는 매우 빠른 경험을 할 수 있다.**

<br>
<br>

#### 3-2. 캐시 검증 헤더와 조건부 요청

---

- 캐시 유효 시간이 초과해 서버에 다시 요청하면 다음과 같은 상황이 생긴다.

  1. 서버에서 기존 데이터를 변경한 경우 (노란색 별이 초록색 별이 된 경우)
  2. 서버에서 기존데이터가 변경되지 않은 경우

- 캐시 만료후에도 서버에서 데이터를 변경하지 않은 경우 서버에서 동일한 데이터를 요청해서 응답받는 것은 여러모로 비용낭비다.

- 이럴때는 저장해 둔 캐시를 재사용 할 수 있는지 검증(클라이언트의 데이터와 서버의 데이터가 동일한지)하는 작업이 필요하다. 그래서 검증 헤더가 들어가게 된다.

<br>
<br>

##### Last-Modify & If-Modified-Since

---

**첫번째 요청**

- 검증 헤더 Last Modified를 이용해 캐시의 수정시간을 알 수 있다.

  ![스크린샷, 2021-10-26 22-15-12](https://user-images.githubusercontent.com/83164003/138886457-e489818a-7c80-42d4-92b2-42786fbef4f9.png)

  Last Modified는 데이터가 마지막으로 수정된 시간정보를 헤더에 포함하므로, 이로 인해 응답 결과를 캐시에 저장할 때 데이터 최종 수정일도 저장된다.

**두번째 요청**

- 캐시 시간이 초과해서 다시 요청을 해야하는데, 캐시에 최종 수정일 정보(Last-Modified)가 있다면 요청 헤더에 if-modified-since에 해당 날짜를 담아서 서버에 보낸다.

  ![스크린샷, 2021-10-26 22-15-21](https://user-images.githubusercontent.com/83164003/138886462-bb959554-9b0c-4c3b-a292-9a1d180db54c.png)

- 서버의 해당 자료의 최종 수정일과 비교해서 데이터가 수정이 안되었을 경우 응답 메세지에 이를 담아서 알려준다.

  ![스크린샷, 2021-10-26 22-15-29](https://user-images.githubusercontent.com/83164003/138886464-a8b0e1b1-b3ab-45d0-8b7d-91abd702c4d0.png)

  - HTTP Body는 응답 데이터에 없다.

  - 상태코드는 304 Not Modified로 변경된것이 없다는 것을 알린다.

  - 그래서 전송 데이터는 바디가 빠졌기에 헤더만 포함된 0.1M만 전송된다.

  - 클라이언트에서는 해당 응답을 받은 뒤 캐시를 갱신해주고 다시 일정시간(60초) 유효하게 된다.

<br>
<br>

##### Last-Modify & If-Modified-Since 정리

---

- 캐시 유효 시간이 초과해도, 서버의 데이터가 갱신되지 않으면

- 304 Not Modified + 헤더 메타 정보만 응답한다.

- 클라이언트는 서버가 보낸 응답 헤더 정보로 캐시의 메타 정보를 갱신한다.

- 클라이언트는 캐시에 저장되어 있는 데이터 재활용

- 결과적으로 네트워크 다운로드가 발생하지만 용량이 적은 헤더 정보만
  다운로드받으면 된다.

- 매우 실용적인 해결책

<br>
<br>

##### Last-Modify & If-Modified-Since 단점

---

- 1초 미만(0.x초)단위로 캐시 조정이 불가능하다.

- 날짜 기반의 로직을 사용한다.

- 데이터를 수정해 날짜가 다르지만, 같은 데이터를 수정해 데이터 결과가 똑같은 경우

  - test.txt 파일의 내용을 A→B로 수정했지만, 다시 B→ A로 수정한 경우

- 서버에서 별도의 캐시 로직을 관리하고 싶은 경우 `ex) 스페이스나 주석처럼 크게 영향이 없는 변경에서 캐시를 유지하고 싶은 경우`

<br>
<br>

##### ETag & If-None-Match

---

서버에서 완전히 캐시를 컨트롤하고 싶은 경우 ETag 를 사용하면 된다.

- ETag(Entity Tag)
- 캐시용 데이터에 임의의 고유한 버전 이름을 달아둔다
  - `ETag: "v1.0"`, `ETag: "a2jiodwjekjl3"`
- 데이터가 변경되면 이 이름을 바꾸어서 변경한다(Hash를 다시 생성).
  - `ETag:"aaaa"` → `ETag:"bbbb"`
- 단순하게 ETag만 보내서 같으면 유지하고 바르면 다시 받는다.

**첫번째 요청**

![스크린샷, 2021-10-26 22-14-12](https://user-images.githubusercontent.com/83164003/138886233-64fc3134-695c-4705-b97d-42d77c6f8903.png)

- 헤더에 ETag 를 작성해서 응답해준다.
- 클라이언트의 캐시에선 ETag 값을 저장한다.

---

**두번째 요청**

![스크린샷, 2021-10-26 22-20-03](https://user-images.githubusercontent.com/83164003/138887262-4c8d0b7a-f625-4826-af02-68c3aa2484e8.png)

- 캐시시간이 초과되서 다시 요청을 해야하는 경우이다.
- 이때 `If-None-Match`를 요청 헤더에 작성해서 보낸다.

![스크린샷, 2021-10-26 22-21-17](https://user-images.githubusercontent.com/83164003/138887454-484b71b1-a651-4ec9-abfe-0d1acd260aae.png)

- 서버에서 데이터가 변경되지 않았을 경우 ETag는 동일하다. 그래서 `If-None-Match`는 실패다.
- 이 경우 서버에서는 `304 Not Modified`를 응답하며 이때 역시 `HTTP Body`는 없다.
- 브라우저 캐시에서는 응답 결과를 재사용하고 헤더 데이터를 갱신한다.

<br>
<br>

##### ETag & If-None-Match 정리

---

- `ETag`만 서버에 보내 동일하면 유지하고 다르면 다시 받는다.

- 캐시 제어 로직을 서버에서 관리한다.

- 클라이언트는 단순하게 이 값을 서버에 제공한다

- 캐시 매커니즘을 알 필요가 없다.

  > ex) 서버는 베타 오픈 기간 3일간 파일이 변경되어도 ETag를 동일하게 유지`, `ex) 애플리케이션 배포 주기에 맞춰서 ETag를 모두 갱신

<br>
<br>

#### 3-3. 프록시 캐시

---

<br>
<br>

##### 프록시 서버란?

---

![스크린샷, 2021-10-26 22-25-10](https://user-images.githubusercontent.com/83164003/138888150-e92df970-4c33-4d3a-a104-35960a7b4fed.png)

- 프록시란, 클라이언트와 서버 사이에 대리로 통신을 수행하는 것을 가리켜 ‘프록시(Proxy)’, 그 중계 기능을 하는 서버를 프록시 서버라고 한다.
- 클라이언트, 혹은 반대로는 서버가 다른 네트워크에 간접적으로 접속 할 수 있기 때문에, 보안, 캐싱을 통한 성능, 트래픽 분산 등의 장점을 가진다.

<br>
<br>

##### 프록시 캐시

---

![스크린샷, 2021-10-27 01-42-22](https://user-images.githubusercontent.com/83164003/138923590-3920ba4f-caa1-4a20-8bd6-c53f850a9ed3.png)

- 한국에있는 클라이언트에서 **별 이미지**가 필요한상황인데 해당 이미지의 원서버가 미국에 있다고 가정해보자.

- 한국에서 미국까지 직접 접근하여 이미지를 가져오는데 0.5초가량 걸린다고하면 여러 클라이언트는 모두 0.5초 가량을 기다려야 해당 이미지를 받을 수 있다. 이것도 매우 긍정적인 상황이고 실제로는 더 많은 시간이 걸릴 수 있다.

- 하지만 우리는 유튜브와 같은 해외 사이트에서 위와 같은 불편한 없이 빠르게 영상을 시청할 수 있다. 그러한 불편함을 **프록시 캐시**가 해소해주기 때문이다.

![스크린샷, 2021-10-27 01-44-56](https://user-images.githubusercontent.com/83164003/138923932-d6913f7a-11de-43e5-a3f3-c2428eeb240b.png)

- 한국에 프록시 캐시서버를 두고 한국의 클라이언트는 프록시 캐시서버를 통해 자료를 가져오도록 한다.

- 여러 사람이 찾은 자료일수록 이미 캐시에 등록되어있기에 빠른 속도로 자료를 가져올 수 있다.

- 클라이언트에서 사용되고 저장되는 캐시를 private 캐시라 하고 프록시 캐시서버의 캐시를 public 캐시라 한다.

<br>
<br>

##### 캐시 무효화

---

- 클라이언트가 캐시를 적용하지 않아도 임의로 브라우저가 캐시를 적용하는 경우, 특정 페이지에서 캐시가 되면 안되는 정보 `ex) 통장 잔고`가 있다면 캐시 무효화를 통해 이를 무효화 할 수 있다.

```javascript
Cache-Control: no-cache, no-store, must-revalidate
Pragma: no-cache
```

<br>
<br>

## 🤔 Understanding

- 어제 배운보다 더욱 더 공학스러운.. 내용이었다. 짧은 학습과정에 OSI 7 Layer 라던지 TCP/IP 프로토콜을 모두 이해하며 HTTP 메시지를 패킷으로 주고받으며 .. 등등 내용을 모두 이해하긴 불가능에 가깝다 생각한다.

- 일단 내가 설계하는 프로그램이 어떠한 구조로 데이터들을 주고받으며 그 주고받을때 쓰이는 통신규약은 어떠한 구조로 이뤄져 있는지 살펴본 느낌이다.

  어제와 같은 맥락으로 **공학**이기 때문에 어떠한 한 학문이다 생각한다.

  이러한 지식이 밑바탕 된 후 프로그램을 설계한다면 더욱더 효율적이고 잘 설계된 프로그래밍을 할 수 있을거란 생각은 든다.

<br>
<br>

```toc

```
