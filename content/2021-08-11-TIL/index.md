---
emoji: 📚
title: React
date: '2021-08-11'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. React

---

- 프론트앤드 개발을 위한 JavaScript 오픈소스 라이브러리.

<br>
<br>

#### 1-1. 리액트의 3가지 특징

---

1. **선언형 (Declarative)**

- 코드를 면밀히 뜯어보지 않아도, 코드를 유추할 수 있게 된다.

- 한 페이지를 보여주기 위해 `HTML`, `CSS`, `JS`로 나눠서 적기보다는, 하나의 파일에 명시적으로 작성할 수 있게 **`JSX`** 를 활용한 선언형 프로그래밍을 지향한다.

![스크린샷, 2021-08-11 10-36-42](https://user-images.githubusercontent.com/83164003/128956477-bcdf1138-721b-4bf9-83eb-ba6de1d2d51f.png)

2. **컴포넌트 기반 (Component-Based)**

- _컴포넌트(Component)_ 란 독립적인 단위모듈이다.

- 리액트는 하나의 기능 구현을 위해 여러 종류의 코드를 묶어둔 컴포넌트를 기반으로 개발한다. 컴포넌트로 분리하면 서로 독립적이고 재사용에 용이하기 때문에, 기능 자체에 집중하여 개발이 가능하게 된다.

  ![스크린샷, 2021-08-11 10-41-55](https://user-images.githubusercontent.com/83164003/128957120-9e7a2b60-cca4-457f-a240-a907bb29505b.png)

<br>

3. **범용성**

- 리액트는 JavaScript 프로젝트 어디든 유연하게 적용될 수 있다.

- Facebook 에서 관리되어 안정적이고, 가장 유명하며 리액트의 형제격인 _리액트 네이티브_ 로 모바일 플랫폼까지 지원 가능하다.

<br>
<br>

#### 1-2. JSX

---

- JSX는 JS와는 유사하며 JS를 확장한 문법이지만, 브라우저가 바로 실행할 수 있는 JavaScript 코드는 아니다.

  **"Babel"** 을 이용하여 JSX를 브라우저가 이해할 수 있는 JS로 컴파일하게 되며, 컴파일 된 JS를 통하여 브라우저가 읽고 화면에 렌더링 할 수 있다.

  React 에서는 DOM 과 다르게 `CSS`, `jsx` 문법만 가지고 웹 애플리케이션을 개발할 수 있게된다.

  즉, 컴포넌트 하나를 구현하기 위해서 필요한 파일이 줄어들었고, 한눈에 컴포넌트를 확인하기에 더욱 용이하다.

  ![스크린샷, 2021-08-11 10-54-31](https://user-images.githubusercontent.com/83164003/128957709-6ed1788f-6a97-4a2c-be31-94ceb4d88297.png)

<br>
<br>

### 2. React 기본 문법 실습

---

> <a href = "https://github.com/JH8459/im-sprint-react-twittler-intro" target="_blank">Github 참조</a>

![스크린샷, 2021-08-12 00-19-37](https://user-images.githubusercontent.com/83164003/129056832-1bd66fa4-4693-4363-98ce-5cbf39f31c60.png)

<br>
<br>

## 🤔 Understanding

- 우선 컴포넌트로 구성된 모듈이 모여져서 만들어진 React 의 기본 문법만 학습하였다.

  아직 `state`, `props` 의 개념까지 확장이 안되어서 웹사이트라 말하긴 아쉽다.

  조금 더 다듬어서 이번주 내로는 리액트에 대한 학습내용을 채워갈 예정이다.

<br>
<br>

```toc

```
