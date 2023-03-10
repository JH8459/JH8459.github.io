---
emoji: ๐
title: OAuth
date: '2021-10-22'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## โ๏ธ **T**oday **I** **L**earned

---

<br>

### 1. OAuth

---

- OAuth๋ ์ธ์ฆ์ ์ค๊ฐํด ์ฃผ๋ ๋ฉ์ปค๋์ฆ์ด๋ค.

- ์ด๋ฏธ ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ๊ฐ์ง๊ณ  ์๋ ์น ์๋น์ค(GitHub, google, facebook ๋ฑ)์์ ์ฌ์ฉ์์ ์ธ์ฆ์ ๋์ ํด ์ฃผ๊ณ , ์ ๊ทผ ๊ถํ์ ๋ํ ํ ํฐ์ ๋ฐ๊ธํ ํ, ์ด๋ฅผ ์ด์ฉํด ๋ด ์๋ฒ์์ ์ธ์ฆ์ด ๊ฐ๋ฅํ๊ฒ๋ ๊ตฌํํด์ผํ๋ค.

<br>
<br>

#### 1-1. ์ฌ์  ์ค๋น

---

- OAuth 2.0 ๋ฌธ์๋ฅผ ์ฐธ์กฐํ์ฌ <a href="https://www.oauth.com/oauth2-servers/accessing-data/create-an-application/">GitHub์ ๋ด ์ฑ ๋ฑ๋ก</a>์ ํด์ผํ๋ค.

- ๋ด ์ฑ ๋ฑ๋ก์ ๋๋ธ ๋ค, GitHub App์์ ์ ๊ณตํ๋ Client ID ๋ฐ Client Secret์ ์ ๋ณด๋ฅผ ์๋ฒ์์ ์ ๊ทผํ๊ธฐ ์ํด `.env` ํ์ผ์ ํ๊ฒฝ๋ณ์๋ฅผ ๋ฑ๋กํด ์ฃผ์.(Client Secret์ Github ๊ณ์  ๋ณด์์ ์ํด ํ์ธ์๊ฒ ์๋ ค์ง๋ฉด ์๋๋ฏ๋ก `.env` ํ์ผ ๋ด๋ถ์์ ๊ด๋ฆฌํด์ค์ผ ํ๋ค.)

<br>
<br>

#### 1-2. ์๋ฒ ๊ตฌํ

---

<br>
<br>

##### oauth/access_token

---

- ์ธ์ฆ์ ์น ์๋น์ค(Github)์์ ์ฒ๋ฆฌํ๋ฏ๋ก, ์ธ์ฆ์๊ฐ ๋ฐ๋ก ํ์ํ์ง๊ฐ ์๋ค. ์ฐ๋ฆฌ๊ฐ ๊ตฌํํด์ผ ํ  ์๋ฒ๋ Github ์น์ ์ ๊ทผํ์ฌ authorization code๋ฅผ ์ด์ฉํด access token์ ๋ฐ๊ธ๋ฐ๊ธฐ ์ํ post ์์ฒญ์ ํด์ฃผ์ด์ผ ํ๋ค.

  ```js
  // req์ body๋ก authorization code๊ฐ ๋ค์ด์ต๋๋ค. console.log๋ฅผ ํตํด ์๋ฒ์ ํฐ๋ฏธ๋์ฐฝ์์ ํ์ธํด๋ณด์ธ์!
  // console.log(req.body);

  // TODO : ์ด์  authorization code๋ฅผ ์ด์ฉํด access token์ ๋ฐ๊ธ๋ฐ๊ธฐ ์ํ post ์์ฒญ์ ๋ณด๋๋๋ค. ๋ค์ ๋งํฌ๋ฅผ ์ฐธ๊ณ ํ์ธ์.
  // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github

  axios.post('https://github.com/login/oauth/access_token',
    { client_id: clientID, client_secret: clientSecret, code : req.body.authorizationCode },
  	{ headers: { accept: 'application/json'}}
  )
  .then((data)=>{
  	res.status(200).json({accessToken : data.data.access_token});
  ```

- accessToken ์์ฑ์ ์ฐ๋ฆฌ๊ฐ ๊ตฌํํ  ์๋ฒ์์ ํ๋ ๊ฒ์ด ์๋๋ผ OAuth์์ ๋์  ํด์ฃผ๊ณ  ์๊ธฐ๋๋ฌธ์ authorization code๋ฅผ ์ด์ฉํด์ Github App api endpoint๋ก post ์์ฒญ์ ๋ณด๋ด์ค๋ค.

<br>
<br>

#### 1-3. ํด๋ผ์ด์ธํธ ๊ตฌํ

---

<br>
<br>

##### Login

---

- `components/Login.js`์์ ํ  ์ผ์ Github App์ ์์ฒญ์ ๋ณด๋ด Authorization code๋ฅผ ๋ฐ์์ค๋ ์ผ์ด๋ค.

  ```js
  // TODO: GitHub๋ก๋ถํฐ ์ฌ์ฉ์ ์ธ์ฆ์ ์ํด GitHub๋ก ์ด๋ํด์ผ ํฉ๋๋ค. ์ ์ ํ URL์ ์๋ ฅํ์ธ์.
  // OAuth ์ธ์ฆ์ด ์๋ฃ๋๋ฉด authorization code์ ํจ๊ป callback url๋ก ๋ฆฌ๋๋ ์ ํฉ๋๋ค.
  // ์ฐธ๊ณ : https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps

  this.GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${client๊ฐ ๋ค์ด๊ฐ๋ค.}`
  ```

<br>
<br>

##### App

---

- **Login** ์ปดํฌ๋ํธ์์ Github App์ ์ ์ํ์ฌ ์ธ์ฆ ํ Authorization code๋ฅผ ๋ฐ์์๋ค๋ฉด ํด๋น ์ฝ๋๋ฅผ server(server > index.js)์ ์ ๋ฌํด accessToken์ ๋ฐ์์์ผ ํ๋ค.

  ๋ฐ์์จ accessToken์ App ์ปดํฌ๋ํธ์ state์ ์ ์ฅํ ํ, Mypage ์ปดํฌ๋ํธ์์ props๋ก ๋ด๋ ค๋ฐ์ ํ์ฉํด์ผ ํ๋ค.

  ```js
  /* ์๋ต */

  constructor() {
  	super();
  	this.state = {
  		isLogin: false,
  		// TODO:
  		accessToken: '',  // ๋ฐ์์จ accessToken์ state์ ์ ์ฅํด์ผ ํ๋ค.
  	};
  	this.getAccessToken = this.getAccessToken.bind(this);
  }

  async getAccessToken(authorizationCode) {
  	// ๋ฐ์์จ authorization code๋ก ๋ค์ OAuth App์ ์์ฒญํด์ access token์ ๋ฐ์ ์ ์์ต๋๋ค.
  	// access token์ ๋ณด์ ์ ์ง๊ฐ ํ์ํ๊ธฐ ๋๋ฌธ์ ํด๋ผ์ด์ธํธ์์ ์ง์  OAuth App์ ์์ฒญ์ ํ๋ ๋ฐฉ๋ฒ์ ๋ณด์์ ์ทจ์ฝํ  ์ ์์ต๋๋ค.
  	// authorization code๋ฅผ ์๋ฒ๋ก ๋ณด๋ด์ฃผ๊ณ  ์๋ฒ์์ access token ์์ฒญ์ ํ๋ ๊ฒ์ด ์ ์ ํฉ๋๋ค.
  	// TODO: ์๋ฒ์ /callback ์๋ํฌ์ธํธ๋ก authorization code๋ฅผ ๋ณด๋ด์ฃผ๊ณ  access token์ ๋ฐ์์ต๋๋ค.
  	// access token์ ๋ฐ์์จ ํ
  	//  - ๋ก๊ทธ์ธ ์ํ๋ฅผ true๋ก ๋ณ๊ฒฝํ๊ณ ,
  	//  - state์ access token์ ์ ์ฅํ์ธ์

  	const data = await axios.post('http://localhost:8080/callback', { authorizationCode: authorizationCode });  // ํด๋ผ์ด์ธํธ -> ์๋ฒ๋ก authorization code๋ฅผ ๋ณด๋ด์ค ๋ค ์๋ฒ์์ Github App์ผ๋ก ์์ฒญ์ ํ๋ค.

  	this.setState({
  		isLogin: true,
  		accessToken: data.data.accessToken  // ๋ฐ์์จ accessToken์ App ์ปดํฌ๋ํธ์ state์ ์ ์ฅํ๋ค.
  	});
  }
  ```

<br>
<br>

##### Mypage

---

- ๋ฐ์์จ accessToken์ผ๋ก ๋ฆฌ์์ค์ ๋ํ API ์์ฒญ์ ํ  ์ ์๋ค.

  accessToken์ ์ ๋ฌํ๋ ๋ฐฉ์์ ์์ ํ ํฐ์์ ๋ฐฐ์ ๋ Bearer Token ์ headers์ ๋ด์ ์ฃผ์ด ์ ๋ฌํ๋ค.

  ```js
  constructor(props) {
  	super(props);
  	this.state = {
  		images: [],
  		// TODO: GitHub API ๋ฅผ ํตํด์ ๋ฐ์์ฌ ์ ์๋ ์ ๋ณด๋ค ์ค์์
  		// ์ด๋ฆ, login ์์ด๋, repository ์ฃผ์, public repositoty ๊ฐ์๋ฅผ ํฌํจํ ๋ค์ํ ์ ๋ณด๋ค์ ๋ด์์ฃผ์ธ์.
  		name: '',
  		login: '',
  		html_url: '',
  		public_repos: null
  	}
  }

  async getGitHubUserInfo() {
  	// TODO: GitHub API๋ฅผ ํตํด ์ฌ์ฉ์ ์ ๋ณด๋ฅผ ๋ฐ์์ค์ธ์.
  	// https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user

  	const data = await axios.get('https://api.github.com/user', {
  		headers: {
  			authorization: `token ${this.props.accessToken}`  // token์ด ํ์ํ API ์์ฒญ ์ header authorization token ๋ด์์ ๋ณด๋ด๊ธฐ
  		}
  	});

  	this.setState({  // Github API๋ฅผ ํตํด ๋ฐ์์จ ์ ๋ณด ๊ฐฑ์ 
  		name: data.data.name,
  		login: data.data.login,
  		html_url: data.data.html_url,
  		public_repos: data.data.public_repos
  	})
  }
  ```

<br>
<br>

#### 1-4. ๊ฒฐ๊ณผ ํ์ธ

---

![github](https://user-images.githubusercontent.com/83164003/143469590-68559aac-415b-47e6-b1dc-01e4fef06b4d.gif)

1. ํด๋ผ์ด์ธํธ์ Login ์ปดํฌ๋ํธ๋ฅผ ํตํ์ฌ Github์ ๋ก๊ทธ์ธ ํ์ฌ authorization code๋ฅผ ๋ฐ์ ์จ ๋ค, App ์ปดํฌ๋ํธ๋ฅผ ํตํด์ ์๋ฒ `controller/callback.js`๋ก authorization code๋ฅผ ์ ๋ฌํด ์ค๋ค.

2. ์๋ฒ์์๋ Github API (`https://github.com/login/oauth`)์ ์ ํจํ authorization code๋ฅผ ๋ณด๋ด accessToken์ ๋ฐ๊ธ ๋ฐ์ ๋ค, ์๋ต ๊ฒฐ๊ณผ์ ํ ํฐ์ ๋ด์ ๋ค์ ํด๋ผ์ด์ธํธ๋ก ์ ๋ฌ ํด์ค๋ค.

3. Mypage ์ปดํฌ๋ํธ์์๋ ์ ๋ฌ ๋ฐ์ accessToken์ headers์ authorization์ ๋ด์์ GET ๋ฉ์๋๋ก Gihub API (`https://api.github.com/user`) ์์ ์ฌ์ฉ์์ ๋ณด๋ฅผ ๋ฐ์์จ๋ค.

4. GET ๋ฉ์๋ก ์ ๋ฌ ๋ฐ์ ๊ฒฐ๊ณผ๊ฐ์ ํ์ฌ ํด๋ผ์ด์ธํธ์์ ๋ณด์ฌ์ค๋ค.

<br>
<br>

## ๐ค Understanding

---

- ํ~ ๋๋์ด [์ธ์ฆ/๋ณด์ ] ์ผ์ ์ ๋ชจ๋ ๋ง์ณค๋ค..

- ์ฐ์  ํ์ต ํ  ์์ด ๋๋ฌด ๋ง๋ค.

  ์์ง์ ๋ ํผ๋ฐ์ค์ฝ๋๋ฅผ ๋ณด๋ฉฐ ์ดํดํ๋ ์์ค์ด๊ธฐ ๋๋ฌธ์, ์ง์ง ๋ด๊ฒ์ผ๋ก ๋ง๋๋๊ฒ ์ค์ํ๋ค.

- ~~์ธ์์ ์ ์์ฐ์ผ ๋ฏ ํ๊ณ ...~~ ํ ํฐ ๋ฐฉ์ & OAuth 2.0 ๋ฐฉ์์ ๋ฐฑ์๋ ๋ก์ง์ ๋์ ๋ ์ต์ด์ผ ๋ฐ๋ก๋ฐ๋ก ์ธ ์ ์์๊ฑฐ ๊ฐ๋ค..

- ํ์์ ๋ณ ์๊ฐ ์์ด _"๊ตฌ๊ธ๋ก ๋ก๊ทธ์ธ"_ ์ ๋๋ฌ๋๋๋ฐ, ์์ผ๋ก ์ ์ฌํ ๋ณผ ๋ฏ ํ๋ค.

<br>
<br>

```toc

```
