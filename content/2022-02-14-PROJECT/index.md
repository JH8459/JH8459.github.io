---
emoji: 🔥
title: ALL-CON Refactoring 6일차 - Articles 테이블 스키마 수정(2)
date: '2022-02-14'
author: JH8459
categories: Project
---

![github-blog.png](../../assets/common/PROJECT.jpeg)

<br>

## ⚒️ Refactoring

- ALL-CON에서는 한달간의 콘서트 정보만 `allConcerts` 배열에 담아 보여주고 있다.

  한달이 지나게되면 콘서트 정보중 `activation`이 `0`으로 비활성화되어 서버에서 보여주지 않고 있다. ~~(콘서트 삭제는 관련 댓글 및 게시글들이 모두 삭제되므로 비활성화를 선택)~~

  ![스크린샷, 2022-02-15 17-45-59](https://user-images.githubusercontent.com/83164003/154025834-c3427f3f-4758-4c4a-bc77-4c219faa9844.png)

- 기존에는 콘서트가 비활성화 될 시 관련 게시글은 조회수를 `-999999` 음수값으로 강제로 할당하여 조회수로 검색시 맨 뒤로 나열되게끔 수정해주었으나 만약 불순한(?) 목적으로 조회수를 올리거나 시간이 오래지나 조회수가 `0` 이상의 양수값으로 전환된다면 올바르지 않은 결과가 초래되므로 `Articles` 테이블에도 `activation` 컬럼값을 추가해 비활성화 해주기로 했다.

<br>
<br>

### 1. 보완이 필요한 사항

---

- `Articles` 테이블의 현재 스키마는 다음과 같다.

  ![스크린샷, 2022-02-15 17-44-23](https://user-images.githubusercontent.com/83164003/154025162-0730e711-8b2f-4946-962b-b5b3ab09d166.png)

  해당 `Articles` 테이블 컬럼중 `activation` 컬럼값을 추가하고, 서버에서 `nodeSchedule`을 통하여 1일 1회 티켓 발매 후 한달이 지난 콘서트들은 비활성화를 시키는데 해당 콘서트에 종속된 게시글들 또한 모두 비활성화 진행이 필요하다.

<br>
<br>

### 2. 문제 해결

#### 2-1. Sequelize Model 파일 스키마 수정 && addColumn() 함수를 통한 마이그레이션

---

- 어제 학습한 내용대로 `addColumn()` 함수를 통해 마이그레이션으로 `Articles` 테이블의 스키마를 수정해주었다.

  ```js
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Articles', 'activation', {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    });
  };
  ```

- 초기값은 `true`로 설정 (티켓 오픈 후 한달이 지난 콘서트 게시글은 `false`로 비활성화 된다.) , 데이터 타입과 옵션을 설정해주었다.

  ![스크린샷, 2022-02-16 00-23-06](https://user-images.githubusercontent.com/83164003/154092908-57a17a67-2d42-4d7d-9c59-b38e3439b348.png)

  스키마를 수정했기 때문에 기존 게시글들을 수동으로 하나하나 데이터 값을 수정해줘야 하나 싶었는데, `defaultValue`값을 `true`로 준 탓인지 기존 게시글들도 모두 `activation` 컬럼의 값이 `true`로 활성화되었다. ~~(휴...)~~

<br>
<br>

#### 2-2. concertCleaner() 함수 및 Controller 변경

---

- 매일 오전 09시에 서버에서는 콘서트 정보를 `concertCleaner()` 함수를 통해서 티켓 오픈일이 한달 지난 콘서트 DB의 `activation`을 `false`로 바꾸어 주고 있다.

  여기에 더불어 해당 콘서트에 종속된 게시글 DB들의 `activation` 또한 함께 `false`로 바꾸어 주었다.

- 또한, 이제는 Controller 또한 수정하여 게시글을 뱉어주는 요청이 들어온다면, `order`값을 내림차순으로 주어서 `activation`이 `false`인 게시물은 후순위로 밀리게끔 설계하였다.

<center><img src="https://user-images.githubusercontent.com/83164003/154095571-20c8416e-30e4-4e4c-b665-6a5962839808.png"/></center><br>

<br>
<br>

### 3. 결과

---

- 클라이언트에서 이제 조회수순으로 정렬을 하여도 `order`의 우선순위가 `activation` 내림차순이기 때문에 비활성화된 콘서트에 종속된 게시물들을 후순위로 밀리게 설계하였다.

  ![스크린샷, 2022-02-16 00-40-09](https://user-images.githubusercontent.com/83164003/154096234-6ea10a8a-a7df-4501-9575-71ded1c491d6.png)

  콘서트가 비활성화되어 목록에서는 사라졌지만 게시글은 후순위로 밀렸을 뿐이라서 조회/수정/삭제 처리는 가능한 상태이다.

  ![스크린샷, 2022-02-16 00-59-54](https://user-images.githubusercontent.com/83164003/154100340-9819feb2-da3c-4216-b2e3-8e67231f199b.png)

- ~~위 사진과 같이 상단 콘서트 목록은 공백으로 보여지고 있다.~~

  빈 콘서트 목록 처리를 어떻게 해야할지 클라이언트를 담당한 팀원분과 조율해서 내일까지 Task를 가져가야 할 듯 하다.

<br>
<br>

```toc

```
