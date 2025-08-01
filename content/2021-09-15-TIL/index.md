---
emoji: 📚
title: CDD, CSS in JS 방법론, React Custom Component
date: '2021-09-15'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Component Driven Development (CDD)

---

- 부품 단위로 UI 컴포넌트를 만들어 나가는 개발이다.

  페이지 단위로 UI 개발이 이루어지는 것과는 반대로 UI 컴포넌트들부터 만들고 이를 기반으로 페이지를 구성하는걸 말한다.

  ![스크린샷, 2021-09-25 17-28-15](https://user-images.githubusercontent.com/83164003/134765002-85187ace-81db-4807-837e-d171c8a4efe3.png)

  <a href="https://storybook.js.org/" target="_blank">Storybook</a> 같은 UI 컴포넌트 익스플러어 툴을 통해 체계적으로 관리, 개발자들간 쉽게 소통할 수 있는 장점이 있다.

<br>
<br>

### 2. CSS in JS 방법론

---

<br>
<br>

#### 2-1. 구조적인 CSS 작성 방법의 발전

---

- CSS 작성 방식도 꾸준히 진화해 오고 있다.

  ![스크린샷, 2021-09-27 00-25-15](https://user-images.githubusercontent.com/83164003/134814144-584fee4d-e69e-4391-97ff-a71850f8a3ce.png)

  프로젝트의 규모나 복잡도가 점점 커지고 함께 작업해야할 팀원 수도 많아짐에 따라 CSS를 작성하는 일관된 패턴이 없다는 것은 개발자들에게 가장 큰 걸림돌이 되었다.

  또한 모바일이나 태블릿을 비롯한 다양한 디바이스들의 등장으로 웹사이트들이 다양한 디스플레이를 커버해야 하기 때문에 CSS는 더 복잡해지게 되었다.

  따라서 CSS 작업을 효율적으로 하기 위해 구조화된 CSS의 필요성이 대두되었다.

- 이러한 문제점들을 해결하기 위해 CSS 전처리기(CSS Preprocessor)라는 개념이 등장했다.

  CSS 전처리기(CSS Preprocessor)란 CSS가 구조적으로 작성될 수 있게 도움을 주는 도구이다.

- CSS 전처리기 중에서 가장 유명한 SASS(Syntactically Awesome Style Sheets)는 CSS를 확장해 주는 스크립팅 언어이다.

  ![스크린샷, 2021-09-27 00-37-20](https://user-images.githubusercontent.com/83164003/134814581-960d8e3e-57c0-488b-8dd4-9294278560c1.png)

  자바스크립트처럼 특정 속성(ex. `color`, `margin`, `width` 등)의 값(ex. `#ffffff`, `25rem`, `100px` 등)을 변수로 선언하여 필요한 곳에 선언된 변수를 적용할 수도 있고, 반복되는 코드를 한번의 선언으로 여러 곳에서 재사용할 수 있도록 해 주는 등의 기능을 가졌다.

- 하지만 얼마 지나지 않아서 SASS가 ‘CSS의 구조화’를 해결해 주는 것의 장점보다 다른 단점들이 부각되며, BEM(Block, Element, Modifier로 구분하여 클래스명을 작성하는 방법론), OOCSS(Object Oriented CSS 중복을 최소화 하고 캡슐화를 원칙으로 하는 방법론), SMACSS(Scalable Modular Architecture CSS 범주화(categorization)로 패턴화 하고자 하는 방법론) 같은 새로운 CSS 방법론이 대두되었다.

  각각의 장단점이 있으나 결국 세 방법론 모두 같은 지향점을 가지고 있다.

  - 코드의 재사용

  - 코드의 간결화(유지보수 용이)

  - 코드의 확장성

  - 코드의 예측성(클래스 명으로 의미 예측)

  하지만 이러한 방법론들에서도 문제점이 발생하기 시작한다.

  클래스명 선택자가 장황해지고, 이런 긴 클래스명 때문에 마크업이 불필요하게 커지며, 재사용하려고 할 때마다 모든 UI 컴포넌트를 명시적으로 확장해야만 했다.

- 어플리케이션으로 개발 방향이 진화하면서 컴포넌트 단위의 개발은 캡슐화의 중요성을 불러왔다.

  하지만 CSS는 컴포넌트 기반의 방식을 위해 만들어진 적이 한번도 없었다는 문제점이 있었다.

  이러한 문제를 해결하기 위해 CSS도 컴포넌트 영역으로 불러들여야했고, 이러한 문제해결을 위해 **CSS-in-JS**가 탄생해서 이 문제를 정확하게 해결하였다. 대표적인 CSS-in-JS에는 **Styled-Component**가 있다.

<br>
<br>

#### 2-2. Styled-Component

---

- CSS-in-JS 관련 React 라이브러리 중에서 가장 인기 있는 Styled Component는 React 의 컴포넌트 기반 개발 환경에서 스타일링을 위한 CSS의 성능 향상을 위해 탄생하였다. 특징은 아래와 같다.

  - **Automatic critical CSS** : Styled Component 는 화면에 어떤 컴포넌트가 렌더링 되었는지 추적해서 해당하는 컴포넌트에 대한 스타일을 자동으로 삽입한다. 따라서 코드를 적절히 분배해 놓으면 사용자가 어플리케이션을 사용할 때 최소한의 코드만으로 화면이 띄워지도록 할 수 있다.

  - **No class name bugs** : Styled Component 는 스스로 유니크한 `className` 을 생성한다. 이는 `className` 의 중복이나 오타로 인한 버그를 줄여준다.

  - **Easier deletion of CSS** : 기존에는 더 이상 사용하지 않거나 삭제한 컴포넌트에 해당하는 스타일 속성을 제거하기위해 CSS 파일 안의 className을 이리저리 찾아야 했었다. 하지만 Styled Component 는 모든 스타일 속성이 특정 컴포넌트와 연결되어 있기 때문에 만약 컴포넌트를 더 이상 사용하지 않아 삭제할 경우 이에 대한 스타일 속성도 함께 삭제된다.

  - **Simple dynamic styling** : `className`을 일일이 수동으로 관리할 필요 없이 React 의 props 나 전역 속성을 기반으로 컴포넌트에 스타일 속성을 부여하기 때문에 간단하고 직관적이다.

  - **Painless maintenance** : 컴포넌트에 스타일을 상속하는 속성을 찾아 다른 CSS 파일들을 검색하지 않아도 되기 때문에 코드의 크기가 커지더라도 유지보수가 어렵지 않다.

  - **Automatic vendor prefixing** : 개별 컴포넌트마다 기존의 CSS 를 이용하여 스타일 속성을 정의하면 될 뿐이다. 이외의 것들은 Styled Component 가 알아서 처리한다.

<br>
<br>

### 3. React Custom Component

---

> 참조 : <a href="https://github.com/JH8459/im-sprint-react-custom-component" target="_blank">Github</a>

<br>
<br>

## 🤔 Understanding

- CSS 어렵다... 오늘 실습은 React 기술적인 구현은 어렵지 않았지만 CSS를 다루는게 아직 쉽지않다. 정답이 없는 느낌?

<br>
<br>

```toc

```
