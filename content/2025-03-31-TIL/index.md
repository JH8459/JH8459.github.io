---
emoji: 🔥
title: EC2에서 NAS로, 개인 서버 CI/CD 자동화
date: '2025-03-31'
author: JH8459
categories: Project
---

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/banner.png"/>

<br>

## 왜 EC2에서 NAS로 옮기게 되었는가?

사용 중인 NAS의 사용성이 DSM 7.2+ (Synology사의 DS920+ 기준) 부터 많이 달라졌다. 단순히 UI/UX만 변경된것이 아니라 (구)Docker 패키지에서 변경된 <strong>Container Manager 패키지</strong>는 다중 컨테이너 환경을 지원한다.

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/container_manager.jpg"/>

<center>Docker Compose! 😲</center><br><br>

EC2 t2.micro 인스턴스로 사용 중이던 서버에 올려둔 컨테이너 기반의 <a href="https://blog.jh8459.com/2024-07-01-PROJECT/" target="_blank">프로젝트 (LOTTERY 🍀)</a>를 비용 효율적인 측면에서 마이그레이션하기 좋은 기회라 생각했다.

EC2에서 NAS로 마이그레이션하는 과정과 Github Action + Docker Hub를 사용한 CI / CD 구축한 과정 또한 간략히 남겨 보려한다.

<br>
<br>

### 1. CI/CD 파이프라인 구성

---

전반적인 CI/CD는 **Github Action** + **Docker Hub** 를 활용하였으며, CI / CD 나누어 Github 저장소의 브런치를 활용해서 파이프라인을 구성하였다. (CI/CD 모두를 자동화는 아래와 같은 무중단 배포 전략까지 도입 후 수정할 예정이다.)

> 👉 <a href="https://blog.jh8459.com/2025-03-16-TIL/" target="_blank">Docker Compose와 Traefik을 활용한 Blue/Green 배포 전략</a>

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/pipeline.png"/>

<center>전반적인 CI/CD 흐름은 위 사진과 같이 진행된다. 🤖</center><br><br>

1. Local Repository에서 작업한 결과물을 Github 원격 Remote Repository의 `master` 브런치로 Push 한다.
2. `master` 브런치로 Commit이 Push되면 아래의 조건을 갖는 Github Action **(CI)** 이 동작한다.

    ```yml
    name: Build & Push Docker Images (CI)

    on:
      push:
        branches: ['master']
    ...
    ```
3. Github Action Runner를 통해서 `master` 브런치에 올라간 코드를 기반으로 Docker Image가 빌드되고 빌드 성공시 Docker Hub에 Push한다.
4. Github Action **(CI)** 이 성공하면 배포 준비가 완료된 상태이다. 배포가 필요하다면 `prod` 브런치로 PR을 날린다.
5. `prod` 브런치로 PR이 Merge되면 아래의 조건을 갖는 Github Action **(CD)** 이 동작한다.

    ```yml
    name: Deploy to NAS (CD)

    on:
      pull_request:
        branches: ['prod']
    ...
    ```
6. Github Action Runner를 통해서 NAS에 SSH접속이 이뤄지며 운영 환경에 알맞는 `.env` 환경변수 파일을 생성한다.
7. Docker Hub에 올라간 Docker Image를 기반으로 NAS 서버에 배포를 진행한다.

<br>
<br>

### 2. NAS에서 환경 구성

---

위에서 언급한 CI/CD 파이프라인을 구성하려면 NAS에도 아래와 같은 환경 구성이 필요하다.

> 이용 중인 NAS의 OS는 **Ubuntu OS**가 아닌 Synology에서 개발된 자체 OS인 **DSM**을 사용하기 때문에, `sudo apt-get install git` 같은 CLI 명령어가 아닌 DSM 패키지 센터를 통해 아래와 같은 환경을 구성해줘야 한다.

<br>
<br>

#### 2-1. Container Manager 패키지 설치

---

전반적인 <strong>Container Manager</strong>를 활용한 NAS 환경 구성은 서버 포럼의<a href="https://svrforum.com/nas/695302" target="_blank">"이제 시놀로지에서 Docker-compose를(?) DSM 7.2의 Container Mananger"</a>게시글을 보고 구성하였다. 🙏🙏🙏

volume을 설정할때 디렉토리는 추후 **docker-compose.yml** 파일이 수정되는 경우에도 Github 원격 저장소의 `prod` 브런치의 코드를 내려받아 최신화되어야한다. (이를 염두하고 설정하자.)

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/volume.png"/>

<br>
<br>

#### 2-2. Git Server 패키지 설치

---

CLI 명령으로 설치가 안되므로 DSM 패키지 센터의 **Git Server** 패키지를 내려 받아야 한다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/git.png"/>

<br>
<br>

#### 2-3. NAS의 SSH 원격 접속 포트 허용

---

CI/CD 과정에서 Github Action 통해서 NAS로 SSH 접속이 이뤄져야 하므로 해당 옵션을 허용해주자.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/ssh.png"/>

<br>
<br>

#### 2-4. NAS의 역방향 프록시 설정

---

Ubuntu OS에서 웹 서버를 구성할 땐 **traefik** 혹은 **nginx**를 사용하여 역방향 프록시(Reverse Proxy) 서버 구성을 하였지만, DSM 기본 기능인 역방향 프록시 기능을 사용하여 도메인 소스와 NAS 내부 서비스를 맵핑 시켜주었다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/reverse.png"/>

<br>
<br>

#### 2-4. 공유기 포트포워딩 설정

---

홈 네트워크는 보통 공유기를 사용중일텐데 외부망을 통해 NAS에서 실행중인 어플리케이션에 도달하려면 공유기의 포트 포워딩 규칙을 허용해줘야 한다.

어플리케이션이 NAS의 1111번 포트를 사용중이라면 아래와 같은 규칙을 허용해주어야 한다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-31-PROJECT/port.png"/><br>

<br>
<br>

### 3. GitHub Actions 살펴보기

---

기본적으로 **Public** 저장소이기 때문에 노출되면 안되는 값들은 Github Repository에서 제공하는 환경 변수를 통해 변인 요인들을 관리하고 있. 

Github Action은 CI/CD 파이프라인이 모두 자동화되고 있진 않으므로 이미지 빌드를 담당하는 **ci.yml**과 NAS로 원격 접속하여 배포를 진행하는 **cd.yml** 두개로 분리하여 구성하였다.

<br>
<br>

#### 3-1. ci.yml

---

```yml
name: Build & Push Docker Images (CI)

on:
  push:
    branches: [master]

jobs:
  deploy:
    name: CI
    runs-on: ubuntu-latest

    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4

      - name: Set up Docker Buildx
        uses: docker/setup-buildx-action@v3

      - name: Login to DockerHub
        uses: docker/login-action@v3
        with:
          username: ${{ secrets.DOCKERHUB_USERNAME }}
          password: ${{ secrets.DOCKERHUB_PASSWORD }}

      # Build and push API
      - name: Build and Push lottery_api_server Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/lottery_api_server:latest ./api
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/lottery_api_server:latest

      # Build and push Crawler
      - name: Build and Push lottery_crawler_server Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/lottery_crawler_server:latest ./crawler
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/lottery_crawler_server:latest

      # Build and push Website
      - name: Build and Push lottery_website Image
        run: |
          docker build -t ${{ secrets.DOCKERHUB_USERNAME }}/lottery_website:latest ./website
          docker push ${{ secrets.DOCKERHUB_USERNAME }}/lottery_website:latest
```

<br>
<br>

#### 3-2. cd.yml

---

```yml
name: Deploy to NAS (CD)

on:
  pull_request:
    branches: [prod]

jobs:
  deploy:
    name: Deploy to NAS
    runs-on: ubuntu-latest

    steps:
      - name: Connect to NAS via SSH and deploy
        uses: appleboy/ssh-action@v0.1.6
        with:
          host: ${{ secrets.NAS_HOST }}
          username: ${{ secrets.NAS_USER }}
          password: ${{ secrets.NAS_PASSWORD }}
          port: ${{ secrets.NAS_PORT }}
          script: |
            echo "✅ NAS 접속 성공"

            cd /volume1/docker/lottery

            echo "📦 COMMON .env 생성"
            [ -f .env ] && rm .env
            cat <<EOF > .env
            NODE_ENV=${{ secrets.NODE_ENV }}
            API_SERVER_PORT=${{ secrets.API_SERVER_PORT }}
            CRAWLER_SERVER_PORT=${{ secrets.CRAWLER_SERVER_PORT }}
            WEBSITE_PORT=${{ secrets.WEBSITE_PORT }}
            EOF

            echo "📦 API .env 생성"
            mkdir -p ./api
            [ -f ./api/.env ] && rm ./api/.env
            cat <<EOF > ./api/.env
            DB_HOST=${{ secrets.DB_HOST }}
            DB_PORT=${{ secrets.DB_PORT }}
            DB_USER=${{ secrets.DB_USER }}
            DB_PASSWORD=${{ secrets.DB_PASSWORD }}
            DB_DATABASE=${{ secrets.DB_DATABASE }}
            API_NODE_ENV=${{ secrets.API_NODE_ENV }}
            API_SERVER_PORT=${{ secrets.API_SERVER_PORT }}
            API_EMAIL_USERNAME=${{ secrets.API_EMAIL_USERNAME }}
            API_EMAIL_PASSWORD=${{ secrets.API_EMAIL_PASSWORD }}
            API_EMAIL_HOST=${{ secrets.API_EMAIL_HOST }}
            API_EMAIL_PORT=${{ secrets.API_EMAIL_PORT }}
            API_EMAIL_FROM=${{ secrets.API_EMAIL_FROM }}
            API_REDIS_HOST=${{ secrets.API_REDIS_HOST }}
            API_REDIS_PORT=${{ secrets.API_REDIS_PORT }}
            API_SLACK_SIGNING_SECRET=${{ secrets.API_SLACK_SIGNING_SECRET }}
            API_SLACK_BOT_TOKEN=${{ secrets.API_SLACK_BOT_TOKEN }}
            API_SLACK_CLIENT_ID=${{ secrets.API_SLACK_CLIENT_ID }}
            API_SLACK_CLIENT_SECRET=${{ secrets.API_SLACK_CLIENT_SECRET }}
            COMMON_GITHUB_TOKEN=${{ secrets.COMMON_GITHUB_TOKEN }}
            SWAGGER_USERNAME=${{ secrets.SWAGGER_USERNAME }}
            SWAGGER_PASSWORD=${{ secrets.SWAGGER_PASSWORD }}
            EOF

            echo "📦 CRAWLER .env 생성"
            mkdir -p ./crawler
            [ -f ./crawler/.env ] && rm ./crawler/.env
            cat <<EOF > ./crawler/.env
            DB_HOST=${{ secrets.DB_HOST }}
            DB_PORT=${{ secrets.DB_PORT }}
            DB_USER=${{ secrets.DB_USER }}
            DB_PASSWORD=${{ secrets.DB_PASSWORD }}
            DB_DATABASE=${{ secrets.DB_DATABASE }}
            CRAWLER_SERVER_PORT=${{ secrets.CRAWLER_SERVER_PORT }}
            COMMON_GITHUB_TOKEN=${{ secrets.COMMON_GITHUB_TOKEN }}
            EOF

            echo "🌀 GitHub prod 브랜치 코드 최신화"
            git fetch origin
            git reset --hard origin/prod

            echo "📁 필요한 디렉토리 생성"
            mkdir -p ./api/logs ./api/public ./api/resource
            mkdir -p ./crawler/logs ./crawler/public ./crawler/resource
            mkdir -p ./redis-data

            echo "🐳 Docker 이미지 Pull"
            /usr/local/bin/docker-compose pull

            echo "🧨 기존 컨테이너 중지"
            /usr/local/bin/docker-compose down

            echo "🚀 최신 이미지로 컨테이너 재시작"
            /usr/local/bin/docker-compose up -d

            echo "✅ 배포 완료 🎉"
```

<br>
<br>

## 🤔 Understanding

사진이나 중요 자료 백업 목적으로 구매했던 NAS를 다양하게 활용할 수 있는 방법을 알게되었다. (또한, 얼마 안되지만 EC2로 매달 나가는 비용을 아낄 수 있게 되었다.)

NAS의 스펙이 그리 좋지 않기에 훌륭한 서버까진 아니지만, 토이 프로젝트 정도는 거뜬히 소화할 수 있을거같다. (훌륭한 장난감이 생겼다 😀)

EC2에서 Synology NAS로 옮겨온 이번 과정에서 가장 크게 느낀 점은, **결국 중요한 건 도구가 아니라 흐름에 대한 이해**를 하는게 가장 중요하다는 점이었다. 언어나 특정 프레임워크에 종속되지 말고 전반적인 CS 지식을 조금 더 공부해보고 싶어졌다.

<br>
<br>

```toc

```
