---
emoji: 📚
title: 고차함수
date: '2021-08-10'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 고차함수

---

<br>
<br>

#### 1-1. 일급 객체

---

- 자바스크립트에는 특별한 대우를 받는 일급 객체가 있다. 대표적인 일급 객체 중 하나가 함수이다.

  > - 변수에 할당(assignment) 할 수 있다.
  > - 다른 함수의 인자(argument)로 전달될 수 있다.
  > - 다른 함수의 결과로서 리턴될 수 있다.

- 함수를 변수에 할당할 수 있기 때문에, 함수를 배열의 요소나 객체의 속성값으로 저장할 수 있다. 이는 함수를 데이터(`string`, `number`, `boolean`, `array`, `object`)를 다루듯이 다룰 수 있다는 걸 의미한다.

  > - 변수에 할당(assignment) 할 수 있다.

- 이미 함수를 변수에 저장하는 방법(함수 표현식)은 학습하였다.

  ```javascript
  /*
   * 자바스크립트에서 함수는 일급 객체이기 때문에 변수에 저장할 수 있다.
   * 함수 표현식은 할당 전에 사용할 수 없다.
   */

  const square = function (num) {
    return num * num;
  };

  // square에는 함수가 저장되어 있으므로 (일급 객체), 함수 호출 연산자 '()'를 사용할 수 있다.
  output = square(7);
  console.log(output); // --> 49
  ```

- 위의 함수 표현식(function expression)은 함수 선언식(function declaration)과 다르게 호이스팅(Hoisting)이 적용되지 않는다.

- 함수 선언식의 호이스팅에 지나치게 의존하면, 코드의 유지 보수가 쉽지 않다. 코드 리뷰나 디버깅을 할 때, 코드를 위아래로 왔다 갔다 하게 될 수 있게되기 때문이다.

  반면에 함수 표현식은 함수의 할당과 실행의 위치에 따라 결과가 달라지기 때문에, 코드의 위치를 어느 정도 예측할 수 있기때문에 직관적이다.

  호이스팅을 제외하면, 함수 선언식과 함수 표현식은 크게 차이가 없지만, 함수 표현식의 경우는 함수가 변수에 저장될 수 있다는 사실을 보다 분명하게 보여 준다.

<br>
<br>

#### 1-2. 고차 함수란?

---

- 고차 함수(higher order function)는 함수를 인자(argument)로 받을 수 있고, 함수의 형태로 리턴할 수 있는 함수이다

  위에서 보았듯이 함수는 변수에 담길 수 있으며 함수는, 함수를 담은 변수를 인자로 또한 전달받을 수 있다.

  마찬가지로, 함수 내부에서 변수에 함수를 할당할 수 있으며 이 변수를 리턴함으로써 함수는 함수 자체를 리턴할수 있게 된다.

  이때 다른 함수(caller)의 인자(argument)로 전달되는 함수를 **콜백 함수(callback function)** 라고 한다.

  - 다른 함수를 인자로 받는 경우

    ```javascript
    function double(num) {
      return num * 2;
    }

    function doubleNum(func, num) {
      return func(num);
    }

    /*
     * 함수 doubleNum은 다른 함수를 인자로 받는 고차 함수이다.
     * 위 함수 func는 함수 doubleNum의 콜백 함수이다.
     * 아래와 같은 경우, 함수 double은 함수 doubleNum의 콜백 함수이다.
     */

    let output = doubleNum(double, 4);
    console.log(output); // 8
    ```

  - 함수를 리턴하는 경우

    ```javascript
    function adder(added) {
      return function (num) {
        return num + added;
      };
    }

    /*
     * 함수 dder는 다른 함수를 리턴하는 고차 함수이다.
     * adder는 인자 한 개를 입력받아서 함수(익명 함수)를 리턴한다.
     * 리턴되는 익명 함수는 인자 한 개를 받아서 added와 더한 값을 리턴한다.
     */

    let output = adder(5)(3);
    console.log(output); // 8

    // adder가 리턴하는 함수를 변수에 저장할 수 있습니다.
    const add3 = adder(3);
    output = add3(2);
    console.log(output); // -> 5
    ```

  - 함수를 인자로 받고, 함수를 리턴하는 경우

    ```javascript
    function double(num) {
      return num * 2;
    }

    function doubleAdder(added, func) {
      const doubled = func(added);
      return function (num) {
        return num + doubled;
      };
    }

    /*
     * 함수 doubleAdder의 인자 func는 함수 doubleAdder의 콜백 함수이다.
     * 함수 double은 함수 doubleAdder의 콜백으로 전달되었다.
     */

    doubleAdder(5, double)(3);

    // doubleAdder가 리턴하는 함수를 변수에 저장할 수 있습니다. (일급 객체)
    const addTwice3 = doubleAdder(3, double);
    addTwice3(2); // 8
    ```

<br>
<br>

#### 1-3. 내장 고차함수

---

> **filter** : 배열의 filter 메소드는, 모든 배열의 요소 중에서 특정 조건을 만족하는 요소를 걸러내는 메소드이다. 예를 들어 `number` 타입을 요소로 갖는 배열에서 짝수만을 걸러내거나, 18 보다 작은 수만을 걸러낼 수 있다. `string` 타입을 요소로 갖는 배열에서, 길이가 10 이하인 문자열만 걸러내거나, 'korea'만 걸러낼 수도 있다.

> **map** : 맵은 배열의 각 요소가 특정 논리(함수)에 의해 다른 요소로 지정(map) 되는 내장 함수이다.

```javascript
let arr = [1, 2, 3];
let result = arr.map(function (ele) {
  return ele * 2;
});

result; // [2,4,6]
```

> **reduce** : 배열의 각 요소를 특정 방법(함수)에 따라 원하는 형태로 응축하는 메소드이다.

```javascript
function joinName(resultStr, user) {
  resultStr = resultStr + user.name + ', ';
  return resultStr;
}

let users = [
  { name: 'Tim', age: 40 },
  { name: 'Satya', age: 30 },
  { name: 'Sundar', age: 50 },
];

users.reduce(joinName, '');
```

<br>
<br>

### 2. 고차함수 코플릿

---

> 함수들을 입력받아 함수들이 입력된 차례대로 결합된 새로운 함수를 리턴해야 한다.

```javascript
function square(num) {
  return num * num;
}

function add5(num) {
  return num + 5;
}

function mul3(num) {
  return num * 3;
}

output = pipe(square, add5, mul3);
console.log(output(4)); // --> 63
```

---

- 수도코드

  1. num을 매개변수로 가지는 함수로 return 해야 한다.
  2. 전달 받는 인자(함수)는 `...spread` 문법을 통하여 배열 형태로 전달받는다.
  3. 각 함수에는 같은 최초 전달된 `num`값이 필요하다. (But, 내부 함수에서 `num`을 그대로 return 한다면 `num`값이 변질될 수 있다)
  4. 그러므로 내부 함수에 `let` 키워드로 변수를 선언하여, 함수 스코프 내에서 `num`을 할당 후 값을 보존한다.
  5. for문으로 `...spread` 문법을 통하여 전달받은 배열 안의 함수 인자들을 해석하여 return 해준다.

  <br>

  ```javascript
  function pipe(...funcs) {
    // spread로 인자(함수)들을 배열 형태로 전달받는다.
    return function (num) {
      // 함수를 리턴한다.
      let innerNum = num; // 최초 num 값으로 첫 함수계산을 시작한다.
      for (let i = 0; i < funcs.length; i++) {
        // 외부함수의 매개변수(함수 인자) 탐색
        innerNum = funcs[i](innerNum); // 내부 함수의 계산 결과 값을 innerNum에 쌓아 나아감
      }
      return innerNum;

      /* i 인덱스마다 innerNum 값 변화
       * i = 0 => innerNum = 16
       * i = 1 => innerNum = 21
       * i = 2 => innerNum = 63
       */
    };
  }
  ```

<br>
<br>

## 🤔 Understanding

- 고차함수.. 개념은 알겠다. 😮‍💨

  우선 오늘 풀어본 문제들로 감은 잡았다.. 그게 전부이다.

  활용할 수 있을까? 란 생각이 든다. 어서 내꺼로 만드는 노력을 해야겠다.

- 아침에 풀다 막힌 코플릿을 저녁에도 풀어보았는데 또 막힌다(?).

  다시 한번 포스팅까지 해서 복기를 하였다.

  머리로 수도코드 등 바로바로 그려지는 단계까지 가질 않는다. 광복절 연휴까지 있어서 주말이 길기때문에, 주말까지 반복 학습이 필요할 듯 하다.

<br>
<br>

```toc

```
