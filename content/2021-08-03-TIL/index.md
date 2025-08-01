---
emoji: 📚
title: 다양한 CSS 셀렉터, CSS layout, HTML/CSS 목업 와이어프레임 실습
date: '2021-08-03'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 다양한 CSS 셀렉터

---

```javascript
h1 {  }  // 셀렉터
div {  }

* {  }  // 전체 셀렉터

section, h1 {  }  // 태그 셀렉터

#only {  }  // ID 셀렉터

.center {  }  // class 셀렉터

a[href] { }  // attribute 셀렉터
p[id="only"] { }

header h1 {}  // 후손 셀렉터

header > p { }  // 자식 셀렉터

section + p { }  // 인접 형제 셀렉터

section ~ p { }  // 형제 셀렉터

a:hover { }  // 가상 셀렉터
a:active { }

input:checked + span { }  // 요소 상태 셀렉터
input:enabled + span { }

p:first-child { }  // 구조 가상 클래스 셀렉터
ul > li:last-child { }

input:not([type="password"]) { } // 부정 셀렉터
div:not(:nth-of-type(2)) { }

input[type="text"]:valid { }  // 정합성 확인 셀렉터
input[type="text"]:invalid { }
```

- 새로 학습한 셀렉터

  - <a href = "https://developer.mozilla.org/ko/docs/Web/CSS/Attribute_selectors" target="_blank"> attribute 셀렉터</a> , <a href = "https://developer.mozilla.org/ko/docs/Web/CSS/:not" target="_blank"> 부정 셀렉터</a>

<br>
<br>

### 2-1 . CSS layout

---

![스크린샷, 2021-08-03 10-54-00](https://user-images.githubusercontent.com/83164003/127945320-113288ab-1eee-41b8-b76e-52b3528d1b7d.png)

```html
<div id="container">
  <div class="col w10">
    <div class="icon">아이콘 1</div>
    <div class="icon">아이콘 2</div>
    <div class="icon">아이콘 3</div>
  </div>
  <div class="col w20">
    <div class="row h40">영역1</div>
    <div class="row h40">영역2</div>
    <div class="row h20">영역3</div>
  </div>
  <div class="col w70">
    <div class="row h80">영역4</div>
    <div class="row h20">영역5</div>
  </div>
</div>
```

```css
.w70 {
  width: 70%;
}
.h40 {
  height: 40%;
}

* {
  // 기본 스타일 제거 (box-sizing)
  box-sizing: border-box;
}

body {
  // 기본 스타일 제거 (여백 제거)
  margin: 0;
  padding: 0;
}
```

- 박스의 시작을 정확히 (0,0)의 위치에서 시작하고 싶은데, `<body>` 태그가 가진 기본 스타일에 약간의 여백을 포함하지 않아 계산에 어려움이 있다.

  위에 언급한 문제를 해결할 몇 줄의 코드를 적용시키면, 기본 스타일링을 제거하여 디자인한 대로 레이아웃을 구현할 수 있다.

- 이렇게 클래스 이름과 구현을 1:1로 일치시켜 아주 작은 단위로 CSS를 작성 기법을 Atomic CSS 방법론이라고 한다.

<br>
<br>

### 2-2. CSS layout (flexbox)

---

- flexbox로 레이아웃을 구성한다는 것은, 박스를 유연하게 늘리거나 줄여 레이아웃을 잡는 방법이다.

  ```html
  <div id="outer">
    <div class="box">box1</div>
    <div class="box">box2</div>
    <div class="box">box3</div>
  </div>
  ```

  ```css
  #outer {
    display: flex;
    border: 1px dotted red;
    padding: 10px;
  }

  .box {
    border: 1px solid green;
    padding: 10px;
  }
  ```

![스크린샷, 2021-08-03 11-34-39](https://user-images.githubusercontent.com/83164003/127948605-5b677868-0775-4312-846c-2c310b39c343.png)

- 부모 박스요소에 display: flex를 적용해, 자식 박스의 방향과 크기를 결정한다. 기본값으로, display: flex가 적용된 부모 박스의 자식 요소는 왼쪽부터 차례대로 이어 배치된다.

- 반드시 알아두기: grow(팽창 지수), shrink(수축 지수), basis(기본 크기)

  - 자식 박스에 어떠한 속성도 주지 않으면, `flex: 0 1 auto;` 기본값이 적용됩니다.

- grow, shrink 속성은 단위가 없고, 비율에 따라 결과가 달라진다. 부모 박스 안에 n개의 자식 박스가 있다고 가정하고 각 자식 박스가 갖는 grow값의 총 합이 n이라면, grow 속성의 값을 1로 설정하는 것은 1/n 가로 또는 세로길이를 적용한다는 의미이다.

---

```html
<div id="outer">
  <div class="box target">.box.target</div>
  <div class="box">.box</div>
  <div class="box">.box</div>
</div>
```

```css
.target {
  flex: 1 1 auto;
}
```

![스크린샷, 2021-08-03 11-41-43](https://user-images.githubusercontent.com/83164003/127949162-69b3778e-7417-46e9-9fd4-f69cefdfed57.png)

<br>

- `flex-grow : 1` 이다. `box.target`은 부모 박스의 가로 길이 중에서 남은 빈 영역만큼 늘어나게 된다. 위 설명대로라면 전체 자식요소가 가진 grow 값의 합은 1+0+0 = 1이므로, `box.target`의 가로 크기는 1/1 = 100% 이다. 그러나 다른 자식 박스 안에 이미 콘텐츠가 존재하므로, 다른 자식 박스안의 콘텐츠가 담긴 길이를 제외한 나머지 가로 길이가 `box.target`의 가로 길이가 된다.

```css
.target {
  flex: 1 1 auto;
}

.box {
  flex: 1 1 auto;
}
```

- 만약 `.box`의 `flex-grow : 1`로 설정하면, 모든 박스가 늘어나려고(grow) 합니다. 결과적으로 모든 박스가 동일한 비율로 가로 길이가 늘어납니다. (총 grow 값 1+1+1, 각 박스는 1/3씩 크기를 가짐)

  ![스크린샷, 2021-08-03 11-49-27](https://user-images.githubusercontent.com/83164003/127949798-edc91622-22c2-4fdf-8032-4b45af947f10.png)

<br>

- **shrink**는 grow와 반대로, 설정한 비율만큼 박스 크기가 작아진다. 그러나 flex-grow 속성과 flex-shrink 속성을 함께 사용시 flex-shrink 속성은 width나 이후 설명할 flex-basis 속성에 따른 비율이므로 실제 크기를 예측하기가 어렵게 된다. *flex-grow 속성으로 비율을 변경하는 경우, flex-shrink 속성은 기본값인 1로 두어도 무방*하다.

- **basis**는 자식박스가 flex-grow나 flex-shrink에 의해 늘어나거나 줄어들기 전에 가지는 *기본 크기*이다.

<br>
<br>

### 2-3. CSS layout (flexbox 콘텐츠 정렬 방법)

---

- Flexbox를 원하는대로 제어하기 위해서는 axis(축)의 개념에 대한 이해가 필요하다. axis는 `main axis` 와 `cross axis`로 구분된다.
  - `main axis`는 flex-direction 속성에 의해서 결정된다. flex-direction의 기본 값인 row 인 상태일 때 main axis 는 가로축(가로축이 default)이 된다.
  - `cross axis`는 여러 개의 main axis와 수직을 이루는 방향입니다. main axis가 가로일 때 cross axis는 세로가 됩니다.

---

![스크린샷, 2021-08-03 10-54-00](https://user-images.githubusercontent.com/83164003/127945320-113288ab-1eee-41b8-b76e-52b3528d1b7d.png)

- 그렇다면 위의 layout을 flexbox 방식으로 CSS를 구성해보자

```css
* {
  margin: 0;
  padding: 0;
  font-size: large;
  box-sizing: border-box;
}

#container {
  display: flex;
  margin: 0.4rem;
  padding: 0.4rem;
  min-height: 100vh;
}

.col {
  display: flex;
  flex-direction: column;
  margin: 0.4rem;
  padding: 0.4rem;
  border: 1px solid red;
}

.icon {
  margin: 0.4rem;
  padding: 0.4rem;
  border: 1px dashed orange;
}

.row {
  margin: 0.4rem;
  padding: 0.4rem;
  border: 1px dashed purple;
}

.w10 {
  flex: 1 0 0;
}

.w20 {
  flex: 2 0 0;
}

.w70 {
  flex: 7 0 0;
}

.h20 {
  flex: 2 0 0;
}

.h40 {
  flex: 4 0 0;
}

.h80 {
  flex: 8 0 0;
}
```

<br>
<br>

### 3. HTML/CSS 목업 와이어프레임 실습

---

- 실습결과 코드는 <a href="https://github.com/JH8459/im-sprint-twittler" target="_blank">GitHub 참조.</a>

<br>
<br>

## 🤔 Understanding

- ` CSS 진짜로 너무너무너무 어렵다.`

  우선 오늘 실습을 해보며 HTML을 이용하여 프레임을짜고, 그 각각의 프레임을 선택자로 구분하여 CSS를 입혀보았다.

  우선 답이 없는 영역이다. HTML로 해당 구성의 프레임을 짜는거까지는 어렵지않았지만 _각 선택자에 들어가는 CSS 요소들을 우선 너무 모른다.. 몰라도 너무 몰라서 검색조차 못하는 단계랄까..??_

  나아지겠지.. 우선 틀을 짜고 선택자로 해당 요소를 컨택한다는 점에서 만족하고 나중에 다시 CSS는 꾸준히..손에 익혀봐야겠다. ~~(나중엔 라이브러리 쓰겠지...)~~

- git repository와 내 local directory 를 오늘 동기화(?) 시켜보았다.

  수업을 들으며 진행하는 예제가 늘어나면서 잡다한(?) repository 및.. 불필요한 fork 된 repository 가 너무 늘었다.

  git repository를 뜯어고쳐서 내 작업공간과 유사하게 셋팅을 해놓았다.

  ![스크린샷, 2021-08-04 00-52-18](https://user-images.githubusercontent.com/83164003/128046858-3294606b-4d1a-4467-8c5f-290bb263654c.png)

  내 작업환경과 유사한 git repository 유지가 필요할 듯 하다. 앞으로 점차 늘어갈 프로젝트 및 실습 데이터들을 관리 유지하는것도 자기관리라 생각해야겠다.

<br>
<br>

```toc

```
