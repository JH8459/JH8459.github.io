---
emoji: 📚
title: React SPA, React Router
date: '2021-08-12'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. React SPA (Single Page Application)

---

- 과거의 브라우저는 웹사이트 페이지 전체를 로딩하였기 때문에 발생하는 리소스 손실이 컸다.

  하지만 **SPA**는 페이지 전환 전후에 중복되는 부분은 새로 불러오지 않으며 필요한 부분만 갱신하여 웹페이지를 새로 로딩한다.

- 즉 **SPA** 란, 서버로부터 완전한 새로운 페이지를 불러오지 않고 페이지 갱신에 필요한 데이터만 받아 그 정보를 기준으로 현재의 페이지를 업데이트함으로써 사용자와 소통하는 웹 어플리케이션이나 웹 사이트를 일컫는다.

![스크린샷, 2021-08-12 10-11-45](https://user-images.githubusercontent.com/83164003/129123147-be55270e-249a-48c7-b784-20ac02cbd625.png)

<br>
<br>

#### 1-1. SPA 의 장단점

---

**1. 장점**

- 전체 페이지가 아닌 필요한 부분의 데이터만 받아서 화면을 업데이트 하면 되기 때문에 사용자와의 Interaction에 빠르게 반응한다.

- 서버에서는 요청 받은 데이터만 넘겨주면 되기 때문에 과부화가 적다.

- 전체 페이지를 렌더링 할 필요가 없기 때문에 더 나은 유저경험을 제공한다.

- 대표적인 서비스로는 _Youtube, facebook, airbnb, Netflix_ 등이 있다.

**2. 단점**

- SPA 경우 JavaScript 파일의 크기가 크다(HTML 파일은 거의 비어있고 대부분의 코드는 JavaScript 내부에서 작동한다.), 때문에 첫 화면 로딩 시간이 길어질수 밖에 없다.

- 검색 엔진 최적화(SEO)가 좋지 않다. 구글이나 네이버 같은 검색 엔진들은 HTML 파일에 있는 자료를 분석하는 방식으로 검색 기능이 구동된다. 하지만 SPA 같은 경우 앞서 말했듯이 HTML 파일은 별다른 자료가 없기 때문에 검색 엔진이 적절히 동작하지 못한다.

<br>
<br>

#### 1-2. React SPA 실습

---

> <a href="https://github.com/JH8459/im-sprint-react-twittler-spa" target="_blank"> 참조 : Github </a>

<br>
<br>

### 2. React Router

---

- SPA는 하나의 페이지를 가지고 있지만, 한 종류의 화면만 사용하지는 않는다.

  ![스크린샷, 2021-08-12 11-07-15](https://user-images.githubusercontent.com/83164003/129127515-374f088f-a9f8-470c-bb2d-ec0d7c1311a8.png)

  위 사진과 같이 하나의 페이지 이지만 화면전환은 계속 이루어진다.

  또한 이 화면에 따라 _주소_ 도 달라지게된다.

  이렇게 다른 주소에 따라 다른 뷰를 보여주는 과장을 "경로에 따라 변경한다" 라는 의미로 **라우팅(Routing)** 이라고 한다.

  React 자체에는 이 기능이 내장되어 있지 않기떄문에 외부 라이브러리를 이용한다.

<br>
<br>

#### 2-1. React Router란?

---

- React Router의 주요 컴포넌트는 크게 3가지 이다.

  1. router : `<BrowserRouter>`

  2. route matchers : `<Switch>`, `<Route>` 경로를 매칭해준다.

  3. route changers : `<Link>` 경로를 변경해준다.

  ![스크린샷, 2021-08-12 11-12-19](https://user-images.githubusercontent.com/83164003/129127899-e5f5a7c1-6fef-4b4a-a856-1b131ac62e5d.png)

<br>
<br>

#### 2-2. React Router 실습

---

> <a href="https://github.com/JH8459/CodeStates/tree/master/React/react-router" target="_blank"> 참조 : Github </a>

<br>
<br>

## 🤔 Understanding

- 라우터를 이용한 부분 페이지 전환 그로인한 SPA 설계 가능화를 이해했다.

- 내일 리액트의 꽃인 `state, props` 학습이다. 내일까지 리액트 주요 문법 학습 후 주말중 리액트는 다시 한번 정리해야겠다.

<br>
<br>

```toc

```
