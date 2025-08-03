---
emoji: 📚
title: Docker Compose와 Traefik을 활용한 Blue/Green 배포 전략
date: '2025-03-16'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

사내 인프라는 비교적 성능이 좋은 서버를 사용하고 있다. <del>(수평적 확장이 힘들어서.. 🥲)</del> 그렇기에 초기 인프라를 구성할 땐 리소스 부족에 허덕이진 않고있다. (다만, 요청이 급증할꺼라 예상될 때 수평적으로 확장하기는 쉽지 않다.)

이러한 바탕을 토대로 온프레미스 환경에서 Docker Compose로 Blue/Green 배포 전략을 구현한 과정을 간략히 포스팅으로 남기려한다.

<br>
<br>

### 1. Blue/Green 배포란?

---

간단히 소개하자면, 여러 무중단 배포 기법 중 하나이며 두 개의 독립적인 환경 Blue(구버전) 환경과 Green(신버전) 환경을 가지고 진행되는 배포 전략이다.

<br>

![blue/green](https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-16-TIL/blue_green.jpg)

<center>출처 : <a href="https://www.samsungsds.com/kr/insights/1256264_4627.html" target="_blank">무중단 배포 아키텍처(Zero Downtime Deployment)- 글로벌 서비스 운영의 필수 요소
</a></center><br><br>

구버전이 운영되는 동안 신버전의 인스턴스를 구성한 후 로드밸런서를 통해 신버전으로 모든 트래픽을 일시에 전환하는 배포 방식이다.

신버전에 문제가 생기는 경우 로드밸런서의 라우팅만 구버전으로 변경해주면 손 쉽게 롤백이 가능한 장점 또한 있지만 그 만큼 리소스를 많이 사용한다. (동일한 환경으로 같은 수의 인스턴스가 추가로 필요하다.)

사용한 만큼 지불하는 서버리스 컴퓨팅 환경이라면 채택 못할거같다. 🥲

<br>
<br>

### 2. Docker Compose

---

Docker Compose로 구성하는 컨테이너 오케스트레이션은 최소한의 복잡성으로 패키지된 컨테이너들을 쉽게 운용할 수 있고 이식성 또한 뛰어나기에 현재 사내 인프라 구조에서 사용하기 알맞는다 생각한다.

이번 배포 전략 예시 또한, 여러 컨테이너들을 Docker Compose 환경으로 구성하여 적절한 Bash 스크립팅으로 `traefik` 서비스에서 라우팅을 조절하는 방법으로 Blue/Green 배포 전략을 구현하였다.

우선 샘플 `docker-compose.yml` 파일을 살펴보면 다음과 같이 구성하였다. (하나하나 천천히 살펴 볼 예정이다.)

<br>

```yaml
services:
  traefik:
    image: traefik:latest
    command:
      - --log.level=ERROR
      - --providers.docker=true
      - --providers.docker.watch=true
      - --providers.docker.exposedbydefault=false
      - --entrypoints.web.address=:3000
      - --entrypoints.web.forwardedHeaders.insecure=true
      - --providers.file.filename=/etc/traefik/dynamic-config.yml
      - --providers.file.watch=true
    ports:
      - "3000:3000"
    restart: always
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./dynamic-config.yml:/etc/traefik/dynamic-config.yml
    networks:
      - net_default

  web-server-blue: &web-server-template
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./src:/myfolder/src
    env_file:
      - ./.env
    restart: always
    deploy:
      replicas: 2
    labels:
      - traefik.enable=true
      - traefik.http.services.web-server-blue.loadbalancer.server.port=3000
    healthcheck:
      test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
      interval: 30s
      timeout: 10s
      retries: 5
      start_period: 30s
    networks:
      - net_default

  web-server-green:
    <<: *web-server-template
    labels:
      - traefik.enable=true
      - traefik.http.services.web-server-green.loadbalancer.server.port=3000

networks:
  net_default:
    driver: bridge
```

<br>
<br>

#### 2-1. traefik

---

`traefik` 컨테이너는 로드밸런서 역할을 담당함으로써 구버전 환경과 신버전 환경에 현재 배포 요청에 알맞는 라우팅 정책을 담당할 예정이다.

- `dynamic-config.yml` 파일을 제어해서 동적으로 라우팅을 변경할 예정이므로 해당 파일 볼룸을 꼭 설정해주자.

<br>

```yaml
traefik:
  image: traefik:latest
  command:
    - --log.level=ERROR
    - --providers.docker=true  #Docker 컨테이너에서 실행 중인 서비스들을 자동으로 감지하도록 설정
    - --providers.docker.watch=true  #Docker에서 새로운 컨테이너가 생성되거나 변경될 경우 자동으로 감지.
    - --providers.docker.exposedbydefault=false  #기본적으로 모든 Docker 컨테이너를 Traefik이 라우팅하지 않도록 설정. (labels를 통해 개별적으로 노출해야 함)
    - --entrypoints.web.address=:3000
    - --entrypoints.web.forwardedHeaders.insecure=true
    - --providers.file.filename=/etc/traefik/dynamic-config.yml  #dynamic-config.yml 파일에서 추가적인 동적 설정을 읽도록 지정.
    - --providers.file.watch=true  #설정 파일(dynamic-config.yml)이 변경되면 자동으로 감지하여 적용하도록 설정.
  ports:
    - "3000:3000"
  restart: always
  volumes:
    - /var/run/docker.sock:/var/run/docker.sock:ro
    - ./dynamic-config.yml:/etc/traefik/dynamic-config.yml
  networks:
    - net_default
```

<br>

`docker-compose.yml` 파일은 컨테이너가 실행될 때만 적용되는 정적인 설정값들이다. 때문에 동적으로 변해야 하는 라우팅 대상은 현재 운영 중인 버전(Blue / Green)이 무엇인지를 확인해서 배포가 될 때마다 변환되어야 한다.

동적 라우팅 변경은 `dynamic-config.yml` 파일을 Bash 스크립트에서 자동으로 생성 및 수정이 되게끔 구성하여 라우팅 정책을 제어할 예정이다.

따라서 아래의 설정값이 반드시 반영되어야한다.

```yaml
- --providers.file.filename=/etc/traefik/dynamic-config.yml  #dynamic-config.yml 파일에서 추가적인 동적 설정을 읽도록 지정.
- --providers.file.watch=true  #설정 파일(dynamic-config.yml)이 변경되면 자동으로 감지하여 적용하도록 설정.
```

<br>
<br>

#### 2-2. web-server

---

`web-server` 서비스들은 예시로 `replicas`를 2개로 구성해 두었다. 즉, 각각 2개의 컨테이너씩 Blue / Green 환경이 존재한다고 가정했다.

- 동일한 환경으로 구성해야하므로 Blue 컨테이너를 템플릿으로 구성하여 Green 컨테이너에 사용하였다.
- 샘플에서는 `Dockerfile`을 사용해서 Bash 스크립트에서 직접 빌드하여 배포하였지만, 이는 여러가지 방법으로 수정해도 무방하다.

<br>

```yaml
web-server-blue: &web-server-template  #&web-server-template을 사용하여 YAML 앵커(Anchor)로 설정을 저장. → web-server-green이 이 설정을 그대로 가져다 사용할 수 있음.
  build:  #현재 디렉토리(.)에서 Dockerfile을 사용하여 컨테이너 이미지를 빌드함. (이미지 파일을 사용해도 된다.)
    context: .
    dockerfile: Dockerfile
  volumes:
    - ./src:/myfolder/src
  env_file:
    - ./.env
  restart: always
  deploy:
    replicas: 2
  labels:
    - traefik.enable=true  #이 컨테이너가 Traefik의 라우팅 대상으로 포함되도록 설정.
    - traefik.http.services.web-server-blue.loadbalancer.server.port=3000
  healthcheck:
    test: ['CMD', 'curl', '-f', 'http://localhost:3000/health']
    interval: 30s
    timeout: 10s
    retries: 5
    start_period: 30s
  networks:
    - net_default

web-server-green:
  <<: *web-server-template  #web-server-green은 web-server-blue와 같은 이미지, 볼륨, 네트워크 등을 사용.
  labels:
    - traefik.enable=true
    - traefik.http.services.web-server-green.loadbalancer.server.port=3000
```

<br>
<br>

#### 2-3. 배포 스크립트

---

위에서 작성이 완성된 `docker-compose.yml` 파일을 `docker compose up --build -d` 명령어로 실행하면 Blue / Green 서비스마다 컨테이너가 2개씩 생성된다.

이는 의도한바가 아니므로 Bash 스크립트로 현재 타겟 서비스가 무엇인지 확인하며 라우팅 대상을 변경하는 방식으로 배포가 이뤄진다.

<br>

```bash
#!/bin/bash
# 환경 변수 설정
DYNAMIC_CONFIG="dynamic-config.yml"
COMPOSE_FILE="docker-compose.yml"
DOMAIN="localhost"
SERVICE="web-server"
BLUE_SERVICE="web-server-blue"
GREEN_SERVICE="web-server-green"
PORT=3000
REPLICAS=2

# 1️⃣ dynamic-config.yml 파일(동적 라우팅 담당)이 없으면 생성
if [ ! -f "$DYNAMIC_CONFIG" ]; then
  echo "⚠️ $DYNAMIC_CONFIG 파일이 존재하지 않습니다. 기본값으로 생성합니다."
  cat > $DYNAMIC_CONFIG <<EOL
http:
  routers:
    $SERVICE:
      entryPoints:
        - "web"
      rule: "Host(\$DOMAIN\)"
      service: "$BLUE_SERVICE"

  services:
    $BLUE_SERVICE:
      loadBalancer:
        servers:
          - url: "http://$BLUE_SERVICE:$PORT"

    $GREEN_SERVICE:
      loadBalancer:
        servers:
          - url: "http://$GREEN_SERVICE:$PORT"
EOL
  echo "✅ 기본 $DYNAMIC_CONFIG 파일이 생성되었습니다."
fi

# 2️⃣ 현재 실행 중인 서비스 확인
BLUE_RUNNING=$(docker ps --filter "name=$BLUE_SERVICE" --format "{{.Names}}" | wc -l)
GREEN_RUNNING=$(docker ps --filter "name=$GREEN_SERVICE" --format "{{.Names}}" | wc -l)

FIRST_DEPLOY=false
if [ "$BLUE_RUNNING" -eq 0 ] && [ "$GREEN_RUNNING" -eq 0 ]; then
  echo "🆕 최초 배포입니다. Blue 서비스부터 시작합니다."
  TARGET_SERVICE=$BLUE_SERVICE
  OLD_SERVICE=""
  FIRST_DEPLOY=true
else
  # 3️⃣ dynamic-config.yml에서 OLD_SERVICE 가져오기
  OLD_SERVICE=$(grep "service:" $DYNAMIC_CONFIG | awk -F'"' '{print $2}')

  if [ -z "$OLD_SERVICE" ]; then
    echo "❌ 현재 라우팅된 서비스 정보를 가져오지 못했습니다. 배포를 중단합니다."
    exit 1
  fi

  # 4️⃣ 현재 실행 중인 컨테이너 확인하여 OLD_SERVICE가 아닌 컨테이너 찾기
  if [ "$OLD_SERVICE" == "$BLUE_SERVICE" ]; then
    TARGET_SERVICE=$GREEN_SERVICE
  else
    TARGET_SERVICE=$BLUE_SERVICE
  fi

  echo "🔄 현재 라우팅된 서비스: $OLD_SERVICE"
  echo "🚀 새로운 배포 대상 서비스: $TARGET_SERVICE"
fi

# 5️⃣ 새로운 서비스 빌드
echo "🚀 Building the new version of the service: $TARGET_SERVICE..."
docker compose -f $COMPOSE_FILE build $TARGET_SERVICE

# 6️⃣ 새로운 컨테이너 실행
echo "🚀 Deploying new service: $TARGET_SERVICE with $REPLICAS replicas..."
if [ "$FIRST_DEPLOY" = true ]; then
  docker compose -f $COMPOSE_FILE up -d --scale $BLUE_SERVICE=$REPLICAS --scale $GREEN_SERVICE=0
else
  docker compose -f $COMPOSE_FILE up -d --scale $TARGET_SERVICE=$REPLICAS
fi

# 7️⃣ 새로운 서비스 Health Check
echo "🛠️ Checking health status of $TARGET_SERVICE..."
sleep 10  # 안정화 시간

for i in {1..12}; do
  HEALTHY_COUNT=$(docker ps --filter "name=$TARGET_SERVICE" --filter "health=healthy" --format "{{.Names}}" | wc -l)

  if [ "$HEALTHY_COUNT" -gt 0 ]; then
    echo "✅ New service $TARGET_SERVICE is healthy!"
    break
  fi

  echo "⏳ Waiting for $TARGET_SERVICE to be healthy... ($i/12)"
  sleep 10
done

if [ "$HEALTHY_COUNT" -eq 0 ]; then
  echo "❌ New service $TARGET_SERVICE failed to start properly. Rolling back..."
  docker compose -f $COMPOSE_FILE down $TARGET_SERVICE
  exit 1
fi

# 8️⃣ `dynamic-config.yml` 업데이트 (새로운 서비스로 라우팅 변경)
echo "🔄 Updating dynamic-config.yml to point to $TARGET_SERVICE..."
cat > $DYNAMIC_CONFIG <<EOL
http:
  routers:
    $SERVICE:
      entryPoints:
        - "web"
      rule: "Host(\`$DOMAIN\`)"
      service: "$TARGET_SERVICE"

  services:
    $BLUE_SERVICE:
      loadBalancer:
        servers:
          - url: "http://$BLUE_SERVICE:$PORT"

    $GREEN_SERVICE:
      loadBalancer:
        servers:
          - url: "http://$GREEN_SERVICE:$PORT"
EOL

# 9️⃣ Traefik이 설정을 자동 감지하도록 트리거
echo "♻️ Triggering Traefik reload..."
touch $DYNAMIC_CONFIG

echo "🎉 Deployment complete!"
```

<br>

각각 프로젝트마다 고유한 값들은 환경 변수로 만들어 두었으며 스크립트를 간단히 설명하자면 아래의 순서대로 스크립트가 실행되며 Blue / Green 배포가 진행된다.

1. 스크립트가 실행된 디렉토리에 `dynamic-config.yml` 파일이 존재하는지 감지하고 없다면 기본 라우팅 정책(Blue 환경 우선 라우팅)을 담은 파일을 생성한다.
2. 현재 실행 중인 Blue / Green 컨테이너들을 확인 후 최초 배포가 이뤄지는 경우인지 확인한다.
3. 최초 배포가 진행되는 경우라면 Blue 환경으로 배포를 진행한다. (Green 환경은 배포하지 않는다.)
4. 최초 배포가 진행되는 경우가 아니라면 운영 중인 `dynamic-config.yml` 파일을 확인하여 현재 라우팅 중인 컨테이너(OLD_SERVICE) 정보를 가져온다.
5. 새로운 서비스를 빌드한다.
6. 빌드된 이미지로 새로운 컨테이너(TARGET_SERVICE)를 실행한다.
7. 새로운 컨테이너의 Health Check를 기다린다. (실패시 TARGET_SERVICE 컨테이너를 삭제 후 스크립트를 종료)
8. `dynamic-config.yml`의 라우팅 대상을 업데이트 한다. (OLD_SERVICE → TARGET_SERVICE)
9. 설정 파일의 변경을 자동으로 감지할 수 있도록 `dynamic-config.yml` 파일을 수정한다.

<br>
<br>

위 순서대로 동작하므로 신버전(TARGET_SERVICE)이 배포되고 안정화 되는 동안 구버전(OLD_SERVICE)이 트래픽을 받을 수 있으므로 무중단 배포가 가능하며, Blue / Green 환경이 모두 공존하므로 손 쉽게 롤백 또한 가능하다.

<br>
<br>

#### 2-4. 라우팅 정책 변경 스크립트

---

신버전(TARGET_SERVICE)이 새로 배포가 되었다면, 구버전(OLD_SERVICE) 환경은 더이상 트래픽을 받지 못하는 유휴 컨테이너들로 존재한다.

이 경우에 새로 배포한 환경에서 문제가 발생했다면 구버전(OLD_SERVICE) 환경으로 라우팅 정책만 변경하면 손 쉽게 롤백이 가능하다.

<br>

```bash
#!/bin/bash
# 환경 변수 설정
DYNAMIC_CONFIG="dynamic-config.yml"
COMPOSE_FILE="docker-compose.yml"
DOMAIN="localhost"
SERVICE="web-server"
BLUE_SERVICE="web-server-blue"
GREEN_SERVICE="web-server-green"
PORT=3000

# 1️⃣ 현재 실행 중인 서비스 확인
BLUE_RUNNING=$(docker ps --filter "name=$BLUE_SERVICE" --format "{{.Names}}" | wc -l)
GREEN_RUNNING=$(docker ps --filter "name=$GREEN_SERVICE" --format "{{.Names}}" | wc -l)

# 둘 다 실행 중이어야 라우팅 정책 변경 가능 (둘 중 하나라도 꺼져 있으면 종료)
if [ "$BLUE_RUNNING" -eq 0 ] || [ "$GREEN_RUNNING" -eq 0 ]; then
  echo "❌ Blue와 Green 중 하나라도 실행되지 않으면 라우팅을 변경할 수 없습니다."
  exit 1
fi

# 2️⃣ 현재 dynamic-config.yml에서 OLD_SERVICE 가져오기
OLD_SERVICE=$(grep "service:" $DYNAMIC_CONFIG | awk -F'"' '{print $2}')

# OLD_SERVICE가 설정되지 않았다면 오류 처리
if [ -z "$OLD_SERVICE" ]; then
  echo "❌ 현재 라우팅된 서비스 정보를 가져오지 못했습니다. 라우팅 변경을 중단합니다."
  exit 1
fi

# 3️⃣ OLD_SERVICE가 Blue인지 Green인지 확인하고 반대 서비스로 전환
if [ "$OLD_SERVICE" == "$BLUE_SERVICE" ]; then
  TARGET_SERVICE=$GREEN_SERVICE
else
  TARGET_SERVICE=$BLUE_SERVICE
fi

echo "🔄 현재 운영 중인 서비스: $OLD_SERVICE"
echo "🚀 새로운 라우팅 대상 서비스: $TARGET_SERVICE"

# 4️⃣ `dynamic-config.yml` 업데이트 (새로운 서비스로 라우팅 변경)
echo "🔄 Updating dynamic-config.yml to roll back to $TARGET_SERVICE..."
cat > $DYNAMIC_CONFIG <<EOL
http:
  routers:
    $SERVICE:
      entryPoints:
        - "web"
      rule: "Host(\`$DOMAIN\`)"
      service: "$TARGET_SERVICE"

  services:
    $BLUE_SERVICE:
      loadBalancer:
        servers:
          - url: "http://$BLUE_SERVICE:$PORT"

    $GREEN_SERVICE:
      loadBalancer:
        servers:
          - url: "http://$GREEN_SERVICE:$PORT"
EOL

# 5️⃣ Traefik이 설정을 자동 감지하도록 트리거
echo "♻️ Triggering Traefik reload..."
touch $DYNAMIC_CONFIG

echo "🎉 Rollback complete! Traffic is now routed to $TARGET_SERVICE."
```

<br>
<br>

### 3. 어려웠던 점

---

가장 많이 기술적으로 시간을 할애한 부분은 Blue 환경이 운영중에 Green 환경 추가로 컨테이너로 배포하면 `traefik`이 자동으로 Green 환경까지 인식하여 트래픽을 보내는 상황을 개선하는 부분이었다.

```yaml
- --providers.docker=true  #Docker 컨테이너에서 실행 중인 서비스들을 자동으로 감지하도록 설정
- --providers.docker.watch=true  #Docker에서 새로운 컨테이너가 생성되거나 변경될 경우 자동으로 감지.
```

`traefik` 컨테이너의 위 두 설정은 반드시 필요하지만 그렇기에 Blue / Green 환경을 독립적인 환경으로 각각 분리하기가 어렵게하는 요인 중 하나였다. 🥲

<br>

최종적으로는 컨테이너마다 Blue / Green 라벨을 부여해서 라우팅을 동적으로 할당하는 방법을 채택하여 사용하였지만, 그 과정이 순탄하지는 않았다.

- <strong>TARGET_SERVICE</strong>로 전달되는 트래픽을 차단 하기 위해 Docker Network를 임시로 연결을 끊는다. → 외부 DB 연결이 끊기며 ORM에서 DB 연결 초기화가 되지 않는 이슈가 발생하며 Health Check를 통과하지 못한다. 😅
- <strong>TARGET_SERVICE</strong>가 새로 배포 후 Health Check를 통과하면 <strong>OLD_SERVICE</strong>를 바로 제거한다. → 수 초 내외로 두 서비스가 공존하는 순간이 발생할 수 밖에 없으며, 이상적인 Blue / Green 배포 전략과는 거리가 멀다. 😅

<br>

생각나는대로 적어보니 위와 같은 경우들이 생각이 난다.

<br>
<br>

## 🤔 Understanding

사실 실제로 가장 많은 시간을 할애한 부분은 기술 검증이었다.

- 유휴 컨테이너들로 인해 리소스 낭비가 발생할 수 밖에 없는데 이는 얼마나 큰 영향을 미치는가?
- 기존에 배포하는 방식(Recreated)에 비해 어떤점이 얼마나 개선하는지에 대한 정량적인 수치화
- 배포 실패시 플랜B 계획

이 외에 무중단 배포를 활용할 수 있는 파이프라인 (Hotfix) 추가 등등.. 개발 외적인 부분들에서 더욱 더 시간과 신경을 많이 썼던거 같다.

<br>
<br>

