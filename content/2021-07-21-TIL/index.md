---
emoji: 📚
title: 문자열, 호이스팅, React
date: '2021-07-21'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 문자열

---

- 문자열은 배열처럼 요소 하나씩 접근이 가능하다. index로 접근은 가능하지만 쓸 수는 없다는 **(read-only)** 특징을 가진다.
- 문자열은 + 연산자를 쓸 수 있다. **string 타입과 다른 타입 사이에 + 연산자를 쓰면, string 형식으로 변환**된다. (toString)
- 문자열의 표현방식중 템플릿 리터럴은 내장된 표현식을 허용하는 문자열 리터럴이다. 여러 줄로 이뤄진 문자열과 문자 보간기능을 사용할 수 있다. 이전 버전의 ES2015사양 명세에서는 "template strings" (템플릿 문자열) 라고 불려 왔다.
  ES6는 **템플릿 리터럴(Template literal)** 이라고 불리는 새로운 문자열 표기법을 도입하였다. 템플릿 리터럴은 일반 문자열과 비슷해 보이지만, ‘ 또는 “ 같은 통상적인 따옴표 문자 대신 _백틱(backtick) 문자 `_ 를 사용한다.

  ```javascript
  var a = 5;
  var b = 10;
  console.log('Fifteen is ' + (a + b) + ' and \n not ' + (2 * a + b) + '.');
  // "Fifteen is 15 and
  // not 20."

  var a = 5;
  var b = 10;
  console.log(`Fifteen is ${a + b} and
  not ${2 * a + b}.`);
  // "Fifteen is 15 and
  // not 20."
  ```

  <br>
  <br>

### 2. 호이스팅

---

- 함수 안에 있는 선언들을 모두 끌어 올려서 해당 함수 **유효범위(scope)의 최상단에 선언**하는 것을 말한다.
- 자바스크립트 해석기(parser)는 함수가 실행 되기전 해당 함수를 한 번 훑는다.
- 함수 안에 존재하는 변수/함수선언에 대한 정보를 기억하고 있다가 실행시킨다.
- 이는 실제로 메모리 변화라던지, 코드가 끌어 올라가는 물리적 이동이 아닌, 자바스크립트 해석기 내부적으로 끌어올려서 처리하는것이므로 **코드의 물리적 변화는 이뤄지지 않는다.**
- **var 변수 선언**과 **함수 선언**문 에서만 호이스팅이 일어난다.
- var 변수 / 함수의 선언만 위로 끌어 올려지며, **할당은 끌어 올려지지 않는다**.
- 코드의 가독성과 유지보수를 위해 호이스팅은 가급적 일어나지 않도록 해야 한다.

  - 호이스팅을 잘 모르더라도 함수와 변수의 선언은 가급적 코드 상단부에서 이뤄지게끔 하자.
  - var 선언 방식은 불분문한 호이스팅의 주범이다. let/const 선언방식을 써서 불분문한 호이스팅이 이뤄지지 않게끔 통제가 필요하다.

  <br>
  <br>

### 3. react ~~찍먹~~

---

- 생활코딩 React 수업을 진행하며 첫 챕터부터 가장 많이 들은 단어는 **'가독성', '재사용성', '유지보수'** 이다. 세 단어 모두 다르지만 맥락은 비슷하다. Component를 어떻게 분리하며, 재사용 하는지가 이번 수업의 핵심이라 생각이 든다.

  - jsx (facebook 에서 개발된 유사 js) 를 이용한 효율적인 코딩.
  - component 를 통한 가독성 향상
  - build 를 통한 효율적인 네트워크 리소스 관리 이점.

<br>
<br>

## 🤔 Understanding

- ZOOM 협업은 어제보다 익숙하다, 확실히 조건문부터는 코드풀이 난이도가 급 상승하였다. 좀더 간결하게 코드를 짜보자는 pair 와 의견을 나누고나서 코드의 재사용화, 다양한 기존 함수나 메소드를 통하여 간결한 문장 생성을 하려고 pair와 소통하다보니 주어진시간이 짧게 느껴졌다.

- pair에게 배울점이 많았다. 우선 같은 문항을 보았을때 짧은 시간내에 도출해 내는 의견들이 대게로는 비슷하였지만, 풀이과정에서 다른 방식으로 접근할 때가 있었다. 해당 부분은 전혀 생각지 못한 부분들도 있었으며, 생각은 해보았지만 어느 순간 막혀서 포기했던 접근방식들 또한 있었다. 이러한 생각을 공유할 수 있는 경험은 좋은 경험이었다.

- 2015년 이후 ES6에서 새롭게 추가되었다는 방식의 템플릿 리터럴을 오늘 처음 접하였다. 기존 es5 이전에서는 템플릿 문자열로 불려 왔는데, 이는 문법 정도로 해석하면 될 듯 하다. 기존 쓰는 방식인 표현식 삽입법은 직관적이지 않다는 단점과, 코드 작성 자체의 불편함이 공존하였다, 하지만 ES6 이후 템플릿 리터럴을 사용하게 되면, 이를 더욱 읽기도 쉬우며 코드 작성 또한 직관적이고 편리하게 관리 할 수 있게 되었다.

  ```javascript
  let name = 'KJH';
  let age = 32;
  console.log(name + 'is' + age + ' years old.'); // KJH is 32 years old.
  console.log(`${name} is ${age} years old.`); // KJH is 32 years old.
  ```

- 그 외 ES6 이후 편리한 점은 호이스팅 (Hoisting) 이라는 개념이다. 자세한 개념은 위 학습한 내용에 기술해두었다. 개념만 말하자면, 변수 및 함수 선언이 작성한 코드의 상단으로 옮겨진다는 개념이다. 물론 실제로는 그렇지는 않지만 이정도로만 해석하고 넘어가도록 하자.

<br>
<br>

```toc

```
