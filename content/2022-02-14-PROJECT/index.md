---
emoji: π₯
title: ALL-CON Refactoring 6μΌμ°¨ - Articles νμ΄λΈ μ€ν€λ§ μμ (2)
date: '2022-02-14'
author: JH8459
categories: Project
---

![github-blog.png](../../assets/common/PROJECT.jpeg)

<br>

## βοΈ Refactoring

---

- ALL-CONμμλ νλ¬κ°μ μ½μνΈ μ λ³΄λ§ `allConcerts` λ°°μ΄μ λ΄μ λ³΄μ¬μ£Όκ³  μλ€.

  νλ¬μ΄ μ§λκ²λλ©΄ μ½μνΈ μ λ³΄μ€ `activation`μ΄ `0`μΌλ‘ λΉνμ±νλμ΄ μλ²μμ λ³΄μ¬μ£Όμ§ μκ³  μλ€. ~~(μ½μνΈ μ­μ λ κ΄λ ¨ λκΈ λ° κ²μκΈλ€μ΄ λͺ¨λ μ­μ λλ―λ‘ λΉνμ±νλ₯Ό μ ν)~~

  ![μ€ν¬λ¦°μ·, 2022-02-15 17-45-59](https://user-images.githubusercontent.com/83164003/154025834-c3427f3f-4758-4c4a-bc77-4c219faa9844.png)

- κΈ°μ‘΄μλ μ½μνΈκ° λΉνμ±ν λ  μ κ΄λ ¨ κ²μκΈμ μ‘°νμλ₯Ό `-999999` μμκ°μΌλ‘ κ°μ λ‘ ν λΉνμ¬ μ‘°νμλ‘ κ²μμ λ§¨ λ€λ‘ λμ΄λκ²λ μμ ν΄μ£ΌμμΌλ λ§μ½ λΆμν(?) λͺ©μ μΌλ‘ μ‘°νμλ₯Ό μ¬λ¦¬κ±°λ μκ°μ΄ μ€λμ§λ μ‘°νμκ° `0` μ΄μμ μμκ°μΌλ‘ μ νλλ€λ©΄ μ¬λ°λ₯΄μ§ μμ κ²°κ³Όκ° μ΄λλλ―λ‘ `Articles` νμ΄λΈμλ `activation` μ»¬λΌκ°μ μΆκ°ν΄ λΉνμ±ν ν΄μ£ΌκΈ°λ‘ νλ€.

<br>
<br>

### 1. λ³΄μμ΄ νμν μ¬ν­

---

- `Articles` νμ΄λΈμ νμ¬ μ€ν€λ§λ λ€μκ³Ό κ°λ€.

  ![μ€ν¬λ¦°μ·, 2022-02-15 17-44-23](https://user-images.githubusercontent.com/83164003/154025162-0730e711-8b2f-4946-962b-b5b3ab09d166.png)

  ν΄λΉ `Articles` νμ΄λΈ μ»¬λΌμ€ `activation` μ»¬λΌκ°μ μΆκ°νκ³ , μλ²μμ `nodeSchedule`μ ν΅νμ¬ 1μΌ 1ν ν°μΌ λ°λ§€ ν νλ¬μ΄ μ§λ μ½μνΈλ€μ λΉνμ±νλ₯Ό μν€λλ° ν΄λΉ μ½μνΈμ μ’μλ κ²μκΈλ€ λν λͺ¨λ λΉνμ±ν μ§νμ΄ νμνλ€.

<br>
<br>

### 2. λ¬Έμ  ν΄κ²°

#### 2-1. Sequelize Model νμΌ μ€ν€λ§ μμ  && addColumn() ν¨μλ₯Ό ν΅ν λ§μ΄κ·Έλ μ΄μ

---

- μ΄μ  νμ΅ν λ΄μ©λλ‘ `addColumn()` ν¨μλ₯Ό ν΅ν΄ λ§μ΄κ·Έλ μ΄μμΌλ‘ `Articles` νμ΄λΈμ μ€ν€λ§λ₯Ό μμ ν΄μ£Όμλ€.

  ```js
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Articles', 'activation', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  };
  ```

- μ΄κΈ°κ°μ `true`λ‘ μ€μ  (ν°μΌ μ€ν ν νλ¬μ΄ μ§λ μ½μνΈ κ²μκΈμ `false`λ‘ λΉνμ±ν λλ€.) , λ°μ΄ν° νμκ³Ό μ΅μμ μ€μ ν΄μ£Όμλ€.

  ![μ€ν¬λ¦°μ·, 2022-02-16 00-23-06](https://user-images.githubusercontent.com/83164003/154092908-57a17a67-2d42-4d7d-9c59-b38e3439b348.png)

  μ€ν€λ§λ₯Ό μμ νκΈ° λλ¬Έμ κΈ°μ‘΄ κ²μκΈλ€μ μλμΌλ‘ νλνλ λ°μ΄ν° κ°μ μμ ν΄μ€μΌ νλ μΆμλλ°, `defaultValue`κ°μ `true`λ‘ μ€ νμΈμ§ κΈ°μ‘΄ κ²μκΈλ€λ λͺ¨λ `activation` μ»¬λΌμ κ°μ΄ `true`λ‘ νμ±νλμλ€. ~~(ν΄...)~~

<br>
<br>

#### 2-2. concertCleaner() ν¨μ λ° Controller λ³κ²½

---

- λ§€μΌ μ€μ  09μμ μλ²μμλ μ½μνΈ μ λ³΄λ₯Ό `concertCleaner()` ν¨μλ₯Ό ν΅ν΄μ ν°μΌ μ€νμΌμ΄ νλ¬ μ§λ μ½μνΈ DBμ `activation`μ `false`λ‘ λ°κΎΈμ΄ μ£Όκ³  μλ€.

  μ¬κΈ°μ λλΆμ΄ ν΄λΉ μ½μνΈμ μ’μλ κ²μκΈ DBλ€μ `activation` λν ν¨κ» `false`λ‘ λ°κΎΈμ΄ μ£Όμλ€.

- λν, μ΄μ λ Controller λν μμ νμ¬ κ²μκΈμ λ±μ΄μ£Όλ μμ²­μ΄ λ€μ΄μ¨λ€λ©΄, `order`κ°μ λ΄λ¦Όμ°¨μμΌλ‘ μ£Όμ΄μ `activation`μ΄ `false`μΈ κ²μλ¬Όμ νμμλ‘ λ°λ¦¬κ²λ μ€κ³νμλ€.

<center><img src="https://user-images.githubusercontent.com/83164003/154095571-20c8416e-30e4-4e4c-b665-6a5962839808.png"/></center><br>

<br>
<br>

### 3. κ²°κ³Ό

---

- ν΄λΌμ΄μΈνΈμμ μ΄μ  μ‘°νμμμΌλ‘ μ λ ¬μ νμ¬λ `order`μ μ°μ μμκ° `activation` λ΄λ¦Όμ°¨μμ΄κΈ° λλ¬Έμ λΉνμ±νλ μ½μνΈμ μ’μλ κ²μλ¬Όλ€μ νμμλ‘ λ°λ¦¬κ² μ€κ³νμλ€.

  ![μ€ν¬λ¦°μ·, 2022-02-16 00-40-09](https://user-images.githubusercontent.com/83164003/154096234-6ea10a8a-a7df-4501-9575-71ded1c491d6.png)

  μ½μνΈκ° λΉνμ±νλμ΄ λͺ©λ‘μμλ μ¬λΌμ‘μ§λ§ κ²μκΈμ νμμλ‘ λ°λ Έμ λΏμ΄λΌμ μ‘°ν/μμ /μ­μ  μ²λ¦¬λ κ°λ₯ν μνμ΄λ€.

  ![μ€ν¬λ¦°μ·, 2022-02-16 00-59-54](https://user-images.githubusercontent.com/83164003/154100340-9819feb2-da3c-4216-b2e3-8e67231f199b.png)

- ~~μ μ¬μ§κ³Ό κ°μ΄ μλ¨ μ½μνΈ λͺ©λ‘μ κ³΅λ°±μΌλ‘ λ³΄μ¬μ§κ³  μλ€.~~

  λΉ μ½μνΈ λͺ©λ‘ μ²λ¦¬λ₯Ό μ΄λ»κ² ν΄μΌν μ§ ν΄λΌμ΄μΈνΈλ₯Ό λ΄λΉν νμλΆκ³Ό μ‘°μ¨ν΄μ λ΄μΌκΉμ§ Taskλ₯Ό κ°μ Έκ°μΌ ν  λ― νλ€.

<br>
<br>

```toc

```
