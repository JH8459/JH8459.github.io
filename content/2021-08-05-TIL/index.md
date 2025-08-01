---
emoji: 📚
title: Spread&Rest 문법, 구조분해, JavaScript 핵심문법(스코프, 클로저..) 문제풀이
date: '2021-08-05'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Spread / Reset 문법

---

<br>
<br>

#### 1-1. Spread 문법

---

- 주로 배열을 풀어서 인자로 전달하거나, 배열을 풀어서 각각의 요소로 넣을 때에 사용한다.

  ```javascript
  function sum(x, y, z) {
    return x + y + z;
  }

  const numbers = [1, 2, 3];

  sum(...numbers); // typeof(sum) = 'number'
  ```

<br>
<br>

#### 1-2. Rest 문법

---

- 파라미터(함수의 매개변수)를 배열의 형태로 받아서 사용할 수 있습니다. 파라미터 개수가 가변적일 때 유용합니다.

  ```javascript
  function sum(...theArgs) {
    return theArgs.reduce((previous, current) => {
      return previous + current;
    });
  }

  sum(1, 2, 3); // 6
  sum(1, 2, 3, 4); // 10
  ```

<br>
<br>

#### 1-3. 배열에서의 Spread 문법

---

- Spread 문법은 배열에서 강력한 힘을 발휘한다.

  <details>
  <summary>배열 합치기</summary>

  ```javascript
  let parts = ['shoulders', 'knees'];
  let lyrics = ['head', ...parts, 'and', 'toes'];
  ```

  ```javascript
  let arr1 = [0, 1, 2];
  let arr2 = [3, 4, 5];
  arr1 = [...arr1, ...arr2]; // spread 문법은 기존 배열을 변경하지 않으므로(immutable), arr1의 값을 바꾸려면 새롭게 할당해야 한다.
  ```

  </details>

  <details>
  <summary>배열 복사</summary>

  ```javascript
  let arr = [1, 2, 3];
  let arr2 = [...arr]; // arr.slice() 와 유사
  ```

  </details>

<br>
<br>

#### 1-4. 객체에서 사용하기

---

```javascript
let obj1 = { foo: 'bar', x: 42 };
let obj2 = { foo: 'baz', y: 13 };

let clonedObj = { ...obj1 };
let mergedObj = { ...obj1, ...obj2 }; // {foo: "baz", x: 42, y: 13}
```

- 객체의 key의 이름이 중복될 경우 후속 spread 문법을 따른다.

<br>
<br>

#### 1-5. 함수에서 나머지 파라미터 받아오기

---

```javascript
function myFun(a, b, ...manyMoreArgs) {
  console.log('a', a);
  console.log('b', b);
  console.log('manyMoreArgs', manyMoreArgs);
}

myFun('one', 'two', 'three', 'four', 'five', 'six');
```

<br>
<br>

### 2. 구조 분해 (Destructing)

---

- 구조 분해 할당은 Spread 문법을 이용하여 값을 해체한 후, 개별 값을 변수에 새로 할당하는 과정을 말한다.

<br>
<br>

#### 2-1. 분해 후 새 변수에 할당

---

- 배열

  ```javascript
  const [a, b, ...rest] = [10, 20, 30, 40, 50];

  a; // 10 | typeof(a)="number"
  b; // 20
  rest; // (3), [30, 40, 50] | Array.isArray(rest)=true
  ```

- 객체

  ```javascript
  const { a, b, ...rest } = { a: 10, b: 20, c: 30, d: 40 };

  a; // 10
  b; // 20
  rest; // {c: 30, d: 40}
  ```

- 함수

  ```javascript
  function whois({ displayName: displayName, fullName: { firstName: name } }) {
    console.log(displayName + ' is ' + name);
  }

  let user = {
    id: 32,
    displayName: 'KJH',
    fullName: {
      firstName: 'JeongHyun',
      lastName: 'KIM',
    },
  };

  whois(user); // KJH is JeongHyun
  ```

<br>
<br>

### 3. JavaScript 문제풀이

---

- 풀이 코드는 <a href="https://github.com/JH8459/im-sprint-javascript-koans" target="_blank">Github 참조</a> 자바스크립트 핵심문법(클로저,스코프..등등) 문제풀이

<br>
<br>

## 🤔 Understanding

- JavaScript 문제풀이중 _얕은 복사, 깊은 복사_ 개념이 머릿속에 들어오지않았다. 우선 해당 개념파악을 하려면 조금더 JS에서 필요한 학습내용이 뒤 따랐다. (Iterable, 재귀함수..등) 이 문제를 가지고 씨름하기보다는 check 해두기 위해 따로 포스팅 카테고리를 만들어두었다.

  다음주 중으로 다시한번 필요한 선행 내용 학습후 다시 되짚어보겠다.

- Github Repository를 깔끔히 정리하기 위해 CodeStates에서 학습한 내용들은 한 폴더에 묶어 관리하고싶어서 정리를 해두었다.

  Github 구성이 내 local 영역과 일치하게끔 구성을 한줄 알았다.. 그런데 fork 한 repository가 컨트롤이 안되는 문제를 겪었다.

  우선 큰 문제점은 _fork한 저장소는 원본(원래 Repository 주인)과 연결되어 있다._ 라는 전제가 깔려있기 때문인듯 한데, 아직 정확한 내용을 찾지 못하여서 난항중이다.. 폴더를 한폴더에 묶어서 관리하려는건 아직 능숙하지 않기때문에 개별 repository로 다시 fork 하여 구성하였으며, local 영역또한 clone 하여 동일한 환경으로 구성해두었다. 정확히 브런치 부분이 문제인지는 모르겠지만, 브런치 부분을 조금 더 학습 후 다시한번 도전해봐야겠다.

- fork 해온 저장소는 나의 작업환경과는 다르기에, **fork -> clone -> npm install** 을 거쳐야 동일한 환경에서 결과물을 볼수있다. 이미 학습한 내용인데, 막상 오늘도 fork 하여 clone 하여 local영역에서 작업할 때 package.json 을 활용하지 않는 나의 모습을 보았다. 아직 외부 저장소 파일을 가져와서 작업하는 경우가 적어서 그런듯하니 점차 습관하 하는게 중요할 듯 하다.

<br>
<br>

```toc

```
