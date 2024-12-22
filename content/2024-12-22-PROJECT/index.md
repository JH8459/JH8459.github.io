---
emoji: 🔥
title: 🤖 프로그래머스 프로필 뱃지 자동 생성 봇
date: '2024-12-22'
author: JH8459
categories: Project
---

![project-slack.jpg](https://jh8459.s3.ap-northeast-2.amazonaws.com/programmers-badge/programmers.jpg)

<br>

## 🤖 프로그래머스 프로필 뱃지 자동 생성 봇

### 1. 개발 목적

---

백준과 프로그래머스 플랫폼을 알고리즘 문제 풀이시 자주 애용하고 있다.

알고리즘 풀이 기록을 남기기 위해 [백준 허브](https://github.com/BaekjoonHub/BaekjoonHub)라는 익스텐션을 사용해서 자동으로 깃허브 레포지토리에 연동하여 기록으로 남기고 있다.

백준(Boj) 플랫폼은 [solved.ac](https://solved.ac/)라는 곳을 통해 사용자들의 백준 티어를 매기고있다. 이 데이터를 활용해서 백준 프로필 뱃지를 멋지게 만드는 [mazassumnida](https://github.com/mazassumnida/mazassumnida) 프로젝트에서 제공하는 프로필 뱃지 이미지를 사용해서 깃허브 프로필에 사용중이다.

최근 프로그래머스에서도 알고리즘 문제를 풀어보고 있는데 <strong>"프로그래머스 프로필 뱃지 또한 멋지게 만들수 없을까?"</strong>란 생각으로 시작하게된 프로젝트이다.

<br>
<br>

아래의 두 레퍼런스 프로젝트를 **참고**하여 만들었다.

> - 프로그래머스 프로필 SVG 자동 생성 프로젝트 (https://github.com/libtv/github-programmers-rank)
> - 백준 프로필 SVG 자동 생성 프로젝트 (https://github.com/mazassumnida/mazassumnida)

<br>
<br>

### 2. 주의 사항

---

- [백준 허브](https://github.com/BaekjoonHub/BaekjoonHub) 익스텐션에 연동된 레포지토리 필요.
- 깃허브 **PAT(Personal Access Token)** 필요.

실시간으로 프로그래머스에서 문제 풀이를 완료하면 백준 허브를 통해 연동된 레포지토리에 자동으로 커밋되는 기능을 활용한 프로젝트이므로 백준 허브가 반드시 필요하다. (백준 허브 설치 방법은 이 게시글에서는 설명하지 않습니다.)

또한 다른 레포지토리 저장소의 Github Actions 워크플로우를 호출해야하므로 깃허브 토큰이 필요하다. (다른 저장소를 호출할 수 있는지 권한을 확인해야 하므로 PAT가 반드시 필요하다.)

<br>
<br>

### 3. 설치 방법

---

#### 3-1. 프로젝트 포크

- <a href="https://github.com/JH8459/<strong>PROGRAMMERS-BADGE</strong>" target="_blank"><strong>PROGRAMMERS-BADGE</strong> 프로젝트</a>를 포크합니다.

  ![fork](https://github.com/user-attachments/assets/0d68e181-41a4-4654-bc4c-32d166f9ce4f)
  
  <br/>

#### 3-2. 액션 시크릿 키 등록

- <strong>PROGRAMMERS-BADGE</strong> 프로젝트에서 깃허브 액션에 사용될 시크릿 키를 등록합니다.

  ![secret_key](https://github.com/user-attachments/assets/58cb57f5-c06b-4cc9-b242-2189d10e4a4e)

  - **GH_PAT:** `GitHub Personal Access Token` 값 입니다.

    > `ghp_....` 로 시작하곤합니다.
  
  - **GH_REPOSITORY:** `{Github 계정명}/{레포지토리명}` 

    > 예시로 저의 경우엔 **JH8459/<strong>PROGRAMMERS-BADGE</strong>** 입니다.

  - **PROGRAMMERS_ID:** 프로그래머스 계정 ID입니다.

    > 프로그래머스 이메일 주소이며 소셜 로그인으로 사용중이시더라도 등록해주셔야합니다.

  - **PROGRAMMERS_PW:** 프로그래머스 계정 PW입니다.

  <br/>

#### 3-3. 액션 활성화

- <strong>PROGRAMMERS-BADGE</strong> 프로젝트에서 액션을 활성화합니다.

  ![action_enable](https://github.com/user-attachments/assets/99b7d0fc-8c59-4f0b-85aa-71f591ad01bc)

  > 포크한 레포지토리의 액션은 기본으로 비활성화되어 있으므로 해당 버튼을 클릭하여 액션을 활성화시킵니다.

  <br/>

#### 3-4. 백준허브 저장소 액션 시크릿 키 등록

- 백준허브에 연동된 레포지토리에서 깃허브 액션에 사용될 시크릿 키를 등록합니다.

  ![action_secret](https://github.com/user-attachments/assets/e55dc536-4764-4167-9d1e-687262c996b5)

  - **GH_PAT:** `GitHub Personal Access Token` 값 입니다.

    > `ghp_....` 로 시작하곤합니다.

  <br/>

#### 3-5. 백준허브 저장소 액션 활성화

- 백준허브에 연동된 레포지토리에서 액션을 활성화합니다.

  ![action_enable](https://github.com/user-attachments/assets/b3902eef-cd91-4c89-b5c1-da0038b4ad8e)

  - **set up a workflow yourself** 클릭 후 아래의 `dispatch_action.yml`을 복사해서 넣어줍니다.

    ```yml
    name: dispatch_action

    on:
     push:
       branches:
         - master
    
    jobs:
     dispatch:
       runs-on: ubuntu-latest
       steps:
         - name: Trigger repository dispatch
           uses: peter-evans/repository-dispatch@v1
           with:
             token: ${{ secrets.GH_PAT }}
             repository: {Github 계정명}/{레포지토리명}
             event-type: trigger-workflow
    ```

    > `repository: {Github 계정명}/{레포지토리명}` 예시로 저의 경우엔 **JH8459/<strong>PROGRAMMERS-BADGE</strong>** 입니다.

  <br/>

#### 3-6. 결과 확인

- 프로그래머스에서 문제 풀이 후 <strong>PROGRAMMERS-BADGE</strong> 프로젝트에서 결과물 확인

  - 프로그래머스 문제 풀이 후 백준 허브에 연동된 레포지토리의 액션 로그를 확인합니다.
  - <strong>PROGRAMMERS-BADGE</strong> 프로젝트에서의 액션 로그를 확인합니다.
  - 위 과정에서 문제가 없었다면, <strong>PROGRAMMERS-BADGE</strong> 프로젝트에서 `static` 폴더에 .svg 포맷의 프로그래머스 랭킹 뱃지 결과물을 확인합니다.
  - 원하는 랭킹 뱃지 유형을 확인 후 깃허브 프로필에 링크를 붙혀넣습니다.

    > https://raw.githubusercontent.com/{Github 계정명}/{레포지토리명}/master/static/result.svg

<br>
<br>

### 4. 결과물 미리 보기

#### 기본형

- 0 레벨 🍂

  ![0](./bronze.svg)

- 1 레벨 💍

  ![1](./silver.svg)

- 2 레벨 🏅

  ![2](./gold.svg)

- 3 레벨 💚

  ![3](./platinum.svg)

- 4 레벨 💎

  ![4](./diamond.svg)
        
- 5 레벨 🍒
  
  ![5](./ruby.svg)

<br>
<br>

## 🤔 Understanding

알고리즘 문제풀이에 동기부여도 되고 무엇보다 Boj 로고와 결을 같이하기 때문에 아래와 같이 어색함이 없이 깃허브 프로필에서 노출될 수 있다.

<br>

![profile](https://jh8459.s3.ap-northeast-2.amazonaws.com/programmers-badge/profile.png)

<br>

사실 프로필 뱃지가 뭐가 중요한가 싶지만 생각난 김에 만들어본 토이 프로젝트이다.

<br>
<br>

```toc

```