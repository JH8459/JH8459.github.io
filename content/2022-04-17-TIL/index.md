---
emoji: 📚
title: '따라하며 배우는 Nest JS #5'
date: '2022-04-17'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 인프런의 <a href="https://www.inflearn.com/course/%EB%94%B0%EB%9D%BC%ED%95%98%EB%8A%94-%EB%84%A4%EC%8A%A4%ED%8A%B8-%EC%A0%9C%EC%9D%B4%EC%97%90%EC%8A%A4" target="_blank">따라하며 배우는 NestJS</a>를 들으며 배운점을 남기고 있다.

- 일전의 <a href="https://blog.jh8459.com/2022-04-16-TIL/" target="_blank">#4</a>에서 DTO에 대한 기초 개념을 학습을 진행했으며 그를 토대로 기본적인 CRUD를 위한 실습또한 함께 진행했다.

- 오늘은 기존 실습한 내용을 주석을 달아가며 복습하였다.

- 해당 코드 내용은 아래에 첨부한다.

  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/51ab917ca54c16d5b707d9097f76a9f10c86546c/src/boards/dto/create-board.dto.ts" target="_blank">게시물 생성을 위한 DTO</a>
  >
  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/3207450280a7ab3e4091e7d5609bab76c488b126/src/boards/boards.service.ts" target="_blank">ID로 특정 게시물 가져오기(getBoardById)</a>
  >
  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/be2cd71692b2e1fbf4a539fb3b614960f2f594df/src/boards/boards.service.ts" target="_blank">ID로 특정 게시물 지우기(deleteBoard)</a>
  >
  > <a href="https://github.com/JH8459/NestJS-BoardApp/blob/b1dbee3e2fda9210217d5b286d19aae165bc3bc6/src/boards/boards.service.ts" target="_blank">특정 게시물의 상태 업데이트(updateBoardStatus)</a>

- 그리고 NestJS Pipes를 학습하였다.

<br>
<br>

### 1. Pipe란?

---

- 파이프는 @Injectable () 데코레이터로 주석이 달린 클래스이다.

  파이프는 데이터 변형(Data Transformation)과 데이터 유효성 검증(Data Validation)을 위해서 사용된다.

  > 데이터 변형(Data Transformation)과 데이터 유효성 검증(Data Validation)이란?
  >
  > 데이터 변형(Data Transformation)은 입력 데이터를 원하는 형식으로 변환해주는 개념이다. (Ex. 문자열 ⇒ 정수)
  >
  > 만약 전달인자로 숫자를 받기를 원하는데 문자열 형식으로 온다면 파이프에서 자동으로 숫자형 데이터로 전환해준다. (Ex. string '7' ⇒ integer 7)
  >
  > 데이터 유효성 검증(Data Validation)은 입력 데이터를 평가하고 유효한 데이터라면 전달을 하며, 유효하지 않은 데이터일 경우 예외를 발생시킨다.
  >
  > 만약 이름의 길이가 10자 이하여야하는데 10자 이상의 입력 데이터가 발생한다면 에러를 발생시킨다.

- 파이프는 컨트롤러 경로 처리기에 의해 처리되는 인수에 대해 작동한다.

- NestJS는 메서드가 호출되기 직전에 파이프를 삽입하고 파이프는 메서드로 향하는 인수를 수신하고 이에 대해 작동한다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163721717-5b6836c2-9c66-4655-a026-4ae04fd87d94.png"/></center><br>

- 파이프는 라우트 핸들러(Route Handler)가 처리하는 인수에 대해서 작동한다.

- 그리고 파이프는 메서드 실행 바로 직전에 작동해서 메서드로 향하는 인수에 대해서 변환이 필요한 데이터가 들어온다면 데이터 변형을 진행하며, 유효하지 않은 데이터가 들어온다면 에러를 발생시키기 위해 호출된다.

<br>
<br>

### 2. Pipe 사용하는 방법 (Binding Pipes)

---

- 파이프를 사용하는 방법은 **Handler-level Pipes, Parameter-level Pipes, Global-level Pipes** 세가지로 나눠질 수 있다.

<br>
<br>

#### 2-1. Handler-level Pipes

---

- 핸들러 레벨에서 @UsePipes() 데코레이터를 이용해서 사용할 수 있다.

- 이 파이프는 특정 핸들러 내부 모든 파라미터에 적용이 된다.

  ```typescript
  @Post()
  @UsePipes(pipe)
  createBoard(
    @Body('title') title,
    @Body('description') description,
  ) {
    ...
  }
  ```

- `createBoard` 핸들러에만 작동하는 파이프의 예시이다.

  해당 핸들러에 사용될 모든 파라미터(`'title'`, `'description'`)에 적용된다.

<br>
<br>

#### 2-2. Parameter-level Pipes

---

- 파라미터 레벨에서 사용할 수 있다.

- 이 파이프는 "특정" 파라미터에만 적용이 된다.

  ```typescript
  @Post()
  createBoard(
    @Body('title', ParameterPipe) title,
    @Body('description') description,
  ) {
    ...
  }
  ```

- 특정 파라미터(`'title'`) 하나에만 작동하는 파이프의 예시이다.

<br>
<br>

#### 2-3. Global-level Pipes

---

- 애플리케이션 레벨의 파이프이다.

- 이 파이프는 클라이언트에서 들어오는 모든 요청에 적용이 된다.

- 때문에 모든 요청의 진입점이자 상단 영역인 `main.ts`에 넣어준다.

  ```typescript
  async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(GlobalPipes);
    await app.listen(3000);
  }
  bootstrap();
  ```

- 모든 요청에 작동하는 파이프의 예시이다.

<br>
<br>

### 3. Built-in Pipes

---

- NestJS에는 기본적으로 사용할 수 있게 만들어 놓은 6가지의 빌트인 파이프가 있다.

  - ValidationPipe

  - ParseIntPipe

  - ParsBoolPipe

  - ParseArrayPipe

  - ParseUUIDPipe

  - DefaultValuePipe

- 이름만 보아도 각각의 파이트가 어떤 역할을 하는지 짐작은 가능하지만, 그중 ParseIntPipe를 보면 다음과 같다.

  ```typescript
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    ...
  }
  ```

- 파라미터 `'id'`는 숫자가 와야하는 핸들러가 있다고 가정을하자, 하지만 여기서 파라미터 값으로 숫자가 아닌 문자열 등 다른 타입의 데이터를 보낸다면.

  <center><img src="https://user-images.githubusercontent.com/83164003/163722866-3ae45a8a-f9d4-49e9-ac0c-f2629608105a.png"/></center><br>

  아래와 같은 에러가 발생하게 된다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163722908-94708cde-b0ae-4157-a14f-e79af3fe20ce.png"/></center>

<br>
<br>

## 🤔 Understanding

- 우선 오늘은 Pipe 대해서 알아만 보았다.

- "굉장히 편리한 기능인데..?" 라는 생각이 바로 들었다.

  또한 커스터마이징 파이프 또한 사용이 가능하니 더할 나위 없다 생각이 들었다.

- 기존에 Express로 서버를 구성할 땐 사용자 입력값에 따라서 만약 입력값이 없거나 유효하지 않은 인풋값을 입력했다면, 상태코드 400번등 에러코드와 메시지를 함께 `json`형식으로 반환해서 입력 데이터값을 검증하는 코드를 일일히 구현했었다.

- 그런데 NestJS에서는 이미 많이 쓰이는 유효성 검사를 위한 파이프는 빌트인 파이프로 제공하며 세밀한 검증이 필요한 경우에는 입맛에 맞춰 쓸 수 있다니 참.. 좋은 프레임워크구나라는 생각이 들었다.

- 내일은 실제로 유효성 검증 혹은 데이터 변형을 위한 파이프를 사용해보며 직접 코드로 구현해보는 시간을 가져봐야겠다.

<br>
<br>

```toc

```
