---
emoji: 📚
title: '따라하며 배우는 Nest JS #6'
date: '2022-04-18'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 인프런의 <a href="https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4" target="_blank">따라하며 배우는 NestJS</a>를 들으며 배운점을 남기고 있다.

- 일전의 <a href="https://blog.jh8459.com/2022-04-17-TIL/" target="_blank">#5</a>에서 파이프에 대한 기초 개념을 학습을 진행했으며 파이프를 이용한 기본적인 유효성 검사및 데이터 변환을 이용한 CRUD 실습또한 함께 진행했다.

- 오늘은 기존 실습한 내용을 주석을 달아가며 복습하였다.

- 해당 코드 내용은 아래에 첨부한다.

  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/3d1602bf88d167e8f5c1cdb5aeb637634a63951b/src/boards/boards.controller.ts" target="_blank">파이프를 이용한 유효성 체크(@UsePipes 핸들러-레벨 파이프)</a>
  >
  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/cf12fc5823fafa7e7858046e408a2b323642caf4/src/boards/boards.service.ts" target="_blank">특정 게시물을 찾을 때 없는 경우 결과 값 처리(NotFoundException)</a>
  >
  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/990a5df43720432d8c851ae54bd7d0162c90290d/src/boards/boards.service.ts" target="_blank">없는 게시물을 지우려 할 때 결과값 처리(deleteBoard 메서드 수정)</a>
  >
  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/f3dce06aff45c5d0503a76144a85c8e7853e00f4/src/boards/pipes/board-status-validation.pipe.ts" target="_blank">커스텀 파이프를 이용한 유효성 체크(board-status-validation.pipe.ts)</a>

- 그리고 기존 실습은 메모리, 즉 `Boards` 배열에 `Board` 값을 넣어 저장하는 형태였다.

- 그렇기에 서버를 껐다 키면 메모리가 날아가는 불편함이 있었기 때문에 DB에 넣는 과정을 학습하였다.

- 그 과정에서 **TypeORM**에 대해 학습한 내용을 남겨보려 한다.

<br>
<br>

### 1. TypeORM이란?

---

- TypeORM은 Node.js에서 실행되고 TypeScript로 작성된 객체 관계형 매퍼 라이브러리이다.

- TypeORM은 MySQL, PostgreSQL, MariaDB, SQLite, MS SQL Server, Oracle, SAP Hana 및 WebSQL과 같은 여러 데이터베이스를 지원한다.

  > ORM(Object Relational Mapping) 이란?
  >
  > 객체와 관계형 데이터베이스의 데이터를 자동으로 변형 및 연결하는 작업이다.
  >
  > ORM을 이용한 개발은 객체와 데이터베이스의 변형에 유연하게 사용할 수 있다.

<br>
<br>

#### 1-1. ORM vs JavaScript

---

- **TypeORM**

  ```typescript
  const boards = Board.find({
  	title: 'Hello'.
  	status: 'PUBLIC'
  });
  ```

- **JavaScript**

  ```javascript
  db.query('SELECT * FROM boards WHERE title = 'Hello' AND status = 'PUBLIC', (err, result) =>
  	if(err) throw new Error('Error');
  	boards = result.rows;
  });
  ```

- ORM은 모델을 기반으로 DB 테이블 체계를 자동으로 생성하지만 순수 JS로만 사용하게 된다면 모두 수동으로 처리해주어야한다.

- 또한, 데이터베이스에서 개체를 쉽게 삽입, 업데이트 및 삭제(CRUD)를 할 수 있다는 장점이 있으며 테이블 간의 매핑(1:1, 1:N, N:N) 또한 손쉽게 처리할 수 있다.

<br>
<br>

## 🤔 Understanding

- 사실 ORM은 Sequelize만 사용해봤는데 Sequelize는 TypeScript와는 호환성 이슈로 많은 불편함이 있다는 정도만 안다.

- 반면 NestJS의 프로그래밍 언어는 타입스크립트를 기본으로 채택하고 있기에 조금더 호환성에서 자유로울 것 같다는 생각이 우선 든다.

- ORM은 사실 문법을 따로 학습을 계속 해야 할 듯하다. Sequelize를 쓸 때도 공식문서 ~~(공식문서 진짜..너무 불친절)~~ 를 항상 참조해서 문법을 완성시켰었다.

- 우선 Maria DB와 현재 진행중인 실습 프로젝트를 연결 후 다양한 문법을 실습해봐야 알 듯 하다.

<br>
<br>

```toc

```
