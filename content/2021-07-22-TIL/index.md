---
emoji: 📚
title: 반복문 코플릿
date: '2021-07-22'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. 반복문 코플릿

---

- 오늘 학습한 내용 중 가장 인상 깊었던 코드 풀이를 다시 한번 복습해보겠다.

  핵심 포인트는 임의의 수를 입력받아 홀수인지 아닌지 여부를 리턴해야 한다.

  - 반복문(while)문을 사용해야 합니다. 나눗셈(/), 나머지(%) 연산자 사용은 금지됩니다. 0은 짝수로 간주합니다.

    ```javascript
    /*---입출력 예시---*/
    let output = isOdd(17);
    console.log(output); // --> true
    output = isOdd(-8);
    console.log(output); // --> false

    /*---함수 작성---*/
    function isOdd(num) {
      let i = 0; // while 문의 조건식을 검색할 인자. 변수 i 선언 및 초기값 0 할당.
      let evenOdd = 1; // 짝수와 홀수를 evenOdd에 담긴 양수(홀수)와 음수(짝수)의 값으로 판단 할 예정이므로 evenOdd 변수 선언 (초기 값은 1을 주어서, 0을 짝수로 간주한다. ex)num = 0일 경우 단 한번의 while문 만 실행되므로, evenOdd = -1(음수=짝수) 로 반복문을 나가게 된다. )

      while (i <= Math.abs(num)) {
        // num값이 음수로 들어 올경우 Math.abs 메소드를 이용하여 절대값으로 연산한다.
        evenOdd *= -1; // evenOdd 값에 -1을 곱하여 재 할당한다.
        i++; // i를 1만큼 증가시킨다.
      } // Math.abs(num)까지 i 가 while문 안을 수행 후 } 를 빠져나오면 evenOdd는 -1 또는 1의 값 두가지 값중 한가지 값을 내포한다.

      if (evenOdd > 0)
        // evenOdd의 값이 양수일 경우 true 값을 return 하여 홀수임을 나타낸다
        return true;
      // evenOdd의 값이 그 외에 경우 false 값을 return 하여 짝수임을 나타낸다
      else return false;
    }
    ```

<br>
<br>

## 🤔 Understanding

- 시간이 어디로 사라진거지?..

  반복문 개념학습은 1시간 코드풀이는 5시간.., 이중반복문은 조금 ~~많이많이~~ 애먹었지만 확실히 문제를 풀어가며 pair와 함께 머리를 맞대며 도출해내는 과정은 희열감이 느껴지기도 했다.

  확실히 개념 수업보단 직접 짜본 내 코드들을 디버깅해가는 과정이 학습에는 더욱 도움이 되는 듯 하였다.

  실제로 시간이 금방금방 지나가는 기적을 겪였다...

- 기본 수업 외에 오늘은 추가 학습을 못한듯하다...

  ~~어젠 분명 리액트 수업이 재밌었는데.. 개발환경 구축하고 나니 오늘은 터미널을 켜보지도 못했다.~~

  스트레스 컨트롤도 중요하다. 장기전이라 생각하고 임하자.

<br>
<br>

```toc

```
