---
emoji: 📚
title: Git Branch, 프로젝트 workflow
date: '2021-10-27'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Git Branch

---

<br>
<br>

#### 1-1. 브랜치(Branch)란?

---

- 브랜치란 독립적으로 어떤 작업을 진행하기 위한 개념이다.

  개발을 하다 보면 한 페이지 안의 여러 기능을 따로 구현하기 위해, 코드를 여러 개로 복사해야 하는 일이 필연적으로 생긴다. 브랜치 기능을 활용하면, 코드를 통째로 복사한 후 원래 코드가 변경될 우려 없이 독립적으로 개발할 수 있다.

  다시 말해, 각각의 브랜치는 다른 브랜치의 영향을 받지 않기 때문에, 여러 작업을 동시에 진행할 수 있다.

- 그러므로 브랜치가 갖는 기능의 장점은 다음과 같다.

  - 한 소스코드에서 동시에 다양한 작업을 할 수 있게 해준다.
  - 소스코드의 한 시점과 동일한 상태를 만들고, 브랜치를 넘나들며 작업을 수행할 수 있다.
  - 각각의 브랜치에서 생긴 변화가 다른 브랜치에 영향을 주지 않고 독립적으로 코딩을 진행할 수 있다.

    > `hotfix`, `release`, `develop`, `feature` 등 다양한 개발과정 브랜치를 만들고 작업을 하다 보면, 다음 이미지와 비슷한 **Git graph**가 형성된다.
    >
    > ![git graph](https://user-images.githubusercontent.com/83164003/138927512-26f67564-e342-4fe3-8706-4f0c0f0addb4.png)

    이렇게 나누어진 브랜치에서는 각자 독립적인 작업 영역(저장소) 안에서 마음대로 소스코드를 변경할 수 있다. 분리된 작업 영역(브랜치)에서 변경된 내용들은 다른 브랜치와 병합(Merge)함으로써 다시 새로운 하나의 브랜치로 병합 또한 가능하다.

    > 독립적인 저장소에서 `navigation bar`, `footer` 소스코드 구현 후 `master` 브랜치와 병합하는 과정
    >
    > ![merge](https://user-images.githubusercontent.com/83164003/138927916-cc08ed8a-578c-40f1-8e30-08f87c51dfcc.png)

    여러 명이서 동시에 작업을 할 때에 다른 사람의 작업에 영향을 주거나 받지 않도록, 먼저 통합 브랜치에서 자신의 작업 전용 브랜치를 만든 후 각자의 브랜치에서 맡은 영역에 대한 작업을 진행한다.

    작업이 끝난 브랜치는 통합 브랜치에 병합해서 변경 사항을 적용하는 과정을 반복하여 이를 통해 다른 브랜치의 작업에 영향을 받지 않고 독립적으로 특정 작업을 수행하고 그 결과를 하나로 모아 나가게 된다.

    이렇게 작업을 진행하게 되면 **'작업 단위'**, 즉 브랜치로 그 작업의 내용들이 모두 기록되기 때문에 문제가 발생했을 때 원인이 되는 작업을 찾아내거나 그에 따른 대책을 세우기 쉬워진다.

<br>
<br>

##### 브랜치 종류

---

- **통합 브랜치 (Integration Branch)** : 배포될 소스 코드가 기록되는 브랜치.

  - Github Repository를 생성하게 되면 기본적으로 main 브랜치가 생성되어 있다. (기존 Repository의 경우 master로 되어 있는 경우도 있다.)
  - 해당 프로젝트의 모든 기능이 정상적으로 작동하는 상태의 소스코드가 담겨 있다.

- **피처 브랜치 (Feature Branch)** : 기능 추가, 버그 수정과 같이 단위 작업을 위한 브랜치.

  - 통합 브랜치로부터 만들어내며, 피처 브랜치에서 하나의 작업이 완료가 되면 다시 통합 브랜치에 병합하는 방식으로 진행된다. 토픽 브랜치라고도 부르기도 한다.

<br>
<br>

#### 1-2. 브렌치 주요 명령어

---

- **새로운 브랜치 생성**

  - `$ git branch 새로운 브랜치 이름`

- **새로운 브랜치 생성 후 해당 브랜치로 전환**

  - `$ git switch -c 새로운 브랜치 이름`
  - `$ git checkout -b 새로운 브랜치 이름`

- **브랜치 목록 확인**

  - `$ git branch`

- **브랜치 목록과 각 브랜치의 최근 커밋 확인**

  - `$ git branch -v`

- **브랜치 삭제**

  - `$ git branch -d 삭제할 브랜치 이름`
  - `$ git branch -D` : 해당 명령어는 병합하지 않은 브랜치를 강제 삭제하는 방법.

- **브랜치 전환**

  - `$ git switch 브랜치 이름`
  - `$ git checkout 브랜치 이름`

- **브랜치 병합 (master 브랜치로 dev 브랜치를 병합할 때 (master ← dev))**

  - `$ git checkout master` ➡ `$ git merge dev`

- **로그에 모든 브랜치를 그래프로 표현**

  - `$ git log --branches --graph --decorate`

- **아직 commit 하지 않은 작업을 스택에 임시로 저장**

  - `$ git stash`

<br>
<br>

### 2. 프로젝트 workflow

![스크린샷, 2021-10-27 02-22-23](https://user-images.githubusercontent.com/83164003/138929431-23d510ef-0ba4-4a3c-9f1d-bd6459503885.png)

- Remote에 생성한 프로젝트 Repository를 `Fork`를 하여 각자의 Repository로 가져온다.

- Local 영역에서 작업하기 위해 `clone`을 하여 Repository를 Local에 가져와 세팅한다.

![스크린샷, 2021-10-27 02-25-17](https://user-images.githubusercontent.com/83164003/138931675-74480d5b-5cd8-4b2a-9770-e311804d439e.png)

- Local 영역에서의 개발 진행은 `main` 브랜치가 아닌 `dev` 브랜치를 만들어서 해당 브랜치로 이동한다.

![스크린샷, 2021-10-27 02-40-15](https://user-images.githubusercontent.com/83164003/138931935-0190d198-b999-43cf-bcd4-0cc93616b5da.png)

- `git checkout -b dev` 명령어를 통해서 dev 브랜치를 생성&이동. (`git switch -c dev` 명령어도 가능하다.)

- 나의 Origin Repository 에도 생성한 브랜치를 반영하기 위해 `git push origin dev` 명령어를 입력해 준다.

![스크린샷, 2021-10-27 02-42-54](https://user-images.githubusercontent.com/83164003/138932307-29e2a19c-967e-4860-a48b-d21f60504837.png)

- 작업을 진행하기전 하나의 기능을 구현할 때는 **‘feature/기능이름’** 이라는 브랜치를 만들어서 작업하기로 정했다면, 로그인 기능을 구현하기 위해서 `feature/login` 이라는 브랜치를 생성 후 해당 브랜치에서 로그인 기능을 구현한다.

- `git checkout -b feature/login` 명령어를 통해서 feature/login 브랜치를 생성&이동. (`git switch -c feature/login` 명령어도 가능하다.)

![스크린샷, 2021-10-27 02-46-23](https://user-images.githubusercontent.com/83164003/138932826-32fe9ec4-1a22-4ff9-82be-fa599cd8764e.png)

- feature/login 브랜치에서 로그인 기능이 완성 후, 소셜 로그인(oauth) 기능을 추가해 보고 싶다면 이미 완성된 로그인 코드에서 작업하기보다는, 새로운 브랜치를 하나 더 만들어서 기존 완성된 기능은 보존하며 작업하는게 코드를 유지보수하기 용이하다.

- `git checkout -b feature/login-ouath` 명령어를 통해서 feature/login-ouath 브랜치를 생성&이동한다.

![스크린샷, 2021-10-27 02-50-04](https://user-images.githubusercontent.com/83164003/138933447-c5cd9882-ad51-43b5-a21f-a12f154faf75.png)

- 소셜 로그인 기능까지 구현이 완료되었다면, 이 feature/login-oauth 브랜치에 있는 코드를 feature/login 브랜치로 병합(merge) 해준다.

- 먼저 병합의 주체가 될 브랜치(feature/login)로 `git checkout -b feature/login` 명령어로 이동을 한다.

![스크린샷, 2021-10-27 02-53-32](https://user-images.githubusercontent.com/83164003/138933968-e12ddca5-020b-4f63-a72a-c52a83edefbe.png)

- `git merge feature/login-oauth` 명령어로 feature/login-oauth 브랜치를 병합해준다.

- 브랜치가 병합되기 전 feature/login 브랜치에 추가적인 커밋이 없으므로, 브랜치가 분기될 필요가 없다. 그러므로 자동적으로 **fast-forward** 방식으로 병합이 이뤄진다.

  > fast-forward 방식이란 별도의 커밋을 생성하지 않고 feature/login 브랜치가 가리키는 커밋을 feature/login-oauth 가 생성한 커밋으로 바꾸는 작업을 말한다.
  >
  > 만약, feature/login 브랜치에 별도의 커밋이 있었다면, fast-forward가 아닌 **merge commit** 방식으로 병합되었을 것이다. 이는 각 브랜치가 줄기처럼 분기한 후, 병합의 모양새를 가진다.
  >
  > ![스크린샷, 2021-10-27 02-56-28](https://user-images.githubusercontent.com/83164003/138934399-f62e2ed8-db9a-4138-8abe-7905d9f39d70.png)

<br>
<br>

![스크린샷, 2021-10-27 02-59-32](https://user-images.githubusercontent.com/83164003/138934837-0054b893-2da4-4f97-90f4-351c0232c38a.png)

- 로컬의 작업한 내용(Login기능)을 Remote Repository 에 업로드하기 위해서는 push를 해야 한다.

- ` git push origin feature/login` 명령어로 Remote Repository로 업로드 한다.

- feature/login 브랜치의 변경 사항을 다른 팀원들과 함께 코드 리뷰를 하고 dev 브랜치에 적용하고 싶다면, Github의 Pull Request 기능을 활용해 dev 브랜치로의 반영을 요청할 수 있다.

<br>
<br>

#### 2-1. 전체 흐름 workflow

![스크린샷, 2021-10-27 03-03-39](https://user-images.githubusercontent.com/83164003/138935596-451d30ac-b5f8-4ad2-8d63-e06792ac944b.png)

- 프로젝트를 진행하는 전체 흐름은 다음과 같다.

  1. Local에서 새로운 브랜치를 생성한다.

  2. Local 영역에서 작업이 끝나면 Remote Repository 로 Push 한다.

  3. 그리고 Project Upstream Repository에 반영(merge)될 수 있도록 Pull Request 한다.

     - 만약 작업하던 중간에 Remote upstream 에 업데이트가 생긴다면 Local 로 pull 받아주어야 한다.

<br>
<br>

## 🤔 Understanding

- 깃을 아직 2%도 쓰지 못했던거 같다. ~~개인 Repository만 활용한 수준....~~<br>
  이러한 협업을 할 때 진짜 깃의 실용성이 나타나는 듯 하다.

- 프로젝트 플로우는 더미 프로젝트로 직접 스터디 팀원들과 함께 실습하는 시간을 꼭 가져야겠다. ~~뭔가 협업이 실시간으로 이뤄지는거 같아서 신기하다.~~

<br>
<br>

```toc

```
