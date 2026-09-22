---
emoji: 📚
title: "좋은 이슈 리포트는 어떻게 만들어지는가"
date: '2026-09-22'
author: JH8459
categories: Backend
thumbnail: https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-09-22/BACKEND/thumbnail.png
---

<img src = "https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-09-22/BACKEND/banner.png"/>

## 📚 Overview

지난 ["조용히 비어버린 값 하나에서 시작한 ORM 메이저 업그레이드 검증 전략"](https://blog.jh8459.com/2026-09-18-BACKEND/) 포스팅을 이렇게 맺었다.

> 같은 사례의 업스트림 이슈는 찾지 못했다. 재현 조건을 좁히고 "버그"로 볼지 "진단 메시지 개선 요청"으로 볼지 스스로 먼저 결론을 낸 뒤, 최소 재현 저장소와 함께 제보해볼 생각이다.

어제 그 이슈를 올렸다.

- 09-21 13:51 — 이슈 등록 ([mikro-orm#8292](https://github.com/mikro-orm/mikro-orm/issues/8292))
- 09-21 14:12 — 다른 컨트리뷰터가 PR 등록 ([mikro-orm#8293](https://github.com/mikro-orm/mikro-orm/pull/8293)), 이슈로부터 **21분**
- 09-22 02:25 — 메인테이너 머지, 이슈 종료

정작 내가 쓴 코드는 한 줄도 없다. 고친 것은 다른 사람이고, 나는 재현과 이슈 본문만 썼다.

이 글은 사내에서 우회로 덮어둔 문제를 업스트림 이슈로 옮기기까지의 기록이다. 그리고 왜 이 이슈가 21분 만에 PR로 이어졌는지, 그 이유라고 생각하는 것들을 남긴다.

<br>
<br>

### 1. 우회와 제보를 분리한 이유

---

문제 자체는 지난 글에서 정리했다. 임베디드 값 객체의 프로퍼티 이름(`User.password`)과 그 값이 저장되는 컬럼 이름(`password`)이 같을 때, JOIN 으로 함께 불러오는 경로에서만 매핑이 깨지는 현상이다.

당시 선택한 해법은 이름 충돌 자체를 없애는 것이었다. 프로퍼티 이름을 `hashedPassword` 로 바꾸고 `fieldName` 을 따로 줘서, DB 스키마는 그대로 둔 채 애플리케이션 코드 안에서만 끝냈다.

이 우회는 업그레이드를 막지 않기 위한 선택이었다. 문제를 이해한 것은 아니었다. 원인은 여전히 ORM 안에 있었고, 우리는 그 위에 이름 하나를 덮어둔 상태였다.

그래서 우회와 제보를 하나의 작업으로 묶지 않았다. 우회는 배포까지 끝내고, 제보는 그 뒤에 따로 진행했다. 우회가 이미 배포되어 있으니 제보를 서둘러야 할 이유가 없었고, 그만큼 재현을 다듬을 시간이 생겼다.

되돌릴 계획이 필요했던 것도 이유였다. `hashedPassword` 라는 이름과 `fieldName: '_password'` 는 원래 필요 없던 것이다. 이 흔적을 지우려면 업스트림이 고쳐지는 수밖에 없었다.

<br>
<br>

### 2. 재현을 남의 일로 만들지 않기

---

MikroORM 은 이슈 템플릿에서 재현 저장소를 요구하고, 그와 함께 [`mikro-orm/reproduction`](https://github.com/mikro-orm/reproduction) 이라는 재현용 베이스 저장소를 제공한다.

나는 이 저장소를 fork 해서 [JH8459/reproduction](https://github.com/JH8459/reproduction) 을 만들고, 증상을 재현하는 커밋 하나만 얹었다.

fork 를 택한 것은 편해서가 아니었다. 베이스의 커밋 이력을 보면 메인테이너가 직접 정리해둔 것이고, 커밋 메시지에 그 의도가 적혀 있다.

<img src = "https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-09-22/BACKEND/commit.png"/>

<center>메인테이너 <strong>B4nan</strong>(Martin Adámek)이 재현 베이스를 한 파일로 정리해둔 <a href="https://github.com/mikro-orm/reproduction/commit/df7429089eb728d29ff907c54087e20648a46b40">커밋</a>이다.</center>
<br><br>

재현 코드를 ORM 본체의 테스트로 옮길 때 어차피 해야 하는 손질을 미리 해둔 베이스라는 뜻이다. 테스트 러너, 드라이버, 엔티티 정의 방식이 모두 본체 테스트와 같은 모양으로 맞춰져 있다.

그 위에 커밋 하나만 올리면 받는 쪽은 저장소 전체를 훑을 필요가 없다. 그 커밋만 보면 재현 조건이 다 나온다. 실제로 이번 PR 의 회귀 테스트는 그 형태를 그대로 이어받아 `tests/issues/GH8292.test.ts` 로 들어갔다.

베이스 README 에 적힌 힌트는 사실상 채점 기준이다.

- 한 번에 하나의 문제만 재현할 것
- 테스트는 자기완결적일 것 — 데이터 준비까지 테스트 안에서
- CLI 를 쓰지 말고 전부 프로그램으로 할 것
- 관련 없는 것은 전부 제거할 것
- 테스트의 중복은 괜찮다, 복잡한 추상화보다 낫다
- 주석도 좋지만 단언이 더 좋다

실제 엔티티는 필드가 수십 개였지만 재현에서는 `User` / `Password` / `Profile` 세 개만 남겼다. 드라이버도 인메모리 SQLite 로 바꿨다. 문제의 조건은 임베디드 프로퍼티 이름과 자식 컬럼 이름이 같다는 것 하나였고, 나머지는 재현을 흐리는 잡음이었다.

가장 신경 쓴 것은 따로 있다. **통과하는 테스트를 일부러 함께 넣었다.**

```ts
test('direct load hydrates embedded', async () => { ... });          // 통과
test('select-in populate hydrates embedded', async () => { ... });   // 통과

// fails in v7: Cannot use 'as u1__password' alias on embedded property 'u1.password'
test('joined populate hydrates embedded', async () => { ... });      // 실패

// fails in v6: Empty .update() call detected! Table: `user`. Columns: .
test('flush after joined populate issues no user update', async () => { ... });  // 실패
```

실패하는 케이스만 올리면 읽는 사람의 첫 질문은 설정이 잘못된 게 아니냐는 것이 된다. 그 질문에 답하려면 왕복이 한 번 더 필요하고, 그렇게 되면 이슈는 대개 뒤로 밀린다.

같은 엔티티와 같은 데이터로 통과하는 경로를 나란히 두면 그 질문이 나오지 않는다. 엔티티 정의가 아니라 로딩 전략만 다르다는 게 테스트 이름에서 이미 보인다.

fork 부터 이슈 등록까지는 11분이 걸렸다. 앞에서 재현을 다듬을 시간이 생겼다고 적은 것과 어긋나 보이지만, 우회를 만드는 과정에서 조건을 이미 좁혀뒀기 때문에 저장소 작업 자체는 짧게 끝났다.

<br>
<br>

### 3. 이슈 본문에 무엇을 적었나

---

가장 앞에 둔 것은 v6 와 v7 의 증상이 다르다는 점이었다. 같은 매핑인데 v7 은 예외를 던지고, v6 은 조용히 빈 UPDATE 를 만든다.

```
# v7 — joined populate 자체가 실패
DriverException: Cannot use 'as u1__password' alias on embedded property 'u1.password'
because it expands to multiple columns.

# v6 — 조회는 되지만, 이후 flush 에서
Empty .update() call detected! Update data does not contain any values to update. Table: `user`. Columns: .
```

한쪽만 보면 원래 지원하지 않는 설계로 읽힌다. 버전에 따라 증상이 갈린다는 점이 그렇지 않다는 쪽의 근거가 됐다고 생각한다.

그 뒤에 확인한 범위를 적었다. next(7.2.1-dev.24)와 7.2.1, 7.2.0 에서 실패하고, 6.6.16 에서는 joined populate 는 통과하는데 flush 만 실패했다. sqlite 와 mariadb 11.4 양쪽 결과가 같았다. 비슷해 보이는 기존 이슈(#8271, #8272)도 먼저 찾아서, 그 수정이 들어간 next 에서도 재현된다는 것을 함께 적었다. 드라이버 문제인지 이미 고쳐진 문제인지 확인하는 몫을 넘기지 않으려는 의도였다.

요구는 최소로 적었다. 메인테이너는 전부터 단일 속성 임베더블보다 커스텀 타입을 권고해왔고, 그 상태에서 우리 매핑이 동작하게 해달라고 쓰면 권고를 무시한 설계를 떠받쳐 달라는 요청이 된다. 그래서 같은 매핑이 버전에 따라 다르게 실패하고 에러 메시지에서 원인까지 가는 거리가 멀다는 것만 남겼다. 별칭 해석 단계에서 `u1.password` 가 컬럼이 아니라 임베디드 프로퍼티로 풀리는 것 같다는 짐작은 적었지만 단정하지는 않았다. 이름을 바꾸면 사라진다는 우회책도 같이 적어뒀다.

<br>
<br>

### 4. 21분 뒤에 온 PR, 그리고 내 신고보다 넓었던 수정

---

PR 은 이슈 등록 21분 뒤에 올라왔고, 같은 날 메인테이너가 머지했다. 변경은 `QueryBuilder` 한 곳, 16줄이었다.

```ts
// 조인 전략은 컬럼 이름으로 select 하는데, 그 이름이 인라인 임베디드 프로퍼티 이름과 충돌할 수 있다
const shadowed =
  customAlias &&
  prop?.kind === ReferenceKind.EMBEDDED &&
  (this.#state.aliases[a]?.meta ?? this.mainAlias.meta).props.some(
    p => (p.kind !== ReferenceKind.EMBEDDED || p.object) && p.fieldNames?.includes(f),
  );

if (prop?.kind === ReferenceKind.EMBEDDED && !shadowed) {
  // 기존처럼 여러 컬럼으로 펼치고, 별칭이 붙어 있으면 거부한다
}
```

별칭이 붙은 select 의 이름이 엔티티의 실제 컬럼과 일치하면, 임베디드 프로퍼티가 아니라 그 컬럼으로 해석하도록 바꾼 것이다. 별칭이 없으면 종전대로 프로퍼티 전체를 펼친다. 내가 짐작했던 지점과 같은 자리였다.

수정이 **내가 신고한 것보다 넓었다는 점**이 흥미로웠다. 같은 분기에서 두 가지가 더 고쳐졌다.

- `persist: false` 인 자식을 가진 인라인 임베더블이 컬럼 전개 과정에서 깨지던 문제
- 전개된 컬럼에 요청된 조인 별칭이 붙지 않아, 조인해서 읽어야 할 임베더블을 메인 테이블에서 읽어오던 문제

두 번째가 눈에 걸렸다. 예외도 없고 값도 채워지는데 출처가 틀린 형태다. 내가 올린 문제는 그래도 시끄럽게 터지기는 했는데, 이쪽은 조용히 틀린 값을 준다. 제보하지 않았던 버그가 같은 분기 안에 함께 있었던 셈이다.

머지된 회귀 테스트도 내 재현보다 넓다. 단일 컬럼 임베더블뿐 아니라 다중 컬럼 임베더블, 중첩 임베더블, `persist: false` 자식, 임베더블 컬럼과 이름이 겹치는 평범한 스칼라 프로퍼티까지 한 파일에 들어갔다. 내 재현 네 줄은 그 형태의 씨앗 정도였다.

남은 일은 우회를 되돌리는 것이다. 수정이 릴리스에 실리면 `hashedPassword` 를 원래 이름으로 되돌릴 수 있다. 되돌리는 기준은 버전을 올렸다는 사실이 아니라, 조인 전략으로 불러온 값이 채워지는 것을 확인한 시점으로 잡아두려 한다.

<br>
<br>

## 🤔 Understanding

이번 일에서 남은 것은 세 가지다.

- **우회와 제보는 같이 묶지 않는 편이 낫다.** 우회를 먼저 끝내면 제보가 급해지지 않고, 그만큼 재현을 다듬을 여유가 생긴다. 반대로 제보가 해결되기를 기다리며 배포를 미뤘다면 둘 다 늦어졌을 것이다.
- **재현은 올리는 쪽에서 최대한 끝내두는 게 낫다.** 프로젝트가 재현 베이스를 제공한다면 그것을 fork 하는 것이 먼저다. 이식할 때 필요한 손질이 이미 끝나 있고, 내 커밋 하나에 재현 조건이 다 담긴다. 여기에 통과하는 경로까지 함께 넣으면 설정 문제가 아니냐는 되물음이 나오지 않는다.
- **기여의 단위가 꼭 PR 은 아니다.** 이번에 고친 사람은 내가 아니지만, 고칠 수 있는 형태로 문제를 옮겨놓는 일에도 몫이 있었다고 생각한다. 코드를 쓸 시간이 없어서 제보를 미루는 것보다는, 재현을 잘 만들어 넘기는 편이 실제로 더 빨리 고쳐진다.

<br>

<img src = "https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2026-09-22/BACKEND/comment.png"/>

<br>

**참고 자료**

- [mikro-orm #8292 — Joined populate throws when embedded property has the same name as its column](https://github.com/mikro-orm/mikro-orm/issues/8292)
- [mikro-orm #8293 — fix(sql): resolve inline embeddable columns that shadow the property name](https://github.com/mikro-orm/mikro-orm/pull/8293)
- [mikro-orm/reproduction — 재현용 베이스 저장소](https://github.com/mikro-orm/reproduction)
- [JH8459/reproduction — 이번 이슈의 최소 재현](https://github.com/JH8459/reproduction)
- [MikroORM 공식 문서 — Embeddables](https://mikro-orm.io/docs/embeddables)
- [Discussion #3685 — 값 객체 매핑에 대한 메인테이너 권고](https://github.com/mikro-orm/mikro-orm/discussions/3685)
