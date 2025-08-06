---
emoji: 📚
title: Nest CLI 뜯어보기 (nest start)
date: '2025-03-19'
author: JH8459
categories: TIL
---

![github-blog.png](../../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

`Docker` 파일을 작성할 때 습관처럼 큰 의심없이 아래와 같이 작성하곤한다.

```yaml
...
# 3단계: 빌드
RUN npm run build

CMD ["node", "./dist/main.js"]
```

`package.json`에 별다른 설정을 안해두었다면 아래와 같을꺼라 <strong>npm run start:prod</strong> 명령과 같은 명령어이지만 습관(?)처럼 `Dockerfile`을 작성할 땐 "./dist/main.js"를 직접 실행시키고 있다.

``` json
"scripts": {
  ...
  "start:prod": "node dist/main",
  ...
```

<br>
<br>

프레임워크에서 기본으로 제공하는 <strong>nest start</strong> CLI 명령어 또한 서버를 구동시키는 명령어인데, 빌드된 .js 파일을 직접 실행시키는 것과 어떤 차이가 있을지 궁금해서 찾아본 결과를 간략히 남기려한다.

<br>
<br>

### 1. 눈에 띄는 차이점은?

---

사실 입사 초기에 로컬 환경에서 쓰던 `Docker` 파일이 그대로 운영 환경<del>(심지어 --watch 옵션까지)</del>까지 이어진 경험이 있어서 Nest CLI 명령어는 어떤 사이드 이펙트를 발생시키는지 이미 몸소 체험해본적이 있다. 🥲

간단히 같은 코드 베이스로 Nest CLI 명령어와 빌드된 .js 파일을 직접 실행한 환경으로 나누어서 컨테이너를 실행해보면 아래와 같이 눈으로도 확인이 가능할만한 차이점을 보이는 결과를 얻을 수 있다.

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-19-TIL/Initial.png"/>

<center>Nest CLI로 "nest start"로 실행한 컨테이너는 초기화 과정에서 CPU 점유율도 엄청나다 😲</center><br><br>

<br>
<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-03-19-TIL/Stabilization.png"/>

<center>초기화 과정 이후에도 메모리 점유율이 2배가 넘게 차이가 난다.</center><br><br>

유의미한 성능 차이가 존재한다는 점은 알고 있었으나 생각했었던 수치보다 더 크게 벌어진걸 눈으로 직접보니 놀라웠다.

<br>
<br>

### 2. Nest CLI

---

왜 이런 큰 성능 차이를 보이는지는 Nest CLI의 actions에 정의된 `start.action.ts` 파일을 뜯어보면 알 수 있다.

> <a href="https://github.com/nestjs/nest-cli/blob/c152351bba98b0562958b0d0223b7636c0183cb3/actions/start.action.ts#L17" target="_blank">nest-cli/actions/start.action.ts</a>

<br>
<br>

Nest CLI 명령으로 실행한 어플리케이션의 성능 저하 포인트들을 요약하자면 아래와 같다.

1. NestJS 설정 파일 로드
    - <strong>commandOptions</strong>에서 config 옵션을 찾고, 이를 기반으로 <strong>this.loader.load(configFileName)</strong>을 호출하여 `nestjs-cli.json` 파일을 로드한다.

      ```json
      {
        "$schema": "https://json.schemastore.org/nest-cli",
        "collection": "@nestjs/schematics",
        "sourceRoot": "src"
      }
      ```

2. TS 컴파일러 설정 로드
    - <strong>getTscConfigPath()</strong>를 통해 `tsconfig.json` 경로를 찾고, JSON 값을 파싱한 결과 중 outDir 값을 가져온다.
      
      ```json
      {
        "compilerOptions": {
          "module": "commonjs",
          ...
          "outDir": "./dist",
          ...
        }
      }
      ```

3. 빌드 및 실행
    - <strong>BuildAction.runBuild()</strong>가 실행되며 TypeScript를 빌드한다.

    - 빌드 후 <strong>createOnSuccessHook()</strong>이 실행되며 애플리케이션이 실행된다.

      - <strong>spawnChildProcess()</strong>를 통해 <strong>child_process.spawn()</strong>을 사용하여 새로운 프로세스로 감싸서 애플리케이션을 실행한다.

<br>
<br>

즉, Nest CLI 명령어로 애플리케이션을 실행하면 여러 설정 파일들을 로드하며 새로이 빌드한 결과물을 새로운 프로세서로 감싸서 실행하고 있는 상황이다.

<br>

| 항목 | **"nest start"** | **"node dist/main.js"** |
|------|-------------|---------------------|
| **설정 파일 로드** | Nest CLI 설정 파일 (`nest-cli.json`)을 로드함 | 설정 파일을 로드하지 않음 |
| **빌드 과정** | TS 설정 파일(`tsconfig.json`)로 TypeScript 빌드 | 이미 빌드된 JS 파일 실행 |
| **프로세스 관리** | <strong>spawnChildProcess()</strong>를 통해 별도 프로세스를 생성 | <strong>node</strong> 프로세스를 직접 실행 |
| **옵션** | `--watch` 옵션 지원 (핫 리로드) | 없음 |

<br>
<br>

## 🤔 Understanding

습관처럼 사용하고 있었던 명령어들을 이젠 어떠한 이유로 인해 사용 해야하는지 알고 쓸 수 있게 되었다.

Nest CLI 명령어는 여러 개발 편의 옵션들을 지원 하고 별도의 빌드 과정없이 빠른 실행을 가능하게 한다는 점은 알고 있었지만, 세부적인 코드 흐름을 눈으로 보니 왜 초기화 단계에서 왜 높은 CPU 사용량과 메모리 점유율을 보이는지 이해할 수 있었다.

<br>
<br>

