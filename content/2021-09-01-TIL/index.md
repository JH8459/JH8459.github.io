---
emoji: 📚
title: 비동기 처리, Node.js
date: '2021-09-01'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 비동기 처리 (Asynchronous processing)

---

- 자바스크립트의 비동기 처리란 특정 코드의 연산이 끝날 때까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 행위를 말한다. 요청에 대한 결과가 동시에 일어나지 않는 특성을 가지고있다.

  ```javascript
  // #1
  console.log('Hello');
  // #2
  setTimeout(function () {
    console.log('Bye');
  }, 3000);
  // #3
  console.log('Hello Again');
  ```

  비동기 처리에 대한 이해가 없는 상태에서 해당 코드를 본다면, JS는 위에서 부터 아래로 한줄씩 읽히기 때문에 `"Hello"`출력 후 3초 뒤 `"Bye" "Hello Again"` 라는 출력이 기대되지만, 실제 결과는 `"Hello" "Hello Again"` 출력 후 3초 뒤 `"Bye"`가 출력된다.

- `setTimeout()`이라는 Web API를 이용한다면 코드를 바로 실행하지 않고 지정한 시간만큼 기다렸다가 로직을 실행할 수 있게되는데 비동기 방식으로 실행되기 때문에, 코드 순서대로 실행되는것이 아니라 일단 `setTimeout()`을 실행 하고 나서 바로 다음 코드인 `"Hello Again"`으로 넘어간 뒤 3초 후 `"Bye"`를 출력하게 된다.

  여기서 발생하는 문제는 `setTimeout()`의 지연시간을 랜덤한 숫자를 준다면 개발자는 위의 코드의 순서를 제어할수 있을까? 비동기 처리는 이처럼 순서 제어가 반드시 필요하다.

<br>
<br>

#### 1-1. 콜백 함수를 통한 비동기 처리

---

- 위의 예시 처럼 비동기 처리는 고유의 처리 방식에 의해 야기될 수 있는 문제들이 존재함을 학습했다.

  이러한 문제들을 해결 하는 여러가지 방법들이 명시되어 있는데 가장 기초적인 해결 방식은 콜백(callback) 함수를 이용하는 것이다.

  ```javascript
  const printString = (string, callback) => {
    setTimeout(() => {
      console.log(string);
      callback();
    }, Math.floor(Math.random() * 100) + 1);
  };

  const printAll = () => {
    printString('A', () => {
      printString('B', () => {
        printString('C', () => {});
      });
    });
  };

  printAll(); // "A" "B" "C"
  ```

  위 코드처럼콜백 함수를 연속하여 사용하여 비동기 처리 로직을 제어 할 수 있다. 특정 로직이 끝났을 때 원하는 동작을 실행하여 순서를 제어 할수 있게 된다.

- 다만 위 방법이 무수히 많이 연속되는 경우엔 콜백 안에 콜백을 계속 무는 형식으로 코딩이 진행되어야 하는 문제점이 발생한다.

  그렇게 된다면 코드 구조는 가독성도 떨어지며 추후 로직을 변경해야 할 필요가 생긴다면 유지보수가 굉장히 어렵다는 단점이 생길 수 있다.

  이러한 콜백을 너무 연속해서 사용 하는 코드 구조를 **콜백 지옥(Callback Hell)** 이라고 부르며 비동기 처리가 많은 코드 구조라면 콜백을 통한 비동기 처리 순서 제어는 알맞지 않다.

<br>
<br>

#### 1-2. Promise 객체를 이용한 비동기 처리

---

- 우선 `Promise`란 비동기 처리에 사용되는 객체이다. <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise" target="_blank">참조 : MDN </a>

  이 `Promise` 객체는 3가지 상태를 가지고 있다.

  1. **Pending(대기)** : 비동기 처리 로직이 아직 완료되지 않은 상태

  2. **Fulfilled(이행)** : 비동기 처리가 완료되어 프로미스가 결과 값을 반환해준 상태

  3. **Rejected(실패)** : 비동기 처리가 실패하거나 오류가 발생한 상태

- **대기(Pending)** 상태는 `new Promise()` 메서드를 호출 하면 대기상태가 되며, 콜백 함수를 선언할 수 있다.

  ```javascript
  new Promise(); // Pending
  ```

  `new Promise()` 메서드를 호출할 때 콜백 함수를 선언할 수 있고, 콜백 함수의 인자는 `resolve`, `reject`이다.

  ```javascript
  new Promise(function (resolve, reject) {
    // 콜백 함수의 인자는 resolve, reject 이다.
  });
  ```

- **이행(Fulfilled)** 상태는 콜백함수의 인자인 `resolve`를 실행하게 되면 이행상태가 된다.

  ```javascript
  new Promise(function (resolve, reject) {
    // Fulfilled
    resolve();
  });
  ```

  그리고 이행 상태가 되면 `then()`을 이용하여 처리 결과 값을 받을 수 있다. ~~(`resolve`는 `then()`과 짝궁)~~

  ```javascript
  function getData() {
    return new Promise(function (resolve, reject) {
      var data = 100;
      resolve(data);
    });
  }

  // resolve()의 결과 값 data를 resolvedData로 받음
  getData().then(function (resolvedData) {
    console.log(resolvedData); // 100
  });
  ```

- **실패(Rejected)** 상태는 콜백 함수 인자로 `reject`를 호출 하면 실패상태가 된다.

  ```javascript
  new Promise(function (resolve, reject) {
    // Rejected
    reject();
  });
  ```

  그리고, 실패 상태가 되면 실패한 이유(실패 처리의 결과 값)를 `catch()`로 받을 수 있다.

  ```javascript
  function getData() {
    return new Promise(function (resolve, reject) {
      reject(new Error('Request is failed'));
    });
  }

  // reject()의 결과 값 Error를 err에 받음
  getData()
    .then()
    .catch(function (err) {
      console.log(err); // Error: Request is failed
    });
  ```

- 위 **"1-1. 콜백 함수를 통한 순서 제어"** ABC 순차 출력 로직 예제를 `Promise`로 구현하자면 다음과 같다.

  ```javascript
  const printString = (string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(string);
        resolve();
      }, Math.floor(Math.random() * 100) + 1);
    });
  };

  const printAll = () => {
    printString('A').then(() => {
      printString('B').then(() => {
        printString('C');
      });
    });
  };

  printAll(); // "A" "B" "C"
  ```

  ~~콜백 지옥(Callback Hell)과 유사하다는 느낌을 지울수 없다.~~ 위 처럼 여러 개의 `Promise`를 연결하는 걸 Promise Chaining 이라 일컫는다.

  위 예제의 **프로미스 체이닝**을 보자면, `printString`함수의 `resolve()` 메서드가 호출되면 프로미스가 **대기 상태**에서 **이행 상태**로 넘어가기 때문에 첫 번째 `.then()`의 로직으로 넘어간다. 첫 번째 `.then()`에서는 임의의 시간 뒤 입력받은 문자열을 출력한 뒤, 그다음 `.then()` 으로 넘겨준다.

  두 번째 `.then()`에서도 마찬가지로 내부 함수 실행 후 그 다음 `.then()`으로 넘겨준다. 그리고 마지막으로 "C"를 출력 한 뒤 `printAll()` 호출은 종료된다.

  > **`then()`을 연결하였는데 왜 `Promise`를 연결한다라고 표현하나?**
  >
  > `then()` 메서드를 살펴보면 **`Promise`를 리턴**하고 두 개의 콜백 함수를 인수로 받는다. 그러므로 `then()`으로 연결 되었지만, 실질적인 리턴값을 보면 프로미스 객체들간의 연결고리인 셈이다.
  >
  > 그 외에도 `then()`의 특징으로 첫번째 인자는 Promise가 이행했을 때, 두번째 인자는 거부했을 때를 위한 콜백 함수이다. 그러므로 `reject - catch` 구문 대신 `then()`의 두번째 인자로 대체하여 사용할 수 있으나, 권장되는 사용 방식은 아니다.

<br>
<br>

#### 1-3. async와 await를 사용한 비동기 처리

---

- 비동기 처리를 위한 await 키워드는 **ECMAScript2017**에 추가되었다.

  자바스크립트의 비동기 처리 패턴 중 가장 최근에 나온 문법이기에 비동기 처리 방식인 콜백 함수와 프로미스의 단점을 보완하고 개발자가 읽기 좋은 코드를 작성할 수 있게 도와준다.

  우선 기본 문법을 보자면,

  ```javascript
  async function 함수명() {
    await 비동기_처리_메서드_명();
  }
  ```

  먼저 함수의 앞에 `async` 라는 예약어를 붙이고, 비동기 처리 코드 앞에 `await`를 붙여준다. 여기서 주의해야 할 점은 비동기 처리 메서드가 반드시 프로미스 객체를 반환해야 `await`가 의도한 대로 작동한다.

- 다시 위의 "ABC" 예제를 `async`와 `await`로 구현 후 살펴보면.

  ```javascript
  const printString = (string) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log(string);
        resolve();
      }, Math.floor(Math.random() * 100) + 1);
    });
  };

  const printAll = async () => {
    await printString('A');
    await printString('B');
    await printString('C');
  };

  printAll(); // "A" "B" "C"
  ```

  위 처럼 간단히 구현이 가능하다.

  `await`를 사용하지 않았다면 데이터를 받아온 시점에 콘솔을 출력할 수 있게 콜백 함수나 .then()등을 사용했었다.

  하지만 `async & await` 문법 덕택에 비동기에 대한 사고를 하지 않아도 되는 개발자에게 편리한 코드 구현 환경을 제공해준다.

- `async & await`에서 예외를 처리하는 방법중 문법적으로 또 다른 요소가 등장한다.

  바로 `try catch`이다. 프로미스에서 에러 처리를 위해 `.catch()`를 사용했던 것처럼 `async`에서는 `catch {}` 를 사용하면 돤다. 자세한 내용은 MDN 문서 <a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Statements/try...catch">try...catch</a>를 참조하자.

<br>
<br>

### 2. Node.js

---

- Node.js는 **"비동기 이벤트 기반 자바스크립트 런타임"** 이다.

  브라우저에서 사용할 수 있는 비동기 흐름은 타이머 혹은 DOM 이벤트와 관련된 상황으로 다소 한정적이다.

  다만, `Node.js`에는 많은 API가 비동기로 작성되어 있다. 이를 통해 비동기 상황을 연출할 수 있다.

- Node.js 에서는 자바스크립트 코드 가장 상단에 require 구문을 이용하여 다른 파일을 불러온다.

  ```javascript
  const fs = require('fs'); // 파일 시스템 모듈을 불러온다.
  const dns = require('dns'); // DNS 모듈을 불러온다

  // 이제 fs.readFile 메소드 등을 사용할 수 있다
  ```

  그 외에도 3rd-party 모듈을 `npm install`을 통하여 사용할 수 있다.

<br>
<br>

#### 2-1. Node.js 모듈 실습

---

- Callback, Promise, Async/awiat 비동기 처리 구현 실습 & Node.js 모듈을 이용한 비동기 처리 실습

  > 참조 : <a href="https://github.com/JH8459/im-sprint-async-and-promise" target="_blank"> Github </a>

<br>
<br>

## 🤔 Understanding

- 비동기 처리 방식의 구현 프로세스 자체는 이해는 갔다. 하지만 실제 코딩은 어떻게해..? 라는 막연함이 많이 들었다.

  원리 & 구조적인 학습이라기 보다는 문법적인 학습내용이 주된 내용이다 보니, 많이 접해봐야 될 듯 하다.

- 혼자 학습으로는 부족함을 느꼈다. ~~(자료구조 Hell... Toy Hell...)~~ 팀 과제 도중 대화도 잘 맞고 경험 많은 페어분을 만나 평일 21~22:00 스터디를 참여하게 되었다.

  우선 1차 목표는 CodeStates 수업 내용 완벽 이해를 위한 질의응답 시간을 가진 뒤, 알고리즘 코드 풀이가 주가 될듯하다.

  솔직히 TOY 알고리즘 생각하기 귀찮아서(!?) 미뤄두는 경향이 컸다. 내 자신에게 반성하며 내일부터 열심히 스터디에 임해야겠다.

- 알고리즘에 익숙해지면 해외 코테 사이트중 <a href="https://leetcode.com/" target="_blank"> 릿코드</a>라는 사이트를 스터디분중 한분이 추천하여, 해당 사이트에서 알고리즘 문제 풀이를 진행 할 예정이다. ~~(죄다 영어네..)~~

<br>
<br>

```toc

```
