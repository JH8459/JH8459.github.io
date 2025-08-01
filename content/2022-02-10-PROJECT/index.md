---
emoji: 🔥
title: ALL-CON Refactoring 4일차 - 유효하지 않은 로그인 상태 검증
date: '2022-02-10'
author: JH8459
categories: Project
---

![github-blog.png](../../assets/common/PROJECT.jpeg)

<br>

## ⚒️ Refactoring

- 어제 발생한 `code: 'ERR_HTTP_HEADERS_SENT` 에러는 `userAuth` 미들웨어 함수를 수정하여 핸들링하였다.

  오늘은 전반적으로 유효하지 않은 로그인 상태를 검증하여 메인페이지로 이동 후 로그인을 유도하는 방향으로 프로젝트를 리팩토링해볼 예정이다.

<br>
<br>

### 1. 문제점

---

- 현재 ALL-CON 프로젝트는 로그인중 웹 브라우저 쿠키가 삭제되거나 쿠키의 유효기간이 지난 이후에도 로그인을 계속 하고 있다면, 로그인이 필요한 API 요청을 시도시 `Server Error`만 반환하고 자동으로 로그아웃 처리가 된다던지, 페이지가 이동한다던지의 상태변화는 이뤄지지 않는다.

  이렇게 서비스가 유지가 된다면 이용자가 직접 유효하지 않은 로그인 상태를 감지하기는 어려우니 당연히 ALL-CON 서버 측의 문제가 있다고 생각이 들것이다.

  만약 유효하지 않는 로그인 정보로 로그인 검증이 필요한 API 요청 사용시에는 메인페이지로 강제로 이동 시키며, 로그인을 유도하는 방면으로 프로젝트를 리팩토링 해 볼 예정이다.

<br>
<br>

### 2. 문제 해결

#### 2-1. LoginRedirect 모듈 생성

---

- 우선 `LoginRedirect` 모듈을 만들었다.

  ```js
  /* Store import */
  import { RootState } from '../index';
  import { logout, getUserInfo } from '../store/AuthSlice';
  /* 생략 */
  /* Library import */
  import { useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { useNavigate } from 'react-router-dom';

  function LoginRedirect() {
    /* dispatch & navigate & useLocation 선언 */
    const dispatch = useDispatch();
    const navigate = useNavigate();

    /* useSelector */
    const { isLoginCheck } = useSelector((state: RootState) => state.auth);

    /* handler 함수 (기능별 정렬) */
    // 메인페이지 리다이렉트 핸들러
    const goHomeHandler = () => {
      /* 메인페이지 상태 초기화 */
      // 생략
      /* 켜져있는 모달창 모두 종료 */
      // 생략
      /* 홈으로 이동 */
      navigate('/main');
    };
    // 로그인 상태 변경 핸들러
    const loginStateHandler = () => {
      /* 로그아웃 상태로 변경 & 유저정보 상태 초기화 */
      dispatch(logout());
      dispatch(getUserInfo({}));
      /* 로그인 모달창 팝업 */
      dispatch(showLoginModal(true));
    };

    useEffect(() => {
      if (!isLoginCheck) {
        goHomeHandler(); // 메인페이지로 이동
        loginStateHandler(); // 로그인 상태 변경 & 로그인 모달창 팝업
      }
    }, [isLoginCheck]);

    return null;
  }

  export default LoginRedirect;
  ```

- 해당 모듈의 주된 기능은 두가지 함수로 만들어주었다.

  - 메인페이지 상태 초기화 & 켜져있는 모든 모달창 종료이후 메인페이지로 이동하는 `goHomeHandler()` 함수

  - 로그인 상태 초기화, 로그인한 유저정보 초기화 이후 로그인 모달창 띄워 재 로그인 유도하는 `loginStateHandler()` 함수

<center><img src="https://user-images.githubusercontent.com/83164003/153373384-2d37e9d0-f59b-4c11-ad77-6981f3356d4e.png"/></center><br>

`index.tsx`에 해당 컴포넌트를 불러와서 `isLoginCheck` 상태가 변동될때 마다 위 두 함수가 작동하게끔 만들어 주었다.

<br>
<br>

#### 2-2. 로그인 검증이 필요한 API 요청 아래 분기 처리

---

![스크린샷, 2022-02-10 17-57-11](https://user-images.githubusercontent.com/83164003/153373104-0149fc03-a438-4dde-9b37-0737a2f40f46.png)

- 로그인 검증이 필요한 API 요청 아래에 응답 결과값이 **상태코드 200번 && 에러메시지**를 반환하면 유효하지 않는 로그인 상태이므로 위와 같이 분기처리를 한뒤, `isLoginCheck` 상태값을 바꿔주어 다시 렌더링 해주었다.

<br>
<br>

### 3. 결과

---

- 로그인 중 웹 브라우저 쿠키가 삭제되거나 쿠키 만료로 유효하지 않은 로그인 상태에서 마이페이지 진입하면 메인페이지로 이동 후 로그인 창 팝업

  ![gif](https://user-images.githubusercontent.com/83164003/153384029-7cff7cd8-a60a-43c9-9013-14c77c74e344.gif)

- 로그인 중 웹 브라우저 쿠키가 삭제되거나 쿠키 만료로 유효하지 않은 로그인 상태에서 로그인 검증이 필요한 기능 수행시 (댓글 작성) 메인 페이지로 이동 후 로그인 창 팝업

  ![gif2](https://user-images.githubusercontent.com/83164003/153384922-c0f2be81-9822-4e84-a643-68571d70451a.gif)

<br>
<br>

---

- 우선 메인페이지에서 보여지는 영역은 모두 처리하였다.

- 다른 영역, 예를 들어 콘친찾기 글쓰기 중 쿠키가 만료되거나 사라지는 경우 등을 대처하기 위해서 내일은 사이트 전반적인 로그인 검증이 필요한 API 요청시 메인페이지로 강제 이동 & 로그인 재시도를 할 수 있게 끔 수정해볼 예정이다.

<br>
<br>

```toc

```
