---
emoji: 📚
title: 클래스를 이용한 모듈화, Prototype
date: '2021-08-23'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 클래스를 이용한 모듈화

---

<br>
<br>

#### 1-1. 객체 돌아보기

---

- 객체는 자바스크립트의 8가지 자료형중 하나이다.

  객체는 원시형(primitive) 자료형과 달리 다양한 데이터를 담을 수 있다. `{}` 중괄호를 이용하여 객체는 선언되며, 중괄호 안에는 `'키(key): 값(value)'` 쌍으로 구성된 `프로퍼티(property)`들이 속해있다.

<br>
<br>

#### 1-2. 메서드와 this

---

- 객체 프로퍼티는 **함수**를 할당하여 객체에게 행동할 수 있는 능력을 부여해 줄수도 있다.

  ```javascript
  let user = {
    name: 'John',
    age: 30,
    sayHi: function () {
      console.log('안녕하세요!');
    },
  };

  user.sayHi(); // "안녕하세요!"
  ```

  이처럼 객체 프로퍼티에 할당된 함수를 메서드(method)라고 부른다. 위 예시에선 객체 `user`에 할당된 메서드는 `sayHi()`이다.

  > 객체를 사용하여 개체를 표한하는 방식을 **객체 지향 프로그래밍(object-oriented programming, OOP)** 이라 부른다.

- 대부분의 메서드는 객체에 저장된 정보에 접근할 수 있어야 제 역할을 하게된다. 메서드 내부에서 `this` 키워드를 사용하면 **메서드를 호출할 때 사용된 객체**에 접근할 수 있게된다.

  ```javascript
  let user = {
    name: "John",
      age: 30,
      sayHi: function() {
  	 console.log(console.log("안녕하세요! " + this.age + "살 " + this.name + " 입니다.");
    }
  };

  user.sayHi();  // "안녕하세요! 30살 John 입니다."
  ```

  위 처럼 `this`키워드를 통해 객체의 값에 접근할 수 있으며, 메서드를 보다 유효하게 사용할 수 있게된다.

- `this`의 값은 런타임에 결정된다. 함수를 선언할 때 this를 사용할 수 있지만, 함수가 호출되기 전까지 this (undefined) 엔 값이 할당되지 않는다.

  > 메소드 호출 방식을 이용할 때에는 **화살표 함수**를 쓰지 않는다. 화살표 함수는 단순히 표현식을 짧게쓸수 있는 함수의 문법적 구조가 아닌 여러 특성을 갖는다.
  >
  > 그중 대표적인 특성중 하나는 "화살표 함수는 일반 함수와 달리 고유한 `this`를 가지지 않는다."
  >
  > 그러므로 외부 함수에서 `this`값을 가져오게 되므로 외부 컨텍스트를 참조하게 되므로 얘기치 않는 상황이 발생될 가능성이 크다.

<br>
<br>

#### 1-3. 클래스와 인스턴스

---

- 위에 잠깐 언급하였던 **객체 지향 프로그래밍**이란 하나의 모델이 되는 객체를 만들고 그 객체를 이용하여 바탕이 같은 객체를 만드는 프로그래밍 패턴이다.

  자동차 생산으로 비유하자면 설계도(클래스)가 있고 해당 설계도로 찍어낸 자동차(인스턴스)들이 있다.

- 클래스는 함수로 정의 할 수 있다.

  ```javascript
  // ES5 문법
  function Car(brand, name, color) {
    // 인스턴스가 만들어 질 때 실행되는 코드
    this.brand = brand;
    this.name = name;
    this.color = color;
  }

  // ES6 문법
  class Car {
    // 인스턴스가 만들어 질 때 실행되는 코드
    constructor(brand, name, color) {
      this.brand = brand;
      this.name = name;
      this.color = color;
    }
  }
  ```

  여기서 보이는 함수는, 인스턴트를 만들때 실행되는 코드이며 객체지향 프로그래밍에서 **생성자(constructor)** 라고 부른다. (참고로 생성자 함수는 return 값을 만들지 않으며 대문자로 시작하며 일반명사로 만들게 된다.)

- _인스턴스_ 를 만들 때에는 `new` 키워드를 사용하게 된다. 즉시 생성자 함수가 실행되며 클래스의 설계를 꼭 닮은 새로운 객체, 즉 인스턴스가 할당된다.

  ```javascript
  let avante = new Car('huyndai', 'avante', 'black');
  let mini = new Car('bmw', 'mini', 'yellow');
  let k3 = new Car('kia', 'k3', 'white');
  ```

- 클래스 내부의 속성값들은 위와 같이 정의하며 클래스 내부에 메소드를 정의할 때에는 `prototype`이라는 키워드를 사용해야 정의할 수 있다.

  ```javascript
  // ES5 문법
  function Car(brand, name, color) {
    /* 속성정의 생략 */
  }
  Car.prototype.refuel = function () {
    // 연료 공급을 구현하는 코드
  };
  Car.prototype.drive = function () {
    // 운전을 구현하는 코드
  };

  // ES6 문법
  class Car {
    constructor(brand, name, color) {
      /* 생략 */
    }
    refuel() {}
    drive() {}
  }
  ```

  ES5 문법에서는 `prototype` 키워드를 사용해야 메소드를 정의할 수 있다. ES6에서는 생성자 함수와 함께 `class`키워드 안쪽에 묶어서 정의한다.

  정리하자면,

  ![스크린샷, 2021-08-23 11-03-04](https://user-images.githubusercontent.com/83164003/130380195-319695a0-d23c-458e-a4db-506e7b10d1fe.png)

- 실제 코드를 보며 구문을 이해하자. <a href="https://www.codestates.com/?utm_source=Google_SA&utm_medium=cpc&utm_campaign=SEB&utm_term=%EC%BD%94%EB%93%9C%EC%8A%A4%ED%85%8C%EC%9D%B4%EC%B8%A0&gclid=CjwKCAjw64eJBhAGEiwABr9o2PEyspbJzjjln-q2ObNUFlmaH5vsGQgPDLGaGZuwoPGxtBMGdQ-A3BoCah8QAvD_BwE" target="_blank"> 참조 : 코드스테이츠 </a>

![스크린샷, 2021-08-23 11-03-38](https://user-images.githubusercontent.com/83164003/130380257-3118e1e4-0229-4581-bde4-182f0b1e58d4.png)

<br>
<br>

### 2. Prototype

---

<br>
<br>

#### 2-1. 객체 지향 프로그래밍

---

- 좋은 설계를 위해서는 기본적으로 이 객체 지향을 이해하고 응용하는 것이 매우 중요하다.

  1. **캡슐화 (Encapsulation)**

     - **"데이터와 기능을 하나의 단위로 묶는 것"** 데이터(속성)과 기능(메소드)를 따로 정의하는 것이 아닌, 하나의 객체 안에 넣어서 묶는 걸 뜻한다.
     - **"은닉(hiding)"** 은닉화는 내부 데이터나 내부 구현이 외부로 노출되지 않도록 만드는 것이다.
     - **"느슨한 결합(Loose Coupling)에 유리"** 데이터(속성)과 기능(메소드)들이 느슨하게 결합이 되는 것이다. 여기서 느슨한 결합이란 코드 실행 순서에 따라 절차적으로 코드를 작성하는게 아니라, 코드가 상징하는 실제 모습과 닮게 코드를 모아 결합하는것을 의미한다.

  2. **상속 (Inheritance)**

     - 부모 클래스의 특징을 자식 클래스가 물려받는 걸 뜻한다.

  3. **추상화 (Abstraction)**

     - 내부 구현은 아주 복잡하지만, 실제로 노출되는 부분은 단순하게 만든다는 개념이다.

       캡슐화와 비교하여 헷갈리는 개념중 하나지만, 단순하게 생각한다면 캡슐화는 코드와 데이터의 "은닉"에 포커스가 맞춰졌다면 추상화는 해당 클래스를 사용하는 사람이 필요하지 않은 메소드 등을 노출시키지않게끔 설계하며 단순한 이름으로 정의하는 것에 포커스가 맞춰져있다.

       클래스 정의 시, 메소드와 속성만 정의한 것을 **인터페이스**라 일컫는다.

  4. **다형성 (Polymorphism)**

     - 같은 메소드라 하더라도 각각마다 다른 방식으로 구현될 수 있다는 개념이다.

<br>
<br>

#### 2-2. 클래스와 프로토타입

---

- 클래스와 인스턴스 간의 관계는 상속관계가 제일 중요한듯하다, 객체간 상속하기 위해서 JS에서는 프로토타입이라는 방식을 사용한다.

  - 프로토타입의 객체간 메소드와 속성을 주고받는건 프로토타입 체인(prototype chain)에서 이뤄진다. 이때 상속받는 값들은 프로토타입 체인을 타고 올라가며 접근 할 뿐이지 속성과 메소드가 다른 객체로 이동이나, 복사되는 것이 아님임을 주의해야한다.

    프로토타입의 자세한 내용은 아래의 참고문서에서 확인.

    > 객체 상속에 관련된 이론 및 실습 참조 문서 <a href="https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Object_prototypes" target="_blank">(MDN Object prototypes)</a>

<br>
<br>

#### 2-3. 프로토타입 체인

---

- 위에서 언급한 내용이지만 다시 말하자면, 객체간 메소드와 속성을 주고받는 "상속"을 JS에서 구현하자면 프로토타입 체인을 사용하여야한다.

  - JS에서는 `extends`와 `super` 키워드를 이용해서 상속을 구현 하고 있다.

  프로토타입 체인을 JS에서 구현하기 위한 자세한 내용은 아래의 참고문서에서 확인.

  > 클래스 문법 참조 문서<a href="https://developer.mozilla.org/ko/docs/Learn/JavaScript/Objects/Inheritance#ecmascript_2015_%ED%81%B4%EB%9E%98%EC%8A%A4" target="_blank">(ECMAScript 2015 클래스)</a>

<br>
<br>

## 🤔 Understanding

- JS에서 객체지향 프로그래밍의 주요 문법등을 학습하였다.

  매번 말로만 자바스크립트는...객체 지향프로그래밍이며.. 시도때도 없이 보고 들었는데 처음으로 피부로 와닿으니 굉장히 프로그래머에게 편향된 프로그래밍 방식이란 느낌이 많이 들었다.

  이래서 개발언어로써 많이 쓰이는구나라는걸 조금이나마 느꼈다할까나?

- 아직 잘은 모르겠지만, 기존에 있는 기능을 가져와 확장하는 경우라던지, 실무 개발단계에서 필수적인 개념이라 생각이 든다.

<br>
<br>

```toc

```
