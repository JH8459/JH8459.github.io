---
emoji: 📚
title: 프로그래머스 - 조이스틱 (JS)
date: '2025-03-13'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

프로그래머스 <a href="https://school.programmers.co.kr/learn/courses/30/lessons/42860" target="_blank">조이스틱</a> 알고리즘 문제 풀이 과정 중 그리디 알고리즘을 풀이하며 느낀점을 간단히 포스팅으로 남기려한다.

<br>
<br>

### 1. 문제

---

문제 설명
  
- 조이스틱으로 알파벳 이름을 완성하세요. 맨 처음엔 A로만 이루어져 있습니다. ex) 완성해야 하는 이름이 세 글자면 AAA, 네 글자면 AAAA

  조이스틱을 각 방향으로 움직이면 아래와 같습니다.

  ```
  ▲ - 다음 알파벳
  ▼ - 이전 알파벳 (A에서 아래쪽으로 이동하면 Z로)
  ◀ - 커서를 왼쪽으로 이동 (첫 번째 위치에서 왼쪽으로 이동하면 마지막 문자에 커서)
  ▶ - 커서를 오른쪽으로 이동 (마지막 위치에서 오른쪽으로 이동하면 첫 번째 문자에 커서)
  ```
  
  예를 들어 아래의 방법으로 "JAZ"를 만들 수 있습니다.

  ```
  - 첫 번째 위치에서 조이스틱을 위로 9번 조작하여 J를 완성합니다.
  - 조이스틱을 왼쪽으로 1번 조작하여 커서를 마지막 문자 위치로 이동시킵니다.
  - 마지막 위치에서 조이스틱을 아래로 1번 조작하여 Z를 완성합니다. 따라서 11번 이동시켜 "JAZ"를 만들 수 있고, 이때가 최소 이동입니다.
  ```

  만들고자 하는 이름 name이 매개변수로 주어질 때, 이름에 대해 조이스틱 조작 횟수의 최솟값을 return 하도록 solution 함수를 만드세요.

제한사항

- name은 알파벳 대문자로만 이루어져 있습니다.
- name의 길이는 1 이상 20 이하입니다.

입출력 예

- |name|return|
  |---|---|
  |"JEROEN"|56|
  |"JAN"|23|

<br>
<br>

### 2. 풀이
---

위아래(▲, ▼)로 조이스틱을 조작하는 경우와 좌우(◀, ▶)로 조작하는 경우를 각각 계산해서 합산하는 방식으로 구현하였다.

```javascript
function solution(name) {
    let answer = 0;
    const length = name.length;

    // 알파벳 변경 횟수 계산 함수
    const getUpDownCnt = (char) => {
        const upCnt = char.charCodeAt(0) - 'A'.charCodeAt(0);
        const downCnt = 'Z'.charCodeAt(0) - char.charCodeAt(0) + 1;

        return Math.min(upCnt, downCnt);
    };

    // ▲, ▼ 알파벳 변경 횟수 계산
    for (let i = 0; i < length; i++) {
        answer += getUpDownCnt(name[i]);
    }

    // 이름에 'A'가 없는 경우 우측(▶)으로만 이동하는 기본 이동 횟수
    let minMove = length - 1;
    
    // ◀, ▶ 커서 이동 최소 거리 계산
    for (let i = 0; i < length; i++) {
        let next = i + 1;
        
        while (next < length && name[next] === 'A') {
            next++;
        }
        
        // 좌, 우 어느쪽이 최소값 이동인지 판단
        const move = Math.min(i * 2 + length - next, (length - next) * 2 + i);
        minMove = Math.min(minMove, move);
    }

    return answer + minMove;
}
```

위아래로 조작하는 경우는 간단히 구현하였으나 최소 커서 이동횟수를 구하는데 시간이 오래걸렸다.

1. 현재 위치 `i` 이후에서 'A'가 아닌 첫번째 문자의 인덱스를 찾기 위한 변수 `next` 선언.
2. `next`는 'A'를 건너 뛰며 'A'가 아닌 문자가 나올 때까지 증가한다.
3. 마지막으로 두가지 이동 방식을 비교해야한다. (오른쪽 후 왼쪽, 왼쪽 후 오른쪽)

``` javascript
name = "JAZAAAZ";
```

<br>

위 경우엔 처음 커서 위치에서 우로 2번 (▶, ▶) 이후 좌로 3번 (◀, ◀, ◀) 움직여서 마지막 Z로 도착하는 경우의 수가 가장 빠르다. (이 반례가 있다는걸 생각을 못했다.)

<br>
<br>

## 🤔 Understanding

단순해보였는데 꽤나 애를 먹었다. (기본 테스트 케이스는 반례를 고려하지 않아도 모두 통과했기 때문에..🥲)

반례를 찾은 뒤에야 풀이가 가능했다.

<br>
<br>

```toc

```
