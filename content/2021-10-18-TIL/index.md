---
emoji: ๐
title: ORM, Sequelize, Short.ly MVC
date: '2021-10-18'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## โ๏ธ **T**oday **I** **L**earned

---

<br>

### 1. ORM(Object-Relational Mapping)

---

- ORM์ SQL๋ฌธ์ ์ฌ์ฉํ์ง ์๊ณ  JS๋ฌธ๋ฒ์ ํตํด์ Object๋ก DB์ ์ ๊ทผํ  ์ ์๋๋ก ๋๋ ์ญํ ์ ํ๋ค.

  ![์คํฌ๋ฆฐ์ท, 2021-11-17 15-11-59](https://user-images.githubusercontent.com/83164003/142144746-f0823d78-7d4d-419d-850d-586554dbe08d.png)

  ORM์ SQL๋ฌธ๋ฒ ๋์  ์ดํ๋ฆฌ์ผ์ด์์ ๊ฐ๋ฐ์ธ์ด๋ฅผ ๊ทธ๋๋ก ์ฌ์ฉํ  ์ ์๊ฒ ํจ์ผ๋ก์จ, ๊ฐ๋ฐ ์ธ์ด์ ์ผ๊ด์ฑ๊ณผ ๊ฐ๋์ฑ์ ๋์ฌ์ค๋ค๋ ์ฅ์ ์ ๊ฐ๊ณ  ์๋ค.

- ORM์๋ ์ฌ๋ฌ๊ฐ์ง ์ข๋ฅ _(Django โ ORM cookbook, Node.js โ Sequalize, Java โ Hibernate, JPA ๋ฑ)_ ๊ฐ ์์ง๋ง, ํ์ต๋ฐฉํฅ๊ณผ ์๋ง๋ **Node.js โ Sequalize** ๋ฅผ ์ฌ์ฉ ํ  ์์ ์ด๋ค.

<br>
<br>

### 2. Sequelize

---

- **Sequelize**๋ `Node.JS`์์ `mysql`์ ์ฌ์ฉํ  ๋ Query๋ฌธ์ ์ฌ์ฉํ์ง ์๊ณ  ๋์ฑ ์ฝ๊ฒ ๋ค๋ฃฐ ์ ์๋๋ก ๋์์ฃผ๋ ๋ผ์ด๋ธ๋ฌ๋ฆฌ์ด๋ค.
- Sequelize๋ ์๋ฐ์คํฌ๋ฆฝํธ ๊ฐ์ฒด์ ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ๋ฆด๋ ์ด์์ ๋งคํํด์ฃผ๋ฏ๋ก ์๋ฐ์คํฌ๋ฆฝํธ ๊ตฌ๋ฌธ์ ์์์ SQL๋ฌธ์ผ๋ก ๋ณ๊ฒฝํด์ค๋ค.

  ์ฌ์ฉ๋ฐฉ๋ฒ์ ๊ณต์๋ฌธ์์ ์๋์ ์คํ๋ฆฐํธ(Short.ly MVC)๋ฅผ ํตํด ํ์ตํ์๋ค.

<br>
<br>

### 3. Short.ly MVC

---

**MVC(ModelโViewโController)** ๋ชจ๋ธ ๋์์ธ์ค V(Client)๊ฐ ๋น ์ง ํํ์ ๊ตฌ์กฐ์ด๋ค. <br>
์ด๋ฒ ์คํ๋ฆฐํธ์ ๋ชฉ์ ์ ORM(Node.JS-Sequelize)์ ์ต์ํด์ง๋๋ฐ ๋ชฉ์ ์ด ์๋ค.

<br>
<br>

#### 3-1. ์ฌ์  ์ค๋น: sequelize ๋ฐ sequelize-cli ์ค์น

---

- <a href="https://sequelize.org/" target="_blank">Sequelize ORM</a> ๊ณต์๋ฌธ์๋ฅผ ๋ณด๊ณ  sequelize ์ค์น๋ฅผ ํ์์ผ๋ฉฐ `package.json` ํ์ผ์ dependencies ๋ชจ๋์ ํ์ธํด๋ณด๋ `"sequelize": "^6.9.0"` ๋ฅผ ํ์ธ ํ  ์ ์์๋ค.

- <a href="https://sequelize.org/master/manual/migrations.html" target="_blank"> Sequelize - Migrations</a> ๋ฌธ์๋ฅผ ํตํด sequelize-cli ๋ฅผ ์ค์นํ์์ผ๋ฉฐ ๋ง์ฐฌ๊ฐ์ง๋ก devDependencies ๋ชจ๋์์ `"sequelize-cli": "^6.3.0"` ๋ฅผ ํ์ธ ํ  ์ ์์๋ค.

<br>
<br>

#### 3-2. ORM ์ค์ 

---

- ์ฑ๊ณต์ ์ผ๋ก bootstraping์ด ๋๋๋ฉด ๋ค์ ํ์ผ ๋ฐ ํด๋๋ค์ด ์์ฑ๋๋ค.

  > config/config.json<br>
  > models/<br>
  > migrations/<br>
  > seeders/

- ์ฐ์  `config.json` ํ์ผ์ ํ์ธํ์ฌ์ mysql ํ๊ฒฝ๊ณผ ์ผ์นํ๋ ํ๊ฒฝ์ผ๋ก ์ค์ ํด์ค๋ค.

  ```js
  {
    "development": {
      "username": /* mysql username */
      "password": /* mysql password */
      "database": "database_development", /* ํด๋น ์ด๋ฆ์ ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ ์ง์  ์์ฑํด์ผ ํ๋ค */
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

- ๋ํ `config/config.json` ํ์ผ์ ๋ฏผ๊ฐํ ์ ๋ณด๋ฅผ ๋ด๊ณ  ์๊ธฐ ๋๋ฌธ์ `.gitignore` ํ์ผ ํ์ธ์ ํฌํจ๋์ด ์๋ ๊ฑธ ์ ์ ์๋ค.

  ์ ๊ณผ์ ์ด ๋๋๋ฉด CLI๋ฅผ ํตํ์ฌ ํ์ํ ํ์ผ๋ค์ด ๋ชจ๋ ์๋์ผ๋ก ๋ง๋ค์ด์ก์ผ๋ฉฐ, mysql์ ์ ์ ํ  ์ ์๊ฒ ๋๋ค.

  <center><img src="https://user-images.githubusercontent.com/83164003/142166073-5232ec86-458f-4873-9e1b-73d780e5e849.png"/></center>

<br>
<br>

#### 3-3. ๋ชจ๋ธ ์์ฑ

---

- CLI๋ฅผ ํตํด ๋ชจ๋ธ์ ๋ง๋ค์ด์ผ ํ๋ค.

  ```js
  npx sequelize-cli model:generate --name url --attributes url:string,title:string,visits:integer
  ```

  ๋ชจ๋ธ(ํ์ด๋ธ์ ์ด๋ฆ) ์ด๋ฆ์ `url`๋ก ์ค์ ํ์์ง๋ง, ์ค์  ๊ฒฐ๊ณผ๋ฌผ์ `urls`๋ก ๋์๋ค.(์๋ง ๋ณต์ํ์ ์๋ ์ทจ๊ธ๋๋ ๋ฏ ๋ณด์ธ๋ค.)

- ํ๋๊ฐ ๊ฐ์ง๋ ํน๋ณํ ์๊ตฌ ์ฌํญ(๊ธฐ๋ณธ๊ฐ ๋ฑ)์ ํ์ผ์ ์ง์  ์์ ํด์ ์ ์ํด์ผ ํ๋ค.

  ์์์ ๋ง๋ค์ด์ง `models/url.js` ํ์ผ์ ๋ค์๊ณผ ๊ฐ๋ค. `visits`์ ๊ธฐ๋ณธ๊ฐ์ `0`์ผ๋ก ์ค์ ํ๊ธฐ ์ํด์๋ ์ฒซ์งธ๋ก ๋ชจ๋ธ ํ์ผ์ ์ง์  ์์ ํด์ผํ๋ค.

  ```js
  /* ์๋ต */
  url.init({
  	url: DataTypes.STRING,
  	title: DataTypes.STRING,
  	/* visits ์ defaultValue : 0 ์ผ๋ก ์ง์  ๋ชจ๋ธ ํ์ผ์ ์์ ํด์ค์ผ ํ๋ค. */
  	visits: {type : DataTypes.INTEGER, defaultValue : 0}
  }
  ```

  ๋ ๋ฒ์งธ๋ก, `migrations/2021xxxx-create-url.js` ํ์ผ์ ์คํค๋ง ๊ตฌ์กฐ ๋ํ ์์ ํด์ฃผ์ด์ผ ํ๋ค.

  ```js
  /* ์๋ต */
  url: {
  	type: Sequelize.STRING
  },
  title: {
  	type: Sequelize.STRING
  },
  visits: {
  	type: Sequelize.INTEGER,
  	defaultValue: 0 /* defaultValue ๊ฐ ์ถ๊ฐ */
  },
  ```

- ์ ๊ณผ์ ์ ๋ชจ๋ ๊ฑฐ์น๋ค๋ฉด, ํ์ด๋ธ์ ์๋ง์ ํ๋๊ฐ์ด ์๊ตฌ ์ฌํญ์ ๋ง์ถฐ ์์ฑ๋ ๊ฑธ ๋ณผ ์ ์๋ค.

      <center><img src="https://user-images.githubusercontent.com/83164003/142166546-8a93f90a-88a3-4308-86fc-7a7a2e824971.png"/></center>

<br>
<br>

#### 3-4. ๋ง์ด๊ทธ๋ ์ด์

---

- ๋ชจ๋ธ์ด๋, ์คํค๋ง ๋ณ๊ฒฝ์ด ์์ ๋ ์๋์ผ๋ก ์ ์ฉ๋์ง ์๊ธฐ ๋๋ฌธ์ ๋ง์ด๊ทธ๋ ์ด์์ ์คํํด ์ค์ผ ํ๋ค.

  ```js
  npx sequelize-cli db:migrate
  ```

  Sequelize ๋ช๋ น์ด๋ก ๋ฐ์์ด ๊ฐ๋ฅํ๋ค.

- ํด๋น๊ณผ์ ๊น์ง ์งํํ๋ฉด **Part-1**์ ๋ชจ๋ ํต๊ณผํ๊ฒ ๋๋ค.

  <center><img src="https://user-images.githubusercontent.com/83164003/142166909-5140c2c5-ced3-472e-a778-a7e7b10be89e.png"/></center><br>

  ๋ฐ์ดํฐ๋ฒ ์ด์ค์ ์ค๋น๊ฐ ์๋ฃ๋์์ผ๋, MVC ~~V๋ ์ฌ์ค ์๋ค~~ ํจํด์ ์ ์ฉํ์ฌ Short.ly์ ๋ฐฑ์๋ ๋ถ๋ถ์ ์์ฑํ๋ฉด ์คํ๋ฆฐํธ๋ ์์ฑ๋๋ค.

<br>
<br>

#### 3-5. controller ์์ฑ

---

- ์คํ๋ฆฐํธ์์ ์ ๊ณตํ๋ endpoint๋ ๋ค์๊ณผ ๊ฐ๋ค.

  - GET /links
  - GET /links/:id (๋ฆฌ๋๋ ์)
  - POST /links

- ๊ทธ์ค ์ฐ์  ๋ฆฌ๋๋ ์์ ์ถํ์ ์ถ๊ฐํ๊ณ , ํ์คํธ ์๊ตฌ์ฌํญ์ ๋ง์ถ์ด์ `controllers/links/index.js` ๋๋ ํ ๋ฆฌ ๊ตฌ์กฐ๋ฅผ ๋ง๋ค์ด์ controller ํ์ผ์ ๋ง๋ค์ด ์ฃผ์๋ค.

  ```js
  const utils = require('../../modules/utils');
  const {
    url: urlModels,
  } = require('../../models'); /* const urlModels = require('../../models').url ๊ณผ ๊ฐ์ ์๋ฏธ์ด๋ค. */

  module.exports = {
    get: (req, res) => {
      // get method
    },
    post: (req, res) => {
      // post method
    },
  };
  ```

  ๋ค์๊ณผ ๊ฐ์ `get`, `post` ๋๊ฐ์ง ๋ฉ์๋๊ฐ ์กด์ฌํ๋ contoller ํ์ผ์ด ์กด์ฌํ๋ค๋ฉด **(2-1) controller ์์ฑ** ํ์คํธ๋ ์ฝ๊ฒ ํต๊ณผํ  ์ ์๋ค.

  <center><img src="https://user-images.githubusercontent.com/83164003/142168083-afe86d1b-dcfd-4140-852e-0dcc6803c848.png"/></center>

<br>
<br>

#### 3-6. router ์ฐ๊ฒฐ

---

- ์์ ๋์ดํ endpoint์ ๋ง์ถ์ด router ํ์ผ์ ๋ง๋ค์ด ์ฃผ๋ฉด๋๋ค.

  `routes/index.js` ํ์ผ์ ์์๊ธฐ์ controller ๊ฐ endpoint์ ๋ฉ์๋์ ๋ง์ถ์ด `routes/links.js` ๋ถ๊ธฐ์ ์ ๋ง๋ค์ด ์ฃผ์๋ค.

  ```js
  const express = require('express');
  const router = express.Router();
  const controllers = require('../controllers/links');

  router.get('/', controllers.get);
  router.get('/:id', controllers.redirect);
  router.post('/', controllers.post);

  module.exports = router;
  ```

  ์ฌ๊ธฐ๋ถํฐ๋ controller ์ router ํ์ผ ๋ชจ๋ ์์ฑ์์ผ ์ฐ๊ฒฐ๋์ด์ผ ํ์คํธ๊ฐ ํต๊ณผ๊ฐ ๋๋ค.

  ์ด์  controller ํ์ผ ์์ฑ ๋จ๊ณ์์๋ ํ์คํธ ํต๊ณผ๋ฅผ ์ํ์ฌ ๋ผ๋๋ง ์์ฑํด ๋์๊ธฐ ๋๋ฌธ์ ํ์คํธ ํต๊ณผ๋ฅผ ์ํด์ controller ๊ตฌํ ๊ณผ์ ์ ๋ง์  ์์ฑํ๋๋ก ํ์.

<br>
<br>

#### 3-7. controller ๊ตฌํ

---

- ์ฐ์  ์ฒซ๋ฒ์งธ ๊ธฐ๋ฅ์ธ **GET /links** ๋ urls ํ์ด๋ธ์ ๋ชจ๋  ๋ด์ญ์ ์กฐํํ๋ ์ญํ ์ด๋ค.

  ```sql
  SELECT * FROM urls
  ```

  ์ ์ญํ ์ ๋์  ํ  Sequelize ๊ตฌ๋ฌธ์ ์์ฑํด์ฃผ๋ฉด ๋๋ค. ๊ณต์ ๋ฌธ์๋ฅผ ์ฐธ์กฐํ์ฌ <a href="https://sequelize.org/master/manual/model-querying-finders.html" target="_blank">findAll</a> ๋ฉ์๋๋ฅผ ํ์ฉํ์๋ค.

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

- ๋ค์ ๊ธฐ๋ฅ์ **POST /links**๋ก์จ, urls ํ์ด๋ธ์ ๊ฐ์ ๋ฃ๋ ์ญํ ์ด๋ค.

  ์คํ๋ฆฐํธ์ ๋์จ ๋ด์ฉ๋๋ก `utils.js`์์ url ์ฌ์ดํธ์ ๋ฉํ ์ ๋ณด title ์ ๊ธ์ด์ฌ ์ ์๋ ์ฝ๋์ธ `utils.getUrlTitle`๋ฅผ ์ฌ์ฉํ์์ผ๋ฉฐ, ๊ทธ ์ธ ๊ณต์ ๋ฌธ์๋ฅผ ์ฐธ์กฐํ์ฌ <a href="https://sequelize.org/master/manual/model-querying-finders.html" target="_blank">findOrCreate</a> ๋ฉ์๋๋ฅผ ํ์ฉํ์๋ค.

  `.findOrCreate()`๋ ์ํ๋ ๊ฐ์ ์กฐํ ํ ์๋ค๋ฉด ์์ฑ๊น์ง ํ  ์ ์๋ ํจ์์ด๊ธฐ๋๋ฌธ์ ๊ฒฐ๊ณผ๊ฐ์ผ๋ก ๋ฐํํ๋ ์ธ์๊ฐ 2๊ฐ์ธ ์ ์ด ํน์ง์ด๋ค. ~~์ฌ์ค `.create()` ๋ง ์ฌ์ฉํด๋ ๋๋ค.~~

  ```js
  const utils = require('../../modules/utils');

  /* ์๋ต */

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

- ๋ง์ง๋ง ๊ธฐ๋ฅ์ **GET /links/:id**๋ก์จ, redirect ๊ธฐ๋ฅ ์ญํ ์ด๋ค.

  `.finOne()` ์ผ๋ก id๊ฐ ์ผ์นํ๋ url์ ์ฐพ์, <a href="https://sequelize.org/master/manual/model-querying-basics.html#simple-update-queries" target="_blank">update</a> ๋ฉ์๋๋ก visits๋ฅผ 1 ์ฆ๊ฐ ์ํค๊ณ  ๋ฆฌ๋๋ ์ ํ๋ค.

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

## ๐ค Understanding

---

- ORM์ ํตํ DB ์์ฑ๊ณผ ๋ฐฑ์๋ ๊ธฐ๋ฅ์ ์ค์ ์ผ๋ก ๋ค๋ฃจ์๋ค.

  ์ด์ ๋ถํฐ ๊ณ์ ํ์ตํด์จ MVC ๋ก ๊ตฌ๋ถํ์ฌ ํ๋ก๊ทธ๋๋ฐ์ ํ๋ ์ด์ , ๊ทธ๋ฆฌ๊ณ  ์ค๋์ ์ฌํ๊ณผ์ ์ธ ORM(Sequelize)์ ํตํ์ฌ DB๋ฅผ ๋ค๋ฃจ๋ ๋ฐฉ๋ฒ๊น์ง ๋ฐฐ์ ๋ค.

- SQL ๋ฌธ๋ฒ์ด ์ด๋ ต์ง ์์๊ธฐ์ ์ฌ์ค Sequelize ๋ฌธ๋ฒ์ด ํธํ๋ค?... ๋ ๊ฒฐ์ฝ ์๋๊ฑฐ๊ฐ๋ค..

- ๋น์ฅ ๋ง์ด ์จ๋ณด์ง ์์ ์ต์ํ์ง ์์ ์ฝ๋๋ฅผ ์งค ๋ ๋๋ผ๋ ์ด์ง๊ฐ์ ๋น์ฐํ ์์ง๋ง, ์ด ๋ฐฑ์๋ ๋ก์ง์ ์ถฉ๋ถํ ํ์ตํด์ผ๊ฒ ๋ค ๋ผ๋ ์๊ฐ์ด ๋ค์๋ค.

  ๊ฐ๋ฐ์ธ์ด๋ฅผ ํผ์ฉํด๊ฐ๋ฉฐ ์ด๋ค๋ ๊ฐ๋๋ณด๋ค๋ ํ๊ฐ์ง์ ๊ฐ๋ฐ์ธ์ด๋ก ํ๋ก๊ทธ๋จ์ ์์ฑ ํ๋ค๋๊ฒ ๊ฐ๋์ฑ์๋ ์ ๋ฆฌํ ์ธก๋ฉด์ ๋น์ฐํ ์๊ธฐ์ด๊ธฐ ๋๋ฌธ์ด๋ค.

- ๊ทธ๋ฆฌ๊ณ  `.then()`์ ๊ณ์ ์ฐ๊ณ ๋ ์๋๋ฐ ์ฐ๋ ์ฝ๋๊ฐ ๊ธธ์ด์ง ์๋ก ๋ญ๊ฐ... ~~์ฝ๋๊ฐ ์์์๋ค~~ `async/await` ๋ฐฉ๋ฒ ๋๊ฐ์ง ๋ชจ๋ ํ์ฉํ์ฌ ์ฝ๋๋ฅผ ์ง๋ ์ต๊ด์ ํ์ตํ๋ ๋จ๊ณ์์๋ ๊ธธ๋ฌ๋ด์ผ๊ฒ ๋ค.

<br>
<br>

```toc

```
