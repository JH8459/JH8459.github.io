---
emoji: π
title: React μνκ΄λ¦¬
date: '2021-09-28'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## βοΈ **T**oday **I** **L**earned

---

<br>

### 1. React μνκ΄λ¦¬

---

<br>
<br>

#### 1-1. νλ‘ νΈμλ κ°λ°μμμ μν κ΄λ¦¬

---

- μ°μ  μνλ μ»΄ν¬λνΈ λ΄λΆμμ λ³νλλ κ°μ΄λ€.

  νΉλ³ν νλ‘ νΈμλ μμ­μμλ "λμ μΌλ‘ ννλλ λ°μ΄ν°"λΌ λΆλ₯Ό μ μλ€.

- μ°λ¦¬λ μ»΄ν¬λνΈ μ°μ  κ°λ° λ°©μμ λν΄μ νμ΅νμλ€.

  > 21.09.07 κ²μκΈ <a href="https://blog.jh8459.com/2021-09-07-TIL/2021-09-07-21.09.07.til/" target="_blank">μ°Έμ‘°</a>

  νν₯μ λ°μ΄ν° νλ¦μ λ°λΌ `props`λ₯Ό μ΄μ©ν΄μ λ°μ΄ν°λ₯Ό μ λ¬νλ©° μ΄λ λ¨λ°©ν₯ λ°μ΄ν° νλ¦μ΄λ€.

  λ°λΌμ μ΄ "μν"μ μμΉκ° λ§€μ° μ€μνλ€. μ°μ  Javascriptλ₯Ό μ²μ λ°°μΈ λ μ²λΌ μ μ­ λ³μμ μ§μ­ λ³μμ μ²λΌ μκ°μ ν΄λ³΄μ.

  ![μ€ν¬λ¦°μ·, 2021-10-01 17-40-39](https://user-images.githubusercontent.com/83164003/135591336-c6701a05-ae1a-455a-953b-4b162ffbb445.png)

  λ‘μ»¬ μνλ νΉμ  μ»΄ν¬λνΈ μμμλ§ κ΄λ¦¬λλ μνμ΄λ©°, μ μ­ μνλ νλ‘λνΈ μ μ²΄ νΉμ μ¬λ¬κ°μ§ μ»΄ν¬λνΈκ° λμμ κ΄λ¦¬νλ μνμ΄λ€.

  λ‘μ»¬ μνλ₯Ό κ΅¬λΆνλ κ²μ κ°λ¨νλ€. λ³΄ν΅ μ»΄ν¬λνΈ λ΄μμλ§ μν₯μ λΌμ§λ μνλ λ‘μ»¬ μνλ₯Ό λ»νλ€. κ·ΈλΌ μ μ­ μνλ λ€λ₯Έ μ»΄ν¬λνΈμ μνλ₯Ό κ³΅μ νκ³  μν₯μ λΌμΉλ μνλ₯Ό μλ―Έν  κ²μ΄λ€.

  μ μ­ μνλΌλ λ§μ μλ‘ λ€λ₯Έ μ»΄ν¬λνΈκ° λμΌν μνλ₯Ό λ€λ£¬λ€λ λ»μ΄λ€. λ§μ½ μ΄λ¬ν μν©μ΄λΌλ©΄, μ΄ μΆμ²λ μ€μ§ ν κ³³μ΄μ΄μΌ νλ€. λ§μΌ μ¬λ³Έμ΄ μμ κ²½μ°, λ λ°μ΄ν°λ μλ‘ λκΈ°ν(sync)νλ κ³Όμ μ΄ νμνλ°, μ΄λ λ¬Έμ λ₯Ό μ΄λ ΅κ² λ§λ€κ² λλ€. λ¦¬μ‘νΈμμλ ν κ³³μ μ»΄ν¬λνΈμμλ§ μνλ₯Ό μ μ₯νκ³  μ κ·Όνλκ² λ°μ΄ν°λ₯Ό ν¨κ³Όμ μ΄κ³  ν¨μ¨μ μΌλ‘ κ΄λ¦¬νλ λ°©μμ΄λ€.

  μ΄λ₯Ό λ€λ₯΄κ² λ§νμλ©΄ "**λ°μ΄ν° λ¬΄κ²°μ±**μ μν΄, λμΌν λ°μ΄ν°λ ν­μ κ°μ κ³³μμ λ°μ΄ν°λ₯Ό κ°μ§κ³  μ€λλ‘ ν΄μΌλ§ νλ€" μ΄λ€.

  Single source of truth(μ λ’°ν  μ μλ λ¨μΌ μΆμ²) μμΉμ νλ‘ νΈμλ λΏλ§ μλλΌ λ€μν κ³³μμ μΈκΈλλ μμΉμ΄λ€.

<br>
<br>

#### 1-2. μν κ΄λ¦¬λ₯Ό μν κ°μ’ ν΄

---

![reactμνκ΄λ¦¬](https://user-images.githubusercontent.com/83164003/135709190-62979f91-d525-4b9f-b02a-1a756dccf27b.png)

- μν κ΄λ¦¬μ λν΄ μ λ°μ μΌλ‘ μμλ³΄μλ€.

  μμμ λ§νλ―μ΄ μνλ₯Ό μ μ­μνλ‘ κ΄λ¦¬νλ λ°©μμ **λ°μ΄ν° λ¬΄κ²°μ±**μ μν΄ λμΌν μ»΄ν¬λνΈμμ κ΄λ¦¬ν΄μΌνλ€. λ€λ₯Έ μ»΄ν¬λνΈμμ μ΄ μ μ­μνμ μ κ·Όνλ €λ©΄ `props`λ‘ λ°μ΄ν°λ₯Ό μ λ¬ν΄μ£Όμ΄μΌλ§ νμ μ»΄ν¬λνΈμμλ μ΄ μ μ­μνλ₯Ό μ¬μ©ν  μ μλ€. μ΄ κ³Όμ μ΄ μ»΄ν¬λνΈμ κ³μΈ΅ λ¨κ³κ° λ§μ κ³μΈ΅μΌλ‘ μ΄λ£¨μ΄μ Έμλ€λ©΄ λ§€μ° λΆνΈν  κ²μ΄λ€.

  κ·Έλ¬ν λΆνΈν¨μ ν΄μνκΈ° μν΄ μ΄λ₯Ό λμμ£Όλ κ°μ’ ν΄λ€μ΄ μλ€. ν΄λΉ ν΄λ€μ μ¬μ©ν¨μΌλ‘μ¨ μ»λ μ΄μ μ λ€μκ³Ό κ°λ€.

  - μ²«λ²μ§Έλ‘λ μμ κΎΈμ€ν μΈκΈν μ μ­ μνλ₯Ό μν μ μ₯μλ₯Ό μ κ³΅ν΄ μ€λ€.

  - λ€μμ, `props drilling` λ¬Έμ λ₯Ό ν΄κ²° ν΄μ€λ€. μ²«λ²μ§Έ μ΄μ μ μ°μ₯μ μ΄λ€. μμμ μΈκΈν κ³μΈ΅ κ΅¬μ‘°μμ `props`λ‘ λ°μ΄ν°λ₯Ό μ λ¬ν΄μ£Όλ κ³Όμ μ μλ΅ν  μ μκ² λλ€.

- "μν κ΄λ¦¬ ν΄μ΄ λ°λμ νμν κΉμ?" λΌλ μ§λ¬Έμλ "μλλλ€" λΌλ λ΅λ³μ ν  μ μλ€.

  μν κ΄λ¦¬ ν΄μ΄ μμ΄λ μΆ©λΆν κ·λͺ¨μλ μ νλ¦¬μΌμ΄μμ λ§λ€ μλ μλ€. κ·Έλ¬λ―λ‘ μ₯λ¨μ μ λΆλͺν μΈμ§νκ³  μν κ΄λ¦¬ ν΄μ μ¨μΌνλ€.

  κ·Έλ¦¬κ³  μν κ΄λ¦¬μ κΈ°λ³ΈκΈ°λΌκ³  λ³Ό μ μλ "μνκ° μ΄λμ μμΉν΄μΌ νλμ§" λΌλ κ°λμ μΈμ§νλκ² μ°μ μ΄ λμ΄μΌ νλ€.

<br>
<br>

#### 1-3. Redux

---

- Reactμμλ μνμ μμ±(props)μ μ΄μ©ν μ»΄ν¬λνΈ λ¨μ κ°λ° μν€νμ²λ₯Ό λ°°μ λ€λ©΄, Reduxμμλ μ»΄ν¬λνΈμ μνλ₯Ό λΆλ¦¬νμ¬ κ΄λ¦¬νλ€. μν λ³κ²½ λ‘μ§μ μ»΄ν¬λνΈλ‘λΆν° λΆλ¦¬νλ©΄, ννμ μ§μ€ν λ³΄λ€ λ¨μν ν¨μ μ»΄ν¬λνΈλ₯Ό λ§λ€ μ μκ² λλ€.

  λ¨μν λ§νμλ©΄ Reactμμλ μνλ₯Ό `Store`λΌλ λ³λμ μ€μ§νλλΏμΈ μ₯μμμ κ΄λ¦¬νκ²λλ©°, ν΄λΉ μ₯μμμ **μν**λ₯Ό κ΄λ¦¬νκ² λλ€.

  κ·Έλ λ€λ©΄ ν΄λΉ **μν**λ€μ μ΄λ»κ² λ³κ²½ν΄μΌν κΉ? κ°λ¨ν λ§νμλ©΄ `Action`μ ν΅ν΄μ λ³νλ₯Ό κ°μ§νλ©°, `Dispatch`λ©μλλ₯Ό ν΅νμ¬ `Action`μ μ λ¬νλ€. `Store`μ λ€μ΄κ°κΈ°μ  `Reducer`λ₯Ό κ±°μ³μ νμ¬μ μν(State)μ μ λ¬λ μ‘μμ΄ κ²°ν©λμ΄ μλ‘μ΄ μνλ‘ λ³κ²½λκ² λλ€.

  ![redux-data-flow](https://user-images.githubusercontent.com/83164003/135987274-e15321a0-4b43-4ed0-a4f8-07fcdda3f4f4.gif)

  μ μ λ¦¬λ <a href="https://kyun2da.dev/%EB%9D%BC%EC%9D%B4%EB%B8%8C%EB%9F%AC%EB%A6%AC/Redux-%EC%A0%95%EB%A6%AC/#%EB%A6%AC%EC%95%A1%ED%8A%B8%EC%97%90%EC%84%9C%EC%9D%98-redux-%EC%82%AC%EC%9A%A9%EB%B2%95" target="_blank">λΈλ‘κ·Έ</a>κ° μμ΄μ ν΄λΉ λ§ν¬ μ°Έμ‘°λ‘ Redux μ€λͺμ λμ²΄νκ² λ€.

<br>
<br>

#### 1-4. Cmarket (Hooks λ²μ )

---

![μ»΄ν¬λνΈ κ΅¬μ‘°](https://user-images.githubusercontent.com/83164003/135710533-10497531-2270-4c8a-a2d5-7dd8b72b4caf.jpg)

- μ»΄ν¬λνΈ κ΅¬μ‘°λ₯Ό κ°μνμ¬ μνμ μμΉλ₯Ό κ³ λ €νμ¬ μ½λ©νμλ€.

  - μ μ­μν(`items`, `cartItems`)λ μ΅μλ¨ μ»΄ν¬λνΈ App μ»΄ν¬λνΈμμ κ΄λ¦¬.

  - Item μ»΄ν¬λνΈμμ `items` μνλ₯Ό λ€λ£¨κΈ° μν΄μλ App - ItemListContainer - Item μ»΄ν¬λνΈκΉμ§ μνλ₯Ό λ΄λ €μ€μΌ νλ `props drilling` νμ λ°μ

> μ°Έμ‘° : <a href="https://github.com/JH8459/im-sprint-cmarket-hooks" target="_blank">Github</a> λ§ν¬

<br>
<br>

#### 1-5. Cmarket (Redux λ²μ )

---

> μ°Έμ‘° : <a href="https://github.com/JH8459/im-sprint-cmarket-redux" target="_blank">Github</a> λ§ν¬

<br>
<br>

## π€ Understanding

---

- λ¦¬μ‘νΈ μν κ΄λ¦¬μ λν΄ μ§μ€μ μΌλ‘ νμ΅νλ€.

  μ°μ  μ μ­ μνλΌλ κ°λμ΄ μ°Έ μλΏμλ€.

  μλ¬΄λλ μ§μ­ μνλ‘ κ΄λ¦¬λ `state`λ€μ μ»΄ν¬λνΈλ₯Ό λλλ€ μλ‘ `props`λ‘ μ λ¬μ ν΄μΌνλ―λ‘ λΆνΈνκ±΄ μ¬μ€μ΄λ..

- κ·Έλλ μ°μ  κΈ°λ³ΈκΈ°μΈ μνκ΄λ¦¬λ₯Ό μΆ©λΆν νμ΅ν λ€ μ κ·Όν΄μΌκ² λ€!

<br>
<br>

```toc

```
