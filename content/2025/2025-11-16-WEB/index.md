---
emoji: 📚
title: structuredClone() – Web Platform이 제공하는 표준 딥 클론
date: '2025-11-16'
author: JH8459
categories: Web
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-16/web/thumbnail.png
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-16/web/thumbnail.png"/>

## 📚 Overview

`structuredClone()`은 값 전체를 깊은 복사(Deep Copy) 해주는 Web Platform API다. `JSON.parse(JSON.stringify(...))` 나 `lodash.cloneDeep` 같은 우회 방법 없이, 웹 표준 API로 공식 지원하는 딥 클론 도구라고 볼 수 있다.

이번 글에서는 아래 내용을 다뤄 볼 예정이다.

- `structuredClone()`은 어떤 표준에 속하는가?
- 기본 문법과 동작 방식
- `JSON.stringify`과의 비교
- 실무에서 활용 사례

<br>
<br>

### 1. structuredClone()은 어디 표준에 속할까?

---

먼저 짚고 갈 내용은 `structuredClone()`은 ES 표준(ECMAScript Language Specification)에 정의된 문법이 아니다.

`structuredClone()`은 `let`, `class`, `Promise`, `Array.prototype.map`처럼 ECMAScript가 정의한 “언어 자체의 기능”이 아니다.  

오히려 `fetch`처럼 브라우저(Web Platform)가 환경 차원에서 제공하는 API에 더 가깝다. 즉, JavaScript 문법에 포함된 기능이 아니라 브라우저나 Node.js가 구현한 **Web API**를 통해 사용할 수 있는 기능이다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-11-16/web/console.png"/>

<center>따라서 이런 콘솔에서도 간편하게 사용이 가능하다.</center>
<br><br>

MDN에서도 [`Window: structuredClone() method`](https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone)와 [`WorkerGlobalScope: structuredClone() method`](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/structuredClone)로 각각 문서화되어 있으며, 해당 내용은 결국 WHATWG의 [`HTML Standard`](https://html.spec.whatwg.org/multipage/structured-data.html#structuredserialize)에서 정의한 구조화 복제 알고리즘을 기반으로 한다.

> 💡 `structuredClone()`이 속한 스펙은 **WHATWG HTML Standard**다.  
> WHATWG(웹 하이퍼텍스트 애플리케이션 기술 워킹 그룹)는 HTML, DOM, Fetch 같은 **웹 플랫폼 핵심 표준을 정의하는 단체**로, 브라우저들이 공통으로 구현하는 “실제 웹 표준”을 만든다.
>
> `structuredClone()` 역시 이 HTML Standard에 포함된 **Structured Clone Algorithm**을 기반으로 제공되는 Web API다.

<br>
<br>

### 2. 기본 문법

---

> https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone

- value: 복제할 값. structured-cloneable 타입이라면 대부분 가능하다.
- options(transfer): 복제 대신 “소유권을 넘길” 객체 리스트 (ArrayBuffer 등 Transferable 타입).

```js
// 기본 형태
structuredClone(value);

// Transferable objects 옵션을 함께 넘길 때
structuredClone(value, {
  transfer: [/* ArrayBuffer, ImageBitmap ... */],
});
```

`structuredClone()`의 반환 값은 항상 원본과 분리된 깊은 복사(Deep Copy) 이다.

<br>

> 💡 Transferable objects 란?
>
> Transferable objects는 말 그대로 “복사하는 대신 소유권을 이동시킬 수 있는 값” 을 의미한다.
>
> 예를 들어 ArrayBuffer 같은 대용량 버퍼를 생각해보면, 복사하려면 메모리를 또 만들어야 하고 시간도 오래 걸리게 된다.
>
> 그래서 브라우저는 “복사하지 말고 그냥 소유권을 다른 곳으로 옮겨버리는 방식”을 지원한다. 즉, Transferable로 지정하면 복사하지 않아도 되므로 성능상 이점이 있게된다.
>
> 단, 원래 객체를 참조하던 곳에서는 이 값을 더 이상 사용할 수 없다.

<br>
<br>

### 3. 순환 참조가 있는 객체도 안전하게 복사

---

structured clone 알고리즘은 내부에서 참조를 기록하며 순환 구조를 처리한다.

> https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm

```js
const original = { name: 'structured clone' };
original.self = original; // 순환 참조

const cloned = structuredClone(original);

console.log(cloned === original);        // false (다른 객체)
console.log(cloned.name);                // 'structured clone'
console.log(cloned.self === cloned);     // true (순환 구조 유지)
```

이 부분이 `JSON.parse(JSON.stringify(obj))`와 가장 큰 차이 중 하나다.

<br>
<br>

### 4. JSON.parse(JSON.stringify(...))와 비교

---

```js
const deepCopied = JSON.parse(JSON.stringify(value));
```

위 문법의 장점은 단순함이지만, 다음과 같은 문제를 가진다.

- 순환 참조가 있으면 `JSON.stringify()` 단계에서 예외 발생
- `Map`, `Set`, `Date`, `RegExp`, `ArrayBuffer` 타입은 깨지거나 문자열화
- 함수는 제거됨

<br>

하지만 `structuredClone()`은 위에 열거한 단점들이 상당 부분 보완된다.

| 항목 | JSON 기반 딥 클론(`JSON.stringify`) | structuredClone() |
|------|-----------------------------------------|------------------------------|
| 순환 참조 | ❌ 순환 구조 발견 시 예외 발생 | ✅ 순환 참조 그대로 복제 가능 |
| Map / Set / Date / RegExp / ArrayBuffer 등 | ❌ 대부분 문자열화되거나 일반 객체로 변형 | ✅ 스펙에 정의된 방식으로 올바르게 복제됨 |
| 함수(Function) | ⭕ 오류 없이 포함되지만 **그냥 제거됨** | ❌ 포함 시 `DataCloneError` 예외 발생 |
| 타입 보존 | ❌ 단순 객체/배열만 제대로 보존 | ✅ Map, Set 등 다양한 Web/JS 타입 보존 |

> 💡 함수(Function)는 복제할 수 없다
>
> `structuredClone()`은 함수, 클래스 메서드와 같은  **실행 가능한 코드(executable code)** 는 복제하지 못한다. 이런 값이 포함된 객체를 전달하면 조용히 무시되는 것이 아니라 **`DataCloneError` (DOMException)** 를 바로 던진다.

<br>
<br>

### 5. 실무에서 언제 쓰면 좋을까?

---

API 요청을 처리하다 보면 원본 요청 값(req.body)을 그대로 남겨두고, 별도로 가공한 객체를 만들어야 하는 경우가 많다.

예를 들어 로깅, 검증, 내부 시스템 전달용 DTO 등을 만들 때 다음과 같은 형태로 사용할 수 있다.

```ts
const original = req.body;                 // 원본은 그대로 유지
const payload = structuredClone(req.body); // 가공용 깊은 복사 객체

payload.flag = true;
process(payload);
```

이렇게 하면 원본 값을 오염시키지 않고 깨끗한 복제본을 기반으로 후처리를 안전하게 수행할 수 있다.

<br>
<br>

## 🤔 Understanding

`structuredClone()`은 객체를 깊게 복사하기 위해 Web Platform이 제공하는 **표준 깊은 복사 API**임을 알게되었다.

기존에 사용되던 `JSON.parse(JSON.stringify())` 방식이 가진 한계(타입 손실, 순환 참조 예외 등)를 해결하고, 라이브러리 없이도 브라우저와 Node.js에서 동일한 방식으로 **표준화된 Deep Copy**를 수행할 수 있다는 점이 가장 큰 장점으로 느껴진다.
