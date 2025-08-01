---
emoji: 📚
title: 변수, 타입, 함수, 조건문, HTML
date: '2021-07-20'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 변수

---

- 변수를 이용하면 데이터를 편리하게 저장하고 꺼내 쓸 수 있게 한다.
- 변수의 선언과 값의 할당에 대해서 학습하였다.

  - 선언(declaration)을 통하여 변수를 선언할 수 있다.
  - 할당(assignment)을 통하여 변수에 값을 저장하게 된다. 이때 사용되는 '='은 같다라는 뜻이 아닌 '할당 연산자(Assignment operator)'이다.
  - var, let, const 선언방식의 차이점을 학습하였다.

    |          | var | let | const |
    | :------: | :-: | :-: | :---: |
    | 중복선언 |  O  |  X  |   X   |
    |  재할당  |  O  |  O  |   X   |

- 변수명은 다음의 규칙에 따라 명명된다. <a href="https://eslint.org/docs/rules/camelcase" target="_blank">

  - Camel Case </a>

- 할당이 없는 변수의 경우 `undefined` 값을 가진다. (값이 없는게 아닌 해당 `undefined`값을 가진다)

<br>
<br>

### 2. 타입

---

- 원시 자료형, 참조 자료형을 학습하였다.
- typeof 연산자를 통하여 특정 갑의 타입을 확인할 수 있다.

<br>
<br>

### 3. 함수

---

- 함수는 "작은 기능의 단위"이며 키워드(keyword), 이름(name), 매개변수(parameter), 몸통(body)로 구분된다

  - num을 전달 받아 구구단을 출력하는 함수의 예시

    ```javascript
    function multiPle(num) {
      // function(키워드), multiPle(이름), num(매개변수)
      console.log(num * 1);
      console.log(num * 2);
      console.log(num * 3);
      console.log(num * 4);
      console.log(num * 5);
      console.log(num * 6);
      console.log(num * 7);
      console.log(num * 8);
      console.log(num * 9); // body 부분
    }
    ```

- 함수는 구체적인 입력과 출력을 가지고있으며, 호출 후에는 반드시 return 된다.

<br>
<br>

### 4. 조건문

---

- 조건문은 어떠한 조건을 판별한다. 그렇기에 **비교 연산자**(comparison operator)가 필요하다.

  ```javascript
  3 > 5; // false
  3 < 5; // true
  'hi' === 'hello'; // false
  'hi' !== 'hello'; // true
  ```

  - 비교 연산자의 결과는 늘 Boolean, 즉 true 혹은 false 이다.
  - 주의 해야 할 비교 연산자 ( == , != ) : 값 만을 비교 (data type은 논외) 하기 때문에 엄격한 비교가 불가능하다. 예외가 많기 떄문에 === 와 비교하면 오류가 많다.

- 두가지 조건이 한번에 적용되는 경우가 필요 할 땐, 논리 연산자(logical operator)를 사용하여 조건문을 작성한다.

  ```javascript
  isStudent && isFemale; // 학생이면서 여성일때 통과
  isStudent || isFemale; // 학생이거나 여성이면 통과
  !isStudent && isFemale; // 학생이 아니면서 여성일때 통과
  ```

- `truthy`와 `falsy`가 조건문에서 작동하는 방식을 이해할 수 있다.
  - 기억해야 할 6가지 falsy 값, 해당 값들은 false로 반환되므로 if문이 실행되지 않는다.
    > `false`, `null`, `undefined`, `0`, `NaN`, `''`

<br>
<br>

### 5. HTML

---

- 하이퍼텍스트를 (링크) 가장 중요한 특징으로 하는 마크업이라는 형식을 가진 컴퓨터 프로그래밍 언어.

  - Markup이란? 그 파일이 프린터로 출력되거나 화면에서 어떻게 보여야할 것인지를 나타내기 위해 또는 그 문서의 논리적인 구조를 묘사하기 위해서, 텍스트나 워드프로세싱 파일의 특정위치에 삽입되는 일련의 문자들이나 기호들을 말한다. 마크업에 사용되는 표지를 흔히 ‘태그’라고 부른다.

- 태그 설명은 MDN 문서를 참고하였다.

  - <a href = "https://developer.mozilla.org/ko/docs/Web/HTML/Element/a" target = "_blank">HTML tag</a>

<br>
<br>

## 🤔 Understanding

- 코드스테이츠 2일차.. 잠을 엄청 설쳤다... 부담감 때문인가? 스트레스 컨트롤도 중요해보인다...

- 블로그에 학습내용 포스팅은 계속 진행할 예정이다.

- 구글은 신이다.

  - mdn 키워드 ~~mdn 자체가 읽기가 어려워..... 익숙해지자~~
  - 키워드를 통한 검색 생활화 하기. 영어로 검색하자
  - Stack Overflow 애용하기 ~~아직은 봐도 잘 모르겠다...~~

- 처음으로 둘 이상의 인원이 모여 ZOOM을 통한 협업으로 코드 풀이를 해보았다. 생각보다 ZOOM 을 통한 협업은 불편하지 않았다, 화면쉐어링 등 기본 제공하는 툴들만으로도 의견 전달에는 문제가 없었다.

  pair 훈련 자체가 오늘 첫 시행이라 난이도가 낮았기에 시간은 제공된 시간 보다는 빠르게 소화할 수 있었다. 앞으로는 거부감 없이 할 수 있을 듯 하다.

- 생활코딩 수업 html, css, javascript 다시 수강해야겠다.

  겉핣기식 따라하기 수업은 머릿속에 개념만 넣는 정도였다. 조금더 심화내용 수업을 들으며 개념확장 필요하다 생각된다.

<br>
<br>

```toc

```
