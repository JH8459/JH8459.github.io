---
emoji: 📚
title: JS - Array.prototype.flatMap() 알아보기
date: '2024-12-09'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

프로그래머스 <a href="https://school.programmers.co.kr/learn/courses/30/lessons/181836" target="_blank">그림 확대</a> 알고리즘 문제 풀이 과정 중 평소에 사용해보지 않은 `Array` 인스턴스의 메서드 중 하나인 `flatMap()`을 사용해서 풀이하며 느낀점을 간단히 포스팅으로 남기려한다.

<br>
<br>

### 1. 문제

---

문제 설명
  
- 직사각형 형태의 그림 파일이 있고, 이 그림 파일은 1 × 1 크기의 정사각형 크기의 픽셀로 이루어져 있습니다. 이 그림 파일을 나타낸 문자열 배열 picture과 정수 k가 매개변수로 주어질 때, 이 그림 파일을 가로 세로로 k배 늘린 그림 파일을 나타내도록 문자열 배열을 return 하는 solution 함수를 작성해 주세요.

제한사항

- 1 ≤ picture의 길이 ≤ 20
- 1 ≤ picture의 원소의 길이 ≤ 20
- 모든 picture의 원소의 길이는 같습니다.
- picture의 원소는 '.'과 'x'로 이루어져 있습니다.
- 1 ≤ k ≤ 10

입출력 예

- |picture|k|result|
  |------|---|---|
  |[".xx...xx.", "x..x.x..x", "x...x...x", ".x.....x.", "..x...x..", "...x.x...", "....x...."]|2|["..xxxx......xxxx..", "..xxxx......xxxx..", "xx....xx..xx....xx", "xx....xx..xx....xx", "xx......xx......xx", "xx......xx......xx", "..xx..........xx..", "..xx..........xx..", "....xx......xx....", "....xx......xx....", "......xx..xx......", "......xx..xx......", "........xx........", "........xx........"]|
  |["x.x", ".x.", "x.x"]|3|["xxx...xxx", "xxx...xxx", "xxx...xxx", "...xxx...", "...xxx...", "...xxx...", "xxx...xxx", "xxx...xxx", "xxx...xxx"]|

<br>
<br>

### 2. 처음 풀이한 해결 방법
---

알고리즘 난이도 자체는 "기초"에 해당할 만큼 쉽기에 따로 풀이과정을 주석 외에 따로 설명하진 않겠다.

```javascript
function solution(picture, k) {
  const result = [];  // 결과값을 담을 배열을 선언
  
  picture.forEach((row) => {
    // picture 배열을 순회하며 row값(문자열)을 k만큼 확장한다. => 가로 확대
    const expandedRow = [...row].map(char => char.repeat(k)).join('');

    // 확장한 row를 결과값에 k번 더한다. => 세로 확대
    for (let i = 0; i < k; i++) {
      result.push(expandedRow);
    }
  });
  
  return result;
}
```

<br>
<br>

좀더 간결하게 구현할 수 있지 않을까란 생각으로 `map()` 메서드를 사용하는 방법으로 변경해보았다.

```javascript
function solution(picture, k) {
  const result = picture
    .map((row) => 
      Array(k).fill([...row].map(char => char.repeat(k)).join(''))
    )
    .flat();

  return result;
}
```

<br>

별도의 반환값이 없는 `forEach()`나 `for` 문법을 사용하려면 변수를 미리 선언 후 `push` 등을 통해 제어해야하지만 `map()` 메서드를 활용하면 반환값을 적절히 제어할 수 있으므로 코드를 간결히 작성할 수 있었다.

<br>
<br>

### 3. `flatMap()` 메서드를 활용한 해결 방법
---

사실 이번 포스팅을 남긴건 `flatMap()` 때문이다. <del>이런 메서드가 있다는 사실을 처음 알았다. 🥲</del>

요구하는 결과값이 1차원 배열일 때 `map()` 메서드의 콜백 반환값이 배열인 경우에는 `falt()` 메서드로 적절히 평탄화해서 콜백 함수의 리턴값으로 반환하곤했는데 그걸 한번에 해결해주는 메서드가 있었다는걸 처음 알게되었다.

> ECMAScript 2019(ES10)에 새롭게 추가되었다 한다. (무려 5년전..🥲)

<br>

메서드의 동작 원리는 간단하다. 
- `map()` 뒤에 깊이 1의 `flat()`을 붙이는 것.

``` javascript
function solution(picture, k) {
  return picture.flatMap((row) => 
    Array(k).fill([...row].map(char => char.repeat(k)).join(''))
  );
}
```

<br>

`map()`과 `flat()` 메서드를 따로 호출하는 것보다는 보기에 조금 더 직관적이지 않나 싶다.

<br>
<br>

## 🤔 Understanding

2009년에 ES5가 등장하고 2015년에 ES6가 등장하며 큰 변화가 겪은 이후 ECMA에서는 매년 새로운 JS 표준을 발표하고 있다. <del>표준 문법안을 읽기만하고 써버릇하며 체득하지 않으니 이렇게 쉽게 잊어버리는듯 하다. 😮‍💨</del>

앞으로는 매년 나오는 새로운 문법에 익숙해지기 위해서 억지로라도 조금씩 활용해보고 포스팅으로 남겨야겠다.

<br>
<br>

```toc

```
