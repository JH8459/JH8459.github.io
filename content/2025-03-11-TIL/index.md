---
emoji: 📚
title: LeetCode 876번 - Middle of the Linked List (JS)
date: '2025-03-11'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

LeetCode <a href="https://www.acmicpc.net/problem/1764" target="_blank">876번</a> 알고리즘 문제 풀이 과정 중 학습한 내용을 간단히 포스팅으로 남기려한다.

<br>
<br>

### 1. 문제

---

문제
  
- Given the head of a singly linked list, return the middle node of the linked list. If there are two middle nodes, return the second middle node.

- Example 1:
  - Input: head = [1,2,3,4,5]
  - Output: [3,4,5]
  - Explanation: The middle node of the list is node 3.
  
- Example 2:
  - Input: head = [1,2,3,4,5,6]
  - Output: [4,5,6]
  - Explanation: Since the list has two middle nodes with values 3 and 4, we return the second one.

제한사항

- The number of nodes in the list is in the range [1, 100].
- 1 <= Node.val <= 100

<br>
<br>

### 2. 풀이
---

주석에 기재된 설명을 보면 전달인자 `head`는 단방향 링크드 리스트로 전달된다.

1. `head.next`가 null이 나올 때 까지 반복 탐색하여 링크드 리스트의 길이를 탐색한다.
2. 중간지점(middle node)을 찾은 뒤 해당 위치 부터의 링크드 리스트를 반환한다.

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let node = head, length = 1;
    
    while (node.next) {
        node = node.next;
        length++;
    }

    let middle = parseInt(length / 2);

    while(middle--){
        head = head.next;
    }

    return head;
};
```

<br>
<br>

### 3. 배운점
---

좋은 솔루션이라 언급되는 코드와 해결 과정을 가져와보았다.

- While slow moves one step forward, fast moves two steps forward.
- Finally, when fast reaches the end, slow happens to be in the middle of the linked list.
- For example, head = [1, 2, 3, 4, 5]
  - step 0: slow: [1, 2, 3, 4, 5], fast: [1, 2, 3, 4, 5]
  - step 1: slow: [2, 3, 4, 5], fast: [3, 4, 5]
  - step 2: slow: [3, 4, 5], fast: [5]
  - end because fast cannot move forward anymore and return [3, 4, 5]

```javascript
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    let slow = head;
    let fast = head;

    while (fast && fast.next) {
        slow = slow.next;
        fast = fast.next.next;
    }

    return slow;
};
```

<br>

- 1배속으로 천천히 탐색한 링크드 리스트
- 2배속으로 탐색한 링크드 리스트

두 링크드 리스트를 탐색 후 2배속으로 탐색한 링크드 리스트가 더이상 가리킬 노드가 없으면 1배속 탐색 링크드 리스트를 반환하는 형태로 구현되어 있다. 🤔

<br>
<br>

## 🤔 Understanding

문제 해결만을 위해서 너무 단순히 생각하고 접근했다. 

다양한 방식으로 접근해보는 습관을 길러보자.

<br>
<br>

