---
emoji: 📚
title: React 상태관리
date: '2021-09-28'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

---

<br>

### 1. React 상태관리

---

<br>
<br>

#### 1-1. 프론트엔드 개발에서의 상태 관리

---

- 우선 상태란 컴포넌트 내부에서 변화되는 값이다.

  특별히 프론트엔드 영역에서는 "동적으로 표현되는 데이터"라 부를 수 있다.

- 우리는 컴포넌트 우선 개발 방식에 대해서 학습했었다.

  > 21.09.07 게시글 <a href="https://blog.jh8459.com/2021-09-07-TIL/2021-09-07-21.09.07.til/" target="_blank">참조</a>

  하향식 데이터 흐름에 따라 `props`를 이용해서 데이터를 전달하며 이는 단방향 데이터 흐름이다.

  따라서 이 "상태"의 위치가 매우 중요하다. 우선 Javascript를 처음 배울 때 처럼 전역 변수와 지역 변수에 처럼 생각을 해보자.

  ![스크린샷, 2021-10-01 17-40-39](https://user-images.githubusercontent.com/83164003/135591336-c6701a05-ae1a-455a-953b-4b162ffbb445.png)

  로컬 상태는 특정 컴포넌트 안에서만 관리되는 상태이며, 전역 상태는 프로덕트 전체 혹은 여러가지 컴포넌트가 동시에 관리하는 상태이다.

  로컬 상태를 구분하는 것은 간단하다. 보통 컴포넌트 내에서만 영향을 끼지는 상태는 로컬 상태를 뜻한다. 그럼 전역 상태는 다른 컴포넌트와 상태를 공유하고 영향을 끼치는 상태를 의미할 것이다.

  전역 상태라는 말은 서로 다른 컴포넌트가 동일한 상태를 다룬다는 뜻이다. 만약 이러한 상황이라면, 이 출처는 오직 한 곳이어야 한다. 만일 사본이 있을 경우, 두 데이터는 서로 동기화(sync)하는 과정이 필요한데, 이는 문제를 어렵게 만들게 된다. 리액트에서는 한 곳의 컴포넌트에서만 상태를 저장하고 접근하는게 데이터를 효과적이고 효율적으로 관리하는 방식이다.

  이를 다르게 말하자면 "**데이터 무결성**을 위해, 동일한 데이터는 항상 같은 곳에서 데이터를 가지고 오도록 해야만 한다" 이다.

  Single source of truth(신뢰할 수 있는 단일 출처) 원칙은 프론트엔드 뿐만 아니라 다양한 곳에서 언급되는 원칙이다.

<br>
<br>

#### 1-2. 상태 관리를 위한 각종 툴

---

![react상태관리](https://user-images.githubusercontent.com/83164003/135709190-62979f91-d525-4b9f-b02a-1a756dccf27b.png)

- 상태 관리에 대해 전반적으로 알아보았다.

  위에서 말했듯이 상태를 전역상태로 관리하는 방식은 **데이터 무결성**을 위해 동일한 컴포넌트에서 관리해야한다. 다른 컴포넌트에서 이 전역상태에 접근하려면 `props`로 데이터를 전달해주어야만 하위 컴포넌트에서도 이 전역상태를 사용할 수 있다. 이 과정이 컴포넌트의 계층 단계가 많은 계층으로 이루어져있다면 매우 불편할 것이다.

  그러한 불편함을 해소하기 위해 이를 도와주는 각종 툴들이 있다. 해당 툴들을 사용함으로써 얻는 이점은 다음과 같다.

  - 첫번째로는 앞서 꾸준히 언급한 전역 상태를 위한 저장소를 제공해 준다.

  - 다음은, `props drilling` 문제를 해결 해준다. 첫번째 이점의 연장선이다. 위에서 언급한 계층 구조에서 `props`로 데이터를 전달해주는 과정을 생략할 수 있게 된다.

- "상태 관리 툴이 반드시 필요할까요?" 라는 질문에는 "아닙니다" 라는 답변을 할 수 있다.

  상태 관리 툴이 없어도 충분히 규모있는 애플리케이션을 만들 수는 있다. 그러므로 장단점을 분명히 인지하고 상태 관리 툴을 써야한다.

  그리고 상태 관리의 기본기라고 볼 수 있는 "상태가 어디에 위치해야 하는지" 라는 개념을 인지하는게 우선이 되어야 한다.

<br>
<br>

#### 1-3. Redux

---

- React에서는 상태와 속성(props)을 이용한 컴포넌트 단위 개발 아키텍처를 배웠다면, Redux에서는 컴포넌트와 상태를 분리하여 관리한다. 상태 변경 로직을 컴포넌트로부터 분리하면, 표현에 집중한 보다 단순한 함수 컴포넌트를 만들 수 있게 된다.

  단순히 말하자면 React에서는 상태를 `Store`라는 별도의 오직하나뿐인 장소에서 관리하게되며, 해당 장소에서 **상태**를 관리하게 된다.

  그렇다면 해당 **상태**들은 어떻게 변경해야할까? 간단히 말하자면 `Action`을 통해서 변화를 감지하며, `Dispatch`메서드를 통하여 `Action`을 전달한다. `Store`에 들어가기전 `Reducer`를 거쳐서 현재의 상태(State)와 전달된 액션이 결합되어 새로운 상태로 변경되게 된다.

  ![redux-data-flow](https://user-images.githubusercontent.com/83164003/135987274-e15321a0-4b43-4ed0-a4f8-07fcdda3f4f4.gif)

  잘 정리된 <a href="https://kyun2da.dev/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/Redux-%EC%A0%95%EB%A6%AC/#%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98-redux-%EC%82%AC%EC%9A%A9%EB%B2%95" target="_blank">블로그</a>가 있어서 해당 링크 참조로 Redux 설명은 대체하겠다.

<br>
<br>

#### 1-4. Cmarket (Hooks 버전)

---

![컴포넌트 구조](https://user-images.githubusercontent.com/83164003/135710533-10497531-2270-4c8a-a2d5-7dd8b72b4caf.jpg)

- 컴포넌트 구조를 감안하여 상태의 위치를 고려하여 코딩하였다.

  - 전역상태(`items`, `cartItems`)는 최상단 컴포넌트 App 컴포넌트에서 관리.

  - Item 컴포넌트에서 `items` 상태를 다루기 위해서는 App - ItemListContainer - Item 컴포넌트까지 상태를 내려줘야 하는 `props drilling` 현상 발생

> 참조 : <a href="https://github.com/JH8459/im-sprint-cmarket-hooks" target="_blank">Github</a> 링크

<br>
<br>

#### 1-5. Cmarket (Redux 버전)

---

> 참조 : <a href="https://github.com/JH8459/im-sprint-cmarket-redux" target="_blank">Github</a> 링크

<br>
<br>

## 🤔 Understanding

---

- 리액트 상태 관리에 대해 집중적으로 학습했다.

  우선 전역 상태라는 개념이 참 와닿았다.

  아무래도 지역 상태로 관리된 `state`들은 컴포넌트를 넘나들 수록 `props`로 전달을 해야하므로 불편한건 사실이니..

- 그래도 우선 기본기인 상태관리를 충분히 학습한 뒤 접근해야겠다!

<br>
<br>

```toc

```