---
emoji: 📚
title: Sequelize Migration
date: '2022-02-11'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- Sequelize ORM을 사용하며 가장 편리한 점을 꼽는다면 마이그레이션을 선택할 것 같다.

- 운영중인 서비스 중단없이 DB 스키마 모델을 변경한다던가 서비스 기획 및 설계단계에서 놓친 점을 나중에 추가할 때 DB를 갈아엎지 않고 수정할 수 있는 기능을 제공하는 마이그레이션은 써본 사람만 알 것이다.

- 다만 스키마 수정이 필요한 경우가 많이 발생하지 않기 때문에 사용빈도가 많지가 않았다.

  익숙치 않은 문법이기 때문에 매번 사용할 때 마다 검색을 통하여 사용하였는데, 이참에 블로그에 학습한 내용을 정리해서 내가 보려고 남겨본다.

<br>
<br>

### 1. Migration

---

- `Sequelize` 공식문서에서는 마이그레이션을 다음과 같이 설명하고 있다.

  > Just like you use **version control** systems such as **Git** to manage changes in your source code, you can use **migrations** to keep track of changes to the database. With migrations you can transfer your existing database into another state and vice versa: Those state transitions are saved in migration files, which describe how to get to the new state and how to revert the changes in order to get back to the old state.

- 간단히 설명하자면 **마이그레이션**은 Git과 같은 버전 컨트롤 시스템으로써, 이를 데이터베이스에 적용하며 지원해준다.

  즉, 마이그레이션은 데이터베이스의 수정및 롤백을 버전 컨트롤 시스템 처럼 이용할 수 있게끔 지원하는 강력한 기능이다.

- 마이그레이션을 이용하기전 Sequelize CLI가 필요하다. CLI는 마이그레이션과 프로젝트 부트스트랩 지원을 제공하며 이를 설치한 환경이라는 가정하에 글을 남긴다.

<br>
<br>

#### 1-1. Migration 생성

---

- 마이그레이션은 필요할 때마다 생성할 수 있다.

  스키마에 변경이 필요할 때(컬럼을 추가하거나, 기존 컬럼의 데이터 속성값을 변경할 때)마다 `migration.js` 파일을 생성하여 진행하는 것이다.

- 우선 마이그레이션을 생성하는 명령어는 다음과 같다.

  ```js
  # using npm
  npx sequelize-cli migration:generate --name 생성할 migration 이름
  # using yarn
  yarn sequelize-cli migration:generate --name 생성할 migration 이름
  ```

  마이그레이션 파일을 보고 어떤 기능을 하는 코드인지 유추할 수 있을만한 이름만 입력해주면 생성이 된다.

  - 명령어를 입력시 아래와 같은 템플릿 코드가 제공이 된다.

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

  `up`은 마이그레이션을 담당하고 있으며, `down`은 `undo` 기능(롤백)을 담당하고 있다.

- 다음은 기능별로 함수들을 묶어 정리하였다.

<br>
<br>

#### 1-2. 테이블을 새로 생성하거나 기존 테이블을 지워야 할 때

---

- 우선 테이블을 생성할 때는 아래의 함수를 사용한다.

  - `createTable()`

    ```js
    // await queryInterface.createTable('테이블명', 컬럼명: {데이터 속성, 옵션}...);

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

- 그리고 테이블을 삭제할 때는 아래의 함수를 사용한다.

  - `dropTable()`

    ```js
    // await queryInterface.createTable('테이블명');

    await queryInterface.dropTable('Users');
    ```

<br>
<br>

#### 1-3. 테이블에 새로운 컬럼을 추가하거나 기존의 컬럼을 삭제할 때

---

- 우선 테이블에 새로운 컬럼을 추가할 때는 아래의 함수를 사용한다.

  - `addColumn()`

    `Users` 테이블에 `role` 컬럼 추가 (데이터 속성은 `Integer`, `null`을 허용하지 않으며 기본값은 `1`)

    ```js
    // await queryInterface.addColumn('테이블명', '컬럼명', {데이터 속성,옵션...});

    await queryInterface.addColumn('Users', 'role', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaltValues: 1,
    });
    ```

- 그리고 기존의 컬럼을 삭제할 때는 아래의 함수를 사용한다.

  - `removeColumn()`

    ```js
    // await queryInterface.removeColumn('테이블명', '컬럼명');

    await queryInterface.removeColumn('Users', 'role');
    ```

<br>
<br>

#### 1-4. 기존 컬럼의 이름 변경할 때

---

- 테이블에 있는 기존 컬럼의 이름을 변경할 땐 아래의 함수를 사용한다.

  - `renameColumn()`

    ```js
    // await queryInterface.renameColumn('테이블명', '컬럼명', '변경할 컬럼명');

    await queryInterface.renameColumn('Users', 'role', 'userRole');
    ```

<br>
<br>

#### 1-5. 기존 컬럼의 데이터 속성 및 옵션값 변경

---

- 테이블에 있는 기존 컬럼의 이름을 변경할 땐 아래의 함수를 사용한다.

  - `changeColumn()`

    `Users` 테이블에 `userRole` 컬럼 속성 변경 (데이터 속성은 `STRING`, 기본값은 `normal`)

    ```js
    // await queryInterface.changeColumn('테이블명', '컬럼명', {데이터 속성, 옵션});

    await queryInterface.changeColumn('Users', 'userRole', {
      type: Sequelize.STRING,
      defaltValues: 'normal',
    });
    ```

<br>
<br>

#### 1-6. Migration 실행과 롤백

---

- 각각 필요한 기능을 `up()`과 `down()` 기능에 적절히 넣어두면 명령어를 통해 사용이 가능하다.

  ```js
  # using npm
  npx sequelize-cli db:migrate
  # using yarn
  yarn sequelize-cli db:migrate
  ```

- 위 명령어를 통해 마이그레이션을 실행 할 수 있으며 롤백 또한 아래의 코드를 이용하여 사용이 가능하다.

  ```js
  # using npm
  npx sequelize-cli db:migrate:undo
  # using yarn
  yarn sequelize-cli db:migrate:undo
  ```

<br>
<br>

## 🤔 Understanding

- 서비스를 멈추거나 DB를 모두 삭제 후 스키마를 수정을 해야하는 번거로움 없이 `Sequelize` Migration은 DB 스키마 수정을 간편하게 도와준다.

- 혹시 예상치 못한 스키마 수정결과가 일어나도 Git과 같이 **버전 관리** 기능이 있기 때문에 롤백또한 쉽게 가능하다.

  위 명령어들은 솔직히 자주 쓰지 못했기 때문에 매번 쓸 때마다 검색에 검색을 거듭해서 사용하곤 했었다.

  글로 정리하며 조금 머릿속에서 정리된 기분이다.

<br>
<br>

```toc

```
