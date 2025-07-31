---
emoji: 🔥
title: E2E 테스트 설계와 테스트 자동화
date: '2025-04-29'
author: JH8459
categories: Project
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-04-29-PROJECT/thumbnail.png"/>

<br>

## E2E 테스트 설계와 테스트 자동화

이전 포스팅 중 개인 서버에 CI/CD 구축한 과정을 소개한적이 있다.

> [EC2에서 NAS로, 개인 서버 CI/CD 자동화](https://blog.jh8459.com/2025-03-31-PROJECT/)에서는 EC2 환경에서 Synology NAS로 이전하며 개인 서버에서도 CI/CD 파이프라인을 자동화한 과정을 공유했었다.

<br/>

하지만 변경된 코드가 정상적으로 동작하는지를 보장하지 못한다면 빌드·배포의 자동화는 그 의미가 많이 퇴색된다 생각한다. **(새로 배포된 코드로 인해 장애가 발생한다면..👀 ??)**

코드의 품질을 테스트하는 방법에는 여러 접근 방식이 있다. (한 가지 정답이 있다고는 생각하지 않는다.)

오늘은 어떤 접근 방식으로 코드와 서비스의 품질을 검증할 수 있을지에 대한 나만의 방향성을 정리하고 이 과정을 CI 단계에서 E2E 테스트를 선행하도록 구조를 확장하게 된 경험을 최대한 간단히 정리해서 남겨 보려한다.

<br>
<br>

### 1. E2E 관점에서 본 코드 품질 테스트

---

작년까지만 해도 각각의 서비스나 유틸리티 함수가 의도한 대로 동작하는지를 검증하는 테스트를 만들기 위해 노력했었다.

> 예전 포스팅 중 [테스트 커버리지 (Feat. SLASH 21)](https://blog.jh8459.com/2024-07-15-TIL/)때만 회고해보아도 단순히 높은 커버리지를 구현해보려 노력한 내 자신을 찾아볼 수 있다. 🥲

<br/>

하지만 프로젝트가 점차 복잡해지고 다양한 외부 요인(DB, Redis, 외부 API 등)등에 통합되면서 단순히 코드 단위로만 검증하는 방식에 한계를 느끼게 되었다. 로컬 환경에서는 문제가 없이 테스트도 통과한 코드가 실제 환경에서는 DB 연결 문제 혹은 외부 API 응답 오류 등으로 장애를 발생시키는 경우가 발생했기 때문이다.

단위 테스트 만으로는 각 모듈이 고립되어 제대로 동작하는지를 검증할 뿐 “전체 시스템이 유기적으로 작동하는지”까지는 보장해주지 않는다는 것을 절감하게 됐다.

이런 경험을 통해 단순히 코드 하나하나가 잘 돌아가는지가 아니라 서비스 전체 플로우가 정상적으로 동작하는지를 검증하는 테스트가 필요하다고 확신하게 되었다.

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-04-29-PROJECT/e2e.png"/>
<br><br>

이런 문제 의식을 갖게되니 자연스럽게 “E2E(End-to-End) 테스트”에 관심을 갖게 되었다.

단순히 API가 응답하는지만 보는 것이 아니라, 실제로 DB에 데이터를 저장하고 Redis에 캐시를 갱신하며 외부 API와 요청을 주고 받는 전체 흐름을 검증하고자 노력했다. 따라서 가능한 많은 실제 자원(DB, Redis)을 운영 환경과 동일한 환경의 테스트 컨테이너로 구동하여 로컬과 CI 환경에서도 실제 서비스에 근접한 환경으로 테스트하도록 방향을 잡았다.

결국, 단순히 “코드에 에러는 없는가”를 넘어서 <strong>“전체적으로 문제없이 동작하는가”</strong>를 검증하는 것이 진정한 품질 보장이라는 생각에 이르게 되었다.

<br>
<br>

### 2. Mocking vs 실제 자원 사용 기준

---

테스트 코드를 작성할 때 가장 고민스러웠던 지점 중 하나는 **“어디까지를 실제로 호출할 것인가?”** 였다. 실제 서비스 흐름을 따라가는 E2E 테스트를 지향한다고 아래와 같은 경우는 분명히 발생할 수 있기 때문이다.

- 별도의 인증(2fa)이 필요하거나 요금이나 이용 횟수 제한이 있는 API 호출이 필요한 경우.
- 예외 상황을 만들어내기 어려운 조건(ex. token 만료 등)이 필요한 경우.
- 테스트 속도, 비용, 안정성을 고려해 실제 호출된다면 부작용이 발생할 수 있는 경우.

따라서 위 기준으로 실제 자원을 사용하는 경우와 목킹(Mocking)을 사용하는 경우를 나누어 실제 호출 여부를 판단했다.

<br>
<br>

오늘 예시로 설명할 [LOTTERY 🍀](https://blog.jh8459.com/2024-07-01-PROJECT/) 프로젝트의 실제 자원을 사용하는 경우와 목킹(Mocking)을 사용하는 경우는 아래와 같다.

<br>

> **[실제 자원을 사용하는 기준]**
>
> - DB, Redis는 테스트 컨테이너로 별도로 구동되며 실제 데이터를 읽고 쓰는 테스트를 진행한다.
> - Slack Webhook 또는 이메일 발송처럼 사용자 알림과 연관된 기능은 실제 전송은 하지 않지만 전송 직전까지의 흐름을 검증한다.
> - API 요청/응답 구조, Slack 명령어 및 액션 흐름과 DB 저장 이후 Slack 전송 등 비즈니스 플로우는 실제 자원들과 연결된 상태로 테스트한다.

<br>

> **[Mocking이 필요한 기준]**
>
> - Slack OAuth, GitHub API와 같이 인증이 필요한 API는 mocking으로 대체하였다.
> - 예외 상황을 만들어내기 어려운 조건들(ex. Slack API 호출 실패)은 mocking을 통해 시나리오를 구성했다.

<br>
<br>

### 3. 테스트 자동화 구축 과정

---

E2E 테스트를 수동으로만 돌려보는 수준이라면 테스트의 신뢰도는 점점 떨어질 수 있다 생각했다. **(개발자가 실수 혹은 악의적인 의도를 갖고 테스트를 실행을 안했다면..? 👀)**

테스트가 항상 유의미하기 위해서는 파이프라인에 자연스럽게 녹아들어야 한다고 생각했고 실제로 그렇게 구성해보려 노력하였다. 내가 설계한 테스트 자동화는 다음과 같은 흐름으로 동작한다.

<br>
<br>

#### 3-1. 테스트용 컨테이너 구성

---

E2E 테스트 환경은 실제 서비스와 동일한 구성의 DB(MariaDB), Redis를 담은 `docker-compose.test.yml`로 시작된다. 이 컨테이너들은 테스트 실행 직전에 자동으로 띄워지며 테스트 종료 후 다음 테스트 시 영향을 주지 못하도록 자동으로 정리된다.

```yml
services:
  lottery_test_db:
    image: mariadb:latest
    container_name: lottery_test_db
    environment:
      MYSQL_ROOT_PASSWORD: ${DB_PASSWORD}
      MYSQL_DATABASE: ${DB_DATABASE}
      MYSQL_PASSWORD: ${DB_PASSWORD}
    ports:
      - ${DB_PORT}:3306
    command: --default-authentication-plugin=mysql_native_password

  lottery_test_redis:
    image: redis:latest
    container_name: lottery_test_redis
    ports:
      - ${REDIS_PORT}:6379
```

<br>

위 컨테이너들은 `packge.json`의 **npm run test** 스크립트 명령으로 E2E 테스트 전 먼저 구동되어 테스트 환경을 먼저 구성한다.

```json
"scripts": {
  "build": "nest build",
  "start:dev": "nest start --watch",
  "start:prod": "node dist/main",
  "test": "npm run test:docker:start && npm run test:e2e || (echo '❌ E2E 테스트 실패' && exit 1)",
  "test:e2e": "cross-env API_NODE_ENV=test jest --config jest-e2e.json --forceExit",
  "test:cov": "npm run test:docker:start && jest --config jest-e2e.json --coverage",
  "test:docker:start": "docker compose --env-file .env.test -f docker-compose.test.yml up -d"
},
```

<br>
<br>

#### 3-2. GitHub Actions CI 구성

---

CI 파이프라인은 다음의 순서를 따릅니다.

1. `.env.test` 파일을 생성
2. `docker-compose.test.yml`을 통해 DB/Redis 컨테이너 실행
3. E2E 테스트 실행
4. 테스트 성공 시에만 이후 Build & Deploy 단계 진행

```yml
name: CI & CD

on:
  push:
    branches: [master]

jobs:
  test:
    name: E2E Tests
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20.11.0'

      - name: Install dependencies
        working-directory: ./api
        run: npm install

      - name: Create .env.test
        working-directory: ./api
        run: |
          [ -f ./.env.test ] && rm ./.env.test
          cat <<EOF > .env.test
          DB_HOST=${{ secrets.TEST_DB_HOST }}
          DB_PORT=${{ secrets.TEST_DB_PORT }}
          DB_USER=${{ secrets.TEST_DB_USER }}
          DB_PASSWORD=${{ secrets.TEST_DB_PASSWORD }}
          DB_DATABASE=${{ secrets.TEST_DB_DATABASE }}
          API_SERVER_PORT=${{ secrets.API_SERVER_PORT }}
          ... (생략)
          EOF

      - name: Start docker-compose.test.yml (DB + Redis)
        working-directory: ./api
        run: docker compose --env-file .env.test -f docker-compose.test.yml up -d

      - name: Run Tests
        working-directory: ./api
        run: npm run test

  build:
    name: Build Docker Images
    needs: test
    runs-on: ubuntu-latest

    ... (후략)
```

<br>
<br>

E2E 테스트가 실패하면 이후 Build 또는 Deploy는 실행되지 못한다. 이를 통해 CI 파이프라인에서 <strong>“코드 품질이 보장된 경우에만 배포”</strong>가 이루어지도록 제어했다.

<br>
<br>

### 4. 테스트 자동화가 가져온 안정성

---

테스트 자동화를 구축하기 전에는 코드가 머지되고 배포되어도 “배포는 잘 됐는데 동작이 안 되면 어쩌지?” 같은 걱정은 해소되지 못하였다. <del>(사실 이 감정은 아직 여전히 느끼고 있다. 🥲)</del> 하지만, CI/CD 파이프라인 안에 E2E 테스트를 녹여낸 이후로는 단순한 배포 성공을 넘어 실제 서비스의 핵심 흐름이 정상 동작하는지까지 사전에 검증할 수 있게 되어 이 불안감은 조금 줄어들지 않았나 싶다.

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-04-29-PROJECT/action.png"/>

<center>그래도 불안감은 <del>조금</del> 해소되었다. 💦</center>
<br><br>

그 외에도 E2E 테스트는 **“어떤 시나리오가 정상 흐름인지”** 코드로 남긴다는 점에서 테스트 코드 자체가 문서 역할을 하게되었다. 이 덕분에 인수인계 혹은 비즈니스 요구사항을 수정할때 커뮤니케이션도 더 명확해졌다.

특히, 테스트를 염두에 두고 코드를 작성하다 보니 자연스럽게 코딩 스타일과 사고 방식에도 변화가 생겼다.

- 클래스 별로 책임을 명확히 나누려 노력한다.
- 기능이 많아지면 함수를 쪼개기 위해 노력한다.
- <strong>"이건 테스트하기 어렵겠는데?"</strong>라는 감각(?)이 생겼다.

<br>

가장 큰 변화로는 코드를 작성하다 보면 이제 자연스럽게 “이렇게 만들면 테스트가 힘들겠는데? 🤔“라는 생각이 먼저 들곤 한다. 테스트가 어려운 구조를 보면 즉시 의심하고 좀 더 테스트가 용이한 형태로 바로 리팩토링하려고 노력하게 되었다.

<br>
<br>

## 🤔 Understanding

코드나 서비스의 품질 테스트는 다양한 접근 방식으로 많이 할수록 좋다 생각한다. <del>"E2E 테스트가 유일한 정답이다..!" 취지로 이번 포스팅을 작성한게 아니다..🙏</del>

다만, 주어진 시간안에서 서비스의 품질을 효율적으로 책임지기 위해 고안해낸 주관적인 의견이므로 이 방법이 유일한 정답이다라고 말하고 싶지 않다. 팀의 구성원이 적고 요구사항이 빠르게 변하기 때문에 전체적인 E2E 테스트 위주로 품질을 검증하는 방법을 택하였을 뿐이다.

테스트 코드들을 작성해나가며 느낀바로는, 어떤 테스트 전략이던지 테스트는 번거롭고 시간이 오래 걸리는게 아닌 품질을 보증하는 가장 빠른 길이라는 것이다. 

미리 실패하고 미리 위험 요인들을 발견하는 것이 가장 중요하다 생각한다.

<br>
<br>

```toc

```
