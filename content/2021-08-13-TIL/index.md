---
emoji: 📚
title: React Props & State
date: '2021-08-13'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. React Props & State

---

<br>
<br>

#### 1-1. Props vs State

---

- 간단하게 언급하고 가자면, `props`는 외부로 부터 전달받은 값이며, `state`는 컴포넌트 내부에서 변화하는 값이다.

<br>
<br>

#### 1-2. Props

---

- 컴포넌트의 속성(property)을 뜻한다. `props`는 변하지 않는 **외부로부터 전달받은 값**으로, 웹 어플리케이션에서 해당 컴포넌트가 가진 속성에 해당된다.

- 이 해당 컴포넌트의 속성은 부모 컴포넌트(상위 컴포넌트)로부터 전달받은 값이다.

  _React 컴포넌트는 JavaScript 함수와 클래스로, props를 함수의 전달인자(arguments)처럼 전달받아 이를 기반으로 화면에 어떻게 표시되는지를 기술하는 React 엘리먼트를 반환한다. 따라서, 컴포넌트가 최초 렌더링될 때에 화면에 출력하고자 하는 데이터를 담은 초기값으로 사용할 수 있다._

- `props`의 자료형은 객체 형태이다. `props`로 어떤 타입의 값도 넣어 전달할 수 있도록 `props`는 객체의 형태를 가진다.

  또한, `props`는 외부로부터 전달받아 변하지 않는 값입니다. 그래서 `props`는 함부로 변경될 수 없는 **읽기 전용(read-only) 객체**이다. 함부로 변경되지 않아야 하기 때문이다.

  > 읽기 전용 객체가 아니라면 `props`를 전달받은 하위 컴포넌트 내에서 `props` 를 직접 수정 시 `props`를 전달한 상위 컴포넌트의 값에 영향을 미칠 수 있게 된다.
  >
  > 즉, 개발자가 의도하지 않은 _side effect_ 가 생기게 되고 이는 React의 단방향, _하향식 데이터 흐름 원칙(React is all about one-way data flow down the component hierarchy)_ 에 위배된다.

- `props`를 사용하는 방법은 아래와 같이 3단계로 구분할 수 있다.

  1. 하위 컴포넌트에 전달하고자 하는 값(data)과 속성을 정의한다.

  2. props를 이용하여 정의된 값과 속성을 전달한다.

  3. 전달받은 props를 렌더링한다.

  ```javascript
  function Parent() { {/* 부모 컴퍼넌트 */}
  return (
    <div className="parent">
      <h1>I'm the parent</h1>
      <Child text={"I'm the child"} />
      {/* 1-1. text라는 속성을 선언하고, 이 속성에 문자열 값을 할당하여 Child 하위 컴포넌트에 전달 */}
      <Child>I'm the child</Child>
      {/* 1-2. 태그사이에 value 를 넣어 전달할 수도 있다. */}
    </div>
  );
  }

  function Child(props)
  {/* 2. 함수에 인자를 전달하듯 props를 자식 컴퍼넌트에게 전달 */}
  return (
    <div className="child">
      <p>{props.text}</p>
      {/* 3-1. 전달 받은 props를 렌더링. (props는 객체므로 key값 "text"를 닷노테이션(dot notation) 방식으로 접근하여 렌더링해준다.) */}
      <p>{props.childeren}</p>
      {/* 3-2. 전달 받은 props를 렌더링. (props.children을 이용하면 해당 value에 접근하여 사용할 수 있다.) */}
    </div>
  );
  }
  ```

<br>
<br>

#### 1-3. State

---

- 컴포넌트 내부에서 변할 수 있는 값, 즉 상태는 React State로 다뤄야 한다.

- React에서는 state 를 다루는 방법 중 하나로 React에서 제공하는 **useState** 라는 특별한 함수를 불러와서 사용해야 한다.

  ```javascript
  import { useState } from 'react';
  ```

- 체크박스로 컴포넌트 내부에서 상태의 변화를 담아보자.

  ```javascript
  import React, { useState } from 'react';
  {
    /* import useState */
  }

  function CheckboxExample() {
    const [isChecked, setIsChecked] = useState(false);
    {
      /* 새로운 state 변수(isChecked)를 선언 */
    }
    {
      /* 문법적으로 보면 useState의 리턴값(배열)을 구조 분해 할당한 [isChecked, setIsChecked] 변수 */
    }

    const handleChecked = (event) => {
      setIsChecked(event.target.checked);
    };
    {
      /* 핸들러 함수 */
    }

    return (
      <div className="App">
        <input type="checkbox" checked={isChecked} onChange={handleChecked} />
        <span>{isChecked ? 'Checked!!' : 'Unchecked'}</span>
        {/* isChecked 가 boolean 값을 반환하는 함수기 때문에 삼항연산자를 사용하여 true/false 값을 매칭해준다 */}
      </div>
    );
  }

  export default CheckboxExample;
  ```

- 위 코드중 `useState` 함수는 호출시 리턴값은 배열이다. 반환되는 배열의 요소를 살펴보자면, **배열의 0번째 요소는 현재 state 변수이고, 1번째 요소는 이 변수를 갱신할 수 있는 함수**이다.

  ```javascript
  const [state 저장 변수, state 갱신 함수] = useState(상태 초기 값);
  ```

- 위 코드의 예시대로 React 컴포넌트는 state가 변경되면 새롭게 호출되고, 리렌더링 된다.

  이때 React state는 상태 변경 함수(위 예시는 `useState`함수) 호출로 변경해야 한다. 강제로 변경을 시도하면 , 리렌더링이 되지 않는다거나, state가 제대로 변경되지 않는 side effect 가 발생할 수 있다.

<br>
<br>

### 2. React 데이터 흐름

---

- React의 개발 방식의 가장 큰 특징은 페이지 단위가 아닌, **컴포넌트 단위**로 시작한다는 점이 가장 큰 특징이다.

- 데이터의 흐름을 파악할 때에는 부모 컴포넌트에서 props를 이용하여 데이터를 함수의 인자(arguments) 혹은 속성(attributes)처럼 전달 받는 구조로 설계해야한다. 전달하는 주체는 부모이기 때문에 데이터 흐름 방식은 하향식 (top-down)임을 의미한다.

  이러한 **단방향 데이터 흐름 (One-way data flow)** 이라는 키워드가 React를 대표하는 설명 중 하나일 정도이다.

- React 에서 데이터를 다룰 때는 컴포넌트들간의 상호 관계와 데이터의 역할, 데이터의 흐름을 고려하여 위치를 설정해야 한다.

<br>
<br>

### 3. React Props & States 실습

---

> <a href="https://github.com/JH8459/im-sprint-react-twittler-state-props" target="_blank">참조 : Github</a>

<br>
<br>

## 🤔 Understanding

- React `props` 전달시 부모에서 자식으로 객체로 전달이된다..

  개념은 알것같지만 이해의 영역은 조금 더 다양한 실습을 해봐야 할듯하다.

<br>
<br>

```toc

```
