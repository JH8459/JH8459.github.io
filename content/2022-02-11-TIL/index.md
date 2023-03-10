---
emoji: ๐
title: Sequelize Migration
date: '2022-02-11'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## โ๏ธ **T**oday **I** **L**earned

---

<br>

- Sequelize ORM์ ์ฌ์ฉํ๋ฉฐ ๊ฐ์ฅ ํธ๋ฆฌํ ์ ์ ๊ผฝ๋๋ค๋ฉด ๋ง์ด๊ทธ๋ ์ด์์ ์ ํํ  ๊ฒ ๊ฐ๋ค.

- ์ด์์ค์ธ ์๋น์ค ์ค๋จ์์ด DB ์คํค๋ง ๋ชจ๋ธ์ ๋ณ๊ฒฝํ๋ค๋๊ฐ ์๋น์ค ๊ธฐํ ๋ฐ ์ค๊ณ๋จ๊ณ์์ ๋์น ์ ์ ๋์ค์ ์ถ๊ฐํ  ๋ DB๋ฅผ ๊ฐ์์์ง ์๊ณ  ์์ ํ  ์ ์๋ ๊ธฐ๋ฅ์ ์ ๊ณตํ๋ ๋ง์ด๊ทธ๋ ์ด์์ ์จ๋ณธ ์ฌ๋๋ง ์ ๊ฒ์ด๋ค.

- ๋ค๋ง ์คํค๋ง ์์ ์ด ํ์ํ ๊ฒฝ์ฐ๊ฐ ๋ง์ด ๋ฐ์ํ์ง ์๊ธฐ ๋๋ฌธ์ ์ฌ์ฉ๋น๋๊ฐ ๋ง์ง๊ฐ ์์๋ค.

  ์ต์์น ์์ ๋ฌธ๋ฒ์ด๊ธฐ ๋๋ฌธ์ ๋งค๋ฒ ์ฌ์ฉํ  ๋ ๋ง๋ค ๊ฒ์์ ํตํ์ฌ ์ฌ์ฉํ์๋๋ฐ, ์ด์ฐธ์ ๋ธ๋ก๊ทธ์ ํ์ตํ ๋ด์ฉ์ ์ ๋ฆฌํด์ ๋ด๊ฐ ๋ณด๋ ค๊ณ  ๋จ๊ฒจ๋ณธ๋ค.

<br>
<br>

### 1. Migration

---

- `Sequelize` ๊ณต์๋ฌธ์์์๋ ๋ง์ด๊ทธ๋ ์ด์์ ๋ค์๊ณผ ๊ฐ์ด ์ค๋ชํ๊ณ  ์๋ค.

  > Just like you use **version control** systems such as **Git** to manage changes in your source code, you can use **migrations** to keep track of changes to the database. With migrations you can transfer your existing database into another state and vice versa: Those state transitions are saved in migration files, which describe how to get to the new state and how to revert the changes in order to get back to the old state.

- ๊ฐ๋จํ ์ค๋ชํ์๋ฉด **๋ง์ด๊ทธ๋ ์ด์**์ Git๊ณผ ๊ฐ์ ๋ฒ์  ์ปจํธ๋กค ์์คํ์ผ๋ก์จ, ์ด๋ฅผ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ ์ฉํ๋ฉฐ ์ง์ํด์ค๋ค.

  ์ฆ, ๋ง์ด๊ทธ๋ ์ด์์ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์์ ๋ฐ ๋กค๋ฐฑ์ ๋ฒ์  ์ปจํธ๋กค ์์คํ ์ฒ๋ผ ์ด์ฉํ  ์ ์๊ฒ๋ ์ง์ํ๋ ๊ฐ๋ ฅํ ๊ธฐ๋ฅ์ด๋ค.

- ๋ง์ด๊ทธ๋ ์ด์์ ์ด์ฉํ๊ธฐ์  Sequelize CLI๊ฐ ํ์ํ๋ค. CLI๋ ๋ง์ด๊ทธ๋ ์ด์๊ณผ ํ๋ก์ ํธ ๋ถํธ์คํธ๋ฉ ์ง์์ ์ ๊ณตํ๋ฉฐ ์ด๋ฅผ ์ค์นํ ํ๊ฒฝ์ด๋ผ๋ ๊ฐ์ ํ์ ๊ธ์ ๋จ๊ธด๋ค.

<br>
<br>

#### 1-1. Migration ์์ฑ

---

- ๋ง์ด๊ทธ๋ ์ด์์ ํ์ํ  ๋๋ง๋ค ์์ฑํ  ์ ์๋ค.

  ์คํค๋ง์ ๋ณ๊ฒฝ์ด ํ์ํ  ๋(์ปฌ๋ผ์ ์ถ๊ฐํ๊ฑฐ๋, ๊ธฐ์กด ์ปฌ๋ผ์ ๋ฐ์ดํฐ ์์ฑ๊ฐ์ ๋ณ๊ฒฝํ  ๋)๋ง๋ค `migration.js` ํ์ผ์ ์์ฑํ์ฌ ์งํํ๋ ๊ฒ์ด๋ค.

- ์ฐ์  ๋ง์ด๊ทธ๋ ์ด์์ ์์ฑํ๋ ๋ช๋ น์ด๋ ๋ค์๊ณผ ๊ฐ๋ค.

  ```js
  # using npm
  npx sequelize-cli migration:generate --name ์์ฑํ  migration ์ด๋ฆ
  # using yarn
  yarn sequelize-cli migration:generate --name ์์ฑํ  migration ์ด๋ฆ
  ```

  ๋ง์ด๊ทธ๋ ์ด์ ํ์ผ์ ๋ณด๊ณ  ์ด๋ค ๊ธฐ๋ฅ์ ํ๋ ์ฝ๋์ธ์ง ์ ์ถํ  ์ ์์๋งํ ์ด๋ฆ๋ง ์๋ ฅํด์ฃผ๋ฉด ์์ฑ์ด ๋๋ค.

  - ๋ช๋ น์ด๋ฅผ ์๋ ฅ์ ์๋์ ๊ฐ์ ํํ๋ฆฟ ์ฝ๋๊ฐ ์ ๊ณต์ด ๋๋ค.

  ```js
  'use strict';

  module.exports = {
    up: async (queryInterface, Sequelize) => {
      /**
       * Add altering commands here.
       *
       * Example:
       * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
       */
    },

    down: async (queryInterface, Sequelize) => {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
    },
  };
  ```

  `up`์ ๋ง์ด๊ทธ๋ ์ด์์ ๋ด๋นํ๊ณ  ์์ผ๋ฉฐ, `down`์ `undo` ๊ธฐ๋ฅ(๋กค๋ฐฑ)์ ๋ด๋นํ๊ณ  ์๋ค.

- ๋ค์์ ๊ธฐ๋ฅ๋ณ๋ก ํจ์๋ค์ ๋ฌถ์ด ์ ๋ฆฌํ์๋ค.

<br>
<br>

#### 1-2. ํ์ด๋ธ์ ์๋ก ์์ฑํ๊ฑฐ๋ ๊ธฐ์กด ํ์ด๋ธ์ ์ง์์ผ ํ  ๋

---

- ์ฐ์  ํ์ด๋ธ์ ์์ฑํ  ๋๋ ์๋์ ํจ์๋ฅผ ์ฌ์ฉํ๋ค.

  - `createTable()`

    ```js
    // await queryInterface.createTable('ํ์ด๋ธ๋ช', ์ปฌ๋ผ๋ช: {๋ฐ์ดํฐ ์์ฑ, ์ต์}...);

    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false
      }
    });
    ```

- ๊ทธ๋ฆฌ๊ณ  ํ์ด๋ธ์ ์ญ์ ํ  ๋๋ ์๋์ ํจ์๋ฅผ ์ฌ์ฉํ๋ค.

  - `dropTable()`

    ```js
    // await queryInterface.createTable('ํ์ด๋ธ๋ช');

    await queryInterface.dropTable('Users');
    ```

<br>
<br>

#### 1-3. ํ์ด๋ธ์ ์๋ก์ด ์ปฌ๋ผ์ ์ถ๊ฐํ๊ฑฐ๋ ๊ธฐ์กด์ ์ปฌ๋ผ์ ์ญ์ ํ  ๋

---

- ์ฐ์  ํ์ด๋ธ์ ์๋ก์ด ์ปฌ๋ผ์ ์ถ๊ฐํ  ๋๋ ์๋์ ํจ์๋ฅผ ์ฌ์ฉํ๋ค.

  - `addColumn()`

    `Users` ํ์ด๋ธ์ `role` ์ปฌ๋ผ ์ถ๊ฐ (๋ฐ์ดํฐ ์์ฑ์ `Integer`, `null`์ ํ์ฉํ์ง ์์ผ๋ฉฐ ๊ธฐ๋ณธ๊ฐ์ `1`)

    ```js
    // await queryInterface.addColumn('ํ์ด๋ธ๋ช', '์ปฌ๋ผ๋ช', {๋ฐ์ดํฐ ์์ฑ,์ต์...});

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaltValues: 1,
    });
    ```

- ๊ทธ๋ฆฌ๊ณ  ๊ธฐ์กด์ ์ปฌ๋ผ์ ์ญ์ ํ  ๋๋ ์๋์ ํจ์๋ฅผ ์ฌ์ฉํ๋ค.

  - `removeColumn()`

    ```js
    // await queryInterface.removeColumn('ํ์ด๋ธ๋ช', '์ปฌ๋ผ๋ช');

    await queryInterface.removeColumn('Users', 'role');
    ```

<br>
<br>

#### 1-4. ๊ธฐ์กด ์ปฌ๋ผ์ ์ด๋ฆ ๋ณ๊ฒฝํ  ๋

---

- ํ์ด๋ธ์ ์๋ ๊ธฐ์กด ์ปฌ๋ผ์ ์ด๋ฆ์ ๋ณ๊ฒฝํ  ๋ ์๋์ ํจ์๋ฅผ ์ฌ์ฉํ๋ค.

  - `renameColumn()`

    ```js
    // await queryInterface.renameColumn('ํ์ด๋ธ๋ช', '์ปฌ๋ผ๋ช', '๋ณ๊ฒฝํ  ์ปฌ๋ผ๋ช');

    await queryInterface.renameColumn('Users', 'role', 'userRole');
    ```

<br>
<br>

#### 1-5. ๊ธฐ์กด ์ปฌ๋ผ์ ๋ฐ์ดํฐ ์์ฑ ๋ฐ ์ต์๊ฐ ๋ณ๊ฒฝ

---

- ํ์ด๋ธ์ ์๋ ๊ธฐ์กด ์ปฌ๋ผ์ ์ด๋ฆ์ ๋ณ๊ฒฝํ  ๋ ์๋์ ํจ์๋ฅผ ์ฌ์ฉํ๋ค.

  - `changeColumn()`

    `Users` ํ์ด๋ธ์ `userRole` ์ปฌ๋ผ ์์ฑ ๋ณ๊ฒฝ (๋ฐ์ดํฐ ์์ฑ์ `STRING`, ๊ธฐ๋ณธ๊ฐ์ `normal`)

    ```js
    // await queryInterface.changeColumn('ํ์ด๋ธ๋ช', '์ปฌ๋ผ๋ช', {๋ฐ์ดํฐ ์์ฑ, ์ต์});

    await queryInterface.changeColumn('Users', 'userRole', {
      type: Sequelize.STRING,
      defaltValues: 'normal',
    });
    ```

<br>
<br>

#### 1-6. Migration ์คํ๊ณผ ๋กค๋ฐฑ

---

- ๊ฐ๊ฐ ํ์ํ ๊ธฐ๋ฅ์ `up()`๊ณผ `down()` ๊ธฐ๋ฅ์ ์ ์ ํ ๋ฃ์ด๋๋ฉด ๋ช๋ น์ด๋ฅผ ํตํด ์ฌ์ฉ์ด ๊ฐ๋ฅํ๋ค.

  ```js
  # using npm
  npx sequelize-cli db:migrate
  # using yarn
  yarn sequelize-cli db:migrate
  ```

- ์ ๋ช๋ น์ด๋ฅผ ํตํด ๋ง์ด๊ทธ๋ ์ด์์ ์คํ ํ  ์ ์์ผ๋ฉฐ ๋กค๋ฐฑ ๋ํ ์๋์ ์ฝ๋๋ฅผ ์ด์ฉํ์ฌ ์ฌ์ฉ์ด ๊ฐ๋ฅํ๋ค.

  ```js
  # using npm
  npx sequelize-cli db:migrate:undo
  # using yarn
  yarn sequelize-cli db:migrate:undo
  ```

<br>
<br>

## ๐ค Understanding

---

- ์๋น์ค๋ฅผ ๋ฉ์ถ๊ฑฐ๋ DB๋ฅผ ๋ชจ๋ ์ญ์  ํ ์คํค๋ง๋ฅผ ์์ ์ ํด์ผํ๋ ๋ฒ๊ฑฐ๋ก์ ์์ด `Sequelize` Migration์ DB ์คํค๋ง ์์ ์ ๊ฐํธํ๊ฒ ๋์์ค๋ค.

- ํน์ ์์์น ๋ชปํ ์คํค๋ง ์์ ๊ฒฐ๊ณผ๊ฐ ์ผ์ด๋๋ Git๊ณผ ๊ฐ์ด **๋ฒ์  ๊ด๋ฆฌ** ๊ธฐ๋ฅ์ด ์๊ธฐ ๋๋ฌธ์ ๋กค๋ฐฑ๋ํ ์ฝ๊ฒ ๊ฐ๋ฅํ๋ค.

  ์ ๋ช๋ น์ด๋ค์ ์์งํ ์์ฃผ ์ฐ์ง ๋ชปํ๊ธฐ ๋๋ฌธ์ ๋งค๋ฒ ์ธ ๋๋ง๋ค ๊ฒ์์ ๊ฒ์์ ๊ฑฐ๋ญํด์ ์ฌ์ฉํ๊ณค ํ์๋ค.

  ๊ธ๋ก ์ ๋ฆฌํ๋ฉฐ ์กฐ๊ธ ๋จธ๋ฆฟ์์์ ์ ๋ฆฌ๋ ๊ธฐ๋ถ์ด๋ค.

<br>
<br>

```toc

```
