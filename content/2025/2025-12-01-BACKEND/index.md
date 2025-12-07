---
emoji: 📚
title: MikroORM v6.6 – 무엇이 달라졌나?
date: '2025-12-01'
author: JH8459
categories: Backend
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-01/BACKEND/thumbnail.png
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-12-01/BACKEND/thumbnail.png"/>

## 📚 Overview

MikroORM 6.6.0은 눈에 띄는 대규모 기능 추가는 아니지만, “엔티티의 캡슐화와 일관성을 지켜주는 기능”이 정식 지원되었다는 점에서 상당히 의미 있는 릴리스라 생각한다.

이번 포스팅에서는 우리 팀이 채택한 컨벤션인 private 필드 + get/set accessor를 이용한 프로퍼티 관리 관점으로 이번 릴리즈 내용을 정리해보려한다.

<br>
<br>

### 1. MikroORM 6.6.0 주요 변경점 요약

---

> 공식 릴리스 노트 https://github.com/mikro-orm/mikro-orm/releases/tag/v6.6.0

버그 픽스가 아닌 피쳐 목록만 확인해보면 아래와 같다.

- core: allow control over relation filters in entity definition
  - 기존 MikroORM에는 글로벌/엔티티 단위 필터(SoftDeleteFilter 등)가 있었지만, 특정 relation에 필터가 어떻게 적용될지 세밀히 제어하기 어려웠다.
  - 특정 relation에 필터를 적용할지 말지 등을 엔티티 정의 단계에서 직접 지정할 수 있도록 변경되었다.

- core: allow defining filters on nullable relations as strict
  - nullable relation에도 필터 적용을 강제할 수 있게 변경되었다.
  - 삭제된 엔티티가 nullable이라 조인되어 버리는 문제 등을 깔끔히 해결 가능하다.

- core: allow disabling filters on relations
  - relation 단위로 필터 끄기가 가능하게 변경되었다.
  - 글로벌 필터가 적용되어있더라도 특정 relation에 대해선 필터를 꺼버릴 수 있다.

- **core: support private properties with get/set accessors**
  - 이번 릴리즈의 핵심이라 생각한다. private 필드 + getter/setter 를 ORM이 정식 지원한다.
  - `#privateField` 사용 가능하다. (접근은 getter/setter로 제한)
  - 도메인 규칙을 강제하고 캡슐화를 더욱더 강력하게 적용할 수 있다.

- entity-generator: allow generating enums as type or JS dictionary
  - enum을 TS 타입 또는 JS 객체(dictionary) 로 선택 생성 가능하게 변경되었다.

- entity-generator: support generating defineEntity() definitions
- entity-generator: support native postgres enums
- knex: reexport raw helper that supports QueryBuilder and Knex.QueryBuilder
- postgres: skip left joined relations from pessimistic locks automatically

<br>

그 중에서도 실무에서 큰 영향을 주는 건 엔티티를 정식으로 private 필드 + accessor 구조로 설계할 수 있게 된 것이라 생각한다.

<br>
<br>

### 2. 기존 MikroORM의 문제점

---

```ts
@Entity()
export class User {
  @PrimaryKey()
  id!: number;

  @Property()
  email!: string;

  @Property()
  nickname!: string;
}
```

대부분의 위와 같이 프로퍼티들을 public으로 두기에 `setEmail()` 같은 메서드를 모델에 추가하더라도 `user.email`에 직접 접근하여 변경할 수 없도록 코드 레벨에서 제어할 순 없었다.

```ts
user.email = 'invalid@...'; // 그대로 허용됨
```

팀 컨벤션과 코드 리뷰로 위와 같은 직접 할당을 최대한 막고 있었지만, 도메인 규칙을 강제하기 어렵다는 점이 불편함으로 존재했다.

<br>
<br>

### 3. 변경될 MikroORM

---

이번 릴리즈 이후 이제 아래와 같은 구조가 공식 패턴으로 가능해졌다.

```ts
@Entity()
export class User {
  @PrimaryKey()
  #id!: number;

  #email!: string;

  @Property({ accessor: true })
  get email() {
    return this.#email;
  }

  set email(value: string) {
    this.#email = value;
  }
}
```

| 관점 | 기존 방식 | v6.6 방식 |
|------|-----------|-----------|
| **엔티티 필드 접근** | 누구나 public 필드를 직접 변경 가능 | getter/setter 로직을 강제하여 무분별한 변경 방지 |
| **데이터 무결성** | 규칙을 지키지 않은 값 입력 가능 → 취약 | setter에서 도메인 규칙을 강제 적용 가능 |
| **private field 활용** | 비공식적/우회적 구현 필요 | private 필드를 ORM이 직접 공식 지원 |
| **유지보수성** | 규칙이 엔티티 곳곳에 흩어짐 | 엔티티가 캡슐화된 도메인 모델처럼 동작하여 유지보수성↑ |

<br>
<br>

### 4. JS private vs @Property({ accessor: true })

---

MikroORM v6.6에서 `private properties with get/set accessors`를 지원하면서 헷갈리기 쉬운 포인트가 하나 생긴다. JS의 `#privateField`만 쓰는 것과 MikroORM의 `@Property({ accessor: true })`를 쓰는 것은 뭐가 다를까?

둘은 겹치는 부분도 있지만, 역할 / 관심사가 완전히 다르다. 아래에서 예시로 비교해보자.

<br>
<br>

#### 4-1. JS private

---

```ts
class User {
  #email: string;

  constructor(email: string) {
    this.#email = email;
  }

  getEmail() {
    return this.#email;
  }

  changeEmail(next: string) {
    if (!next.includes('@')) {
      throw new Error('Invalid email');
    }
    this.#email = next;
  }
}

const u = new User('a@b.com');

// 외부에서 직접 접근 불가
// u.#email (Syntax Error)
u.changeEmail('new@domain.com'); // 도메인 규칙을 강제
```

여기서 JS의 private 필드는 오직 JS 레벨 캡슐화만 제공한다.

- 클래스 외부에서 #email에 접근할 수 없고
- 클래스 내부에서는 마음대로 읽고 쓸 수 있다
- “ORM이 이 필드를 DB에 어떻게 영속화할지”는 모른다 (관심 없음)

즉, JS private은 언어 차원의 정보 은닉에 가깝다.

<br>
<br>

#### 4-2. @Property({ accessor: true })

---

MikroORM 입장에서 중요한 건 다음과 같다.

- 어떤 프로퍼티가 DB 필드에 매핑되어야할까?
- 값을 읽고 쓸 때 어떤 경로를 통해 접근해야 해아할까?

```ts
import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

@Entity()
export class User {

  @PrimaryKey()
  id!: number;

  #email!: string;

  @Property({ accessor: true })
  get email() {
    return this.#email;
  }

  set email(value: string) {
    if (!value.includes('@')) {
      throw new Error('Invalid email');
    }
    this.#email = value;
  }
}
```

즉, 이 프로퍼티는 getter/setter를 통해 제어되는 프로퍼티라고 ORM에게 선언하는 것이다.

<br>
<br>

## 🤔 Understanding

MikroORM v6.6은 스펙이 크게 바뀐 릴리스는 아니지만, 엔티티 모델링의 완성도를 크게 끌어올리는 기능을 정식으로 지원했다.

MSA + DDD 스타일로 개발하는 우리 팀에게는 도메인 규칙을 setter에서 강제할 수 있게 되어 불편한 점을 크게 개선할 수 있다 생각한다.
