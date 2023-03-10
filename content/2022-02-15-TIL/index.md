---
emoji: π
title: Sequelize Op
date: '2022-02-15'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## βοΈ **T**oday **I** **L**earned

---

<br>

- μνλΌμ΄μ¦λ SQLλ¬Έμ JavaScript νκ²½μμ κ°μ²΄λ‘ μμ±ν  μ μλ ORM(Object Relational Mapping)μ΄λ€.

- μ¬λ¬ λ¬Έλ²μ€ OpλΌλ μ°μ°μλ₯Ό μ¬μ©νλ λ¬Έλ²μ λν΄ νμ΅ν λ΄μ©μ μ λ¦¬ν΄ λ³΄μλ€.

<br>
<br>

### 1. Op

---

- Op μ°μ°μλ `where`κ°μ²΄ μμμ μ°μ΄λ <a href="https://developer.mozilla.org/ko/docs/Glossary/Symbol">Symbol</a> νμμ μ°μ°μμ΄λ€.

- ν΄λΉ μ°μ°μλ₯Ό μ¬μ©νμ¬ λ³΅μ‘ν λΉκ΅ μ°μ°μ μ§μν΄μ€λ€.

<br>
<br>

#### 1-1. μ°μ°μ(μΌλ°)

---

- κ³΅μλ¬Έμμμ μ€λͺνλ μ°μ°μλ λ€μ μλμ κ°λ€.

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

#### 1-2. μ°μ°μ(λ²μ)

---

- λ²μ μ°μ°μ λν μ§μνμ¬ λ€μν μ’λ₯μ λ²μλ₯Ό μΏΌλ¦¬ν  μ μλ€.

- κ³΅μλ¬Έμμμ μ€λͺνλ λ²μ μ°μ°μλ μλμ κ°λ€.

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

#### 1-3. μ°μ°μ μ‘°ν©

---

- `where` μ‘°κ±΄ κ°μ²΄μμ μ°μ°μλ€λΌλ¦¬μ μ€λ³΅ μ¬μ©λν κ°λ₯νλ€.

- μ‘°κ±΄ κ°μ²΄μμ λ³ λ€λ₯Έ μ°μ°μλ‘ μ?μ΄μ£Όμ§ μκ³  μμ±μ λμ΄νλ€λ©΄ ANDλ‘ κ°μ£Όλλ€.

- μ°μ°μμμμ μ¬λ¬ μ»¬λΌμ λ€λ£¨λ κ²½μ°μλ κ° μ»¬λΌμ λν μ‘°κ±΄μ λ΄μ κ°μ²΄μ λ°°μ΄λ‘ μμ±ν΄μΌ νλ€.

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

## π€ Understanding

---

- ~~ν­μ λλΌμ§λ§ μνλΌμ΄μ¦ κ³΅μλ¬Έμλ λλ¬΄ λΆμΉμ ..~~

- κ³΅μλ¬Έμμμλ μμΈν μ¬μ© λ°©μμ μλ΄νκΈ°λ³΄λ€λ λ€μν μμλ₯Ό μ κ³΅ν΄ μ€ λ€, μ΄μ λ§μΆ° μ¬μ©μκ° μ°Ύμμ μ¨λΌ(?)λΌλ λλμ λ§μ΄ λ°μλ€.

- λ§€λ² `ctril + f` λ‘ κ²μνμ¬ μ°Ύμ μ°κΈ° κ·μ°?μμ μ λ¦¬ν΄λ³΄μλ€.

<br>
<br>

```toc

```
