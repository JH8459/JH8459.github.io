---
emoji: 📚
title: 배열, 객체
date: '2021-07-30'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 배열

---

- 배열은 순서가 있는 값이다. 순서는 인덱스(index)라고 부르며, 1이 아닌 0부터 매긴다.

  - 배열의 값 접근은 인덱스를 이용하여 값에 접근한다.

- `[]` 대괄호를 이용해서 배열을 만드며, 각각의 원소(element)는 쉼표(comma)로 구분해준다.

  ```javascript
  let myNumber = [73, 98, 86, 61, 96];
  myNumber[3]; // 61
  myNumber[4] = 200; // 배열의 4번째 인덱스의 값을 200으로 변경
  myNumber; // [73, 98, 86, 61, 200];
  ```

- 배열의 속성에 접근하거나 메소드를 추가할때는 `.`(온점)을 이용하여 접근한다.

  - `myNumber.length; // 4` : 온점(dot)을 이용해서 변수가 가지고 있는 속성(property)에 접근할 수 있다.

  - `myNumber.push(98); // myNumber 배열 끝에 96이라는 값을 추가한다` : 온점(dot)을 이용해서 관련된 명령(method)도 실행할 수 있다. 명령을 실행할 때는, 함수를 실행하듯 괄호를 열고 닫는 형태로 실행한다.

<br>
<br>

#### 1-1. 배열의 기초 메소드

---

- Array.isArray : 배열의 기본 type은 "object"이다. 그래서 특정 값이 배열인지 아닌지 `typeof()`로 판별할 수 없다. `Array.isArray()`는 배열인지 아닌지 판별할 수 있는 메소드이다. 반환값은 `boolean` 이다.

  ```javascript
  let num = 10;
  let words = ['피', '땀', '눈물'];
  typeof num; // "number"
  typeof words; // "object"
  Array.isArray(num); // false
  Array.isArray(words); // true
  ```

- push, pop : 배열의 뒤에서 요소를 추가 및 삭제할 수 있다. (mutable)

  ```javascript
  let words = ['피', '땀', '눈물'];
  words.push('BTS'); // 4 (기본 리턴 값은 '.length')
  words; // (4) , ['피', '땀', '눈물', 'BTS') , 원본 값이 바뀐다(mutable).
  words.pop(); // 'BTS' (기본 리턴 값은 삭제된 값이 리턴된다.)
  words; // (3) ["피", "땀", "눈물"]
  ```

- shift, unshift : 배열의 앞에서 요소를 추가 및 삭제할 수 있다. (mutable)

<br>
<br>

### 2. 객체

---

- 객체란 키(key)와 값(value)으로 구성된 프로퍼티(property)의 정렬되지 않은 집합이다.

  - 중괄호를 이용하여 객체를 만드며 그 내부에 키와 값은 쌍으로 구성되며 (key-value paor), 키-값 쌍은 쉼표(comma)로 구분해준다.

  ![object](https://user-images.githubusercontent.com/83164003/128206684-5e9c0467-0ff9-423e-a362-c1ed5b050ecd.png)

<br>
<br>

#### 2-1. 객체의 사용

---

- 객체의 값을 사용하는 방법은 두 가지가 있다.

  ```javascript
  let user = {
    firstName: 'JeongHyun',
    lastName: 'Kim',
    email: 'kk_ong2233@naver.com',
    city: 'Seoul',
  };
  ```

- Dot notation : 객체명 뒤에 `.`을 통하여 key값에 접근한다.

  ```javascript
  user.firstName; // 'JeongHyun'
  user.city; // 'Seoul'
  ```

- Bracket notation : 객체명 뒤에 `[]` 대괄호 안 값이 문자열처럼 `''` 안에 들어가야한다.

  ```javascript
  user['firstName']; // 'JeongHyun'
  user['city']; // 'Seoul'
  ```

- 키 값이 **동적**일 경우에는 브라켓 노테이션을 반드시 사용한다.

  ```javascript
  let person = {
    name: 'Kim',
    age: 20,
  };

  function getProperty(obj, propertyName) {
    return obj[propertyName];
  }

  let output = getProperty(person, 'name'); // 'Kim'
  let output = getProperty(person, 'age'); // '20'
  ```

<br>
<br>

#### 2-2 객체의 추가/삭제 및 확인

---

- dot/bracket notation을 이용해 값을 **추가할** 수 있다.

  ```javascript
  user.age = '20'; // user 객체에 age = '20' 의 키값쌍 추가
  user['city'] = 'Seoul';
  ```

- delete 키워드를 이용해 **삭제**가 가능하다.

  ```javascript
  delete user.age; // user 객체에 있는 age 키 제거
  ```

- in 연산자를 이용해 해당하는 키가 있는지 **확인**할 수 있다.

  ```javascript
  'age' in user; // false
  'city' in user; // true
  ```

<br>
<br>

## 🤔 Understanding

- 배열은 문자열과 유사하다. 문자열은 원본을 수정하지 않았기에 문자열을 복사해서 가져온뒤 작업을 많이하였다.

  하지만 배열에서는 원본을 바꾸는지 여부가 중요하다 _(mutable 여부)_. 무분별한 원본값을 바꾸는 행위는 예상치 못한 버그(?)를 야기시킬수 있기에 잘 생각한 뒤 사용해야 할것같다.

<br>
<br>

```toc

```
