---
emoji: 📚
title: 소비자들과 맞닿는 영역의 CSS
date: '2021-07-23'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. CSS

---

- CSS 문법

  ![css문법](https://user-images.githubusercontent.com/83164003/127822567-a436423c-8884-48ff-8ccf-16009f5f2071.png)

  <br>

- **선택자(selector)** 에는 태그이름이나 id 또는 클래스 등이 올수있다.

  선택자로 특정 요소를 선택할수 있으며, 선택 후 중괄호 안의 선언 블럭에서 이 선택자에 적용 할 내용들을 작성한다.

  - **id**는 한 문서에 단 하나의 id 값을 가질수 있으며 `#` 기호를 이용하여 선택한다.

  - **class**는 동일한 기능을 하는 css를 여러 요소에 적용하기 위해 선택되며 `.` 기호를 이용하여 선택한다.

- 속성은 선택자 안에 요소로써 적용할 수 있는 내용이다. 속성과 값의 끝에는 세미콜론 `;`을 붙여 속성끼리 구분한다.

  - 다양한 속성 값은 해당링크에서 참조하자 <a href="https://developer.mozilla.org/ko/docs/Web/CSS/Reference" target="_blank">CSS 참고서 -MDN</a>.

- **박스모델**은 레이아웃 설계시 가장 주의하여 구성해야 한다. (줄바꿈이 되는 박스(block), 옆으로 붙는 박스(inline, inline-block)가 있기에 설계시 미리 계획 후 설계해야한다.)

  |                             | block |     inline-block     |        inline        |
  | :-------------------------: | :---: | :------------------: | :------------------: |
  |         줄바꿈 여부         |   O   |          X           |          X           |
  | 기본적으로 갖는 너비(width) | 100%  | 글자가 차지하는 만큼 | 글자가 차지하는 만큼 |
  | width, height 사용 가능여부 |   O   |          O           |          X           |

  - 줄바꿈이 되는 태그 : `<h1> <p>`, ... 그 외 태그 알아보기 : <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Block-level_elements" target="_blank">Block-level elements MDN</a>

  - 줄바꿈이 되지 않는 태그 : `<span>`, ... 그 외 태그 알아보기 : <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Inline_elements" target="_blank">Inline elements MDN</a>

- 박스를 구성하는 요소는 다음 그림안의 요소들을 기억하자.

  ![boxmodel](https://user-images.githubusercontent.com/83164003/127825165-68c259bf-b219-4117-84d1-09b0196a8f6f.png)

<br>
<br>

## 🤔 Understanding

- 질문의 중요성

  이제껏 모르는 점들을 구글링만으로 검색을 해보았지만 구글은 너무 다양한 질문들이 존재하였다.

  아고라스테이츠를 보니 나와 비슷한 수준, 비슷한 경험을 가진 사람들이 올린 질문들이 많으니 활용하는게 좋아보인다.

- 이제껏 CSS는 디자이너(?) 의 영역이라 생각하며 소홀히 해왔는데, 잘못생각했다...

  반응형 웹이라던지 소비자들과 맞닿는 영역에서 이뤄지는 CSS도 굉장히 중요하다 생각된다.

- 예를 들면, **오늘의 집**과 **집꾸미기** 사이트를 보면 CSS의 중요성을 한 눈에 볼 수 있다 생각한다. ~~(오늘의집과 집꾸미기는 필자와는 상관없습니다...)~~ (21.07.23 기준 작성)

  ![오늘의집-1](https://user-images.githubusercontent.com/83164003/127821688-a0de6822-3bf4-4da2-9078-671229da40ba.png)

  ![오늘의집-2](https://user-images.githubusercontent.com/83164003/127821760-64cf79cb-d6ee-42e9-9cd4-953404fc476b.png)

  **오늘의 집** 같은 경우는 스크롤을 내려도 구매옵션과 구매란이 따라오는 CSS 디자인은 상품상세설명을 쉽게 보면서 구매까지 소비자가 불편함없이 프로세스가 이어진다.

  ![집꾸미기](https://user-images.githubusercontent.com/83164003/127821976-21435a42-7298-464f-acae-d2780f065456.png)

  반면 **집꾸미기** 같은 경우 스크롤을 내리면 구매옵션과 구매란이 따라 오지 않는 고정된 CSS 디자인이기 때문에 소비자에게 옵션암기(!?) 라는 불편함을 강요를 한다.

  - 구매색상이 마음에 들어 구매하려고 상단으로 올려서 모든 옵션을 다 고른뒤 구매버튼을 누르면 "아 색상이 뭐였지..?" 라는 생각이 다시 떠올라 웹페이지를 다시 내려본다는 등의 불편함이 야기될수 있다.

- CSS 실습 필요. 학습보다는 다양한 `id`, `class`를 선언해가며 속성값을 주는 실습이 필요로해보인다.

- 구글의 기술트렌드 리포트를 보니 과거에는 jQuery 가 주요 기술 트렌드였다면 16~18년도 이후 부터는 그 자리를 React에게 내주었다는 리포트를 오늘 학습도중 알게되었다.

  그렇기에 React는 꾸준히 학습이 필요로 보인다... 아직 찍먹 수준이라 본수업이 다가오기전 매주 주말 통하여 충분한 학습이 필요로 할 듯 하다.

<br>
<br>

```toc

```
