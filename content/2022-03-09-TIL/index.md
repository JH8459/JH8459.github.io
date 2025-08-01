---
emoji: 📚
title: Node.js와 웹 브라우저의 차이점
date: '2022-03-09'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- Node.js와 웹 브라우저 모두 자바스크립트를 실행해주는 역할을 한다.

- 모두 자바스크립트를 실행해주는 환경이지만 Node.js와 웹 브라우저의 다른점을 알아보고 학습한 내용을 글로 남겨보려 한다.

<br>
<br>

### 1. Node.js와 웹 브라우저

---

- ![스크린샷, 2022-03-09 17-18-05](https://user-images.githubusercontent.com/83164003/157400661-66decf60-0422-4320-a80e-80d4bf5194db.png)

  Node.js와 브라우저 둘 다 자바스크립트 엔진을 내장하고 있기 때문에, 자바스크립트라는 프로그래밍 언어를 기반으로 실행된다.

  > **자바스크립트 엔진(JavaScript engine)** 은 자바스크립트 코드를 실행하는 프로그램 또는 인터프리터이다.

- 이 두 가지 모두 자바스크립트를 실행하는 환경이라는 사실은 동일하지만 존재 목적이 매우 다르다.

<br>
<br>

### 2. Node.js와 웹 브라우저의 차이점

---

- 존재목적만 두고 보자면 브라우저는 HTML, CSS, JS를 이용하여 웹 페이지를 화면에 띄우는 것이 목적이며 Node.js는 JS를 이용하여 서버 개발 환경을 제공하는 것이 목적이다.

  둘의 차이점을 조금더 자세히 알아보자

<br>
<br>

### 2-1. 지원하는 API가 다르다

---

- ![API](https://user-images.githubusercontent.com/83164003/157400874-eaade652-dab7-4625-bc32-16c8b14b90e8.png)

  우선 API (Application Programming Interface)란 어떤 플랫폼이나 실행 환경 등에서 제공하는 인터페이스이다.

  즉, Node.js 개발자나 웹 브라우저 개발자가 자유롭게 가져다 쓸 수 있는 함수나 객체 등을 일컫는게 API이다.

- 우선 웹 브라우저는 위에서 언급하였듯이 웹 페이지에 정보들을 화면에 띄울수 있게 렌더링하는게 목적이므로 UI 관련 API를 브라우저는 지원받는다.

  그리고 Node.js에서는 서버 개발 환경을 구성하기 위해 파일 시스템 접근 혹은 보안에 관련된 API를 지원받아 사용할 수 있다.

  > <a href="https://developer.mozilla.org/ko/docs/Web/API">웹 브라우저 API</a><br> > <a href=" https://nodejs.org/docs/latest/api/">Node.js API</a>

<br>
<br>

### 2-2. 자바스크립트 엔진이 다르다

---

- 위에서 잠깐 언급하였기에 짧게 말하자면 자바스크립트 코드를 실행하는 자바스크립트 엔진이 웹 브라우저와 Node.js는 다르다. (크롬은 예외적으로 Node.js와 동일한 V8 엔진 사용)

- 우선 대표적인 웹 브라우저들의 자바스크립트 엔진은 다음과 같다.

  - 스파이더몽키: 최초의 자바스크립트 엔진. 넷스케이프 내비게이터에서 지원되며 오늘날은 모질라 파이어폭스를 지원
  - V8: 오픈 소스. 덴마크에서 구글이 개발. 구글 크롬의 일부
  - 웹킷: 오픈 소스. Nitro가 홍보하고 사파리용으로 애플이 개발
  - 차크라: 마이크로소프트 엣지, 익스플로러

<br>
<br>

### 2-3. 환경 제어 가능 여부가 다르다

---

- Node.js에서는 NVM을 이용하여 사용자가 어떤 버전의 Node.js 버전을 사용할 것인지 쉽게 선택이 가능하다.

  그러나, 웹 브라우저에서는 방문자가 브라우저 환경 제어를 능동적으로 선택할 수 없다.

- 크롬을 예로 들자면, 버전을 바꾸기 위해서는 크롬을 업데이트하거나, 재설치를 통해서 버전 변경을해야만 한다.

  그렇기에 자바스크립트는 빠르게 발전하는데 비해, 브라우저 업그레이드는 뒤쳐질 때가 있어 종종 문제가 발생하기도 한다.

- 반면 Node.js는 버전 선택이 가능하여 이런 문제에서 자유롭다.

<br>
<br>

### 2-4. 사용하는 모듈 표준이 다르다

---

- Node.js에서는 **CommonJS** 모듈 시스템을 사용하기에 `require()` 키워드로 모듈을 불러 사용한다.

- 반면 웹 브라우저 환경은 ES 모듈 표준을 사용하기 때문에 `import` 키워드로 모듈을 불러 사용하는 차이점이 있다.

<br>
<br>

## 🤔 Understanding

- 간단하게 웹 브라우저와 Node.js의 차이점을 살펴보았다.

- 둘 다 JS를 사용하지만 둘의 존재목적의 차이로 인하여 완전 다른 서비스임을 알게 되었다.

<br>
<br>

```toc

```
