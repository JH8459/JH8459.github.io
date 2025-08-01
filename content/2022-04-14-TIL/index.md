---
emoji: 📚
title: '따라하며 배우는 Nest JS #2'
date: '2022-04-14'
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

### 1. NestCLI로 생성한 프로젝트 기본구조

---

- `nest new ./` 명령어를 이용하여 폴더 내부에 기본 NestJS 프레임워크 기본 설정을 NestCLI를 통하여 만들었다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163496350-819bacb8-f9c5-4af4-a4a7-19847eb427a3.png"></center><br>

- 기본으로 구성된 프로젝트 기본구조를 하나씩 알아보면 다음과 같다.

<br>
<br>

#### 1-1. .eslintrc.js

---

- 개발자들이 특정한 규칙을 가지고 코드를 깔끔하게 짤 수있게 도와주는 라이브러리이다.

- 타입스크립트를 쓰는 가이드 라인을 제시하며 문법에 오류가 나면 알려주는 역할 등 **코딩 컨벤션**에 일조하는 역할을 하는 라이브러리이다.

  > **코딩 컨벤션?**
  >
  > 읽고 관리하기 쉬운 코드를 작성하기 위한 일종의 코딩 스타일 규약이다.

<br>
<br>

#### 1-2. .prettierrc

---

- eslint와 마찬가지로 코딩 컨벤션에 일조하는 라이브러리이다.

  주로 코드의 형식을 맞추는데 사용한다.

- 예를 들어 문자열을 표현할 때 작은 따옴표(')를 사용할지 큰 따옴표(")를 사용할지, indent 값을 2줄 혹은 4줄로 사용할지 등 문법 에러를 찾는 것이 아닌 코드 포맷터의 역할을 갖는다.

<br>
<br>

#### 1-3. nest-cli.json

---

- nest 프로젝트를 위해 특정한 설정을 할 수 있는 json 파일이다.

<br>
<br>

#### 1-4. tsconfig.json

---

- 타입스크립트 컴파일을 어떻게 할 지 설정하는 json 설정 파일이다.

<br>
<br>

#### 1-5. tsconfig.build.json

---

- tsconfig.json 파일의 연장선 상에 있는 파일이며, build를 할 때 필요한 설정들을 담고있다.

- "exclude"에는 빌드할 때 필요 없는 파일들이 명시되어 있다. (ex. node_modules 등)

<br>
<br>

#### 1-6. package.json

---

- 프로젝트의 정보를 정의하고, 의존하는 패키지 버전 정보를 명시하는 파일이다.

- `name`, `version` 영역에서는 프로젝트의 정보를 정의하고 있으며, `dependencies` 또는 `devDependencies` 영역에서는 패키지 버전 정보를 담고 있다.

<br>
<br>

#### 1-7. src 디렉토리

---

- 주요한 기능(API 관련)들이 담겨있는 폴더이다.

- 공식문서에서는 다음과 같이 설명하고 있다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163498889-ac3edc31-2bb3-46de-984a-840984c80bf1.png"/></center><br>

  - **app.controller.ts**: 기본 컨트롤러

  - **app.controller.spec.ts**: 컨트롤러에 대한 단위 테스트

  - **app.module.ts**: 애플리케이션의 루트 모듈

  - **app.service.ts**: 하나의 방법으로 기본 서비스를 제공

  - **main.ts**: 핵심 방법, NestFactory를 활용해 Nest 애플리케이션 인스턴스를 생성하는 애플리케이션 항목 파일

<br>
<br>

### 2. 기본 구조에서 살펴보는 Nest 로직 흐름

---

- 위와 같이 NestJS CLI로 만든 기본 프로젝트를 `npm run start`로 로컬환경으로 실행 시킨 뒤 확인해보면 다음과 같은 메시지 출력을 확인 할 수 있다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163503262-8e96a8ca-def8-45e8-946e-b44f67344aff.png"/></center><br>

- 해당 메시지가 출력되는 과정을 알아보려 한다.

<br>
<br>

- 우선 `main.ts`를 보면 `NestFactory.create(AppModule);` 구문을 볼 수 있다.

  <center><img width="483" alt="스크린샷 2022-04-15 오전 10 31 03" src="https://user-images.githubusercontent.com/83164003/163503675-ba87b17f-6859-4b44-9877-b3391d4324c1.png"></center><br>

  `AppModule`로 이동해보면 `app.module.ts` 파일로 이동하게 된다.

  <center><img width="470" alt="스크린샷 2022-04-15 오전 10 35 29" src="https://user-images.githubusercontent.com/83164003/163503932-62d6da09-e491-4e45-a628-07ee085eb46a.png"/></center><br>

  `app.module.ts` 파일에 있는 `@Module` 부분에 `app.controller.ts`, `app.service.ts` 부분을 모두 모듈로 등록하여야 `AppModule`로써 사용이 가능하다.

  ```typescript
  @Module({
    imports: [],
    controllers: [AppController],
    providers: [AppService],
  })
  ```

- 위와 같은 `@Module`이 등록이 되어야 `main.ts`에서 아래와 같이 사용가능하다.

  ```typescript
  const app = await NestFactory.create(AppModule);
  ```

- 우선 `service`와 `controller`가 `module`로 묶여 `main.ts`에서 사용된다고 이해하고 다음으로 넘어갔다.

<br>
<br>

#### 2-1. 요청이 들어올 경우 응답을 반환하기까지의 절차

---

- 우선 `main.ts`의 구조만 잠시 파악을 해보았다.

- 하지만 서버는 기본적으로 클라이언트의 요청이 들어올 경우 올바른 응답을 반환해주는 구조로 설계가 된다.

- 우선 `localhost:3000` 이 어떤 요청을 보냈는지 확인해 네트워크 탭을 통해 확인해 보면 아래와 같다.

  <center><img src="https://user-images.githubusercontent.com/83164003/163505599-800357ee-06a0-4058-9313-e1c53829c33d.png"/></center><br>

  `http://localhost:3000`은 기본 서버 URL이기 때문에 결국 `/` 엔드포인트로 **GET** 메소드 요청을 보냄을 확인하였다.

- 그렇다면 서버는 적절한 엔드포인트로 요청 메소드와 함께 요청이 전달받았으니 올바른 응답을 반환해 주어야 한다.

  응답을 반환하는 과정은 아래와 같다.

<br>
<br>

- 우선 `app.controller.ts`를 들여다 보면

  <center><img width="529" alt="스크린샷 2022-04-15 오전 10 58 59" src="https://user-images.githubusercontent.com/83164003/163506744-2cd96916-eb88-443a-a340-b6b1a5394dec.png"/></center><br>

  ```ts
  @Get('/') // 위 파일에서는 엔드포인트 '/'은 생략되어 있다.
  getHello(): string {
    return this.appService.getHello();
  }
  ```

  `/` 엔드포인트로 들어온 **GET** 메소드가 요청으로 들어올 경우 `getHello` 함수의 리턴값을 응답값으로 넘겨주는 구조로 작성되어 있다.

  `return`값으로 명시된 `appService` 를 들여다보면 다음과 같다.

  <center><img width="588" alt="스크린샷 2022-04-15 오전 11 16 08" src="https://user-images.githubusercontent.com/83164003/163508010-5c3ad81b-fb03-41ea-9fef-9fb3c06f2fff.png"></center><br>

  결국 이곳에 있는 `getHello()` 함수의 리턴값인 `'Hello World!'`가 브라우저에 출력이 된다.

<br>
<br>

#### 2-2. 절차 요약

---

- 결국 클라이언트의 요청이 들어오는 경우 라우터가 분기되기전 최초 진입점 `main.ts`로 진입하게 된다.

- `main.ts`에서는 루트 모듈인 appModule을 호출하며 이 appModule **Controller**와 **Service**가 묶여있다.

- 그 후 요청 엔드포인트와 요청 메소드와 일치하는 **Controller**로 분기되며 알맞은 메소드를 통하여 분기된 API 요청은 올바른 응답값을 반환하기 위해 **Service**에서 필요한 작업들을 수행해준뒤 클라이언트로 응답을 리턴해주게 된다.

<br>
<br>

## 🤔 Understanding

- 사실 나는 node.js의 프레임워크로 express.js만 사용해왔기 때문에 구조가 다른부분은 아직 조금 더 학습해 나가며 이해해보려한다.

  하지만 절차적인 구조는 유사함을 많이 느꼈다.

- 디테일한 구조적인 차이점은 앞으로 조금 더 학습해가며 이해가 필요한 부분이라 판단된다.

<br>
<br>

```toc

```
