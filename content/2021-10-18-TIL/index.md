---
emoji: 📚
title: ORM, Sequelize, Short.ly MVC
date: '2021-10-18'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. ORM(Object-Relational Mapping)

---

- ORM은 SQL문을 사용하지 않고 JS문법을 통해서 Object로 DB에 접근할 수 있도록 돕는 역할을 한다.

  ![스크린샷, 2021-11-17 15-11-59](https://user-images.githubusercontent.com/83164003/142144746-f0823d78-7d4d-419d-850d-586554dbe08d.png)

  ORM은 SQL문법 대신 어플리케이션의 개발언어를 그대로 사용할 수 있게 함으로써, 개발 언어의 일관성과 가독성을 높여준다는 장점을 갖고 있다.

- ORM에는 여러가지 종류 _(Django — ORM cookbook, Node.js — Sequalize, Java — Hibernate, JPA 등)_ 가 있지만, 학습방향과 알맞는 **Node.js — Sequalize** 를 사용 할 예정이다.

<br>
<br>

### 2. Sequelize

---

- **Sequelize**란 `Node.JS`에서 `mysql`을 사용할 때 Query문을 사용하지 않고 더욱 쉽게 다룰 수 있도록 도와주는 라이브러리이다.
- Sequelize는 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주므로 자바스크립트 구문을 알아서 SQL문으로 변경해준다.

  사용방법은 공식문서와 아래의 스프린트(Short.ly MVC)를 통해 학습하였다.

<br>
<br>

### 3. Short.ly MVC

---

**MVC(Model–View–Controller)** 모델 디자인중 V(Client)가 빠진 형태의 구조이다. <br>
이번 스프린트의 목적은 ORM(Node.JS-Sequelize)에 익숙해지는데 목적이 있다.

<br>
<br>

#### 3-1. 사전 준비: sequelize 및 sequelize-cli 설치

---

- <a href="https://sequelize.org/" target="_blank">Sequelize ORM</a> 공식문서를 보고 sequelize 설치를 하였으며 `package.json` 파일의 dependencies 모듈을 확인해보니 `"sequelize": "^6.9.0"` 를 확인 할 수 있었다.

- <a href="https://sequelize.org/master/manual/migrations.html" target="_blank"> Sequelize - Migrations</a> 문서를 통해 sequelize-cli 를 설치하였으며 마찬가지로 devDependencies 모듈에서 `"sequelize-cli": "^6.3.0"` 를 확인 할 수 있었다.

<br>
<br>

#### 3-2. ORM 설정

---

- 성공적으로 bootstraping이 끝나면 다음 파일 및 폴더들이 생성된다.

  > config/config.json<br>
  > models/<br>
  > migrations/<br>
  > seeders/

- 우선 `config.json` 파일을 확인하여서 mysql 환경과 일치하는 환경으로 설정해준다.

  ```js
  {
    "development": {
      "username": /* mysql username */
      "password": /* mysql password */
      "database": "database_development", /* 해당 이름의 데이터베이스는 직접 생성해야 한다 */
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": /* mysql username */
      "password": /* mysql password */
      "database": "database_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": /* mysql username */
      "password": /* mysql password */
      "database": "database_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }
  ```

- 또한 `config/config.json` 파일은 민감한 정보를 담고 있기 때문에 `.gitignore` 파일 확인시 포함되어 있는 걸 알 수 있다.

  위 과정이 끝나면 CLI를 통하여 필요한 파일들이 모두 자동으로 만들어졌으며, mysql에 접속 할 수 있게 된다.

  <center><img src="https://user-images.githubusercontent.com/83164003/142166073-5232ec86-458f-4873-9e1b-73d780e5e849.png"/></center>

<br>
<br>

#### 3-3. 모델 생성

---

- CLI를 통해 모델을 만들어야 한다.

  ```js
  npx sequelize-cli model:generate --name url --attributes url:string,title:string,visits:integer
  ```

  모델(테이블의 이름) 이름은 `url`로 설정하였지만, 실제 결과물은 `urls`로 나왔다.(아마 복수형은 자동 취급되는 듯 보인다.)

- 필드가 가지는 특별한 요구 사항(기본값 등)은 파일을 직접 수정해서 정의해야 한다.

  위에서 만들어진 `models/url.js` 파일은 다음과 같다. `visits`의 기본값은 `0`으로 설정하기 위해서는 첫째로 모델 파일을 직접 수정해야한다.

  ```js
  /* 생략 */
  url.init({
  	url: DataTypes.STRING,
  	title: DataTypes.STRING,
  	/* visits 의 defaultValue : 0 으로 직접 모델 파일을 수정해줘야 한다. */
  	visits: {type : DataTypes.INTEGER, defaultValue : 0}
  }
  ```

  두 번째로, `migrations/2021xxxx-create-url.js` 파일의 스키마 구조 또한 수정해주어야 한다.

  ```js
  /* 생략 */
  url: {
  	type: Sequelize.STRING
  },
  title: {
  	type: Sequelize.STRING
  },
  visits: {
  	type: Sequelize.INTEGER,
  	defaultValue: 0 /* defaultValue 값 추가 */
  },
  ```

- 위 과정을 모두 거친다면, 테이블에 알맞은 필드값이 요구 사항에 맞춰 작성된 걸 볼 수 있다.

      <center><img src="https://user-images.githubusercontent.com/83164003/142166546-8a93f90a-88a3-4308-86fc-7a7a2e824971.png"/></center>

<br>
<br>

#### 3-4. 마이그레이션

---

- 모델이나, 스키마 변경이 있을 때 자동으로 적용되지 않기 때문에 마이그레이션을 실행해 줘야 한다.

  ```js
  npx sequelize-cli db:migrate
  ```

  Sequelize 명령어로 반영이 가능하다.

- 해당과정까지 진행하면 **Part-1**은 모두 통과하게 된다.

  <center><img src="https://user-images.githubusercontent.com/83164003/142166909-5140c2c5-ced3-472e-a778-a7e7b10be89e.png"/></center><br>

  데이터베이스의 준비가 완료되었으니, MVC ~~V는 사실 없다~~ 패턴을 적용하여 Short.ly의 백엔드 부분을 완성하면 스프린트는 완성된다.

<br>
<br>

#### 3-5. controller 작성

---

- 스프린트에서 제공하는 endpoint는 다음과 같다.

  - GET /links
  - GET /links/:id (리디렉션)
  - POST /links

- 그중 우선 리디렉션은 추후에 추가하고, 테스트 요구사항에 맞추어서 `controllers/links/index.js` 디렉토리 구조를 만들어서 controller 파일을 만들어 주었다.

  ```js
  const utils = require('../../modules/utils');
  const {
    url: urlModels,
  } = require('../../models'); /* const urlModels = require('../../models').url 과 같은 의미이다. */

  module.exports = {
    get: (req, res) => {
      // get method
    },
    post: (req, res) => {
      // post method
    },
  };
  ```

  다음과 같은 `get`, `post` 두가지 메소드가 존재하는 contoller 파일이 존재한다면 **(2-1) controller 작성** 테스트는 쉽게 통과할 수 있다.

  <center><img src="https://user-images.githubusercontent.com/83164003/142168083-afe86d1b-dcfd-4140-852e-0dcc6803c848.png"/></center>

<br>
<br>

#### 3-6. router 연결

---

- 위에 나열한 endpoint에 맞추어 router 파일을 만들어 주면된다.

  `routes/index.js` 파일은 있었기에 controller 각 endpoint의 메소드에 맞추어 `routes/links.js` 분기점을 만들어 주었다.

  ```js
  const express = require('express');
  const router = express.Router();
  const controllers = require('../controllers/links');

  router.get('/', controllers.get);
  router.get('/:id', controllers.redirect);
  router.post('/', controllers.post);

  module.exports = router;
  ```

  여기부터는 controller 와 router 파일 모두 완성시켜 연결되어야 테스트가 통과가 된다.

  이전 controller 파일 작성 단계에서는 테스트 통과를 위하여 뼈대만 작성해 놓았기 때문에 테스트 통과를 위해서 controller 구현 과정을 마저 작성하도록 하자.

<br>
<br>

#### 3-7. controller 구현

---

- 우선 첫번째 기능인 **GET /links** 는 urls 테이블의 모든 내역을 조회하는 역할이다.

  ```sql
  SELECT * FROM urls
  ```

  위 역할을 대신 할 Sequelize 구문을 작성해주면 된다. 공식 문서를 참조하여 <a href="https://sequelize.org/master/manual/model-querying-finders.html" target="_blank">findAll</a> 메소드를 활용하였다.

  ```js
  const { url : urlModels } = require('../../models');

  module.exports = {
    get: (req, res) => {
      urlModels
        .findAll()
        .then(data => {
          res.status(200).json(data)
        });
    }
  ```

- 다음 기능은 **POST /links**로써, urls 테이블에 값을 넣는 역할이다.

  스프린트에 나온 내용대로 `utils.js`에서 url 사이트의 메타 정보 title 을 긁어올 수 있는 코드인 `utils.getUrlTitle`를 사용하였으며, 그 외 공식 문서를 참조하여 <a href="https://sequelize.org/master/manual/model-querying-finders.html" target="_blank">findOrCreate</a> 메소드를 활용하였다.

  `.findOrCreate()`는 원하는 값을 조회 후 없다면 생성까지 할 수 있는 함수이기때문에 결과값으로 반환하는 인자가 2개인 점이 특징이다. ~~사실 `.create()` 만 사용해도 된다.~~

  ```js
  const utils = require('../../modules/utils');

  /* 생략 */

  post: (req, res) => {
    const { url } = req.body;

    utils.getUrlTitle(url, (err, title) => {
      urlModels
        .findOrCreate({
          where: { url: url },
          default: { title: title },
        })
        .then(([data, created]) => {
          if (!created) {
            return res.status(201).json(data);
          }
          res.status(201).json(data);
        });
    });
  };
  ```

- 마지막 기능은 **GET /links/:id**로써, redirect 기능 역할이다.

  `.finOne()` 으로 id가 일치하는 url을 찾아, <a href="https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries" target="_blank">update</a> 메소드로 visits를 1 증가 시키고 리디렉션 한다.

  ```js
  redirect: (req, res) => {
    urlModels
      .findOne({
        where: { id: req.params.id },
      })
      .then((data) => {
        return data.update({ visits: data.visits + 1 });
      })
      .then((data) => {
        res.redirect(data.url);
      });
  };
  ```

<br>
<br>

## 🤔 Understanding

- ORM을 통한 DB 작성과 백엔드 기능을 중점으로 다루었다.

  어제부터 계속 학습해온 MVC 로 구분하여 프로그래밍을 하는 이유, 그리고 오늘은 심화과정인 ORM(Sequelize)을 통하여 DB를 다루는 방법까지 배웠다.

- SQL 문법이 어렵지 않았기에 사실 Sequelize 문법이 편하다?... 는 결코 아닌거같다..

- 당장 많이 써보지 않아 익숙하지 않아 코드를 짤 때 느끼는 이질감은 당연히 있지만, 이 백엔드 로직은 충분히 학습해야겠다 라는 생각이 들었다.

  개발언어를 혼용해가며 쓴다는 개념보다는 한가지의 개발언어로 프로그램을 작성 한다는게 가독성에는 유리한 측면은 당연한 얘기이기 때문이다.

- 그리고 `.then()`을 계속 쓰고는 있는데 쓰는 코드가 길어질 수록 뭔가... ~~코드가 안예쁘다~~ `async/await` 방법 두가지 모두 활용하여 코드를 짜는 습관을 학습하는 단계에서는 길러봐야겠다.

<br>
<br>

```toc

```
