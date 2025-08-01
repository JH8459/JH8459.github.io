---
emoji: 📚
title: '따라하며 배우는 Nest JS #1'
date: '2022-04-13'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 인프런의 <a href="https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4" target="_blank">따라하며 배우는 NestJS</a>를 들으며 배운점을 남기고 기록해보려고 한다.

- Node.js의 프레임워크인 Nest JS를 학습하며 이해한점을 기록하며 더 나아가 궁금한 부분에 대해서는 찾아보며 스스로 학습한 점에 대해서도 기록으로 남겨보기 위해 포스팅을 남긴다.

<br>
<br>

### 1. Nest JS란?

---

<center><img src="https://user-images.githubusercontent.com/83164003/163203015-0fde777a-fc4d-40df-ac0a-074da15439c1.jpeg" width="50%"/></center><br>

- Nest(Nest JS)는 효율적이고 확장 가능한 Node.js 서버 측 애플리케이션을 구축하기 위한 프레임 워크이다.

- 프로그레시브 JavaScript를 사용하고 TypeScript로 빌드되고 완벽하게 지원하며 (개발자가 순수 JavaScript로 코딩 할 수 있음) OOP(Object Oriented Programming), FP(Functional Programming) 및 FRP(Funtional Reactive Programming) 요소를 사용할 수 있게 해준다.

<br>
<br>

### 2. Nest JS는 내부적으로 어떻게 구성되어 있나?

---

- 내부적으로 Nest는 Express와 같은 강력한 HTTP 서버 프레임 워크를 기본적으로 사용하며 선택적으로 Fastify 프레임 워크를 사용하도록 구성 할 수도 있다. (즉, Nest는 Express를 토대로 만들어졌다 이해 할 수 있다.)

- Nest는 이러한 공통 Node.js 프레임 워크(Express / Fastify) 위에 추상화 수준을 제공하지만 API를 개발자에게 직접 노출한다.

  이를 통해 개발자는 기본 플랫폼에서 사용할 수 있는 수많은 타사 모듈을 자유롭게 사용할 수 있다.

<br>
<br>

### 3. Nest JS의 철학

---

- Node(및 서버 측 JavaScript)를 위한 훌륭한 라이브러리, 도우미 및 도구가 많이 존재하지만 이들 중 어느것도 아키텍쳐의 주요 문제를 효과적으로 해결하지 못한다.

- Nest는 개발자와 팀이 고도로 테스트 가능하고 확장 가능하며 느슨하게 결합되고 유지 관리가 쉬운 애플리케이션을 만들 수 있는 즉시 사용 가능한 애플리케이션 아키텍쳐를 제공해준다.

  이 아키텍쳐는 Angular에서 크게 영감을 받았다.

<br>
<br>

## 🤔 Understanding

- 우선 오늘은 Nest JS의 탄생 배경과 개념에 대해서만 학습하였다.

- 또한 앞으로 Nest JS를 사용하기 위해 Nest JS CLI를 설치 후 `nest new nestjs-test` 명령어로 프로젝트 시작을 위한 기본 구성을 생성 후 구조 파악을 하였다.

- 혼자 공부할때와 다르게 이제 회사에 소속되며 앞으로 업무에 쓰일 기술스택 관련한 강의 수강에 드는 비용은 회사 복지 처리가 가능하게 되었다. 👍

- 시간을 할애하여 강의를 들은 뒤 간략히 포스팅하며 내것으로 만드는 시간을 가질 수 있도록 노력해야겠다.

<br>
<br>

```toc

```
