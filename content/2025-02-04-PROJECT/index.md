---
emoji: 🔥
title: Github 프로필 블로그 포스트 자동 업데이트
date: '2025-02-04'
author: JH8459
categories: Project
---

![project-github.png](https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-02-04-PROJECT/github.png)

<br>

## Github 프로필 블로그 포스트 자동 업데이트

### 1. 개발 목적

---

현재 사용중인 블로그는 소프트웨어 개발을 해오며 겪은 이슈들의 기록 혹은 느낀 감정들의 회고를 작성하려는 목적으로 운영중이다.

직업이 이렇다 보니 직접 구현하고 싶은 욕심에 <strong>Gatsby</strong>를 활용해서 나만의 블로그를 제작해서 운영중이다. (다시 블로그 서비스를 선택할 수 있는 순간이 돌아온다면 <del>벨로그(Velog)</del> 혹은 <del>미디엄(Medium)</del> 서비스를 선택할꺼다..! 😂)

하지만 대중적인 서비스를 이용하지 않아 검색 엔진 최적화와는 거리가 멀기 때문에 열심히 작성한 포스트들도 조회수는 처참하다!.. <del>(라고 핑계를 대본다.)</del>

그러던중 <strong>Gatsby</strong> 플러그인을 활용하여 내가 작성한 블로그 포스트들 또한 RSS 피드. 즉, <strong>웹 피드</strong>로 발행할 수 있는 사실을 알았다.

![rss.png](https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-02-04-PROJECT/rss.png)
<br>
<center><strong>현재 유명 개발 블로그들의 최신 트렌드를 슬랙 채널로 RSS 피드를 받아보고 있다. 👀</strong></center><br><br>

언젠간 위와 같은 유용한 포스트들을 발행할 수 있길 희망해보며 <strong>Gatsby</strong> 블로그에 RSS 피드 발행을 위한 플러그인 설치 및 기본 설정을 마친 뒤 이를 테스트해 볼 겸 Github 프로필에 최신 포스트들이 자동으로 갱신될 수 있도록 간단한 자동화 구현을 해보았다.

<br>
<br>

### 2. 구현 과정

---

Github 저장소 중 본인의 닉네임과 같은 이름의 저장소는 <strong>Special Repository</strong>로 분류된다.

![special repository.png](https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-02-04-PROJECT/special+repository.png)

또한 해당 저장소의 `README.md` 파일은 본인 프로필의 메인 화면에 노출되어 개발자들의 개성을 드러내는 공간으로 활용된다.

이 <strong>Special Repository</strong>는 일반 저장소들과 동일한 기능들이 마찬가지로 제공되므로 여러 방법으로 활용할 수 있다. 간단한 이벤트 함수 코드를 작성하고 Github Action을 사용하여 이벤트 함수를 매일 지정한 시간에 동작시켜 블로그 RSS 피드를 가져와 `README.md` 파일을 갱신하는 계획을 갖고 구현을 해보았다.

<br>
<br>

#### 2-1. Special Repository Clone

---

사실 구현해야 할 코드가 간단하므로 클론을 통해 로컬로 프로젝트를 통째로 가져올 이유는 없다. (취향에 따라 로컬에 작성한 파일들을 직접 Special Repository에 업로드해도 무방하다.)

나는 `README.md` 파일만 존재하는 상태의 <strong>Special Repository</strong>를 클론하여 로컬로 가져 온 뒤 CLI 명령으로 작업을 진행하였다.

<br>
<br>

#### 2-2. 이벤트 함수 코드 작성

---

익숙한 언어를 활용하기 위해 `node.js` 기반으로 동작하게끔 `.js`로 이벤트 함수를 간단히 작성하였다.

많은 라이브러리를 설치할 예정은 아니므로 로컬 프로젝트 저장소 내에 아래 명령어로 패키지 매니저를 사용할 수 있도록 간단히 초기화를 진행한 뒤 아래 패키지들을 설치해주었다.

> npm init -y
>
> npm i dotenv
>
> npm i rss-parser

<br>

또한 이벤트 함수 코드를 작성하기 위해 `readme.js` 파일을 추가해주었다. (파일명은 자유롭게 작성해도 된다.) 위 과정을 마치면 아래와 같은 저장소 구조를 갖게 된다.

![readmejs.png](https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-02-04-PROJECT/readmejs.png)
<br>
<center><strong>node_modules 폴더는 저장소 업로드 전 삭제하였다. ❌</strong></center><br><br>

그 후 아래의 코드를 `readme.js` 파일에 작성해 주었다.

```javascript
import dotenv from 'dotenv';
import Parser from 'rss-parser';
import { readFileSync, writeFileSync } from 'node:fs';

dotenv.config(); // .env 파일 로드

const README_PATH = 'README.md';
const RSS_FEED_URL = process.env.RSS_FEED_URL || 'https://blog.jh8459.com/rss';
const SECTION_HEADER = process.env.SECTION_HEADER || '## 📚 &#160;Blog Posts';
const INSERT_MARKER = process.env.INSERT_MARKER || '<br>\n\n---';

// 날짜 변환 함수: EX "Fri, 17 Jan 2025 00:00:00 GMT" → "2025/01/17"
function formatPubDate(pubDate) {
  try {
    const date = new Date(pubDate);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // 월(1~12)
    const day = String(date.getUTCDate()).padStart(2, '0'); // 일(01~31)

    return `${year}.${month}.${day}`;
  } catch (error) {
    console.error('날짜 변환 중 오류 발생:', error);
    return ''; // 오류 발생 시 빈 문자열 반환
  }
}

// RSS 피드에서 최신 블로그 글 목록을 가져오는 함수
async function fetchRecentPosts(feedUrl, limit = 5) {
  try {
    const parser = new Parser({ headers: { Accept: 'application/rss+xml, application/xml, text/xml; q=0.1' } });
    const feed = await parser.parseURL(feedUrl);

    return feed.items
      .slice(0, limit)
      .map(({ title, link, pubDate }) => {
        const formattedDate = formatPubDate(pubDate);
        return `- [${title}](${link}) - ${formattedDate}`;
      })
      .join('\n');
  } catch (error) {
    console.error('RSS 피드 파싱 중 오류 발생:', error);
    return ''; // 오류 발생 시 빈 문자열 반환
  }
}

// README.md 파일의 내용을 읽어오는 함수
function readReadme(filePath) {
  try {
    return readFileSync(filePath, 'utf8');
  } catch (error) {
    console.error('README.md 파일을 읽는 중 오류 발생:', error);
    return ''; // 오류 발생 시 빈 문자열 반환
  }
}

// README.md 파일을 업데이트하는 함수
function updateReadme(filePath, newPosts) {
  if (!newPosts) return;

  let content = readReadme(filePath);

  if (content.includes(INSERT_MARKER)) {
    const sectionRegex = new RegExp(`${SECTION_HEADER}[\\s\\S]*?(?=\n${INSERT_MARKER})`, 'm');

    if (content.match(sectionRegex)) {
      // 기존 SECTION_HEADER가 존재하는 경우, 내용을 교체
      content = content.replace(sectionRegex, `${SECTION_HEADER}\n\n${newPosts}`);
    } else {
      // SECTION_HEADER가 존재하지 않는 경우, 새롭게 추가
      content = content.replace(INSERT_MARKER, `\n${SECTION_HEADER}\n\n${newPosts}\n${INSERT_MARKER}`);
    }

    try {
      writeFileSync(filePath, content, 'utf8');
      console.log('✅ README.md 업데이트 완료');
    } catch (error) {
      console.error('README.md 파일을 저장하는 중 오류 발생:', error);
    }
  } else {
    console.error('⚠️ README.md에서 삽입할 위치를 찾을 수 없습니다.');
  }
}

// 실행 함수
(async function main() {
  const recentPosts = await fetchRecentPosts(RSS_FEED_URL);
  updateReadme(README_PATH, recentPosts);
})();
```

<br>

작성한 코드는 주석을 통해 설명해두었으며 이 중 아래 변수들은 다음과 같은 주요한 기능들을 담당한다.

1. `RSS_FEED_URL`: 본인 블로그의 RSS 피드 URL 주소.

2. `SECTION_HEADER`: 추가될 헤더 문자열.
  
    - ⚠️ `SECTION_HEADER`에 담긴 문자열이 `README.md` 파일 내부 존재유무에 따라 최종 결과물에 영향을 미치므로 중복된 문자열이 존재하면 안된다.

3. `INSERT_MARKER`: 블로그 최신 글 목록이 삽입할 위치에 해당하는 문자열.

    - ⚠️ `INSERT_MARKER`는 반드시 `README.md` 파일 내부 존재해야 하며, 해당 문자열이 블로그 최신 글 목록으로 치환된 후 `INSERT_MARKER`가 뒤에 다시 삽입된다.

<br>

이벤트 함수 작성이 끝난 뒤 작성한 이벤트 함수가 간단한 스크립트로 실행될 수 있도록 `package.json` 파일을 수정하였다.

```json
{
  "name": "blog-rss-parser",
  "version": "1.0.0",
  "description": "블로그 RSS를 사용해서 깃허브 프로필에 최신 포스팅을 자동으로 업데이트합니다.",
  "main": "index.js",
  "type": "module", // 프로젝트 단위로 ES 모듈 적용
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node readme.js" // 작성한 파일명과 동일하게 수정
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "dotenv": "^16.4.7",
    "rss-parser": "^3.13.0"
  }
}
```

<br>
<br>

#### 2-3. Github Action 스크립트 작성

---

마지막으로 Github Action 스크립트(`cron_action.yml`)를 작성하기 이전에 저장소 설정에 들어가서 환경 변수 설정을 해주어야 한다.

![setting.png](https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-02-04-PROJECT/setting.png)
<br>
<center><strong>GA_PAT는 "Personal Access Token" 을 의미한다.</strong></center><br><br>

스크립트는 위 이벤트 함수가 매일 정해진 시간에 동작될 수 있도록 구현하였다.

```yml
name: cron_action

on:
  schedule:
    - cron: '0 15 * * *'
  push:
    branches:
      - master

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20.18.0'
          cache: 'npm'
        env:
          GH_PAT: ${{ secrets.GH_PAT }}
      - run: npm install
      - run: |
          touch .env
          echo RSS_FEED_URL=${{ secrets.RSS_FEED_URL }} >> .env
          echo SECTION_HEADER=${{ secrets.SECTION_HEADER }} >> .env
          echo INSERT_MARKER=${{ secrets.INSERT_MARKER }} >> .env

      - name: Start application
        run: |
          npm run start &
          sleep 10

      - name: Commit README
        run: |
          git config --local user.name 'BLOG-RSS-PARSER [BOT]'
          git config --local user.email 'JH8459@example.com'
          if [ -n "$(git status --porcelain README.md)" ]; then
            git add README.md
            git commit -m 'Update README.md by BLOG-RSS-PARSER [BOT]'
            git push
          else
            echo "No changes to commit."
          fi

      - name: Terminate workflow
        run: echo "Workflow finished after 10 seconds!"

```

<br>

액션의 동작 조건이 코드가 `master` 브런치에 업로드 되는 경우와 특정 시간대 2가지이므로 테스트 또한 간단히 진행이 가능했다.

<br>
<br>

## 🤔 Understanding

결론적으로 아래와 같은 깃허브 프로필 결과물을 얻을 수 있었다.

![profile.png](https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-02-04-PROJECT/profile.png)

개발 문화 중 가장 멋지다 생각이 드는건 창작을 하는 집단 중 가장 개방적인 집단이라는 점이다.

고로 이번 포스팅의 목적 또한 나와 같은 고민을 하는 이가 있다면 조금이라도 도움이 되고자 되도록 간단하고 유연한 구조로 구현하려 노력해보았다. 하지만 아무래도 각기 다른 깃허브 프로필이 존재하므로 모두 대응할 순 없을꺼라 생각한다.

거창하진 않지만 블로그 유입에 도움이 되지 않을까? 라는 생각이 든 김에 만들어 본 토이 프로젝트이다.

<br>
<br>

```toc

```