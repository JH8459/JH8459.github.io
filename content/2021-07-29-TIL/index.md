---
emoji: 📚
title: Git
date: '2021-07-29'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

### 1. Git

---

- Git이란 분산형 버전 관리 시스템(Version Control System) 의 한 종류이며, 빠른 수행 속도에 중점을 둔다.

  - _"버전 관리 시스템"_ 이란 파일 변화를 시간에 따라 기록했다가 이후에 특정 시점의 버전을 다시 꺼내올 수 있는 시스템이다.

    동일한 정보에 대한 여러 버전을 관리하게 되며, 버전을 통해 시간적으로 변경 사항과 변경 사항을 작성한 작업자를 추적할 수 있다.

<br>
<br>

#### 1-1. GitHub

---

- Git을 통하여 버전관리를 한다 이미 언급을하였다.

  그렇다면 Github는 무엇일까? Github는 Git Repository를 관리할 수 있는 클라우드 기반 서비스이다.

  즉, Git으로 버전을 관리하는 폴더에 대해서 Github을 통해 여러 사람들이 공유하고 접근할 수 있게되기때문에 Git이 분산형 버전 관리 시스템으로 불리울 수 있게된다.

<br>
<br>

#### 1-2. Git Repository

---

- 내가 작업하는 소스 코드 폴더가 버전 관리를 받게 하기 위해서는 내 폴더를 Git의 관리 아래에 두어야 한다. 이때 Git으로 관리되는 폴더를 Git repository 라고 부른다.

  Git repository 는 Remote Repository와 Local Repository 두 종류의 저장소를 제공한다.

  - **Remote Repository** : 원격 온라인 서버 상의 저장소이다. 여러 사람이 함께 공유가 가능하다.

  - **Local Repository** : 내 컴퓨터의 저장소이다. 개인 전용 저장소이며 내 컴퓨터 안의 저장소이기 때문에 오프라인 작업또한 가능하다.

  ![git repository](https://user-images.githubusercontent.com/83164003/128201330-25d70b76-a2f6-42e8-a6ee-ced5dea3b517.png)

<br>
<br>

#### 1-3. Git을 통한 작업시 WorkFlow

---

![gitflow](https://user-images.githubusercontent.com/83164003/128201584-6a5413c7-0150-4356-9cba-7c2b71827daf.png)

<br>

1. Remote에 있는 다른 Repository에서 `Fork`를 해서 Remote에 있는 내 Repository에 가지고 온다.

2. 이 코드를 수정하기 위해서는 내 컴퓨터로 가져오는 작업이 또 필요하다. 내 컴퓨터에서 작업을 하기 위해서 `git clone`을 한다.

3. 이제 내 컴퓨터의 작업 공간 (work space) 에서 작업에 들어간 파일들을 git의 관리 하에 있는 상태로 변경할 수 있다.

   이 영역을 `staging area`라고 말한다. 즉, `staging area`에 들어오지 않은 파일은 `unstaged` 혹은 `untracked file`이라고 말하며, `staging area`에 있는 파일들은 `staged` 된 파일이라고 말할 수 있다.

   `git commit` 을 하기 위해서 현재 Local Repository에 변경된 파일들이 어떤것인지 확인하려면 `git status`를 통하여 `staging area`와 `untracked files` 목록에 어떤 것들이 있는지 확인할 수 있다.

4. `staging area`에 들어온 파일들은 `git commit`이 가능하다. commit을 하고 나면 내 remote repository에 `git push` 해서 commit 기록을 remote 에도 남겨줄 수 있다.

   남긴 commit들이 잘 기록되어있는지 확인하려면 `git log`를 통하여 로그들을 터미널 창에서 확인할 수 있다.

5. `git push`를 완료한 후 이제 remote의 원래 레파지토리에 `pull request`를 보내면 Remote Repository로 내가 수정한 코드를 업로드할 수 있다.

<br>
<br>

## 🤔 Understanding

- 깃깃깃깃깃. 말로만 들었지 왜 협업에 유리하며, 분산관리에 유리하며.. 버전관리에 유리하며.. 많은 기업들이 해당 툴을 모두 사용하는지 짧은 시간이지만 크게 와닿았다.

  협업 과정 중 commit을 들여다보면 누가..언제..몇분전에.. 무슨작업을..무슨코드를 뻘짓(?)거리 하였는지 적나라하게 나오는걸 보니 정말 투명하고 실시간으로 코드유지가 된다는 느낌을 받았다.

- 리액트 선행학습 위해 선정한 코딩애플 유튜브 강의가 알고보니...유료 강의였다.

  <a href="https://www.youtube.com/channel/UCxft4RZ8lrK_BdPNz8NOP7Q" target="_blank">유튜브 코딩앙마</a> 님의 수업이 유익해보이며 끝까지 무료로 수강이 가능해보인다. 리액트 클론 코딩 및 따라하기 강의는 우선 코딩앙마 채널로 진행해볼 예정이다.

<br>
<br>

```toc

```
