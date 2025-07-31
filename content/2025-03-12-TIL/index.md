---
emoji: 📚
title: 프로그래머스 - 명예의 전당 (1) (JS)
date: '2025-03-12'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

프로그래머스 <a href="https://school.programmers.co.kr/learn/courses/30/lessons/138477" target="_blank">명예의 전당 (1)</a> 알고리즘 문제 풀이 과정 중 우선순위 큐를 직접 구현하여 풀이하며 느낀점을 간단히 포스팅으로 남기려한다.

<br>
<br>

### 1. 문제

---

문제 설명
  
- "명예의 전당"이라는 TV 프로그램에서는 매일 1명의 가수가 노래를 부르고, 시청자들의 문자 투표수로 가수에게 점수를 부여합니다. 매일 출연한 가수의 점수가 지금까지 출연 가수들의 점수 중 상위 k번째 이내이면 해당 가수의 점수를 명예의 전당이라는 목록에 올려 기념합니다. 즉 프로그램 시작 이후 초기에 k일까지는 모든 출연 가수의 점수가 명예의 전당에 오르게 됩니다. k일 다음부터는 출연 가수의 점수가 기존의 명예의 전당 목록의 k번째 순위의 가수 점수보다 더 높으면, 출연 가수의 점수가 명예의 전당에 오르게 되고 기존의 k번째 순위의 점수는 명예의 전당에서 내려오게 됩니다.

  이 프로그램에서는 매일 "명예의 전당"의 최하위 점수를 발표합니다. 예를 들어, k = 3이고, 7일 동안 진행된 가수의 점수가 [10, 100, 20, 150, 1, 100, 200]이라면, 명예의 전당에서 발표된 점수는 아래의 그림과 같이 [10, 10, 10, 20, 20, 100, 100]입니다.

  ![image](https://grepp-programmers.s3.ap-northeast-2.amazonaws.com/files/production/b0893853-7471-47c0-b7e5-1e8b46002810/%EA%B7%B8%EB%A6%BC1.png)

  명예의 전당 목록의 점수의 개수 k, 1일부터 마지막 날까지 출연한 가수들의 점수인 score가 주어졌을 때, 매일 발표된 명예의 전당의 최하위 점수를 return하는 solution 함수를 완성해주세요.

제한사항

- 3 ≤ k ≤ 100
- 7 ≤ score의 길이 ≤ 1,000
  - 0 ≤ score[i] ≤ 2,000

입출력 예

- |k|score|result|
  |------|---|---|
  |3|[10, 100, 20, 150, 1, 100, 200]|[10, 10, 10, 20, 20, 100, 100]|
  |4|[0, 300, 40, 300, 20, 70, 150, 50, 500, 1000]|[0, 0, 0, 0, 20, 40, 70, 70, 150, 300]|

<br>
<br>

### 2. 풀이
---

`k`개의 요소를 갖는 우선순위 큐(`minHeap`)를 구현해서 풀이를 해보았다.

```javascript
// 우선순위 큐 구현
class MinHeap {
    constructor() {
        this.heap = [];
    }

    push(value) {
        this.heap.push(value);
        this.heap.sort((a, b) => a - b);
    }

    pop() {
        return this.heap.shift();
    }

    peek() {
        return this.heap[0];
    }

    size() {
        return this.heap.length;
    }
}

function solution(k, score) {
    const minHeap = new MinHeap();
    const answer = [];

    for (const dayScore of score) {
        if (minHeap.size() < k) {
            // heap은 k개의 요소를 갖는다.
            minHeap.push(dayScore);
        } else if (minHeap.peek() < dayScore) {
            minHeap.pop();
            minHeap.push(dayScore);
        }
        
        answer.push(minHeap.peek());
    }

    return answer;
}
```

<br>
<br>

## 🤔 Understanding

JAVA로 알고리즘을 풀 땐 우선순위 큐(PriorityQueue)를 아래와 같이 아주 손 쉽게 구현했었다.

```java
PriorityQueue<Integer> pQ = new PriorityQueue<>();
```

<br>
<br>

JS는 확실히 모두 직접 구현해야하다 보니, 알고리즘 문제 풀이에 알맞은 언어는 아닌거같다..🥲 (매우 귀찮다.)

<br>
<br>

```toc

```
