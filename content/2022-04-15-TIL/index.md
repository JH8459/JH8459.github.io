---
emoji: 📚
title: '따라하며 배우는 Nest JS #3'
date: '2022-04-15'
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

### 1. NestJS 모듈

---

- 모듈은 @Module () 데코레이터(@)로 주석이 달린 클래스이다.

- @Module () 데코레이터는 Nest가 애플리케이션 구조를 구성하는데 사용하는 메타 데이터를 제공한다.

- 각 응용 프로그램에는 하나 이상의 모듈(최소 루트 모듈)이 있으며, 그 중 루트 모듈은 Nest가 사용하는 시작점이다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163526133-269d66b5-2893-4ce3-b791-bb0248f1d930.png"/></center><br>

- 모듈은 밀접하게 관련된 기능 집합으로써 한 요소를 구성하기 위한 효과적인 방법이다. (기능별로 만든다. ⇒ ex. 유저 모듈, 주문 모듈, 채팅 모듈 등등)

- 같은 기능에 해당하는 것들은 하나의 모듈 폴더안에 넣어서 사용한다. (ex. userController, userService, userEntity ⇒ 모두 같은 기능이기 때문에 userModule 안에 넣어 관리한다.)

- 모듈은 기본적으로 **싱글 톤** 패턴 이므로 여러 모듈간에 쉽게 공급자의 동일한 인스턴스를 공유 할 수 있다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163527022-95b7fd3f-4b56-46f8-8363-ba5926a47677.png"/></center>

  > **싱글 톤** 패턴?
  >
  > 객체의 인스턴스가 오직 1개만 생성되는 패턴을 의미한다.<br>
  > 인스턴스가 오직 한 개로만 가져가므로 메모리 측면에서 유리하며 다른 클래스 간에 데이터 공유가 쉽다는 장점이 있다.

<br>
<br>

### 2. NestJS 컨트롤러

---

- 컨트롤러는 클라이언트에서 서버로 들어오는 요청을 처리하고 클라이언트로 응답을 반환한다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163531253-9608853a-8be1-41c8-a515-e9139974e523.png"/></center><br>

- 컨트롤러는 @Controller 데코레이터로 클래스를 데코레이션하여 정의된다.

  ```typescript
  @Controller('/boards')
  export class BoardsController {}
  ```

  데코레이터는 인자를 Controller에 의해서 처리되는 "경로"로 받는다.

<br>
<br>

#### 2-1. 핸들러란?

---

- 핸들러는 `@Get`, `@Post`, `@Delete` 등 데코레이터로 장식 된 컨트롤러 클래스 내의 단순한 메서드이다.

  ```typescript
  @Controller('/boards')
  export class BoardsController {
    @Get()
    getBoards(): string {
      return 'This action returns all boards';
    }
  }
  ```

- 즉, 브라우저에서 들어온 요청은 컨트롤러에서 알맞은 요청 경로(엔드포인트)로 분기해주며 해당 분기로 들어온 요청에 알맞은 할 일(요청 메소드)은 핸들러에서 처리가 되는 구조이다.

<br>
<br>

### 3. NestJS 프로바이더란?

---

- 프로바이더는 NestJS의 기본 개념이다.

  대부분의 기본 NestJS 클래스는 서비스, 리포지토리, 팩토리, 헬퍼등 프로바이더로 취급될 수 있다.

- 프로바이더의 주요 아이디어는 종속성으로 주입할 수 있다는 것이다. 즉, 객체는 서로 다양한 관계를 만들수 있으며 객체의 인스턴스를 "연결"하는 기능은 대부분 Nest 런타임 시스템에 위임될 수 있다.

- 예를 들면 컨트롤러는 웹 브라우저에서 요청이 들어오면 무수히 많은 기능을 수행하며 그를 수행하기 위해 많은 것들을 필요로 한다.

  하지만 필요한 모든 것들을 컨트롤러에서 처리하기엔 너무 방대하다.

- 따라서 기능별로 서비스, 리포지토리 등을 통해서 컨트롤러에 해당하는 기능을 넣어(종속성을 주입한다)주는 개념을 통틀어 프로바이더라 일컫는다.

<br>
<br>

#### 4. NestJS 서비스란?

---

- 서비스는 소프트웨어 개발내의 공통 개념이며, NestJS나 JavaScript에서만 쓰이는 개념은 아니다.

- 서비스는 @Injectable 데코레이터로 감싸져서 모듈에 제공되며, 이 서비스 인스턴스는 애플리케이션 전체에서 사용될 수 있다.

  서비스는 컨트롤러에서 데이터의 유효성 체크를 하거나 데이터베이스 CRUD가 이뤄지는 부분들을 처리한다.

- NestJS CLI로 생성한 기본 프로젝트를 예로 들면 `'Hello World!'` 문자열을 리턴해주는 아래의 부분이 대표적인 서비스라 볼 수 있다.

  ```typescript
  @Injectable()
  export class AppService {
    getHello(): string {
      return 'Hello World!';
    }
  }
  ```

<br>
<br>

## 🤔 Understanding

- <a href="https://blog.jh8459.com/2022-04-14-TIL/" target="_blank">따라하며 배우는 Nest JS #2</a>에서는 NestJS 로직 흐름에 대해서 학습했다면 오늘은 전반적인 부분마다 어떠한 기능을 수행하며 각 부분들이 어떻게 상호 연결되어 동작되는지에 대한 디테일한 부분을 우선 알아보았다.

- 각종 예제를 통해서 실제로 코드를 짜봐야 사실 조금 더 와닿을 듯 하다.

- 주말을 통해서 CRUD 관련해서 실제로 코드로 구현해보는 시간을 가져야 할 듯하다.

<br>
<br>

```toc

```
