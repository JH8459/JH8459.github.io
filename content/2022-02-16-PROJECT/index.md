---
emoji: 🔥
title: ALL-CON Refactoring 8일차 - Timezone 수정
date: '2022-02-16'
author: JH8459
categories: Project
---

![github-blog.png](../../assets/common/PROJECT.jpeg)

<br>

## ⚒️ Refactoring

- 현재 ALL-CON 프로젝트의 DB 서버는 **AWS RDS**를 사용하고 있다.

  DB의 서버시간이 맞지 않는 문제가 계속 발생하고 있다.

- DB 서버에 저장되는 **포르테 디 콰트로 콘서트 메타포닉-부산**의 `open_date`(티켓오픈일) 값은 다음과 같다.

  | open_date           | title                                     |
  | ------------------- | ----------------------------------------- |
  | 2022-02-22 23:00:00 | 포르테 디 콰트로 콘서트 <메타포닉> - 부산 |

  하지만 인터파크 티켓에서 기재된 티켓오픈일 정보는 아래와 같다.

  ![스크린샷, 2022-02-16 17-21-00](https://user-images.githubusercontent.com/83164003/154224099-785d11be-21dc-4b9f-b240-77bf0ee109f6.png)

- 안맞는 시간을 클라이언트에서 강제로 조정해주어서 우선 도메인에서는 정상적으로 보이지만, 근본적인 해결책은 아니였기 때문에 DB 시간문제를 해결하기로 결정하였다.

<br>
<br>

### 1. 보완이 필요한 사항

#### 1-1. DB Server 시간 안맞음

---

- 위에서 언급한 대로 DB의 시간 설정이 9시간 맞지 않는다.

<center><img src="https://user-images.githubusercontent.com/83164003/154257426-7ad705ef-b155-454d-9d1a-97a160f118a7.png"/></center><br>

- mysql에서 현재 서버의 시간을 가져오는 함수인 `select now()` 를 사용시 다음 아래와 같은 서버시간이 출력된다. (현재 시간은 2월 16일 17시 5분경)

- 우선 서버 시간 자체가 맞지 않았다.

  현재 서버의 **time_zone**을 확인해보니 UTC(협정 세계시)인 점을 확인하였다.

<center><img src="https://user-images.githubusercontent.com/83164003/154258039-72e3fb49-c5c9-4508-8b28-e7ab0b3041f0.png"/></center><br>

- 참고로 한국의 표준 시간대는 **UTC+9**이다. ~~(UTC+9의 "+9" 의미가 PLUS 9 였다!)~~

  정확히 9시간이 협정 세계시와의 차이점으로 발생하고 있었다.

<br>
<br>

#### 1-2. Sequelize ORM DB 저장시 시간 안맞음

---

- DB server 외에 Node.js Express 서버 환경에서도 Sequelize ORM을 통하여 DB에 저장할 때 Timezone 설정이 맞지 않는 문제 또한 발생중이다.

  서버의 TimeZone이 맞지 않는 문제 같다.

  해당 부분도 수정이 필요하다.

<br>
<br>

### 2. 문제 해결

#### 2-1. AWS RDS mysql 시간 설정

---

- <a href="https://aws.amazon.com/ko/premiumsupport/knowledge-center/rds-change-time-zone/">공식문서</a>를 통해서 해당 내용이 문제점인지 파악하였다.

- 나는 클라이언트 배포를 담당하였기 때문에 RDS와 EC2는 다른 팀원분께서 담당해주셨다. 피드백을 전달하였고 팀원 분께서 RDS 설정을 수정해주셨다.

  RDS 재부팅 후 정상적인 **UTC+9** time_zone을 확인하였다.

<center><img src="https://user-images.githubusercontent.com/83164003/154259305-b575d7e9-e444-4494-8f70-13d2f72039d0.png"/></center><br>

<br>
<br>

#### 2-2. Sequelize 시간 설정

---

- `.env` 파일에 `TZ` 환경변수를 추가하였다.

  ```
  TZ=Asia/Seoul
  ```

- ~~사실 `default timezone in node.js` 키워드로 검색한 결과 `TZ`라는 환경변수를 생성하면 Node.js 서버의 Timezone이 바뀔 줄 알았는데 별 영향이 없는듯하다..~~

  그 뒤 `config.js` 파일을 수정하여 Timezone을 설정해 주었다.

<center><img src="https://user-images.githubusercontent.com/83164003/155133723-64ffd8fd-1f9f-4e66-ad9c-7b66a9ee0d40.png"/></center><br>

<br>
<br>

### 3. 결과

---

- **RDS** time_zone 설정과 **Sequelize** timezone 설정을 바꾸어 주었다.

  다만, 기존 DB들이 저장된 시간값이 바뀌진 않기에 기존 DB는 수동으로 시간값을 수정해주어야 할 듯 하다.

- 다만 실제로 웹에서 서비스되는 HTTP 환경에서는 시간이 맞지 않는다..

  아래의 Resonse Header를 확인해보면 (현재 시간은 **02월22일 21:54** 이다.)

  ![스크린샷, 2022-02-22 21-55-23](https://user-images.githubusercontent.com/83164003/155144617-60a2f5bd-7cec-4f99-b077-336e6450122f.png)

  이 때문인지 클라이언트에서는 **Date 객체**의 시간값을 제대로 읽어내지 못하고 있다.

- <a href="https://developer.mozilla.org/ko/docs/Web/HTTP/Headers/Date" target="_blank">검색</a>한 결과 HTTP에서 서버의 응답 시간은 항상 지역 시간이 아닌 GMT(Greenwich 표준시)로 표현된다는 사실을 알 수 있었다.

  결국 Node.js 서버와 RDS에서 시간을 Asia/Seoul값으로 바꾸어 주어서 DB에는 시간값이 잘 저장되지만, HTTP 환경으로 배포된 클라이언트에서는 GMT 시간대로 표현되기에 Date 객체의 시간이 맞지 않았다.

  때문에 9시간을 더해주어서 DB에 저장된 시간값을 정상적으로 표현할 수 있도록 코드를 수정해주었다.

<br>
<br>

```toc

```
