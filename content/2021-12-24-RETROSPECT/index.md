---
emoji: 🤔
title: 코드스테이츠 First Project [6699] 회고
date: '2021-12-24'
author: JH8459
categories: Retrospect
---

![header](https://capsule-render.vercel.app/api?type=soft&color=6F777D&height=100&section=header)

<br>
<br>

<center><img src="https://user-images.githubusercontent.com/83164003/156319069-09fc20f8-e777-48ee-ab32-f9c194c68f93.png"/><br><br><span style="font-size: 1em; color: #6F777D;"><b>[6699]</b></span> 목표와 다짐들을 글로 적고 실천하며
<br>소통하는 동기부여 커뮤니티 ✍️</center><br>

<br>
<br>

## 🤔 First Project 회고

---

- 12.10 ~ 12.24 2주 기간동안 코드스테이츠 34기 정규과정은 끝마치고 조그만 규모의 첫번째 프로젝트를 완성하였다.

  백엔드 포지션으로 참여하는 동안 기획은 어떻게? 어떤 작업을 하였고 또 그 과정에서 어떤 부분에서 고민을 경험했는지 글로 남겨보려 한다.

  우선 완성된 프로젝트 ~~링크(도메인은 현재 내려갔습니다.)~~ 와 Gihub 저장소 링크 그리고 프로젝트 안내 문서의 링크는 아래와 같다.

<br>
<br>

**<center><a href="https://daily6699.co.kr/" target="_blank" style="text-decoration:none"><del><span style="font-size: 1em; color: #6F777D;">&#160;👉 6699 바로가기&#160;</span></del></a></center>**

**<center><a href="https://github.com/codestates/6699" target="_blank" style="text-decoration:none"><span style="font-size: 1em; color: #6F777D;">&#160;👉 Github 바로가기&#160;</span></a></center>**

**<center><a href="https://blog.jh8459.com/2021-12-25-PROJECT/" target="_blank" style="text-decoration:none"><span style="font-size: 1em; color: #6F777D;">&#160;👉 Blog 바로가기&#160;</span></a></center>**

<br>
<br>

### 기획

---

- 실제 프로젝트 기간은 팀원선정과 기획단계와 개발과정을 모두 합쳐 2주가 주어졌지만, 우리는 HA3 진행 전 마음이 맞는 팀원을 구해 기획을 우선적으로 틈틈히 진행하고있었다.

  왜냐하면, 선배 기수들에게 항상 들었던 말 때문이다.

  <br>
  <br>
    
    <center><b>"시간이 너무나 부족하다.."</b></center>
    
  <br>
  <br>

  덕분에 좋은 팀원들과 함께 프로젝트를 진행할 수 있었다.

  <br>
  <br>

- 혹시 코드스테이츠를 수료중이시거나, 부트캠프로 코드스테이츠로 선택하신분들이 이 글을 본다면 프로젝트 4인 구성의 팀원은 미리미리 스터디활동이나 페어 프로그래밍중 마음에 맞는 분이 있다면 연락을 통해 미리 구하시는걸 **강력히** 추천 드립니다.

<br>
<br>

### 선정되지 못한 주제들과 이유

---

- 지금 다시 보니 재밌는 주제들이 많이 나왔던거 같다.

- **21.11.19** 주제선정을 위해 아이디어 회의를 기록한 내용중 선정되지 못했던 주제들을 찾아보았다.

  ![스크린샷, 2022-03-02 17-36-36](https://user-images.githubusercontent.com/83164003/156325296-975fab84-f599-4a4d-bd7e-20ed70c9434a.png)

<br>
<br>

- 여러 의견이 나왔고 그중 팀원들이 입을 모아 얘기한건 **"CRUD에 중점을 둔 서비스 개발"** 이었다.

  CRUD가 가능한 게시판을 만들어보자가 목표였으며, 그 안의 담길 주제는 명언을 보며 되새김질할 수 있는 자기개발 인증 사이트를 만들어보기로 하였다.

  그리하여 현재 <span style="font-size: 1em; color: #6F777D;"><b>6699</b></span>의 주제가 선정되었다.

<br>
<br>

### 프로젝트 레이아웃과 이름 선정

---

- 주제 선정을 마치고 나서 웹사이트 디자인에 대해서 논의를 시작하였다.

- 컨셉만 우선 그려보았으며 웹 사이트의 컨셉은 아래와 같다.

<br><img src="https://user-images.githubusercontent.com/83164003/156327426-9626b59b-c1a9-45ba-b12c-692ea20fe9a8.png"/><br><br>
<img src="https://user-images.githubusercontent.com/83164003/156327662-0b5ef4c1-b561-4329-928d-a1f0dafc574a.png"/><br><br>

- 글/명언에 관련된 주제이기 때문에 메인 컬러로 쓰일 색상은 흰색과 검정색이 선정되었으며, 말따옴표를 텍스트로 형상화면 **6699**와 유사하다는 점에서 착안하여 서비스할 프로젝트의 이름으로 선정하였다.

<br>
<br>

### 개발과정

---

- 우선 잘 만들고 화려하게 만드는것도 좋지만 첫번째 프로젝트이다 보니, 외부 라이브러리등은 최소화하고 코드스테이츠에서 배운 과정으로 `JavaScript`만 사용하여 Vanilla JS로 개발하였다.

- 매일 AM 09:00 ~ PM 18:00 이후 2시간의 자유시간을 갖고 PM 20:00~ ... 보통 AM 03:00에 마쳤으나, 마지막 발표를 앞둔 시점에서는 해뜨면 잠깐 2시간? 정도 쪽잠을 잔거같다.

  정말 주말도 없이 정신없이 모니터만 보고 코드를 짠거 같다.

  코딩을 배운 이래 처음으로 온전히 몰두할 수 있던 경험을 겪어보았으며, 라이브러리 없이 순수하게 `JavaScript` 언어만 사용하여 서버와 클라이언트 개발 경험을 가져보았다.

<br>
<br>

### 아쉬운 점

---

- 사실 이번 프로젝트는 최초 기획한대로 완성하지 못하였다.

  1. 배포 자동화 실패 (수동 배포)

  2. AWS 사용 미숙으로 설정 오류

     > RDS와 EC2 리전을 북미로 설정 😅

  3. 최초 기획한 기능 구현 실패

     > 댓글 관련 CRUD 기능 구현 실패 😇

<br>

- 우선 기획한 기능을 모두 구현하지 못하였다. ~~(특히 댓글 기능은 아예 손 대지 못하였다.)~~

  또한 배포는 성공하였지만 잘못된 리전설정(북미..😅)으로 인해 속도가 굉장히 저하되는 이슈가 있어서 프로젝트 발표는 로컬환경으로 대신 진행하게되었다.

- 이 실패의 경험을 기반으로 파이널 프로젝트는 문제없이 완수해야겠다.

<br>
<br>

### 개선하고 성장할 점

---

- 우선 AWS 배포쪽을 공부를 더 해서 4주 프로젝트는 꼭 배포 자동화를 도전하고 싶다.

- 또한 이번 프로젝트를 진행하며 소셜 로그인도 기능적으로 구현 해보지 못하였으며 회원가입 등 개인정보를 다룰 때, 보안적인 측면은 고려를 해본적이 없다...😅

- 다음 프로젝트땐 꼭 위 두가지는 개선해봐야겠다. 또한, 기회가 된다면 6699 프로젝트도 리팩토링 과정을 거쳐 기획한 사이즈만큼은 완성해보고 싶다.

<br>
<br>

![Footer](https://capsule-render.vercel.app/api?type=soft&color=6F777D&height=100&section=footer)

<br>
<br>

```toc

```
