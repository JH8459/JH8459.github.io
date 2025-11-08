---
emoji: 📚
title: Object.groupBy / Map.groupBy (ES2024)
date: '2025-11-08'
author: JH8459
categories: JavaScript
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-08/javascript/thumbnail.png
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-08/javascript/es2024.png"/>

## 📚 Overview

`Object.groupBy`, `Map.groupBy` 문법을 통해 이제 `reduce`, `lodash.groupBy` 같은 반복 패턴 없이도 표준 문법으로 깔끔하게 데이터 그룹핑이 가능하다.

**ES2024** 부터 포함된 `groupBy` 문법의 개념, 차이점, 그리고 실무에서 유용한 활용법을 정리해본다.

<br>
<br>

### 1. `groupBy` 문법은 언제부터 생겼나?

---

해당 문법은 **Array Grouping Proposal**이 **2023년 말 TC39 Stage 4**에 도달하면서, **ECMAScript 2024 (ES15)** 표준에 정식 포함되었다.

| 구분 | 명세 | 내용 |
|:--:|:--|:--|
| 제안 단계 | TC39 Stage 4 | Array Grouping Proposal |
| 표준 반영 | ECMAScript 2024 | 정식 문법 포함 |
| 지원 환경 | Node 21+, 최신 브라우저 | 기본 지원 |

> 💡 참고: [TC39 Proposal: Array Grouping](https://github.com/tc39/proposal-array-grouping) / [MDN Object.groupBy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/groupBy)

<br>
<br>

### 2. Object vs Map, 언제 어떤 걸 써야 할까?

---

`groupBy`는 동일한 인터페이스처럼 보이지만 반환 타입이 다르다. 하나는 Object, 다른 하나는 Map을 반환하며, 이 차이가 사용 목적을 완전히 갈라놓는다. 일반적으로는 이렇게 기억하면 된다.

| 상황 | 추천 |
|:--:|:--|
| 문자열 / JSON 응답 중심 | **Object.groupBy** |
| 숫자 / Date / 객체 키 사용 | **Map.groupBy** |
| 후속 정렬 / Map API 활용 | **Map.groupBy** |
| 직렬화 / 단순 응답 가공 | **Object.groupBy** |

<br>
<br>

#### 2-1. `Object.groupBy`

---

- **문자열 / 심볼 키**를 기준으로 그룹핑
- 결과가 일반 객체(`Record<string, T[]>`)로 반환되어 **JSON 직렬화나 API 응답 가공**에 적합

  ```ts
  const orders = [
    { id: 'A1', status: 'progress' },
    { id: 'A2', status: 'pending' },
    { id: 'A3', status: 'failed' },
    { id: 'A4', status: 'progress' },
  ];

  const groupByStatus = Object.groupBy(orders, order => order.status);

  console.log(groupByStatus);
  /*
  {
    progress: [{id:'A1'}, {id:'A4'}],
    pending: [{id:'A2'}],
    failed: [{id:'A3'}]
  }
  */
  ```

<br>
<br>

#### 2-2. `Map.groupBy`

---

- 비문자열 키(숫자, Date, 객체 등) 그대로 사용 가능
- 결과가 Map으로 반환되어, 정렬, 병합, 후속 연산에 유리

  ```ts
  const users = [
    { user: 'u1', createdAt: new Date('2025-11-01T10:00Z') },
    { user: 'u2', createdAt: new Date('2025-11-01T11:00Z') },
    { user: 'u3', createdAt: new Date('2025-11-02T09:00Z') },
  ];

  const groupByDay = Map.groupBy(users, user => user.createdAt.toDateString());

  console.log([...groupByDay.entries()]);
  // [['Sat Nov 01 2025', [u1,u2]], ['Sun Nov 02 2025', [u3]]]
  ```

<br>
<br>

### 3. reduce 패턴과 비교

---

이전에는 이런 식으로 `reduce`를 활용했다.

```ts
const grouped = orders.reduce((acc, order) => {
  (acc[order.status] ??= []).push(order);
  return acc;
}, {});
```

이제는 훨씬 단순하게 쓸 수 있다.

```ts
const grouped = Object.groupBy(orders, order => order.status);
```

> 💡 코드 양이 줄었을 뿐 아니라, 의도가 명확하게 드러난다. “나는 지금 데이터를 그룹핑한다.”

<br>
<br>

### 4. ES2024 이후 변화가 의미하는 것

---

- `Lodash` 같은 헬퍼 라이브러리 의존성 감소
- 코드 리뷰 시 의도 파악이 즉각적
- TypeScript에서도 타입 추론이 더 직관적

ES2024는 “개발자의 반복 패턴을 언어 레벨로 올려주는” 버전이라고 봐도 좋다.
`groupBy` 외에도 언급하지 않았지만, `Array.prototype.with`, `toSorted` 같은 문법들이 그 대표적인 예다.

<br>
<br>

## 🤔 Understanding

개인적으로는 `groupBy`가 단순한 헬퍼 메서드임을 넘어 **“데이터를 바라보는 관점”** 을 바꾸는 기능이라 생각한다.

- 로직 단순화: 불필요한 `reduce` 혹은 외부 의존성 제거
- 가독성 향상: 코드 의도가 바로 드러남
- 표준화된 접근: 팀 컨벤션 통일 가능

앞으로 “데이터 그룹핑”이 필요한 대부분의 상황에서 고민 없이 사용해볼 생각이다.

<br>
<br>