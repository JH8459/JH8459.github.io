---
emoji: 📚
title: "Map에 드디어 생긴 getOrInsert: “없으면 넣고, 있으면 꺼내기”"
date: '2026-02-15'
author: JH8459
categories: JavaScript
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-02-15/JAVASCRIPT/thumbnail.png
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-02-15/JAVASCRIPT/thumbnail.png"/>

## 📚 Overview

Map을 쓰다 보면 “키가 없으면 기본값을 넣고, 그 값을 바로 사용한다”는 패턴을 끝없이 반복하게 된다. 이 패턴은 간단하지만 코드가 지저분해지고, 팀마다 구현 방식이 달라지면서 가독성이 더 떨어진다.

**Map.prototype.getOrInsert()** / **getOrInsertComputed()** 는 이 반복을 표준 API로 정리한다. 이 기능은 ECMAScript 2026 스펙에 포함될 예정이며, 이제 출시를 앞둔 시점이다. 오래 기다렸던 만큼 사용법과 주의점, 그리고 안전하게 도입하는 요령을 정리해두려 한다.

> “없으면 넣고 꺼내기”는 사소한 개선처럼 보이지만, 서비스 코드에서는 가장 자주 등장하는 반복 중 하나다.

<br>
<br>

### 1. Map을 사용할 때 가장 많이 반복되는 코드가 있다

---

대부분의 코드베이스에서 Map을 쓰는 이유는 명확하다. “키 → 값” 관계를 빠르게 조회하고 싶기 때문이다. 문제는 값이 없는 경우다.

예를 들어, 그룹핑(카테고리별로 리스트 만들기)을 구현하면 대개 이런 코드가 된다.

```ts
const groups = new Map();

function add(category, item) {
  if (!groups.has(category)) {
    groups.set(category, []);
  }

  groups.get(category).push(item);
}
```

이 패턴의 본질은 단순하다.

- 키가 있으면 기존 값을 가져온다.
- 키가 없으면 기본값을 넣는다.
- 그 값을 반환받아 이어서 사용한다.

하지만 표현은 늘 장황하다. has → set → get이 함께 묶여 다닌다.

실수도 자주 발생한다. set만 하고 get을 빼먹거나, if/else가 늘어나거나, 기본값 생성이 비싸도 무조건 실행되는 형태가 만들어진다.

<br>
<br>

### 2. getOrInsert는 “의도”를 코드로 직접 드러낸다

---

ECMAScript 2026에는 아래 메서드가 추가된다.

- Map.prototype.getOrInsert(key, value)
- Map.prototype.getOrInsertComputed(key, fn)
- WeakMap.prototype.getOrInsert(key, value)
- WeakMap.prototype.getOrInsertComputed(key, fn)

핵심 동작은 이렇게 정리된다.

- 키가 있으면 기존 값을 반환한다.
- 키가 없으면 새 값을 넣고 그 값을 반환한다.
- 기존 값을 덮어쓰지 않는다.

<br>

**getOrInsert()** 는 아래 코드와 같은 의미다.

```ts
if (map.has(key)) {
  return map.get(key);
}

map.set(key, defaultValue);

return defaultValue;
```

이제 그룹핑 코드는 이렇게 바뀐다.

```ts
const groups = new Map();

function add(category, item) {
  groups.getOrInsertComputed(category, () => []).push(item);
}
```

조건문이 사라지고, “없으면 생성해서 넣는다”는 의도가 코드에 직접 드러나기 때문에 읽는 사람이 코드의 목적을 더 빨리 이해할 수 있다.

<br>
<br>

### 3. getOrInsert와 getOrInsertComputed의 차이

---

두 메서드는 비슷해 보이지만, 용도가 명확히 갈린다.

- **getOrInsert(key, value)**

  ```ts
  const map = new Map();

  map.getOrInsert("mode", "dark");  // "dark"
  map.getOrInsert("mode", "light");  // "dark" (기존 값이 있으므로 덮어쓰지 않음)
  map.getOrInsert(key, expensive());  // 주의 필요
  ```

  여기서 동작을 정확히 이해해야 한다. getOrInsert는 “키가 없을 때 값을 삽입”하지만, 함수 인자는 호출 전에 평가된다. 따라서 `getOrInsert(key, expensive())`는 키가 있어도 `expensive()`가 실행된다. `expensive()`가 값이 비싼 함수라면, 지연 생성이 필요하며 그럴 경우엔 `getOrInsertComputed(key, fn)`을 사용해야 한다.

<br>

- **getOrInsertComputed(key, fn)**

  ```ts
  map.getOrInsertComputed("config", () => loadBigConfig());
  ```

  getOrInsertComputed는 키가 없을 때만 fn을 실행한다. 기본값 생성이 비싸거나(파일 읽기, 파싱, 큰 객체 생성) 부작용이 있으면(로그 남김, 외부 호출) getOrInsertComputed()를 쓰는 편이 맞다.

<br>
<br>

### 4. 바로 쓰는 예제 2가지

---

#### 4-1. 그룹핑(멀티맵)

```ts
const groups = new Map();

function add(category, item) {
  groups.getOrInsertComputed(category, () => []).push(item);
}

add("db", "PostgreSQL");
add("db", "Redis");
add("lang", "JavaScript");

console.log(groups.get("db")); // ["PostgreSQL", "Redis"]
```

“없으면 배열을 만들고, 있으면 기존 배열을 쓰고, 바로 push한다”가 한 줄로 표현된다.

<br>
<br>

#### 4-2. 카운터/집계 만들기

```ts
const counts = new Map();

function hit(key) {
  counts.set(key, counts.getOrInsert(key, 0) + 1);
}

hit("login");
hit("login");
hit("purchase");

console.log(counts.get("login")); // 2
```

이 패턴은 각종 집계(이벤트 집계, 상태 카운팅)에 그대로 쓸 수 있다.

<br>
<br>

### 5. 주의점이 있다

이 기능은 단순하지만, 자주 밟는 함정이 존재한다.

- **getOrInsert(key, [])** 는 “불필요한 객체 생성”이 반복될 수 있다

  ```ts
  map.getOrInsert(key, []).push(value);  // 불필요한 객체 생성이 반복될 수 있다.
  map.getOrInsertComputed(key, () => []).push(value);
  ```

  키가 이미 있어도 []는 호출 시점마다 생성된다. 사용되지 않아도 객체 생성 비용은 남는다. 이 경우는 아래가 정답이다.

<br>

- “키가 없는 것”과 “값이 **undefined** 인 것”은 다르다

  `Map`은 값으로 `undefined`를 가질 수 있다. 따라서 아래 패턴은 의도와 다르게 동작할 수 있다.

  ```ts
  map.set("a", undefined);

  // 이 패턴은 "undefined면 default"로 취급한다.
  // 그런데 "키는 있지만 값이 undefined"인 경우까지 default로 바꿔버린다.
  map.set("a", map.get("a") ?? "default");
  ```

  getOrInsert()는 **값이 아니라 “키 존재 여부”** 로 판단하므로 이 점을 주의하자.

스펙에 포함되었다고 해서 바로 사용할 수 있는 것은 아니다. 실제 사용 가능 여부는 브라우저와 Node 버전에 따라 달라진다. 따라서 도입 전에 지원 여부를 먼저 확인하는 편이 안전하다.

<br>
<br>

### 6. 최신 스펙을 미리 알아보는 방법

---

스펙을 깊게 파는 것보다, “변화의 신호”를 빨리 잡는 편이 효율적이다. 아래 루틴만 챙겨도 대부분의 새 기능은 놓치지 않는다.

### 6-1. GitHub는 “관심 키워드만” Star로 모아둔다

GitHub는 스펙 변화가 가장 먼저 모이는 곳이다. 다만 모든 Discussion을 따라가려 하면 금방 지친다. 그래서 나는 “인덱스 저장소 + 관심 제안 저장소”만 Star로 모아두는 방식으로 관리한다.

먼저, 기준이 되는 인덱스 2개만 잡아둔다.

- [tc39/proposals](https://github.com/tc39/proposals)는 진행 중인 ECMAScript 제안들을 추적하는 목록이다.
- [tc39/ecma262](https://github.com/tc39/ecma262)는 표준 스펙 본문이 모이는 저장소이며, 제안은 proposals에서 관리된다는 안내가 들어 있다.

그리고 “내가 관심 있는 기능”만 추가로 Star한다. 예를 들어 이번 글의 주제는 아래 저장소에서 시작했다.

> tc39/proposal-upsert (결과적으로 getOrInsert / getOrInsertComputed로 정리된 제안)

GitHub는 Star한 저장소를 List로 분류할 수 있다. 나는 이 기능을 Spec Radar 같은 이름으로 써서 관심 있는 스펙 관련 저장소만 따로 모아둔다. 아래는 내가 샘플로 Star해서 Spec Radar 리스트에 넣어둔 구성 예시다. (관심사에 맞게 바꾸면 된다.)

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-02-15/JAVASCRIPT/radar.png"/>

이 정도만 모아둬도 “요즘 자바스크립트가 어디로 가는지” 감이 생긴다.

추가로, 알림(Watch)은 최소로 켜는 편이 낫다. 알림이 많아지면 결국 다 꺼버리게 된다. 그래서 나는 Star + 리스트로 정리하고, 정말 관심 있는 저장소만 선별적으로 Watch한다.

<br>

### 6-2. 결국은 런타임 릴리즈 노트를 본다

스펙에 들어갔다고 끝이 아니다. 실제로는 브라우저/Node 릴리즈에 들어가는 순간부터가 실전이다. 따라서 “내가 배포하는 런타임”의 릴리즈 노트를 가끔 훑는 습관이 가장 강력하다. 스펙보다 런타임이 더 현실이다.

<br>
<br>

## 🤔 Understanding

**Map.getOrInsert()** 는 거대한 기능이 아니다. 하지만 언어가 가는 방향을 또렷하게 보여주는 변화다. 자바스크립트는 계속해서 “가능은 했지만 늘 장황했던 패턴”을 표준 API로 끌어올리고 있다. 그 결과 코드의 의도가 더 명확해진다는 점이 중요하다.

비슷한 경험을 ES2024의 **Object.groupBy / Map.groupBy** 에서도 느꼈다. 

> [Object.groupBy / Map.groupBy (ES2024)](https://blog.jh8459.com/2025-11-08-JAVASCRIPT/)

과거에는 그룹핑을 하려면 `reduce`로 누적 객체를 만들고, 키가 없으면 초기화하고, 그 다음 push하는 흐름을 직접 작성해야 했다. 동작 자체는 단순했지만 표현이 길고, 구현 방식도 팀마다 달랐다. `groupBy`가 들어오면서 “그룹핑을 한다”는 의도가 코드에 직접 드러나기 시작했다.

이번 getOrInsert도 같은 결이다. has → set → get을 반복하는 대신 “없으면 넣고 꺼낸다”는 의도가 한 줄로 고정된다. 특히 getOrInsertComputed는 기본값 생성 비용까지 의도에 맞게 지연시키면서, 코드가 말하고자 하는 바를 더 정확히 표현한다.

이런 변화가 마음에 든다. 자바스크립트는 여전히 유연한 언어이지만, 자주 쓰는 패턴을 표준 API로 정리해 읽는 사람 중심의 코드로 유도하고 있다. 구현을 숨기는 것이 아니라, 반복되는 의도를 공통 언어로 올려주는 방향이다. groupBy와 getOrInsert는 그 흐름을 잘 보여주는 한 쌍의 사례라 생각된다.

<br>
<br>