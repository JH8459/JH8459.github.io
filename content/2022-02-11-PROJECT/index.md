---
emoji: 🔥
title: ALL-CON Refactoring 5일차 - Articles 테이블 스키마 수정(1)
date: '2022-02-11'
author: JH8459
categories: Project
---

![github-blog.png](../../assets/common/PROJECT.jpeg)

<br>

## ⚒️ Refactoring

- 어제~오후까지 어제부터 이어온 Task인 로그인이 검증이 필요한 API 요청시 유효하지 않은 로그인 상태라면 메인페이지로 강제 이동 후 로그인 창 팝업으로 다시 로그인을 유도하는 로직으로 서버와 클라이언트를 다시 설계하였다.

- 생각보다 로그인 검증이 필요한 API 요청이 많아서 작업시간이 오래걸렸다..

  - **===main page===**

    - 알람 요청 : [post] concert/:concertid/alarm

    - 알람 취소 : [delete] concert/:concertid/alarm

    - 알람 조회 : [get] concert/alarm

    - 콘서트 댓글 작성 : [post] concert/:concertid/comment

    - 콘서트 댓글 수정 : [patch] concert/:concertid/comment/:commentid

    - 콘서트 댓글 삭제 : [delete] concert/:concertid/comment/:commentid

<br>
<br>

- **===concert page===**

  - 없음

<br>
<br>

- **===conchin page===**

  - 게시글 작성 : [post] concert/:concertid/article

  - 게시글 수정 : [patch] concert/:concertid/article/:articleid

  - 게시글 삭제 : [delete] concert/:concertid/article/:articleid

  - 게시글 댓글 작성 : [post] concert/:concertid/article/:articleid/comment

  - 게시글 댓글 수정 : [patch] concert/:concertid/article/:articleid/comment/:commentid

  - 게시글 댓글 삭제 : [delete] concert/:concertid/article/:articleid/comment/:commentid

<br>
<br>

- **===my page===**

  - 마이페이지 진입 : [get] user/me

  - 개인정보 수정 : [patch] user/me

  - 닉네임 중복 확인 : [post] user/username

  - 프로필사진 수정 : [patch] user/picture

  - 콘친 인증 : [patch] user/safe

  - 콘친 인증코드 요청 : [post] user/safe

  - 콘친 인증코드 입력 : [post] user/safe/confirm

  - 회원탈퇴 : [delete] user/me

  - 내가 쓴 게시글 : [get] user/myarticle

  - 내가 쓴 댓글 : [get] user/mycomment

<br>
<br>

### 1. 추가적인 보완이 필요한 사항

---

- 클라이언트를 담당하는 팀원분께서 현재 ALL-CON 프로젝트 스키마를 수정해달라는 요청을 해주셨다.

  현재 콘친찾기 게시글 작성시 총 멤버수는 `2` 현재원 수는 `1`값으로 항상 고정을 해두었다.

  처음부터 멤버수를 고정하기보다는 게시글 작성때부터 유연하게 멤버수를 수정할 수 있게 스키마를 수정해달라는 요청을 해주셨다.

- 사실 민감정보 암호화 리팩토링을 할 때도 `sequelize` 문법중 특정 컬럼만 추가하여 `migration`하는 방법도 열심히 구글링하여 찾아보았는데, 이번 스키마 구조 수정 후 자주쓰는 `sequelize` 문법은 다시 한번 복습할 겸 블로그에 학습한 내용을 남겨봐야겠다. ~~(매번 스키마 수정할 때마다 구글링 중..)~~

  우선 클라이언트를 담당하는 팀원분께서 요청한 부분은 다음과 같다.

  ![스크린샷, 2022-02-11 11-09-59 (사본)](https://user-images.githubusercontent.com/83164003/153529646-275d910a-f7ee-43e2-8818-c2f2c9087961.png)

- 해당 `Articles` 테이블 컬럼중 두가지값을 수정 요청하셨다.

  - `member_count` 디폴트값 삭제

  - `total_member` 디폴트값 삭제

<br>
<br>

### 2. 문제 해결

#### 2-1. Sequelize Model 파일 스키마 수정

---

- 현재 `Articles` 테이블의 모델구조는 다음과 같다.

<center><img src="https://user-images.githubusercontent.com/83164003/153530343-c5bc09d9-9c91-4f8b-bb9b-56be132b2c22.png"/></center><br>

- `member_count`와 `total_member` 컬럼은 `INTEGER` 타입의 데이터이며, `NULL`이 허용되지 않고 기본값들이 각각 `1`과 `2`로 설정이 되어 있다.

  아래와 같이 불필요한 데이터 속성들을 삭제했다.

<center><img src="https://user-images.githubusercontent.com/83164003/153530565-8e3c1057-f48a-446a-b7eb-1afcf3531e53.png"/></center>

<br>
<br>

#### 2-2. changeColumn() 함수로 컬럼 데이터 속성값 변경

---

- 우선 아래 명령어로 migration 파일을 생성해 준다.

  ```js
  # using npm
  npx sequelize-cli migration:generate --name 생성할 migration 이름
  # using yarn
  yarn sequelize-cli migration:generate --name 생성할 migration 이름
  ```

- 그 뒤, 컬럼 안 데이터 속성값을 변경할 예정이기 때문에 `changeColumn()` 함수를 사용한다.

  함수의 사용 방법은 아래와 같다.

  ```js
  // await queryInterface.changeColumn(테이블명, 컬럼명, {
  //  컬럼 데이터 속성,
  //  컬럼 옵션
  // })

  await queryInterface.changeColumn('Articles', 'member_count', {
    type: Sequelize.INTEGER,
    defaultValue: null,
    allowNull: true,
  });
  ```

- 두가지 속성이 비동기로 처리되어야 하므로 아래와 같이 작성하였다.

  ![스크린샷, 2022-02-11 11-42-54](https://user-images.githubusercontent.com/83164003/153529840-83dcc0fa-af69-4442-9395-dbc371849e23.png)

<br>
<br>

---

- 해당 스키마 수정외에 `controller` 부분에서도 `member_count`와 `total_member`는 고정값이 DB에 저장되므로 따로 `req.body`로 입력값을 전달받아 DB에 저장하지 않는 구조였다.

  게시글 작성 `controller`까지 수정하여 게시글 작성시 멤버수를 유연하게 적용할 수 있게끔 리팩토링하였다.

<br>
<br>

### 3. 결과

---

- `Articles` 테이블 스키마가 다음과같이 변경되었다.

  ![스크린샷, 2022-02-11 11-09-59](https://user-images.githubusercontent.com/83164003/153530932-c18c05a1-c469-413f-97da-62c00be542ea.png)

  이제 게시글 최초 작성시에도 멤버수를 유연하게 적용하여 게시글 생성이 가능하다.

  ![test](https://user-images.githubusercontent.com/83164003/153531161-6c35922d-cdce-458d-ae93-04daa29ab5b9.gif)

<br>
<br>

```toc

```
