---
emoji: π₯
title: ALL-CON Refactoring 5μΌμ°¨ - Articles νμ΄λΈ μ€ν€λ§ μμ (1)
date: '2022-02-11'
author: JH8459
categories: Project
---

![github-blog.png](../../assets/common/PROJECT.jpeg)

<br>

## βοΈ Refactoring

---

- μ΄μ ~μ€νκΉμ§ μ΄μ λΆν° μ΄μ΄μ¨ TaskμΈ λ‘κ·ΈμΈμ΄ κ²μ¦μ΄ νμν API μμ²­μ μ ν¨νμ§ μμ λ‘κ·ΈμΈ μνλΌλ©΄ λ©μΈνμ΄μ§λ‘ κ°μ  μ΄λ ν λ‘κ·ΈμΈ μ°½ νμμΌλ‘ λ€μ λ‘κ·ΈμΈμ μ λνλ λ‘μ§μΌλ‘ μλ²μ ν΄λΌμ΄μΈνΈλ₯Ό λ€μ μ€κ³νμλ€.

- μκ°λ³΄λ€ λ‘κ·ΈμΈ κ²μ¦μ΄ νμν API μμ²­μ΄ λ§μμ μμμκ°μ΄ μ€λκ±Έλ Έλ€..

  - **===main page===**

    - μλ μμ²­ : [post] concert/:concertid/alarm

    - μλ μ·¨μ : [delete] concert/:concertid/alarm

    - μλ μ‘°ν : [get] concert/alarm

    - μ½μνΈ λκΈ μμ± : [post] concert/:concertid/comment

    - μ½μνΈ λκΈ μμ  : [patch] concert/:concertid/comment/:commentid

    - μ½μνΈ λκΈ μ­μ  : [delete] concert/:concertid/comment/:commentid

<br>
<br>

- **===concert page===**

  - μμ

<br>
<br>

- **===conchin page===**

  - κ²μκΈ μμ± : [post] concert/:concertid/article

  - κ²μκΈ μμ  : [patch] concert/:concertid/article/:articleid

  - κ²μκΈ μ­μ  : [delete] concert/:concertid/article/:articleid

  - κ²μκΈ λκΈ μμ± : [post] concert/:concertid/article/:articleid/comment

  - κ²μκΈ λκΈ μμ  : [patch] concert/:concertid/article/:articleid/comment/:commentid

  - κ²μκΈ λκΈ μ­μ  : [delete] concert/:concertid/article/:articleid/comment/:commentid

<br>
<br>

- **===my page===**

  - λ§μ΄νμ΄μ§ μ§μ : [get] user/me

  - κ°μΈμ λ³΄ μμ  : [patch] user/me

  - λλ€μ μ€λ³΅ νμΈ : [post] user/username

  - νλ‘νμ¬μ§ μμ  : [patch] user/picture

  - μ½μΉ μΈμ¦ : [patch] user/safe

  - μ½μΉ μΈμ¦μ½λ μμ²­ : [post] user/safe

  - μ½μΉ μΈμ¦μ½λ μλ ₯ : [post] user/safe/confirm

  - νμνν΄ : [delete] user/me

  - λ΄κ° μ΄ κ²μκΈ : [get] user/myarticle

  - λ΄κ° μ΄ λκΈ : [get] user/mycomment

<br>
<br>

### 1. μΆκ°μ μΈ λ³΄μμ΄ νμν μ¬ν­

---

- ν΄λΌμ΄μΈνΈλ₯Ό λ΄λΉνλ νμλΆκ»μ νμ¬ ALL-CON νλ‘μ νΈ μ€ν€λ§λ₯Ό μμ ν΄λ¬λΌλ μμ²­μ ν΄μ£Όμ¨λ€.

  νμ¬ μ½μΉμ°ΎκΈ° κ²μκΈ μμ±μ μ΄ λ©€λ²μλ `2` νμ¬μ μλ `1`κ°μΌλ‘ ν­μ κ³ μ μ ν΄λμλ€.

  μ²μλΆν° λ©€λ²μλ₯Ό κ³ μ νκΈ°λ³΄λ€λ κ²μκΈ μμ±λλΆν° μ μ°νκ² λ©€λ²μλ₯Ό μμ ν  μ μκ² μ€ν€λ§λ₯Ό μμ ν΄λ¬λΌλ μμ²­μ ν΄μ£Όμ¨λ€.

- μ¬μ€ λ―Όκ°μ λ³΄ μνΈν λ¦¬ν©ν λ§μ ν  λλ `sequelize` λ¬Έλ²μ€ νΉμ  μ»¬λΌλ§ μΆκ°νμ¬ `migration`νλ λ°©λ²λ μ΄μ¬ν κ΅¬κΈλ§νμ¬ μ°Ύμλ³΄μλλ°, μ΄λ² μ€ν€λ§ κ΅¬μ‘° μμ  ν μμ£Όμ°λ `sequelize` λ¬Έλ²μ λ€μ νλ² λ³΅μ΅ν  κ²Έ λΈλ‘κ·Έμ νμ΅ν λ΄μ©μ λ¨κ²¨λ΄μΌκ² λ€. ~~(λ§€λ² μ€ν€λ§ μμ ν  λλ§λ€ κ΅¬κΈλ§ μ€..)~~

  μ°μ  ν΄λΌμ΄μΈνΈλ₯Ό λ΄λΉνλ νμλΆκ»μ μμ²­ν λΆλΆμ λ€μκ³Ό κ°λ€.

  ![μ€ν¬λ¦°μ·, 2022-02-11 11-09-59 (μ¬λ³Έ)](https://user-images.githubusercontent.com/83164003/153529646-275d910a-f7ee-43e2-8818-c2f2c9087961.png)

- ν΄λΉ `Articles` νμ΄λΈ μ»¬λΌμ€ λκ°μ§κ°μ μμ  μμ²­νμ¨λ€.

  - `member_count` λν΄νΈκ° μ­μ 

  - `total_member` λν΄νΈκ° μ­μ 

<br>
<br>

### 2. λ¬Έμ  ν΄κ²°

#### 2-1. Sequelize Model νμΌ μ€ν€λ§ μμ 

---

- νμ¬ `Articles` νμ΄λΈμ λͺ¨λΈκ΅¬μ‘°λ λ€μκ³Ό κ°λ€.

<center><img src="https://user-images.githubusercontent.com/83164003/153530343-c5bc09d9-9c91-4f8b-bb9b-56be132b2c22.png"/></center><br>

- `member_count`μ `total_member` μ»¬λΌμ `INTEGER` νμμ λ°μ΄ν°μ΄λ©°, `NULL`μ΄ νμ©λμ§ μκ³  κΈ°λ³Έκ°λ€μ΄ κ°κ° `1`κ³Ό `2`λ‘ μ€μ μ΄ λμ΄ μλ€.

  μλμ κ°μ΄ λΆνμν λ°μ΄ν° μμ±λ€μ μ­μ νλ€.

<center><img src="https://user-images.githubusercontent.com/83164003/153530565-8e3c1057-f48a-446a-b7eb-1afcf3531e53.png"/></center>

<br>
<br>

#### 2-2. changeColumn() ν¨μλ‘ μ»¬λΌ λ°μ΄ν° μμ±κ° λ³κ²½

---

- μ°μ  μλ λͺλ Ήμ΄λ‘ migration νμΌμ μμ±ν΄ μ€λ€.

  ```js
  # using npm
  npx sequelize-cli migration:generate --name μμ±ν  migration μ΄λ¦
  # using yarn
  yarn sequelize-cli migration:generate --name μμ±ν  migration μ΄λ¦
  ```

- κ·Έ λ€, μ»¬λΌ μ λ°μ΄ν° μμ±κ°μ λ³κ²½ν  μμ μ΄κΈ° λλ¬Έμ `changeColumn()` ν¨μλ₯Ό μ¬μ©νλ€.

  ν¨μμ μ¬μ© λ°©λ²μ μλμ κ°λ€.

  ```js
  // await queryInterface.changeColumn(νμ΄λΈλͺ, μ»¬λΌλͺ, {
  //  μ»¬λΌ λ°μ΄ν° μμ±,
  //  μ»¬λΌ μ΅μ
  // })

  await queryInterface.changeColumn('Articles', 'member_count', {
    type: Sequelize.INTEGER,
    defaultValue: null,
    allowNull: true,
  });
  ```

- λκ°μ§ μμ±μ΄ λΉλκΈ°λ‘ μ²λ¦¬λμ΄μΌ νλ―λ‘ μλμ κ°μ΄ μμ±νμλ€.

  ![μ€ν¬λ¦°μ·, 2022-02-11 11-42-54](https://user-images.githubusercontent.com/83164003/153529840-83dcc0fa-af69-4442-9395-dbc371849e23.png)

<br>
<br>

---

- ν΄λΉ μ€ν€λ§ μμ μΈμ `controller` λΆλΆμμλ `member_count`μ `total_member`λ κ³ μ κ°μ΄ DBμ μ μ₯λλ―λ‘ λ°λ‘ `req.body`λ‘ μλ ₯κ°μ μ λ¬λ°μ DBμ μ μ₯νμ§ μλ κ΅¬μ‘°μλ€.

  κ²μκΈ μμ± `controller`κΉμ§ μμ νμ¬ κ²μκΈ μμ±μ λ©€λ²μλ₯Ό μ μ°νκ² μ μ©ν  μ μκ²λ λ¦¬ν©ν λ§νμλ€.

<br>
<br>

### 3. κ²°κ³Ό

---

- `Articles` νμ΄λΈ μ€ν€λ§κ° λ€μκ³Όκ°μ΄ λ³κ²½λμλ€.

  ![μ€ν¬λ¦°μ·, 2022-02-11 11-09-59](https://user-images.githubusercontent.com/83164003/153530932-c18c05a1-c469-413f-97da-62c00be542ea.png)

  μ΄μ  κ²μκΈ μ΅μ΄ μμ±μμλ λ©€λ²μλ₯Ό μ μ°νκ² μ μ©νμ¬ κ²μκΈ μμ±μ΄ κ°λ₯νλ€.

  ![test](https://user-images.githubusercontent.com/83164003/153531161-6c35922d-cdce-458d-ae93-04daa29ab5b9.gif)

<br>
<br>

```toc

```
