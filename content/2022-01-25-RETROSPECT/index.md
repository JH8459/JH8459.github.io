---
emoji: 🤔
title: 코드스테이츠 Final Project [ALL-CON] 회고
date: '2022-01-25'
author: JH8459
categories: Retrospect
---

![header](https://capsule-render.vercel.app/api?type=soft&color=FFCE63&height=100&section=header)

<br>
<br>

<center><a href="https://all-con.kr/" target="_blank" style="text-decoration:none"><img src="https://user-images.githubusercontent.com/83164003/152898834-c2e127a6-9431-4841-a6d0-21f532b7b07e.png"/></a><br><br><span style="font-size: 1em; color: #FFCE63;"><b>[ALL-CON]</b></span> 콘서트 예매정보부터 친구까지 찾아주는<br><br>콘서트 종합 정보 플랫폼 🎟️</center><br>

<br>
<br>

## 🤔 Final Project 회고

- 코드스테이츠 34기 마지막 과정인 파이널 프로젝트를 백엔드 포지션으로 마무리하며, 기획은 어떻게? 어떤 작업을 하였고 또 그 과정에서 어떤 부분에서 고민을 경험했는지 글로 남겨보려 한다.

  우선 완성된 프로젝트 ~~링크(도메인은 현재 내려갔습니다.)~~ 와 Gihub 저장소 링크 그리고 프로젝트 안내 문서의 링크는 아래와 같다.

<br>
<br>

**<center><a href="https://all-con.kr/" target="_blank" style="text-decoration:none"><del><span style="font-size: 1em; color: #FFCE63;">&#160;👉 ALL-CON 바로가기&#160;</span></del></a></center>**

**<center><a href="https://github.com/codestates/ALL-CON" target="_blank" style="text-decoration:none"><span style="font-size: 1em; color: #FFCE63;">&#160;👉 Github 바로가기&#160;</span></a></center>**

**<center><a href="https://blog.jh8459.com/2022.01.26-PROJECT/" target="_blank" style="text-decoration:none"><span style="font-size: 1em; color: #FFCE63;">&#160;👉 Blog 바로가기&#160;</span></a></center>**

<br>
<br>

### 기획

---

- 기획단계는 1주일 정도 걸렸다.

  사실 기획은 팀원 모두 전문 분야가 아니기 때문에 다들 많이 미숙했지만, 새벽 늦은시간까지 머리를 함께 맞대어 최선의 결과가 나온거라 생각한다.

- 다만 First Project에서 한번 겪었던 만큼, 서비스 주제 선정은 너무 지체되지 않게끔 진행하였고 주제에 알맞는 기술들을 추려서 주제를 선정하였다.

<br>
<br>

### 선정되지 못한 주제들과 이유

---

지금 다시 보니 재밌는 주제들이 많이 나왔던거 같다.

- **21.12.27** 주제선정을 위해 아이디어 회의를 기록한 내용중 선정되지 못했던 주제들을 찾아보았다.

![스크린샷, 2022-02-23 16-08-15](https://user-images.githubusercontent.com/83164003/155274828-2699f886-f1e6-4d34-bdf8-bf7c46700814.png)

<br>
<br>

- 여러 의견이 나왔지만 회의 결과 _"너무 위치기반에 중점을 둔 서비스는 피하자!"_ ~~(어떻게 해도 당근마켓 스러워진다..)~~ 였다.

  CRUD에 중점을 둔 서비스는 2주차에 해봤기에 SNS나 게시판 서비스 보다는 색 다른 웹페이지를 만들어 보자는 생각으로 위 4개의 주제들은 모두 탈락하였다.

<br>
<br>

- 그리하여 현재 <span style="font-size: 1em; color: #FFCE63;"><b>ALL-CON</b></span> 과 ~~(유사한)~~ 주제가 선정되었다.

  > 초기 기획은 <a href="https://www.kopis.or.kr/por/main/main.do" target="_blank">KOPIS 공연예술 통합전산망</a>을 이용한 콘서트 정보 안내 사이트였지만.. 주제가 다소 바뀌었다. 이유는 뒤에서 설명하겠다.

<br>
<br>

### 프로젝트 레이아웃 선정

---

- 주제 선정을 마치고 나서 웹사이트 디자인에 대해서 논의를 시작하였고, 여러 레이아웃들이 제시되었었다.

  메인페이지만 추려서 보여주자면 아래와 같다.

  ~~(프로젝트 이름이 정해지지 않은 상태라 이름들도 가지각색이다 😅)~~

  <br>
  <br>

<center><img src="https://user-images.githubusercontent.com/83164003/155278841-3fe06e9f-26d6-42ed-9929-45319db4b31a.png"/></center><br><br>
<center><img src="https://user-images.githubusercontent.com/83164003/155278843-b9e75db6-b1c3-44ce-9458-7567d1784c78.png"/></center><br><br>
<center><img src="https://user-images.githubusercontent.com/83164003/155278846-e33e2d82-a66a-4937-bfde-ebaaf42e2616.png"/></center><br><br>

- 초기에는 캘린더 라이브러리를 사용해서 콘서트 일정을 달력에서 보여줄 생각도 하였으나 시간 문제로 사용을 하지 못하였다. 😭

- 이중 첫번째 레이아웃이 회의 결과 채택이 되었으며, 프론트엔드 두 분이 주도적으로 UI/UX와 메인 컬러로 쓰일 색상을 선정하여 이를 토대로 <a href="https://www.figma.com/" target="_blank">FIGMA</a>에서 프로토타입을 제작하였다.

<br>
<br>

### 서비스 핵심 기술 선정

---

- 이부분이 사실 프로젝스 설계 "Miss" 였다.

- 사실 프론트엔드에서는 First Project에서 `TypeError`를 많이 겪었기에 이번에는

  <img alt="TypeScript" src ="https://img.shields.io/badge/TypeScript-3178C6.svg?&style=for-the-badge&logo=TypeScript&logoColor=white"/>

  를 사용해보고 싶다라는 의견으로 모아졌기 때문에 개발언어만 바꾸어서 서비스 개발에 임하면 되었기에 핵심기술 선정이 어렵진 않았다.

- 문제는 백엔드 서버 설계에서 발생하였다.

  콘서트 정보는 <a href="https://www.kopis.or.kr/por/main/main.do" target="_blank">KOPIS 공연예술 통합전산망</a>에서 가져오면 되겠지? 싶었는데 여기서 1차 문제가 발생한다.

  <br>
  <br>

<center><span style="font-size: 1.5em; color: gray;"><b>"콘서트 정보만 없다..."</b></span></center>
<br>
<br>

- 아뿔사, "공연 / 연극 / 뮤지컬" ... 심지어 "아동"도 있지만 콘서트 정보는 그 어디에서도 찾을 수 없었다..

  주제 선정을 다시해야하나 생각을 했지만, 기술적으로 `Node.js` 라이브러리를 이용하여 **웹 크롤링**을 할 수 있다는 걸 알게되었고 "인터파크 티켓", "YES24" 두 대형 티켓팅 사이트에서 콘서트 정보를 가져오기로 결정하였다.

- 다만, 두 사이트에서 제공하는 자료가 정형화 되지않은 자료이기 때문에 NoSQL인 `MongoDB`를 사용해야하나 고민하였지만, 전처리만 잘해서 DB에 저장한다면 RDBMS로도 충분히 구현이 가능할 듯하여 `MySQL`으로 진행하였다.

- 또한, 해당 사이트에서 가져올 정보들은 매일 특정한 시간에 매일 수행되어야 하므로 `node Schedule`을 통해서 EC2에서 자동화 처리를 구현하였다.

  지금 생각해보니 외부 API가 지원되지 않았기에 오히려 폭넓은 라이브러리를 사용할 수 있던 경험이된것 같다.

<br>
<br>

### 개발과정

---

- 매일 AM 09:00 ~ PM 18:00 이후 2시간의 자유시간을 갖고 PM 20:00~ ... 마감시간은 정하지 않았는데 보통 새벽 3시정도까지 정말 밥만 먹고 화장실가는 시간 외에는 4주간 온전히 몰두하였다.

  덕분에 프로젝트가 끝난 뒤 비타민 D 부족으로 병원신세 지는 팀원분도 발생하였다.. 힘든 과정을 함께 헤쳐나간 팀원들이 자랑스럽다.

- 코드의 컨텍스트를 작성한 방법은 사실 개인의 습관마다 다를 수 있고, 사용하는 문법이 조금씩 다를 수 있으니 이 부분은 생략하도록 하고 개발과정에서 팀 단위로 협업을 해낸 과정을 간략하게 글로 남겨보려 한다.

<br>
<br>

### 집단 지성의 힘

---

- **"정말 이건 참 잘했다! 👍"**

- 만약 프로젝트 기간 동안 우리 팀이 가장 잘한 점을 꼽으라면, 똘똘 뭉쳐 문제점을 해결하는 팀원들의 태도를 꼽겠다.
  <br>
  <br>

<center><span style="font-size: 1.5em; color: gray;"><b>"다들 바쁘지 않을까?"<br>"이런것도 모른다고 생각하지 않을까?"</b></span></center>
<br>
<br>

- 이런 생각을 전혀 하지 못할 만큼 환경이 잘 구성되었던거 같다.

  서로 질문하고 학습한 내용을 매일매일 공유하고, 또한 자신의 코드를 화면공유를 통해서 **_"왜 이런식으로 작성하였고, 어떤 부분에서 막혀 어려움을 겪고 있는지"_** 허물없이 많은 대화를 통해 문제를 해결하였다.

<br>
<br>

### 대충은 없다

---

- 팀원들 모두 욕심이 많아서 그런지 사소한 포인트라도 쉽게 넘어가지 않았다.

<br>
<br>

<center><span style="font-size: 1.5em; color: gray;"><b>"이정도면 됐잖아?"</b></span></center>
<br>
<br>

- 작은 기능이라도 구현을 완성하면 서비스 시연을 팀원들끼리 진행을 하였다.

  바로바로 즉각적인 피드백을 주고받아 개선할 내용들을 바로바로 개선하였고 그 결과, 한결 더 간결한 코드와 높은 완성도를 가진 웹 서비스가 탄생한것 같다.

- 물론 아직 부족한게 많고, 프로젝트가 다 끝난 뒤 보니 아쉬운점이 모든 페이지에서 계속 보이는건 어쩔수 없다.

  다만, 위와같은 과정마저 없었다면 지금보다 더 후회스러운 결과가 나오지 않았을까?

<br>
<br>

### 아쉬운 점

---

- 사실 너무 많다. 해보고 싶었지만 시간 관계상 시도해보지도 못한 목록만 나열해봐도 다음과 같다..

  1. 크롤링 대상 사이트 추가

  2. 예매 대행까지 가능한 결제 플랫폼 도입

  3. 애니메이션 라이브러리로 모두 교체

  4. `soket.io` 기능 추가

  5. 응답속도 개선을 위한 `Redis` 도입

  6. 위치기반 `kakao Map API` 도입, 근처 콘서트 검색

<br>
<br>

- 서비스를 본격적으로 키워 광고도 달아보자 등등.. 너무나도 하고싶은게 많고 현재 배포한 웹사이트는 너무 부족한점이 많다.

  4주라는 시간이 서비스를 제작하는데 얼마나 부족한 시간인지 깨닳았다.

<br>
<br>

### 개선하고 성장할 점

---

- 팀원들과 합의하여 설 연휴를 보낸 뒤 ALL-CON 프로젝트 리팩토링 기간을 1~2주가량 진행해 볼 예정이다.

  기간을 짧게 가져가는 이유는 너무 길게 프로젝트 리팩토링을 위해 가져가기보다는, 다들 주니어 개발자로써 현업에서 커리어를 쌓아가는게 더 중요하다 생각되기 때문에 너무 길지 않게 진행하기로 결정하였다.

- 너무 아쉬웠던 추가로 구현해보고 싶은 기능들이 있다면 구현해보고, 개발기간 동안 아쉬웠던 코드들 혹은 개선을 미뤄뒀던 코드 내용들을 간추려서 리팩토링해 볼 예정이다.

  ~~(기간이 길지 않기 때문에 많은 욕심은 부리지 않으려 한다.)~~

<br>
<br>

## Final Project 리팩토링

**(수정 22.02.18)**

<br>

<details>
<summary>&#160;&#160;자세히보기</summary>

<div markdown="1">

- <a href="https://blog.jh8459.com/2022-02-07-PROJECT/" target="_blank">🛠️ 1일차 - 서버 리팩토링 우선순위 선정</a>

- <a href="https://blog.jh8459.com/2022-02-08-PROJECT/" target="_blank">🛠️ 2일차 - 민감정보 암호화</a>

- <a href="https://blog.jh8459.com/2022-02-09-PROJECT/" target="_blank">🛠️ 3일차 - 하나의 요청에 두개 이상의 응답시 발생하는 에러 핸들링</a>

- <a href="https://blog.jh8459.com/2022-02-10-PROJECT/" target="_blank">🛠️ 4일차 - 유효하지 않은 로그인 상태 검증</a>

- <a href="https://blog.jh8459.com/2022-02-11-PROJECT/" target="_blank">🛠️ 5일차 - Articles 테이블 스키마 수정(1)</a>

- <a href="https://blog.jh8459.com/2022-02-14-PROJECT/" target="_blank">🛠️ 6일차 - Articles 테이블 스키마 수정(2)</a>

- <a href="https://blog.jh8459.com/2022-02-15-PROJECT/" target="_blank">🛠️ 7일차 - 티켓 오픈 임박예정 콘서트 정보만 보여주기</a>

- <a href="https://blog.jh8459.com/2022-02-16-PROJECT/" target="_blank">🛠️ 8일차 - Timezone 수정</a><br>

</div>
</details>

<br>
<br>

![Footer](https://capsule-render.vercel.app/api?type=soft&color=FFCE63&height=100&section=footer)

<br>
<br>

```toc

```
