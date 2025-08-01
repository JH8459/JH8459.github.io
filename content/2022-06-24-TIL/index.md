---
emoji: 📚
title: NestJS DTO vs Interface
date: '2022-06-24'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- TypeScript를 기본 언어로 채택하여 구성된 NestJS 프레임워크는 공식문서에서는 Type Check를 위해 `DTO` 사용을 안내하고 있다.

- 공식문서를 토대로 `DTO`를 왜 사용하는지 찾아보는 그 과정에서 `Interface`와의 차이점을 간단히 알아보았다.

<br>
<br>

### 1. DTO (Data Transfer Object)

---

- 우선 `DTO`란 **계층\***간 데이터 교환을 위해 사용하는 객체이다.

  > 계층이란?
  >
  > 패턴마다 다르게 표현된다.
  >
  > Repository 패턴에서는 Controller, Service, Repository를 각각 계층이라 칭하며, MVC 패턴에서는 Model, View, Controller의 계층이 존재한다.

- 계층간 데이터를 주고 받을 때 어떤 모양의 데이터 객체로 주고 받을지를 `DTO`에서 결정하게 되므로 프로젝트를 설계할때 최우선으로 고려되야 할 요소이다.

- 쉽게 말하자면 정보를 교환하는데 있어 타입을 체크하기 위한 구조라 설명할 수 있다.

- 또한, 타입을 체크하기 위한 방법으로 `DTO`외에 `Interface`가 존재하며 이는 아래에서 다시 설명하겠다.

<br>
<br>

### 2. Interface

---

- 간단하게 설명하자면 인터페이스는 TypeScript에서 변수, 함수, 클래스의 타입 체크를 위해 사용되며 보기에는 클래스와 유사하지만 인스턴스 생성이 불가능하고 모든 메소드는 추상 메소드로 이루어져 있다.

- 또한 **"ES6에서 지원하지 않고 TypeScript에서만 지원한다."**

- 데이터 타입을 체크하기 위한 기능적인 면모로써는 `DTO`와 동일하지만 위에서 강조한것 처럼 ES6에서는 지원하지 않는다는 차이점이 있다.

<br>
<br>

### 3. Why DTO?

---

- 위 질문의 해답은 NestJS <a href="https://docs.nestjs.com/controllers#request-object" target="_blank">공식문서</a>(Request payloads 부분)에서는 왜 DTO로 안내하는지 설명이 자세히 안내되어 있다.

  ![스크린샷 2022-06-24 오후 10 11 12](https://user-images.githubusercontent.com/83164003/175549009-f7cb3010-f861-4750-a5e9-15978b486734.png)

  위 내용을 위 `Interface`를 설명했던 내용과 덧붙혀 간략히 줄이자면 TypeScript의 클래스는 JavaScript ES6 표준을 따르므로 TypeScript로 작성되었지만 컴파일 된 JavaScript에서는 인터페이스는 컴파일 도중 제거되므로(`Interface`는 ES6 표준이 아니므로) NestJS에서 런타임에 인터페이스를 참조할 수 없게된다.

- 따라서 NestJS에서는 런타임 이후 `Input`값에 대한 유효성 검증이라던지 그 외의 데이터 타입을 지속적으로 추적해야하는 경우 `DTO`는 Class로 작성되기에 ES6 표준이므로 참조가 가능 하지만, `Interface`는 ES6 표준 문법이 아니므로 제거되기에 참조할 수 없게된다.

<br>
<br>

## 🤔 Understanding

- 그냥 학습한 대로 습관적으로 `DTO`를 사용하다 불현듯 떠오른 궁금증인 **"클래스 문법으로 생성되지만 인스턴스를 생성하는 것도 아니고.. 단순 타입 검증만을 위해 사용되는게 아닌가? 그럼 인터페이스랑 다른게 무엇이지?"** 라는 의문점에서 찾아보니 이와같은 결론에 도달하게 되었다.

- NestJS 공식 문서는 대단하다.

  모든 궁금증에 대한 내용이 이미 모두 기재되어 있었다. ~~(내가 찾아보질 않았을 뿐...)~~

- 지금은 프로젝트 한창이라 너무 바쁘고, 어느정도 안정되면 공식문서 정주행을 한번 해야겠다.

<br>
<br>

```toc

```
