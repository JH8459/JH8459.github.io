---
emoji: 📚
title: DOM, 유효성 검사 실습
date: '2021-08-06'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. DOM

---

- **DOM( Document Object Model)** 은 HTML 요소를 Object(JavaScript Object)처럼 조작(Manipulation)할 수 있는 Model이다.

  즉, 자바스크립트를 사용할 수 있으면, DOM으로 HTML을 조작할 수 있다.

<br>
<br>

#### 1-1. HTML에 JavaScript 적용하기

---

- HTML에 JavaScript를 적용하기 위해서는 `<script>` 태그를 이용한다. 웹 브라우저가 작성된 코드를 해석하는 과정에서 `<script>` 요소를 만나면, 웹 브라우저는 HTML 해석을 잠시 추고 `<script>` 요소를 **먼저** 실행한다.

  즉, **`<script>` 요소는 등장과 함께 실행된다**.

  > `<script>`요소는 발견즉시 해석되므로 HTML 구문이 모두 해석되기 전 실행될 수도 있다. 정의되지 않은 값이 호출되는 경우 null 이 발생되므로 되도록 HTML 구문이 모두 해석되는 시점인`</body>` 앞에 쓰는걸 습관하 하자.

<br>
<br>

#### 1-2. 부모&자식 엘리먼트 찾기

---

```html
<html>
  <body>
    <div id="nav">
      <div class="logo"></div>
      <div class="menu-wrapper">
        <div class="menu"></div>
        <div class="menu"></div>
        <div class="menu"></div>
        <div class="profile-photo"></div>
      </div>
    </div>
    <div id="news-contents">
      <div class="news-content-wrapper">
        <div class="news-picture"></div>
        <div class="news-title"></div>
        <div class="news-description"></div>
      </div>
    </div>
    <div id="footer"></div>
  </body>
</html>
```

<br>

- 위의 HTML 코드를 보고 부모 자식간의 관계를 눈으로 찾는건 그리 어렵지 않은 일이다.

  그렇다면 컴퓨터에게 이 사실을 어떻게 전달할까?

  자바스크립트에서 DOM은 `document` 객체에 구현되어 있으므로 브라우저에서 작동되는 자바스크립트 코드에서는, 어디에서나 `document` 객체를 조회할 수 있다.

- DOM 구조를 조회할 때에는 `console.dir` 이 유용하다.

  > `console.dir` 은 `console.log` 와 달리 DOM을 객체의 모습으로 출력한다.

  ![스크린샷, 2021-08-06 10-37-31](https://user-images.githubusercontent.com/83164003/128442805-9865b83d-6360-490e-811d-a964f7ef9380.png)

<br>

![스크린샷, 2021-08-06 10-40-58](https://user-images.githubusercontent.com/83164003/128443078-3de98c0d-901f-49ec-aa96-c3b70a8834d8.png)

<br>

- 객체의 키값쌍 형태로 `document.body`의 `children` 키를 확인 가능하다.

  `console.dir(document.body.child)`를 이용하여 바로 `children` 키로 접근 또한 가능하다.

- 매번 `document.body`를 통하여 찾아가는 일은 번거로운 일이다. 따로 변수를 선언해서 이 정보를 저장해두는게 편리하다.

  ```javascript
  let newsContents = document.body.children[1];

  // div#news=contents
  ```

  부모 엘리먼트 또한 변수에 담을수 있다.

  ```javascript
  let newscontentsParent = newsContents.parentElement;

  // body
  ```

- 이렇듯 DOM은 회사의 조직도와 같은 유사한 구조로 구성된다.

  이런 자료 구조를 **트리구조** 라고 하며, 가장 큰 특징은 부모가 자식을 여러개 가질수 있으며, 부모는 하나인 구조가 반복되는 점이다.

<br>
<br>

### 2. 유효성 검사 실습

---

> <a href="https://github.com/JH8459/im-sprint-validation-check" target="_blank"> Github 참조 </a>

![스크린샷, 2021-08-06 20-32-56](https://user-images.githubusercontent.com/83164003/128504541-67ae5947-c43d-4e7d-9ac0-91c9a678e9c5.png)

- 변수에 `querySelector` 로 담아온 선택자의 요소를 변경 및 제어하여 동적인 HTML 작성

- DOM 구조를 이해하며 javascript로 제어하는 실습. ~~CSS에 시간을 더 할애하였다..~~

<br>
<br>

## 🤔 Understanding

- DOM 을 우선 찍먹정도 하였다. JavaScript & CSS & HTML 이 유기적으로 상호간에 기능/디자인/뼈대 를 담당하여 웹앱(?)을 구성해보았다.

  음.. 일단 생각보다 재미있다. 눈으로 보이기때문인가?

  아직 부족한 문법(특히 이벤트 핸들러..)은 점차 학습 해나가야겠다.

<br>
<br>

```toc

```
