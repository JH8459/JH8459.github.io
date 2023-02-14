---
emoji: 📚
title: Token
date: '2021-10-21'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

---

<br>

### 1. Token

---

- 앞선 세션 인증 방식은 서버(혹은 DB)에 유저 정보를 담는 인증 방식이었다.

  매 요청마다 데이터베이스를 살펴보는 것이 불편하고, 이 부담은 서버의 과부화를 초래할 수 있다.<br>
  부하를 줄이기 위해 인증 방식을 토큰 인증 방식을 사용해보자.

- 토큰 인증 방식의 인증 절차는 아래 그림과 같다

  ![token](https://user-images.githubusercontent.com/83164003/143394269-b9b52b26-722d-44ec-8189-2c9ac64b92b0.jpg)

<br>
<br>

#### 1-1. 사전 준비

---

- **Part1-Session**의 <a href="https://blog.jh8459.com/2021-10-20-TIL-2/#1-1-%EC%82%AC%EC%A0%84-%EC%A4%80%EB%B9%84" target="_blank">준비단계</a>와 동일한 진행은 생략하였다.
- **ACCESS_SECRET**와 **REFRESH_SECRET** 변수명으로 2가지의 JWT(Json Web Token)을 사용한다.

  accessToken은 보호된 정보들(유저의 이메일, 연락처, 사진 등)에 접근할 수 있는 권한부여에 사용된다. 클라이언트가 처음 인증을 받게 될 때(로그인 시), accessToken,refreshToken 두 가지를 다 받지만, 실제로 권한을 얻는 데 사용하는 토큰은 accessToken이다.

  accessToken만 존재한다면, 해커나 악의적인 유저에게 탈취당할 경우 보안이 우려되므로 accessToken의 유효기간을 짧게 주고(탈취되더라도 피해 최소화), refreshToken으로 새로운 accessToken을 발급 받는 구조이다.

- 다른 사용자가 볼 수 없도록 `.env` 파일에 accessToken과 refreshToken 키값을 넣어준다(임의의 값을 넣어주어도 된다).

<br>
<br>

#### 1-2. 서버 구현

---

- 우선 서버는 HTTPS 프로토콜 방식으로 구현된다. CORS 옵션을 보자면,

  ```js
  app.use(
    cors({
      origin: ['https://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
    }),
  );
  ```

  3000포트의 클라이언트를 출처로 받으며, 인증서를 사용하는 정보를 알 수 있다.

  또한 서버는 4000번 포트로 인증서가 존재할 때만 서버가 구동되는 코드 또한 `server-token/index.js` 파일을 확인하면 볼 수 있다.

<br>
<br>

##### [POST] /login

---

- `controllers/login.js` 파일을 확인 후 다음과 같은 기능을 완성시켜야 한다.

  - _request로부터 받은 userId, password와 일치하는 유저가 DB에 존재하는지 확인합니다._

  - _일치하는 유저가 없을 경우: 로그인 요청을 거절합니다._

  - _일치하는 유저가 있을 경우:_

    - _필요한 데이터를 담은 두 종류의 JWT(access, refresh)를 생성합니다._

    - _생성한 JWT를 적절한 방법으로 반환합니다._

      - _access token은 클라이언트에서 react state로 다루고 있습니다._

      - _refresh token은 클라이언트의 쿠키에서 다루고 있습니다._

  ```js
  const { userId, password } = req.body; // req.body에 담긴 정보를 가져온다.

  Users.findOne({
    where: {
      userId: userId,
      password: password,
    },
  }).then((data) => {
    // request로부터 받은 userId, password와 일치하는 유저가 DB에 존재하는지 확인
    if (!data) {
      // 1. 일치하는 유저가 없을 경우
      res.json({ message: 'not authorized' }); // 로그인 요청을 거절('not authorized' 메세지가 응답에 포함)
    } else {
      // 2. 일치하는 유저가 있을 경우
      // 일치하는 유저가 있을 경우: 필요한 데이터(id, userId, email, createdAt, updatedAt)를 payload에 담아 JWT token을 생성한다.
      const payload = {
        // payload에 필요한 데이터를 담는다.
        id: data.dataValues.id,
        userId: data.dataValues.userId,
        email: data.dataValues.email,
        createdAt: data.dataValues.createdAt,
        updatedAt: data.dataValues.updatedAt,
        iat: 151623391, // 토큰발급된시간.. format을 모르겠어서 더미값을 넣었다.
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET); // access token, refresh token 생성
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET);

      res.set('Set-Cookie', [
        `refreshToken=${refreshToken}; Domain=localhost; Path=/; Secure; HttpOnly; SameSite=None;`,
      ]); // refresh token을 쿠키에 담아 보낼 때 sameSite, secure, httpOnly 옵션을 알맞게 설정
      res.json({ data: { accessToken: accessToken }, message: 'ok' }); // 클라이언트에서 accessToken은 스테이트로 다뤄지기때문에 응답결과에 담아 반환한다.
    }
  });
  ```

<br>
<br>

##### [GET] /accesstokenrequest

---

- `controllers/accesstokenrequest.js`에서는 authorization header에 담긴 토큰이 서버에서 생성한 JWT인지 확인후, 서버에서 생성한 유효한 토큰일 경우와 유효하지 않은 토큰일 경우 각각 다른 응답을 반환 해야한다.

  ```js
  const authorization = req.headers['authorization']; // authorization header에 담긴 토큰을 변수에 저장

  /* authorization header에 담긴 access token이 유효한지 검사 */
  if (!authorization) {
    // 유효하지 않는 경우: 클라이언트에 아래와 같은 JSON 객체를 반환한다.
    res.json({ data: null, message: 'invalid access token' });
  } else {
    const token = authorization.split(' ')[1]; // Bearer token 형식이므로 .split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
      Users.findOne({
        // JWT를 해독하여 얻은 payload안의 값으로 DB에 유저를 조회
        where: {
          // payload엔 password가 안담겨있으므로, 다른 속성으로 유저를 조회한다.
          id: data.id,
          userId: data.userId,
          email: data.email,
        },
      }).then((data) => {
        delete data.dataValues.password; // 모든 데이터가 담겨있다보니, 민감한 정보인 pasword는 삭제한다.
        res.json({ data: { userInfo: data.dataValues }, message: 'ok' }); // 클라이언트에서 userInfo(password는 제외)를 보여줘야 하므로 응답 결과에 담아 반환한다.
      });
    });
  }
  ```

<br>
<br>

##### [GET] /refreshtokenrequest

---

- `controllers/refreshtokenrequest`에서는 요청에 담긴 refresh token이 유효하다면 새로운 access token을 발급해 줌과 동시에 유저가 요청한 정보를 반환해줘야하며 요청에 담긴 refresh token이 유효하지 않거나, 조작된 토큰일 경우 각각 다른 응답을 반환해야 한다.

  ```js
  const refreshToken = req.cookies.refreshToken; // cookie에 담겨있는 refreshToken을 변수에 담는다.

  /* cookie에 담긴 refreshToken이 유효한지 검사. */
  if (!refreshToken) {
    // 토큰이 담겨있지 않다면 아래와 같은 JSON 객체를 반환한다.
    res.json({ data: null, message: 'refresh token not provided' });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, data) => {
      // refreshToken을이 서버가 가진 REFRESH_SECRET 으로 생성된 것인지 확인
      if (err) {
        // 해독한 토큰이 유효하지 않거나, 해독이 불가한 토큰이라면 아래와 같은 JSON 객체를 반환
        res.status(200).json({ data: null, message: 'invalid refresh token, please log in again' });
      }

      Users.findOne({
        // JWT를 해독하여 얻은 payload안의 값으로 DB에 유저를 조회
        where: {
          id: data.id, // data에는 JWT를 해독한 결과값이 담겨 있다
          userId: data.userId,
          email: data.email,
        },
      }).then((data) => {
        // playload안의 값과 DB에 일치된 유저정보가 반환이 된다.
        delete data.dataValues.password; // 민감정보 삭제

        const payload = {
          // 새로 발급할 토큰 유효기간 재설정
          ...data.dataValues, // 기존 데이터 활용
          iat: 151623391,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // refreshToekn은 상대적으로 accessToken보다 유효기간을 길게 설정해준다.
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET); // refreshToekn을 사용하여 accessToken보다을 새로 발급

        res.json({ data: { accessToken: accessToken, userInfo: data.dataValues }, message: 'ok' });
      });
    });
  }
  ```

<br>
<br>

#### 1-3. 클라이언트 구현

---

<br>
<br>

##### App

---

- `app.js` 파일의 빈 핸들러 함수들을 완성시키고, 각 컴포넌트에 적절한 `props`를 전달해준다.

  ```js
  /* 생략 */

  loginHandler(data) {  // 로그인핸들러
  	this.setState({ isLogin: true });  // 로그인 버튼 클릭시 isLogin 상태 값을 true로 바꾸어준다.
  	this.issueAccessToken(data.data.accessToken);  // 응답 결과로 받은 accessToken을 issueAccessToken 함수로 전달한다.
  }

  issueAccessToken(token) {
  	this.setState({ accessToken: token });  // 전달받은 acessToken 상태 값으로 바꿔준다.
  }

  render() {
  	const { isLogin } = this.state;
  	return (
  		<div className='App'>
  			{/*
  			TODO: isLogin 상태에 따라 Mypage 혹은 Login 컴포넌트를 렌더해야합니다.
  			알맞은 컴포넌트를 렌더링하는것은 물론, 올바른 props전달하도록 작성하세요.
  			*/
  			isLogin ? (  // isLogin 3항연산자를 사용하여 상태에 따라 다른 컴포넌트를 렌더한다.
  				<Mypage accessToken={this.state.accessToken} issueAccessToken={this.issueAccessToken} />
  			) : (
  				<Login loginHandler={this.loginHandler} />
  			)}
  		</div>
  	);
  }
  ```

<br>
<br>

##### Login

---

- `components/Login.js` Login 컴포넌트의 `loginRequestHandler`메소드를 사용하여 상위 컴포넌트인 App 컴포넌트의 state를 적절히 변경해 준다. (상태 끌어올림)

  ```js
  loginRequestHandler() {
  	/*
  	TODO: Login 컴포넌트가 가지고 있는 state를 이용해 로그인을 구현합니다.
  	로그인을 담당하는 api endpoint에 요청을 보내고, 받은 데이터로 상위 컴포넌트 App의 state를 변경하세요.
  	초기 App:
  	state = { isLogin: false, accessToken: "" }
  	로그인 요청 후 App:
  	state = { isLogin: true, accessToken: 서버에_요청하여_받은_access_token }
  	*/

  	const { userId, password } = this.state;

    /* 서버 Login endpoint에 요청을 보낸다. 요청 옵션에 인증서 사용옵션과 json객체 형태로 데이터를 받는 옵션값 설정 */
  	axios.post("https://localhost:4000/login",{ userId, password }, { headers: { "Content-Type": "application/json" }, withCredentials: true })
  	.then((data) => {
  		this.props.loginHandler(data.data);  // props로 전달받은 데이터로 App.js의 상태값을 변경해준다.
  	});
  }
  ```

<br>
<br>

##### Mypage

---

- `components/Mypage.js` Mypage 컴포넌트의 빈 부분을 완성시켜준다.

  ```js
  accessTokenRequest() {
    /*
    TODO: 상위 컴포넌트인 App에서 받은 props를 이용해 accessTokenRequest 메소드를 구현합니다.
    access token을 처리할 수 있는 api endpoint에 요청을 보내고, 받은 데이터로 Mypage 컴포넌트의 state (userId, email, createdAt)를 변경하세요
    초기 Mypage:
    state = { userId: "", email: "", createdAt: "" }
    accessTokenRequest 후 Mypage:
    state = { userId: "특정유저id", email: "특정유저email", created: "특정유저createdAt" }
    ** 주의사항 **
    App 컴포넌트에서 내려받은 accessToken props를 authorization header에 담아 요청을 보내야 합니다.
    */

    axios.get("https://localhost:4000/accesstokenrequest", {
      headers: {
  		  Authorization: `Bearer ${this.props.accessToken}`,  // App 컴포넌트에서 내려받은 accessToken props를 authorization header에 담아 요청전달
        "Content-Type": "application/json",  // json 객체 형태로 데이터를 취급 선언
      },
      withCredentials: true
    })
    .then((data) => {
      if (data.data.message !== "ok") {  // 서버의 응답 메시지 확인
        const message ="refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다.";
        return this.setState({ email: message, createdAt: message });
      }
      const { createdAt, userId, email } = data.data.data.userInfo;
      this.setState({ userId, createdAt, email });
    });
  }

  refreshTokenRequest() {
    /*
    TODO: 쿠키에 담겨져 있는 refreshToken을 이용하여 refreshTokenRequest 메소드를 구현합니다.
    refresh token을 처리할 수 있는 api endpoint에 요청을 보내고, 받은 데이터로 2가지를 구현합니다.
    1. Mypage 컴포넌트의 state(userId, email, createdAt)를 변경
    2. 상위 컴포넌트 App의 state에 accessToken을 받은 새 토큰으로 교환
    */

    axios.get("https://localhost:4000/refreshtokenrequest", {
        withCredentials: true,
      })
      .then((data) => {
        if (data.data.message !== "ok") {
          const message =
            "refresh token이 만료되어 불러올 수 없습니다. 다시 로그인 해주시기 바랍니다.";
          return this.setState({ email: message, createdAt: message });
        }
        const { createdAt, userId, email } = data.data.data.userInfo;
        this.setState({ userId, createdAt, email });
        this.props.issueAccessToken(data.data.data.accessToken);
      });
  }
  ```

<br>
<br>

#### 1-4. 결과 확인

---

refreshToken은 쿠키에 담겨(암호화 되어서) 주고받는 걸 알 수 있으며, 클라이언트에서 서버로 보낸 accessToken이 유효한 토큰일 경우 `jwt.veryfy`로 해독된 결과값이 응답 결과로 반환되어 클라이언트에서 해독된 결과 값을 볼 수 있게 되는 구조이다.

- 쿠키를 확인해보면 refreshToken값(비밀키값을 사용하여 암호화된..) 을 확인 할 수 있다.

  ![스크린샷, 2021-11-25 17-59-34](https://user-images.githubusercontent.com/83164003/143411901-74544579-8273-4561-bed9-034e28d1f6e1.png)

- chrome의 네트워크 결과값을 보면 클라이언트에서 보낸 accessToken 요청이 유효한 경우 서버에서 반환된 해독된 payload 값을 확인 할 수 있다.

  ![스크린샷, 2021-11-25 18-00-20](https://user-images.githubusercontent.com/83164003/143412108-7b5de28c-c071-4c49-8c28-74bfcbcd6cd2.png)

<br>
<br>

## 🤔 Understanding

---

- 이제 HTTPS 로그인 로직 개념이 잡힌다.. ~~어렵다 어려워~~

- axios 아직 미숙하다.. 스프린트는 끝났지만 공부할게 더 많이 남았다... 내일 oauth 인증 / 보안 방식까지 열심히 해야지

<br>
<br>

```toc

```
