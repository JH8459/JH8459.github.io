---
emoji: 📚
title: Sequelize Op
date: '2022-02-15'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 시퀄라이즈는 SQL문을 JavaScript 환경에서 객체로 작성할 수 있는 ORM(Object Relational Mapping)이다.

- 여러 문법중 Op라는 연산자를 사용하는 문법에 대해 학습한 내용을 정리해 보았다.

<br>
<br>

### 1. Op

---

- Op 연산자는 `where`객체 안에서 쓰이는 <a href="https://developer.mozilla.org/ko/docs/Glossary/Symbol">Symbol</a> 타입의 연산자이다.

- 해당 연산자를 사용하여 복잡한 비교 연산을 지원해준다.

<br>
<br>

#### 1-1. 연산자(일반)

---

- 공식문서에서 설명하는 연산자는 다음 아래와 같다.

  ```js
  // Logical operator
  [Op.and]: [{ a: 5 }, { b: 6 }],  // (a = 5) && (b = 6)
  [Op.or]: [{ a: 5 }, { b: 6 }],  // (a = 5) || (b = 6)

  // Basics
  [Op.eq]: 3,  // = 3
  [Op.ne]: 20,  // != 20
  [Op.is]: null,  // IS NULL
  [Op.not]: true,  // IS NOT TRUE
  [Op.or]: [5, 6],  // (someAttribute = 5) OR (someAttribute = 6)

  // Using dialect specific column identifiers (PG in the following example):
  [Op.col]: 'user.organization_id',        // = "user"."organization_id"

  // Number comparisons
  [Op.gt]: 6,  // > 6
  [Op.gte]: 6,  // >= 6
  [Op.lt]: 10,  // < 10
  [Op.lte]: 10,  // <= 10
  [Op.between]: [6, 10],  // BETWEEN 6 AND 10
  [Op.notBetween]: [11, 15],  // NOT BETWEEN 11 AND 15

  // Other operators
  [Op.all]: sequelize.literal('SELECT 1'), // > ALL (SELECT 1)

  [Op.in]: [1, 2],  // IN [1, 2]
  [Op.notIn]: [1, 2],  // NOT IN [1, 2]

  [Op.like]: '%hat',  // LIKE '%hat'
  [Op.notLike]: '%hat',  // NOT LIKE '%hat'
  [Op.startsWith]: 'hat',  // LIKE 'hat%'
  [Op.endsWith]: 'hat',  // LIKE '%hat'
  [Op.substring]: 'hat',  // LIKE '%hat%'
  [Op.iLike]: '%hat',  // ILIKE '%hat' (case insensitive) (PG only)
  [Op.notILike]: '%hat',  // NOT ILIKE '%hat'  (PG only)
  [Op.regexp]: '^[h|a|t]',  // REGEXP/~ '^[h|a|t]' (MySQL/PG only)
  [Op.notRegexp]: '^[h|a|t]',  // NOT REGEXP/!~ '^[h|a|t]' (MySQL/PG only)
  [Op.iRegexp]: '^[h|a|t]',  // ~* '^[h|a|t]' (PG only)
  [Op.notIRegexp]: '^[h|a|t]',  // !~* '^[h|a|t]' (PG only)

  [Op.any]: [2, 3],  // ANY ARRAY[2, 3]::INTEGER (PG only)
  [Op.match]: Sequelize.fn('to_tsquery', 'fat & rat') // match text search for strings 'fat' and 'rat' (PG only)

  // In Postgres, Op.like/Op.iLike/Op.notLike can be combined to Op.any:
  [Op.like]: { [Op.any]: ['cat', 'hat'] }  // LIKE ANY ARRAY['cat', 'hat']
  ```

<br>
<br>

#### 1-2. 연산자(범위)

---

- 범위 연산자 또한 지원하여 다양한 종류의 범위를 쿼리할 수 있다.

- 공식문서에서 설명하는 범위 연산자는 아래와 같다.

  ```js
  [Op.contains]: 2,            // @> '2'::integer  (PG range contains element operator)
  [Op.contains]: [1, 2],       // @> [1, 2)        (PG range contains range operator)
  [Op.contained]: [1, 2],      // <@ [1, 2)        (PG range is contained by operator)
  [Op.overlap]: [1, 2],        // && [1, 2)        (PG range overlap (have points in common) operator)
  [Op.adjacent]: [1, 2],       // -|- [1, 2)       (PG range is adjacent to operator)
  [Op.strictLeft]: [1, 2],     // << [1, 2)        (PG range strictly left of operator)
  [Op.strictRight]: [1, 2],    // >> [1, 2)        (PG range strictly right of operator)
  [Op.noExtendRight]: [1, 2],  // &< [1, 2)        (PG range does not extend to the right of operator)
  [Op.noExtendLeft]: [1, 2],   // &> [1, 2)        (PG range does not extend to the left of operator)
  ```

<br>
<br>

#### 1-3. 연산자 조합

---

- `where` 조건 객체에서 연산자들끼리의 중복 사용또한 가능하다.

- 조건 객체에서 별 다른 연산자로 엮어주지 않고 속성을 나열한다면 AND로 간주된다.

- 연산자안에서 여러 컬럼을 다루는 경우에는 각 컬럼에 대한 조건을 담은 객체의 배열로 작성해야 한다.

  ```js
  const { Op } = require("sequelize");

  Foo.findAll({
    where: {
      rank: {
        [Op.or]: {
          [Op.lt]: 1000,
          [Op.eq]: null
        }
      },
      // rank < 1000 OR rank IS NULL

      {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - 24 * 60 * 60 * 1000)
        }
      },
      // createdAt < [timestamp] AND createdAt > [timestamp]

      {
        [Op.or]: [
          {
            title: {
              [Op.like]: 'Boat%'
            }
          },
          {
            description: {
              [Op.like]: '%boat%'
            }
          }
        ]
      }
      // title LIKE 'Boat%' OR description LIKE '%boat%'
    }
  });
  ```

<br>
<br>

## 🤔 Understanding

- ~~항상 느끼지만 시퀄라이즈 공식문서는 너무 불친절..~~

- 공식문서에서는 자세한 사용 방식을 안내하기보다는 다양한 예시를 제공해 준 뒤, 이에 맞춰 사용자가 찾아서 써라(?)라는 느낌을 많이 받았다.

- 매번 `ctril + f` 로 검색하여 찾아 쓰기 귀찮아서 정리해보았다.

<br>
<br>

```toc

```
