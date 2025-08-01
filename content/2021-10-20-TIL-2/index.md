---
emoji: 📚
title: Session
date: '2021-10-20'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### Session

---

- HTTPS 프로토콜 서버를 만들고, 클라이언트에서 쿠키에 담긴 세션 정보를 확인해야 한다.

- 세션 기반 인증은 서버(혹은 DB)에 유저 정보를 담는 인증 방식이다. 이때 웹사이트에서는 로그인을 유지하기 위한 수단으로 쿠키를 사용하며 쿠키에는 서버에서 발급한 세션 아이디를 저장되어 있다.

<br>
<br>

#### 1-1. 사전 준비

---

<br>
<br>

##### 환경 변수 설정

---

- Sequelize 스프린트때 해보았기 때문에 별도로 mysql을 node.js에서 어떻게 사용하는지 구조를 뜯어보진 않았다. `.env` 파일을 내 로컬환경에 알맞게 설정해 주었다.

- `config/config.js` 파일에 이미 데이터베이스 이름(`database: 'authentication'`)이 명시되어 있었다. 해당 이름의 DB를 생성해주었다.

<br>
<br>

##### 데이터베이스 마이그레이션

---

- 이 또한 Sequelize 스프린트때 해보았기 때문에 `models`와 `migrations` 폴더 내부의 파일들을 확인하지 않았다.

  ```js
  npx sequelize-cli db:migrate
  ```

  위 sequelize 명령어로 이미 짜여진 DB 스키마를 내 mysql 환경으로 마이그레이션 해주었다.

<br>
<br>

##### 인증서 발급

---

- <a href="https://github.com/FiloSottile/mkcert" target="_blank">mkcert</a>라는 프로그램을 이용해서 로컬 환경에서 인증서를 생성했다.

<br>
<br>

#### 1-2. 서버 구현

---

<br>
<br>

##### 쿠키 옵션 & HTTPS 옵션 설정

---

- `server-session/index.js` 파일에서 쿠키 옵션 설정을 해주었다.

  ```js
  // TODO: express-session 라이브러리를 이용해 쿠키 설정을 해줄 수 있습니다.
  app.use(
    session({
      secret: '@codestates',
      resave: false,
      saveUninitialized: true,
      cookie: {
        domain: 'localhost', // Domain : 쿠키의 Domain 옵션과 서버의 도메인이 일치해야한다.(스프린트는 로컬 환경)
        path: '/', // Path : default값은 '/'이다.
        maxAge: 24 * 6 * 60 * 10000, // maxAge : 해당 초만큼 유지되는 쿠키 유효기간 옵션이다.
        sameSite: 'none', // sameSite : 항상 쿠키를 보내 줄 수 있다.(secure : true 옵션과 함께 써야한다.)
        httpOnly: true, // httpOnly : 'true'이기 때문에, JS에서는 쿠키에 접근이 불가하다.
        secure: true,
      },
    }),
  );
  ```

- 마찬가지로 `server-session/index.js` 파일에서 HTTPS 옵션 설정을 해주었다.

  ```js
  // TODO: CORS 설정이 필요합니다. 클라이언트가 어떤 origin인지에 따라 달리 설정할 수 있습니다.
  // 메서드는 GET, POST, OPTIONS를 허용합니다.
  app.use(
    cors({
      origin: 'https://localhost:3000', // 출처(origin)는 클라이언트 주소를 준다.
      method: ['GET', 'POST', 'OPTIONS'], // 메소드는 제시되어 있다.
      credentials: true, // 인증서를 이용한 CORS 옵션.
    }),
  );
  ```

<br>
<br>

##### [POST] /users/login

---

- `controller/users/login.js`에서 로그인에 관련 기능을 완성하자.

  ```js
  // 해당 모델의 인스턴스를 models/index.js에서 가져옵니다.
  const { Users } = require('../../models'); // DB

  post: async (req, res) => {
    // userInfo는 유저정보가 데이터베이스에 존재하고, 완벽히 일치하는 경우에만 데이터가 존재합니다.
    // 만약 userInfo가 NULL 혹은 빈 객체라면 전달받은 유저정보가 데이터베이스에 존재하는지 확인해 보세요
    const userInfo = await Users.findOne({
      where: { userId: req.body.userId, password: req.body.password },
    });

    // TODO: userInfo 결과 존재 여부에 따라 응답을 구현하세요.
    // 결과가 존재하는 경우 세션 객체에 userId가 저장되어야 합니다.
    if (!userInfo) {
      res.json({ message: 'not authorized' });
    } else {
      // HINT: req.session을 사용하세요.
      req.session.save(function () {
        // 세션 객체에 저장하는 방법
        req.session.userId = userInfo.userId;
        res.json({ message: 'ok' });
      });
    }
  };
  ```

- `req.session` 사용방법은 <a href="https://github.com/expressjs/session#reqsession" target="_blank">GitHub: express-session</a> 문서를 통해 확인하였다.

<br>
<br>

##### [POST] /users/logout

---

- `controller/users/logout.js`에서 로그아웃에 관련된 기능을 완성하자.

  ```js
  post: (req, res) => {
    // TODO: 세션 아이디를 통해 고유한 세션 객체에 접근할 수 있습니다.
    // 앞서 로그인시 세션 객체에 저장했던 값이 존재할 경우, 이미 로그인한 상태로 판단할 수 있습니다.
    // 세션 객체에 담긴 값의 존재 여부에 따라 응답을 구현하세요.

    if (!req.session.userId) {
      // 로그인 전에 로그아웃 요청
      res.sendStatus(400); // 400번 에러코드
    } else {
      // TODO: 로그아웃 요청은 세션을 삭제하는 과정을 포함해야 합니다.
      req.session.destroy(function () {
        // 세션 객체 파괴
        req.session;
      });
      /* 세션 삭제는 req.session = null 또한 가능한듯하다... 세션 객체를 null값으로 초기화 */
      res.sendStatus(200);
    }
  };
  ```

<br>
<br>

##### [POST] /users/userinfo

---

- `controller/userinfo.js`에서 마이페이지 관련된 기능을 완성하자.

  ```js
  const { Users } = require('../../models'); // DB

  get: async (req, res) => {
    // TODO: 세션 객체에 담긴 값의 존재 여부에 따라 응답을 구현하세요.
    // HINT: 세션 객체에 담긴 정보가 궁금하다면 req.session을 콘솔로 출력해보세요

    if (!req.session.userId) {
      res.status(400).json({ message: 'not authorized' });
    } else {
      // TODO: 데이터베이스에서 로그인한 사용자의 정보를 조회한 후 응답합니다.
      Users.findOne({
        // Users 테이블에서 조회 후
        where: {
          userId: req.session.userId,
        },
      }).then((data) => {
        // 응답에 조회값을 넘겨준다.
        res.status(200).json({ data: data, message: 'ok' });
      });
    }
  };
  ```

<br>
<br>

#### 1-3. 클라이언트 구현

---

<br>
<br>

##### Mypage

---

- `components/Mypage.js`에서 마이페이지 관련된 기능을 완성하자.

- 서버의 API를 활용하기 위해서는 <a href="https://github.com/axios/axios" target="_blank">Axios</a> 라이브러리를 사용해야 한다.

  - Axios는 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리이다.

  - 자바스크립트에 내장되어 있는 fetch api와 유사한 기능이지만, url을 제공하는 등 차이점이 있다.

- **Mypage**에서는 로그인 이후 userinfo가 보여지며, 로그아웃 버튼이 존재한다.

  ```js
  import axios from 'axios';

  function Mypage(props) {
  	const handleLogout = () => {
  		// TODO: 서버에 로그아웃 요청을 보낸다음 요청이 성공하면 props.logoutHandler를 호출하여 로그인 상태를 업데이트 해야 합니다.
  		axios.post('https://localhost:4000/users/logout', null,  {withCredentials: true})  // url은 서버의 endpoint, data는 null값을 그리고 cors옵션중 Credential값이 'true'이므로 withCredentials 옵션을 준다.
  		.then(()=>{
  			props.logoutHandler(); // post 요청 후 logoutHandler 함수 호출하여 isLogin 상태를 업데이트 한다.
  		});

  	/* 생략 */
  }
  ```

<br>
<br>

##### Login

---

- `components/Login.js` 에서는 `loginRequestHandler()` 함수를 완성해주면 된다.

  ```js
  loginRequestHandler() {
  	// TODO: 로그인 요청을 보내세요.

  	// 로그인에 성공하면
  	// - props로 전달받은 함수를 호출해, 로그인 상태를 변경하세요.
  	// - GET /users/userinfo 를 통해 사용자 정보를 요청하세요

  	//   // 사용자 정보를 받아온 후
  	// - props로 전달받은 함수를 호출해, 사용자 정보를 변경하세요.

  	axios.post('https://localhost:4000/users/login',{userId: this.state.username, password: this.state.password}, {withCredentials: true})  // 로그인 요청
  	.then(()=>{
  		this.props.loginHandler();  // 로그인 요청에 성공하면, 전달받은 함수를 호출해 로그인 상태를 변경
  		return axios.get('https://localhost:4000/users/userinfo', {withCredentials: true})  // GET /users/userinfo 를 통해 사용자 정보를 요청
  	})
  	.then((data)=>{  // 사용자 정보를 받아온 후
  		const {userId, email} = data.data.data; // 사용자 정보는 controller/userinfo.js에서 data: data 형식으로 보냈다.
  		this.props.setUserInfo({  // props로 전달받은 함수를 호출 (상태변경 함수)
  			userId,
  			email
  		});
  	});
  }
  ```

<br>
<br>

## 🤔 Understanding

- 어렵다 어렵다 어렵다...

- _axios_ 의 등장.. node.js에서 _브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리_ 이다. ~~앞으로 자주 볼 듯 하다...~~

  반복해서 해봐야 할 듯 하다...

<br>
<br>

```toc

```
