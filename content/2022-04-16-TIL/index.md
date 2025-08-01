---
emoji: 📚
title: '따라하며 배우는 Nest JS #4'
date: '2022-04-16'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 인프런의 <a href="https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4" target="_blank">따라하며 배우는 NestJS</a>를 들으며 배운점을 남기고 있다.

- 일전의 <a href="https://blog.jh8459.com/2022-04-13-TIL/" target="_blank">#1</a>, <a href="https://blog.jh8459.com/2022-04-14-TIL/" target="_blank">#2</a>, <a href="https://blog.jh8459.com/2022-04-15-TIL/" target="_blank">#3</a>에서 기초 개념을 학습을 진행했으며 그를 토대로 기본적인 CRUD를 위한 실습또한 함께 진행중이다.

- 오늘은 기존 실습한 내용을 주석을 달아가며 복습하였다.

- 해당 코드 내용은 아래에 첨부한다.

  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/c6390d62e699cdecc62ad125ab580db33fdfd31e/src/boards/board.model.ts" target="_blank">Board Model 정의하기</a>
  >
  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/3761bb7f6794f7a896142cbf656b8d95f07665b9/src/boards/boards.controller.ts" target="_blank">게시물 생성하기</a>

- 그리고 DTO에 대한 내용을 학습한 내용을 간단히 정리하였다.

<br>
<br>

### 1. DTO(Data Transfer Object)란?

---

- 계층간 데이터 교환을 위한 객체이다.

  DB에서 데이터를 얻어 Service나 Controller 등으로 보낼 때 사용하는 객체를 일컫는다.

- 또한 DTO는 데이터가 네트워크를 통해 전송되는 방법을 정의하는 객체이다.

- 이러한 DTO는 interface나 **class**를 이용하여 정의 할 수 있다.

  > NestJS 공식문서에서는 클래스를 이용하는 것을 권장하고 있다.

<br>
<br>

### 2. DTO를 쓰는 이유는 무엇인가?

---

1. 데이터 유효성을 효율적으로 검사한다.

2. 코드를 보다 더 안정적으로 만들 수 있다.

3. TypeScript의 타입으로도 사용된다.

<br>
<br>

- 예로들면 `POST` 요청 메소드로 간단한 게시글을 생성하는 웹 브라우저의 요청이 있다고 가정해보자.

- 그렇다면 `Body`로 전달받은 "게시글 제목", "게시글 내용" 정도의 Property를 몇군데에서만 사용하겠지만, 실무에서 규모가 큰 프로젝트일 경우 정말 많은 프로퍼티를 여러군데에서 이용할 수도 있다.

- 만약 그렇게 많은 곳에서 쓰이는 프로퍼티의 이름을 일괄적으로 바꿔줘야 한다면 해당 프로퍼티를 쓰는 모든 곳의 프로퍼티를 일일히 바꿔줘야하는 불편함이 발생할 수 있다.

- 이러한 경우에 DTO를 사용해서 이러한 불편함을 해소할 수 있다.

<br>
<br>

## 🤔 Understanding

- 우선 오늘은 DTO에 대해서 알아만 보았다.

- "왜 쓰이는가?"에 대해서는 어느정도 수긍할 수 있다.

  하지만 실제로 눈으로 보며 이해하는 과정을 거쳐야 확실해 질 듯 하다.

- 내일은 실제로 게시물 생성을 위한 DTO를 사용해보며 직접 코드로 구현해보는 시간을 가져야 할 듯하다.

<br>
<br>

```toc

```
