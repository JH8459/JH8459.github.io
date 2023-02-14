---
emoji: 📚
title: OAuth
date: '2021-10-22'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

---

<br>

### 1. OAuth

---

- OAuth는 인증을 중개해 주는 메커니즘이다.

- 이미 사용자 정보를 가지고 있는 웹 서비스(GitHub, google, facebook 등)에서 사용자의 인증을 대신해 주고, 접근 권한에 대한 토큰을 발급한 후, 이를 이용해 내 서버에서 인증이 가능하게끔 구현해야한다.

<br>
<br>

#### 1-1. 사전 준비

---

- OAuth 2.0 문서를 참조하여 <a href="https://www.oauth.com/oauth2-servers/accessing-data/create-an-application/">GitHub에 내 앱 등록</a>을 해야한다.

- 내 앱 등록을 끝낸 뒤, GitHub App에서 제공하는 Client ID 및 Client Secret의 정보를 서버에서 접근하기 위해 `.env` 파일에 환경변수를 등록해 주자.(Client Secret은 Github 계정 보안을 위해 타인에게 알려지면 안되므로 `.env` 파일 내부에서 관리해줘야 한다.)

<br>
<br>

#### 1-2. 서버 구현

---

<br>
<br>

##### oauth/access_token

---

- 인증을 웹 서비스(Github)에서 처리하므로, 인증서가 따로 필요하지가 않다. 우리가 구현해야 할 서버는 Github 웹에 접근하여 authorization code를 이용해 access token을 발급받기 위한 post 요청을 해주어야 한다.

  ```js
  // req의 body로 authorization code가 들어옵니다. console.log를 통해 서버의 터미널창에서 확인해보세요!
  // console.log(req.body);

  // TODO : 이제 authorization code를 이용해 access token을 발급받기 위한 post 요청을 보냅니다. 다음 링크를 참고하세요.
  // https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps#2-users-are-redirected-back-to-your-site-by-github

  axios.post('https://github.com/login/oauth/access_token',
    { client_id: clientID, client_secret: clientSecret, code : req.body.authorizationCode },
  	{ headers: { accept: 'application/json'}}
  )
  .then((data)=>{
  	res.status(200).json({accessToken : data.data.access_token});
  ```

- accessToken 생성을 우리가 구현할 서버에서 하는 것이 아니라 OAuth에서 대신 해주고 있기때문에 authorization code를 이용해서 Github App api endpoint로 post 요청을 보내준다.

<br>
<br>

#### 1-3. 클라이언트 구현

---

<br>
<br>

##### Login

---

- `components/Login.js`에서 할 일은 Github App에 요청을 보내 Authorization code를 받아오는 일이다.

  ```js
  // TODO: GitHub로부터 사용자 인증을 위해 GitHub로 이동해야 합니다. 적절한 URL을 입력하세요.
  // OAuth 인증이 완료되면 authorization code와 함께 callback url로 리디렉션 합니다.
  // 참고: https://docs.github.com/en/free-pro-team@latest/developers/apps/identifying-and-authorizing-users-for-github-apps

  this.GITHUB_LOGIN_URL = `https://github.com/login/oauth/authorize?client_id=${client가 들어간다.}`
  ```

<br>
<br>

##### App

---

- **Login** 컴포넌트에서 Github App에 접속하여 인증 후 Authorization code를 받아왔다면 해당 코드를 server(server > index.js)에 전달해 accessToken을 받아와야 한다.

  받아온 accessToken은 App 컴포넌트의 state에 저장한 후, Mypage 컴포넌트에서 props로 내려받아 활용해야 한다.

  ```js
  /* 생략 */

  constructor() {
  	super();
  	this.state = {
  		isLogin: false,
  		// TODO:
  		accessToken: '',  // 받아온 accessToken을 state에 저장해야 한다.
  	};
  	this.getAccessToken = this.getAccessToken.bind(this);
  }

  async getAccessToken(authorizationCode) {
  	// 받아온 authorization code로 다시 OAuth App에 요청해서 access token을 받을 수 있습니다.
  	// access token은 보안 유지가 필요하기 때문에 클라이언트에서 직접 OAuth App에 요청을 하는 방법은 보안에 취약할 수 있습니다.
  	// authorization code를 서버로 보내주고 서버에서 access token 요청을 하는 것이 적절합니다.
  	// TODO: 서버의 /callback 엔드포인트로 authorization code를 보내주고 access token을 받아옵니다.
  	// access token을 받아온 후
  	//  - 로그인 상태를 true로 변경하고,
  	//  - state에 access token을 저장하세요

  	const data = await axios.post('http://localhost:8080/callback', { authorizationCode: authorizationCode });  // 클라이언트 -> 서버로 authorization code를 보내준 뒤 서버에서 Github App으로 요청을 한다.

  	this.setState({
  		isLogin: true,
  		accessToken: data.data.accessToken  // 받아온 accessToken을 App 컴포넌트의 state에 저장한다.
  	});
  }
  ```

<br>
<br>

##### Mypage

---

- 받아온 accessToken으로 리소스에 대한 API 요청을 할 수 있다.

  accessToken을 전달하는 방식은 앞서 토큰에서 배웠던 Bearer Token 을 headers에 담아 주어 전달한다.

  ```js
  constructor(props) {
  	super(props);
  	this.state = {
  		images: [],
  		// TODO: GitHub API 를 통해서 받아올 수 있는 정보들 중에서
  		// 이름, login 아이디, repository 주소, public repositoty 개수를 포함한 다양한 정보들을 담아주세요.
  		name: '',
  		login: '',
  		html_url: '',
  		public_repos: null
  	}
  }

  async getGitHubUserInfo() {
  	// TODO: GitHub API를 통해 사용자 정보를 받아오세요.
  	// https://docs.github.com/en/free-pro-team@latest/rest/reference/users#get-the-authenticated-user

  	const data = await axios.get('https://api.github.com/user', {
  		headers: {
  			authorization: `token ${this.props.accessToken}`  // token이 필요한 API 요청 시 header authorization token 담아서 보내기
  		}
  	});

  	this.setState({  // Github API를 통해 받아온 정보 갱신
  		name: data.data.name,
  		login: data.data.login,
  		html_url: data.data.html_url,
  		public_repos: data.data.public_repos
  	})
  }
  ```

<br>
<br>

#### 1-4. 결과 확인

---

![github](https://user-images.githubusercontent.com/83164003/143469590-68559aac-415b-47e6-b1dc-01e4fef06b4d.gif)

1. 클라이언트의 Login 컴포넌트를 통하여 Github에 로그인 하여 authorization code를 받아 온 뒤, App 컴포넌트를 통해서 서버 `controller/callback.js`로 authorization code를 전달해 준다.

2. 서버에서는 Github API (`https://github.com/login/oauth`)에 유효한 authorization code를 보내 accessToken을 발급 받은 뒤, 응답 결과에 토큰을 담아 다시 클라이언트로 전달 해준다.

3. Mypage 컴포넌트에서는 전달 받은 accessToken을 headers의 authorization에 담아서 GET 메소드로 Gihub API (`https://api.github.com/user`) 에서 사용자정보를 받아온다.

4. GET 메소로 전달 받은 결과값을 현재 클라이언트에서 보여준다.

<br>
<br>

## 🤔 Understanding

---

- 후~ 드디어 [인증/보안 ] 일정을 모두 마쳤다..

- 우선 학습 할 양이 너무 많다.

  아직은 레퍼런스코드를 보며 이해하는 수준이기 때문에, 진짜 내것으로 만드는게 중요하다.

- ~~세션은 잘 안쓰일 듯 하고...~~ 토큰 방식 & OAuth 2.0 방식의 백엔드 로직은 눈에 더 익어야 바로바로 쓸 수 있을거 같다..

- 평소에 별 생각 없이 _"구글로 로그인"_ 을 눌러댔는데, 앞으로 유심히 볼 듯 하다.

<br>
<br>

```toc

```
