---
emoji: ๐
title: Token
date: '2021-10-21'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## โ๏ธ **T**oday **I** **L**earned

---

<br>

### 1. Token

---

- ์์  ์ธ์ ์ธ์ฆ ๋ฐฉ์์ ์๋ฒ(ํน์ DB)์ ์ ์  ์ ๋ณด๋ฅผ ๋ด๋ ์ธ์ฆ ๋ฐฉ์์ด์๋ค.

  ๋งค ์์ฒญ๋ง๋ค ๋ฐ์ดํฐ๋ฒ ์ด์ค๋ฅผ ์ดํด๋ณด๋ ๊ฒ์ด ๋ถํธํ๊ณ , ์ด ๋ถ๋ด์ ์๋ฒ์ ๊ณผ๋ถํ๋ฅผ ์ด๋ํ  ์ ์๋ค.<br>
  ๋ถํ๋ฅผ ์ค์ด๊ธฐ ์ํด ์ธ์ฆ ๋ฐฉ์์ ํ ํฐ ์ธ์ฆ ๋ฐฉ์์ ์ฌ์ฉํด๋ณด์.

- ํ ํฐ ์ธ์ฆ ๋ฐฉ์์ ์ธ์ฆ ์ ์ฐจ๋ ์๋ ๊ทธ๋ฆผ๊ณผ ๊ฐ๋ค

  ![token](https://user-images.githubusercontent.com/83164003/143394269-b9b52b26-722d-44ec-8189-2c9ac64b92b0.jpg)

<br>
<br>

#### 1-1. ์ฌ์  ์ค๋น

---

- **Part1-Session**์ <a href="https://blog.jh8459.com/2021-10-20-TIL-2/#1-1-%EC%82%AC%EC%A0%84-%EC%A4%80%EB%B9%84" target="_blank">์ค๋น๋จ๊ณ</a>์ ๋์ผํ ์งํ์ ์๋ตํ์๋ค.
- **ACCESS_SECRET**์ **REFRESH_SECRET** ๋ณ์๋ช์ผ๋ก 2๊ฐ์ง์ JWT(Json Web Token)์ ์ฌ์ฉํ๋ค.

  accessToken์ ๋ณดํธ๋ ์ ๋ณด๋ค(์ ์ ์ ์ด๋ฉ์ผ, ์ฐ๋ฝ์ฒ, ์ฌ์ง ๋ฑ)์ ์ ๊ทผํ  ์ ์๋ ๊ถํ๋ถ์ฌ์ ์ฌ์ฉ๋๋ค. ํด๋ผ์ด์ธํธ๊ฐ ์ฒ์ ์ธ์ฆ์ ๋ฐ๊ฒ ๋  ๋(๋ก๊ทธ์ธ ์), accessToken,refreshToken ๋ ๊ฐ์ง๋ฅผ ๋ค ๋ฐ์ง๋ง, ์ค์ ๋ก ๊ถํ์ ์ป๋ ๋ฐ ์ฌ์ฉํ๋ ํ ํฐ์ accessToken์ด๋ค.

  accessToken๋ง ์กด์ฌํ๋ค๋ฉด, ํด์ปค๋ ์์์ ์ธ ์ ์ ์๊ฒ ํ์ทจ๋นํ  ๊ฒฝ์ฐ ๋ณด์์ด ์ฐ๋ ค๋๋ฏ๋ก accessToken์ ์ ํจ๊ธฐ๊ฐ์ ์งง๊ฒ ์ฃผ๊ณ (ํ์ทจ๋๋๋ผ๋ ํผํด ์ต์ํ), refreshToken์ผ๋ก ์๋ก์ด accessToken์ ๋ฐ๊ธ ๋ฐ๋ ๊ตฌ์กฐ์ด๋ค.

- ๋ค๋ฅธ ์ฌ์ฉ์๊ฐ ๋ณผ ์ ์๋๋ก `.env` ํ์ผ์ accessToken๊ณผ refreshToken ํค๊ฐ์ ๋ฃ์ด์ค๋ค(์์์ ๊ฐ์ ๋ฃ์ด์ฃผ์ด๋ ๋๋ค).

<br>
<br>

#### 1-2. ์๋ฒ ๊ตฌํ

---

- ์ฐ์  ์๋ฒ๋ HTTPS ํ๋กํ ์ฝ ๋ฐฉ์์ผ๋ก ๊ตฌํ๋๋ค. CORS ์ต์์ ๋ณด์๋ฉด,

  ```js
  app.use(
    cors({
      origin: ['https://localhost:3000'],
      credentials: true,
      methods: ['GET', 'POST', 'OPTIONS'],
    }),
  );
  ```

  3000ํฌํธ์ ํด๋ผ์ด์ธํธ๋ฅผ ์ถ์ฒ๋ก ๋ฐ์ผ๋ฉฐ, ์ธ์ฆ์๋ฅผ ์ฌ์ฉํ๋ ์ ๋ณด๋ฅผ ์ ์ ์๋ค.

  ๋ํ ์๋ฒ๋ 4000๋ฒ ํฌํธ๋ก ์ธ์ฆ์๊ฐ ์กด์ฌํ  ๋๋ง ์๋ฒ๊ฐ ๊ตฌ๋๋๋ ์ฝ๋ ๋ํ `server-token/index.js` ํ์ผ์ ํ์ธํ๋ฉด ๋ณผ ์ ์๋ค.

<br>
<br>

##### [POST] /login

---

- `controllers/login.js` ํ์ผ์ ํ์ธ ํ ๋ค์๊ณผ ๊ฐ์ ๊ธฐ๋ฅ์ ์์ฑ์์ผ์ผ ํ๋ค.

  - _request๋ก๋ถํฐ ๋ฐ์ userId, password์ ์ผ์นํ๋ ์ ์ ๊ฐ DB์ ์กด์ฌํ๋์ง ํ์ธํฉ๋๋ค._

  - _์ผ์นํ๋ ์ ์ ๊ฐ ์์ ๊ฒฝ์ฐ: ๋ก๊ทธ์ธ ์์ฒญ์ ๊ฑฐ์ ํฉ๋๋ค._

  - _์ผ์นํ๋ ์ ์ ๊ฐ ์์ ๊ฒฝ์ฐ:_

    - _ํ์ํ ๋ฐ์ดํฐ๋ฅผ ๋ด์ ๋ ์ข๋ฅ์ JWT(access, refresh)๋ฅผ ์์ฑํฉ๋๋ค._

    - _์์ฑํ JWT๋ฅผ ์ ์ ํ ๋ฐฉ๋ฒ์ผ๋ก ๋ฐํํฉ๋๋ค._

      - _access token์ ํด๋ผ์ด์ธํธ์์ react state๋ก ๋ค๋ฃจ๊ณ  ์์ต๋๋ค._

      - _refresh token์ ํด๋ผ์ด์ธํธ์ ์ฟ ํค์์ ๋ค๋ฃจ๊ณ  ์์ต๋๋ค._

  ```js
  const { userId, password } = req.body; // req.body์ ๋ด๊ธด ์ ๋ณด๋ฅผ ๊ฐ์ ธ์จ๋ค.

  Users.findOne({
    where: {
      userId: userId,
      password: password,
    },
  }).then((data) => {
    // request๋ก๋ถํฐ ๋ฐ์ userId, password์ ์ผ์นํ๋ ์ ์ ๊ฐ DB์ ์กด์ฌํ๋์ง ํ์ธ
    if (!data) {
      // 1. ์ผ์นํ๋ ์ ์ ๊ฐ ์์ ๊ฒฝ์ฐ
      res.json({ message: 'not authorized' }); // ๋ก๊ทธ์ธ ์์ฒญ์ ๊ฑฐ์ ('not authorized' ๋ฉ์ธ์ง๊ฐ ์๋ต์ ํฌํจ)
    } else {
      // 2. ์ผ์นํ๋ ์ ์ ๊ฐ ์์ ๊ฒฝ์ฐ
      // ์ผ์นํ๋ ์ ์ ๊ฐ ์์ ๊ฒฝ์ฐ: ํ์ํ ๋ฐ์ดํฐ(id, userId, email, createdAt, updatedAt)๋ฅผ payload์ ๋ด์ JWT token์ ์์ฑํ๋ค.
      const payload = {
        // payload์ ํ์ํ ๋ฐ์ดํฐ๋ฅผ ๋ด๋๋ค.
        id: data.dataValues.id,
        userId: data.dataValues.userId,
        email: data.dataValues.email,
        createdAt: data.dataValues.createdAt,
        updatedAt: data.dataValues.updatedAt,
        iat: 151623391, // ํ ํฐ๋ฐ๊ธ๋์๊ฐ.. format์ ๋ชจ๋ฅด๊ฒ ์ด์ ๋๋ฏธ๊ฐ์ ๋ฃ์๋ค.
        exp: Math.floor(Date.now() / 1000) + 60 * 60,
      };

      const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET); // access token, refresh token ์์ฑ
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET);

      res.set('Set-Cookie', [
        `refreshToken=${refreshToken}; Domain=localhost; Path=/; Secure; HttpOnly; SameSite=None;`,
      ]); // refresh token์ ์ฟ ํค์ ๋ด์ ๋ณด๋ผ ๋ sameSite, secure, httpOnly ์ต์์ ์๋ง๊ฒ ์ค์ 
      res.json({ data: { accessToken: accessToken }, message: 'ok' }); // ํด๋ผ์ด์ธํธ์์ accessToken์ ์คํ์ดํธ๋ก ๋ค๋ค์ง๊ธฐ๋๋ฌธ์ ์๋ต๊ฒฐ๊ณผ์ ๋ด์ ๋ฐํํ๋ค.
    }
  });
  ```

<br>
<br>

##### [GET] /accesstokenrequest

---

- `controllers/accesstokenrequest.js`์์๋ authorization header์ ๋ด๊ธด ํ ํฐ์ด ์๋ฒ์์ ์์ฑํ JWT์ธ์ง ํ์ธํ, ์๋ฒ์์ ์์ฑํ ์ ํจํ ํ ํฐ์ผ ๊ฒฝ์ฐ์ ์ ํจํ์ง ์์ ํ ํฐ์ผ ๊ฒฝ์ฐ ๊ฐ๊ฐ ๋ค๋ฅธ ์๋ต์ ๋ฐํ ํด์ผํ๋ค.

  ```js
  const authorization = req.headers['authorization']; // authorization header์ ๋ด๊ธด ํ ํฐ์ ๋ณ์์ ์ ์ฅ

  /* authorization header์ ๋ด๊ธด access token์ด ์ ํจํ์ง ๊ฒ์ฌ */
  if (!authorization) {
    // ์ ํจํ์ง ์๋ ๊ฒฝ์ฐ: ํด๋ผ์ด์ธํธ์ ์๋์ ๊ฐ์ JSON ๊ฐ์ฒด๋ฅผ ๋ฐํํ๋ค.
    res.json({ data: null, message: 'invalid access token' });
  } else {
    const token = authorization.split(' ')[1]; // Bearer token ํ์์ด๋ฏ๋ก .split(' ')[1];

    jwt.verify(token, process.env.ACCESS_SECRET, (err, data) => {
      Users.findOne({
        // JWT๋ฅผ ํด๋ํ์ฌ ์ป์ payload์์ ๊ฐ์ผ๋ก DB์ ์ ์ ๋ฅผ ์กฐํ
        where: {
          // payload์ password๊ฐ ์๋ด๊ฒจ์์ผ๋ฏ๋ก, ๋ค๋ฅธ ์์ฑ์ผ๋ก ์ ์ ๋ฅผ ์กฐํํ๋ค.
          id: data.id,
          userId: data.userId,
          email: data.email,
        },
      }).then((data) => {
        delete data.dataValues.password; // ๋ชจ๋  ๋ฐ์ดํฐ๊ฐ ๋ด๊ฒจ์๋ค๋ณด๋, ๋ฏผ๊ฐํ ์ ๋ณด์ธ pasword๋ ์ญ์ ํ๋ค.
        res.json({ data: { userInfo: data.dataValues }, message: 'ok' }); // ํด๋ผ์ด์ธํธ์์ userInfo(password๋ ์ ์ธ)๋ฅผ ๋ณด์ฌ์ค์ผ ํ๋ฏ๋ก ์๋ต ๊ฒฐ๊ณผ์ ๋ด์ ๋ฐํํ๋ค.
      });
    });
  }
  ```

<br>
<br>

##### [GET] /refreshtokenrequest

---

- `controllers/refreshtokenrequest`์์๋ ์์ฒญ์ ๋ด๊ธด refresh token์ด ์ ํจํ๋ค๋ฉด ์๋ก์ด access token์ ๋ฐ๊ธํด ์ค๊ณผ ๋์์ ์ ์ ๊ฐ ์์ฒญํ ์ ๋ณด๋ฅผ ๋ฐํํด์ค์ผํ๋ฉฐ ์์ฒญ์ ๋ด๊ธด refresh token์ด ์ ํจํ์ง ์๊ฑฐ๋, ์กฐ์๋ ํ ํฐ์ผ ๊ฒฝ์ฐ ๊ฐ๊ฐ ๋ค๋ฅธ ์๋ต์ ๋ฐํํด์ผ ํ๋ค.

  ```js
  const refreshToken = req.cookies.refreshToken; // cookie์ ๋ด๊ฒจ์๋ refreshToken์ ๋ณ์์ ๋ด๋๋ค.

  /* cookie์ ๋ด๊ธด refreshToken์ด ์ ํจํ์ง ๊ฒ์ฌ. */
  if (!refreshToken) {
    // ํ ํฐ์ด ๋ด๊ฒจ์์ง ์๋ค๋ฉด ์๋์ ๊ฐ์ JSON ๊ฐ์ฒด๋ฅผ ๋ฐํํ๋ค.
    res.json({ data: null, message: 'refresh token not provided' });
  } else {
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, data) => {
      // refreshToken์์ด ์๋ฒ๊ฐ ๊ฐ์ง REFRESH_SECRET ์ผ๋ก ์์ฑ๋ ๊ฒ์ธ์ง ํ์ธ
      if (err) {
        // ํด๋ํ ํ ํฐ์ด ์ ํจํ์ง ์๊ฑฐ๋, ํด๋์ด ๋ถ๊ฐํ ํ ํฐ์ด๋ผ๋ฉด ์๋์ ๊ฐ์ JSON ๊ฐ์ฒด๋ฅผ ๋ฐํ
        res.status(200).json({ data: null, message: 'invalid refresh token, please log in again' });
      }

      Users.findOne({
        // JWT๋ฅผ ํด๋ํ์ฌ ์ป์ payload์์ ๊ฐ์ผ๋ก DB์ ์ ์ ๋ฅผ ์กฐํ
        where: {
          id: data.id, // data์๋ JWT๋ฅผ ํด๋ํ ๊ฒฐ๊ณผ๊ฐ์ด ๋ด๊ฒจ ์๋ค
          userId: data.userId,
          email: data.email,
        },
      }).then((data) => {
        // playload์์ ๊ฐ๊ณผ DB์ ์ผ์น๋ ์ ์ ์ ๋ณด๊ฐ ๋ฐํ์ด ๋๋ค.
        delete data.dataValues.password; // ๋ฏผ๊ฐ์ ๋ณด ์ญ์ 

        const payload = {
          // ์๋ก ๋ฐ๊ธํ  ํ ํฐ ์ ํจ๊ธฐ๊ฐ ์ฌ์ค์ 
          ...data.dataValues, // ๊ธฐ์กด ๋ฐ์ดํฐ ํ์ฉ
          iat: 151623391,
          exp: Math.floor(Date.now() / 1000) + 60 * 60, // refreshToekn์ ์๋์ ์ผ๋ก accessToken๋ณด๋ค ์ ํจ๊ธฐ๊ฐ์ ๊ธธ๊ฒ ์ค์ ํด์ค๋ค.
        };

        const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET); // refreshToekn์ ์ฌ์ฉํ์ฌ accessToken๋ณด๋ค์ ์๋ก ๋ฐ๊ธ

        res.json({ data: { accessToken: accessToken, userInfo: data.dataValues }, message: 'ok' });
      });
    });
  }
  ```

<br>
<br>

#### 1-3. ํด๋ผ์ด์ธํธ ๊ตฌํ

---

<br>
<br>

##### App

---

- `app.js` ํ์ผ์ ๋น ํธ๋ค๋ฌ ํจ์๋ค์ ์์ฑ์ํค๊ณ , ๊ฐ ์ปดํฌ๋ํธ์ ์ ์ ํ `props`๋ฅผ ์ ๋ฌํด์ค๋ค.

  ```js
  /* ์๋ต */

  loginHandler(data) {  // ๋ก๊ทธ์ธํธ๋ค๋ฌ
  	this.setState({ isLogin: true });  // ๋ก๊ทธ์ธ ๋ฒํผ ํด๋ฆญ์ isLogin ์ํ ๊ฐ์ true๋ก ๋ฐ๊พธ์ด์ค๋ค.
  	this.issueAccessToken(data.data.accessToken);  // ์๋ต ๊ฒฐ๊ณผ๋ก ๋ฐ์ accessToken์ issueAccessToken ํจ์๋ก ์ ๋ฌํ๋ค.
  }

  issueAccessToken(token) {
  	this.setState({ accessToken: token });  // ์ ๋ฌ๋ฐ์ acessToken ์ํ ๊ฐ์ผ๋ก ๋ฐ๊ฟ์ค๋ค.
  }

  render() {
  	const { isLogin } = this.state;
  	return (
  		<div className='App'>
  			{/*
  			TODO: isLogin ์ํ์ ๋ฐ๋ผ Mypage ํน์ Login ์ปดํฌ๋ํธ๋ฅผ ๋ ๋ํด์ผํฉ๋๋ค.
  			์๋ง์ ์ปดํฌ๋ํธ๋ฅผ ๋ ๋๋งํ๋๊ฒ์ ๋ฌผ๋ก , ์ฌ๋ฐ๋ฅธ props์ ๋ฌํ๋๋ก ์์ฑํ์ธ์.
  			*/
  			isLogin ? (  // isLogin 3ํญ์ฐ์ฐ์๋ฅผ ์ฌ์ฉํ์ฌ ์ํ์ ๋ฐ๋ผ ๋ค๋ฅธ ์ปดํฌ๋ํธ๋ฅผ ๋ ๋ํ๋ค.
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

- `components/Login.js` Login ์ปดํฌ๋ํธ์ `loginRequestHandler`๋ฉ์๋๋ฅผ ์ฌ์ฉํ์ฌ ์์ ์ปดํฌ๋ํธ์ธ App ์ปดํฌ๋ํธ์ state๋ฅผ ์ ์ ํ ๋ณ๊ฒฝํด ์ค๋ค. (์ํ ๋์ด์ฌ๋ฆผ)

  ```js
  loginRequestHandler() {
  	/*
  	TODO: Login ์ปดํฌ๋ํธ๊ฐ ๊ฐ์ง๊ณ  ์๋ state๋ฅผ ์ด์ฉํด ๋ก๊ทธ์ธ์ ๊ตฌํํฉ๋๋ค.
  	๋ก๊ทธ์ธ์ ๋ด๋นํ๋ api endpoint์ ์์ฒญ์ ๋ณด๋ด๊ณ , ๋ฐ์ ๋ฐ์ดํฐ๋ก ์์ ์ปดํฌ๋ํธ App์ state๋ฅผ ๋ณ๊ฒฝํ์ธ์.
  	์ด๊ธฐ App:
  	state = { isLogin: false, accessToken: "" }
  	๋ก๊ทธ์ธ ์์ฒญ ํ App:
  	state = { isLogin: true, accessToken: ์๋ฒ์_์์ฒญํ์ฌ_๋ฐ์_access_token }
  	*/

  	const { userId, password } = this.state;

    /* ์๋ฒ Login endpoint์ ์์ฒญ์ ๋ณด๋ธ๋ค. ์์ฒญ ์ต์์ ์ธ์ฆ์ ์ฌ์ฉ์ต์๊ณผ json๊ฐ์ฒด ํํ๋ก ๋ฐ์ดํฐ๋ฅผ ๋ฐ๋ ์ต์๊ฐ ์ค์  */
  	axios.post("https://localhost:4000/login",{ userId, password }, { headers: { "Content-Type": "application/json" }, withCredentials: true })
  	.then((data) => {
  		this.props.loginHandler(data.data);  // props๋ก ์ ๋ฌ๋ฐ์ ๋ฐ์ดํฐ๋ก App.js์ ์ํ๊ฐ์ ๋ณ๊ฒฝํด์ค๋ค.
  	});
  }
  ```

<br>
<br>

##### Mypage

---

- `components/Mypage.js` Mypage ์ปดํฌ๋ํธ์ ๋น ๋ถ๋ถ์ ์์ฑ์์ผ์ค๋ค.

  ```js
  accessTokenRequest() {
    /*
    TODO: ์์ ์ปดํฌ๋ํธ์ธ App์์ ๋ฐ์ props๋ฅผ ์ด์ฉํด accessTokenRequest ๋ฉ์๋๋ฅผ ๊ตฌํํฉ๋๋ค.
    access token์ ์ฒ๋ฆฌํ  ์ ์๋ api endpoint์ ์์ฒญ์ ๋ณด๋ด๊ณ , ๋ฐ์ ๋ฐ์ดํฐ๋ก Mypage ์ปดํฌ๋ํธ์ state (userId, email, createdAt)๋ฅผ ๋ณ๊ฒฝํ์ธ์
    ์ด๊ธฐ Mypage:
    state = { userId: "", email: "", createdAt: "" }
    accessTokenRequest ํ Mypage:
    state = { userId: "ํน์ ์ ์ id", email: "ํน์ ์ ์ email", created: "ํน์ ์ ์ createdAt" }
    ** ์ฃผ์์ฌํญ **
    App ์ปดํฌ๋ํธ์์ ๋ด๋ ค๋ฐ์ accessToken props๋ฅผ authorization header์ ๋ด์ ์์ฒญ์ ๋ณด๋ด์ผ ํฉ๋๋ค.
    */

    axios.get("https://localhost:4000/accesstokenrequest", {
      headers: {
  		  Authorization: `Bearer ${this.props.accessToken}`,  // App ์ปดํฌ๋ํธ์์ ๋ด๋ ค๋ฐ์ accessToken props๋ฅผ authorization header์ ๋ด์ ์์ฒญ์ ๋ฌ
        "Content-Type": "application/json",  // json ๊ฐ์ฒด ํํ๋ก ๋ฐ์ดํฐ๋ฅผ ์ทจ๊ธ ์ ์ธ
      },
      withCredentials: true
    })
    .then((data) => {
      if (data.data.message !== "ok") {  // ์๋ฒ์ ์๋ต ๋ฉ์์ง ํ์ธ
        const message ="refresh token์ด ๋ง๋ฃ๋์ด ๋ถ๋ฌ์ฌ ์ ์์ต๋๋ค. ๋ค์ ๋ก๊ทธ์ธ ํด์ฃผ์๊ธฐ ๋ฐ๋๋๋ค.";
        return this.setState({ email: message, createdAt: message });
      }
      const { createdAt, userId, email } = data.data.data.userInfo;
      this.setState({ userId, createdAt, email });
    });
  }

  refreshTokenRequest() {
    /*
    TODO: ์ฟ ํค์ ๋ด๊ฒจ์ ธ ์๋ refreshToken์ ์ด์ฉํ์ฌ refreshTokenRequest ๋ฉ์๋๋ฅผ ๊ตฌํํฉ๋๋ค.
    refresh token์ ์ฒ๋ฆฌํ  ์ ์๋ api endpoint์ ์์ฒญ์ ๋ณด๋ด๊ณ , ๋ฐ์ ๋ฐ์ดํฐ๋ก 2๊ฐ์ง๋ฅผ ๊ตฌํํฉ๋๋ค.
    1. Mypage ์ปดํฌ๋ํธ์ state(userId, email, createdAt)๋ฅผ ๋ณ๊ฒฝ
    2. ์์ ์ปดํฌ๋ํธ App์ state์ accessToken์ ๋ฐ์ ์ ํ ํฐ์ผ๋ก ๊ตํ
    */

    axios.get("https://localhost:4000/refreshtokenrequest", {
        withCredentials: true,
      })
      .then((data) => {
        if (data.data.message !== "ok") {
          const message =
            "refresh token์ด ๋ง๋ฃ๋์ด ๋ถ๋ฌ์ฌ ์ ์์ต๋๋ค. ๋ค์ ๋ก๊ทธ์ธ ํด์ฃผ์๊ธฐ ๋ฐ๋๋๋ค.";
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

#### 1-4. ๊ฒฐ๊ณผ ํ์ธ

---

refreshToken์ ์ฟ ํค์ ๋ด๊ฒจ(์ํธํ ๋์ด์) ์ฃผ๊ณ ๋ฐ๋ ๊ฑธ ์ ์ ์์ผ๋ฉฐ, ํด๋ผ์ด์ธํธ์์ ์๋ฒ๋ก ๋ณด๋ธ accessToken์ด ์ ํจํ ํ ํฐ์ผ ๊ฒฝ์ฐ `jwt.veryfy`๋ก ํด๋๋ ๊ฒฐ๊ณผ๊ฐ์ด ์๋ต ๊ฒฐ๊ณผ๋ก ๋ฐํ๋์ด ํด๋ผ์ด์ธํธ์์ ํด๋๋ ๊ฒฐ๊ณผ ๊ฐ์ ๋ณผ ์ ์๊ฒ ๋๋ ๊ตฌ์กฐ์ด๋ค.

- ์ฟ ํค๋ฅผ ํ์ธํด๋ณด๋ฉด refreshToken๊ฐ(๋น๋ฐํค๊ฐ์ ์ฌ์ฉํ์ฌ ์ํธํ๋..) ์ ํ์ธ ํ  ์ ์๋ค.

  ![์คํฌ๋ฆฐ์ท, 2021-11-25 17-59-34](https://user-images.githubusercontent.com/83164003/143411901-74544579-8273-4561-bed9-034e28d1f6e1.png)

- chrome์ ๋คํธ์ํฌ ๊ฒฐ๊ณผ๊ฐ์ ๋ณด๋ฉด ํด๋ผ์ด์ธํธ์์ ๋ณด๋ธ accessToken ์์ฒญ์ด ์ ํจํ ๊ฒฝ์ฐ ์๋ฒ์์ ๋ฐํ๋ ํด๋๋ payload ๊ฐ์ ํ์ธ ํ  ์ ์๋ค.

  ![์คํฌ๋ฆฐ์ท, 2021-11-25 18-00-20](https://user-images.githubusercontent.com/83164003/143412108-7b5de28c-c071-4c49-8c28-74bfcbcd6cd2.png)

<br>
<br>

## ๐ค Understanding

---

- ์ด์  HTTPS ๋ก๊ทธ์ธ ๋ก์ง ๊ฐ๋์ด ์กํ๋ค.. ~~์ด๋ ต๋ค ์ด๋ ค์~~

- axios ์์ง ๋ฏธ์ํ๋ค.. ์คํ๋ฆฐํธ๋ ๋๋ฌ์ง๋ง ๊ณต๋ถํ ๊ฒ ๋ ๋ง์ด ๋จ์๋ค... ๋ด์ผ oauth ์ธ์ฆ / ๋ณด์ ๋ฐฉ์๊น์ง ์ด์ฌํ ํด์ผ์ง

<br>
<br>

```toc

```
