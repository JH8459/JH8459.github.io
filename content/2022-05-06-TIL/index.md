---
emoji: 📚
title: NestJS + 가비아 메시징 API 개발 가이드
date: '2022-05-06'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<br>

- 프로젝트중 SMS 발송이 필요한 부분을 가비아의 문자 서비스를 이용하고 있다.

- 가비아 문자서비스 개발 가이드 공식문서에서는 Node 환경에서 단순 `https` 내장 라이브러리를 이용한 https 요청을 보내어 사용하고 있다.

- 현재 프로젝트는 NodeJS에서 NestJS 프레임워크를 기반으로 하고있다.

  레퍼런스들이 많지 않아서 개발과정에서 겪었던 불편함들이 있었기에 나와 같은 상황을 겪는 이들에게 도움이 되고자 글을 남긴다.

<br>
<br>

### 1. 사용자 인증

---

- 가비아 공식 개발 가이드 문서에는 다음과 같이 안내가 되어있다.

  ![스크린샷 2022-05-06 오후 9 20 49](https://user-images.githubusercontent.com/83164003/167132404-cbc69353-9e16-4eb1-b758-556f2cbd5dcc.png)

  ```js
  var https = require('https');

  var qs = require('querystring');

  var postData = qs.stringify({
    grant_type: 'client_credentials',
  });

  var options = {
    method: 'POST',
    hostname: 'sms.gabia.com',
    path: '/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      Authorization: 'Basic c1hY3JvY2sZDAwNzA2YzJlMTdjZjlkMz1234hlM2U5YjQ=',
    },
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on('error', function (error) {
      console.error(error);
    });
  });

  req.write(postData);

  req.end();
  ```

- 내장 라이브러리만 이용한 순수(?)한 코드이기 때문에 해당 가이드 문서만 보고 NestJS 기반의 현재 프로젝트에 담아 내기엔 어려움이 있었다.

  그 과정을 최대한 자세히 담아보려한다.

<br>
<br>

#### 1-1. SMS 발송기능 모듈화

---

- 우선 SMS를 보내기 위한 기능만 모듈로 빼서 처리하기 위해 새로운 모듈을 생성하였다.

  ```
  nest g mo
  ```

- 위 명령어로 `sms` 이름의 새로운 모듈을 생성해 주었다.

- DB 관련된 작업이나 보안/인증관련된 기능은 없이 순수하게 SMS 발송을 위한 가비아 인증 & 발송 기능만 충실히 수행할 것이기 때문에 Service 파일만 프로바이더로 사용하기로 하였다.

- **sms.module.ts**

  ```ts
  import { Module } from '@nestjs/common';
  import { SmsService } from './sms.service';

  @Module({
    providers: [SmsService],
    exports: [SmsService],
  })
  export class SmsModule {}
  ```

- 해당 모듈의 `SmsService` (가비아 인증 & 발송 기능) 인스턴스를 공유하기 위해 `exports` 배열안에 넣어주었다.

<br>
<br>

#### 1-2. SmsService에서 사용자 인증 구현

---

- 우선 가비아 인증을 받으려면 유효한 API URL로 SMS ID와 API Key로 토큰을 발행하는 요청을 보내고 응답을 받아야 한다.

- 공식문서 가이드 문서에서는 Node 내장 라이브러리인 `https`를 이용하여 요청과 응답을 보내는 걸 확인 할 수 있다.

  ```js
  var options = {
    method: 'POST',
    hostname: 'sms.gabia.com',
    path: '/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(postData),
      'Authorization': 'Basic c1hY3JvY2sZDAwNzA2YzJlMTdjZjlkMz1234hlM2U5YjQ='
    }
  };

  var req = https.request(options, function (res) {
  ...
  ```

- 내장 라이브러리는 일일히 설정할게 많다보니.. ~~(귀찮다)~~

  보다는 조금 익숙한 `axios` 외부 라이브러리를 이용해서 요청을 보내도록 진행해보았다.

  > http/https 라이브러리도 여러 외부 라이브러리(`got`, `request`, `fetch`, `axios`..등등)들이 존재한다. 다음에 기회가 되면 각각의 장단점들을 추려 정리해봐야겠다.

- 공식문서를 최대한 따라가는 방향으로 코드를 작성했다.

  ```ts
  import 'dotenv/config';
  import axios from 'axios';
  import * as queryString from 'query-string';
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class SmsService {
    async getSmsToken(): Promise<string> {
      // 토큰을 발급받기 위한 API URL
      const tokenUrl = 'https://sms.gabia.com/oauth/token';
      // baseApiKey는 base64(SMS_ID:API_KEY), 아이디와 키값은 .env 환경변수에 담아서 사용
      const baseApiKey = Buffer.from(`${process.env.SMS_ID}:${process.env.SMS_API_KEY}`).toString('base64');
      const postData = queryString.stringify({ grant_type: 'client_credentials' });
      // 응답값을 받아오는 axios 요청
      const response = await axios(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${baseApiKey}` // 'Basic ' 공백 한칸을 넣어야 한다
        },
        data: postData,
      });
      // response중 access_token값만 가져온다
      const token = response.data.access_token;
      return token;
    }
  ```

- 확실히 `axios`가 편리하다.

  필요한 값들을 변수에 담아 적절한 옵션에 딱딱 넣어주면 된다.

- 리턴값으로 `token`을 던져 주기 때문에, 해당 토큰값을 이용하여 문자 발송할 때 유효한 사용자인지 인증이 이뤄질 수 있다.

<br>
<br>

### 2. SMS 발송 하기

---

- ![스크린샷 2022-05-06 오후 10 18 14](https://user-images.githubusercontent.com/83164003/167139136-5f4f31b8-b3d1-4b9c-bf12-2a8331295532.png)

  ```js
  var https = require('https');

  var qs = require('querystring');

  var options = {
    method: 'POST',
    hostname: 'sms.gabia.com',
    path: '/api/send/sms',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic DckviEksLs6ZXlKMGVYQWlPaUpLVhiR2NpT2lKU1V6STFOaUo5LmV5SnBjM01pT2lKb2RIUndjenBjTDF3dmMyMXpMbWRoWW1saExtTnZiVnd2SWl3aVlYVmtJam9pWEM5dllYVjBhRnd2ZEc5clpXNGlMQ0pshWFhnT2pBNG5uVkVuLWtnVEJoRGpPeWc=',
    },
  };

  var req = https.request(options, function (res) {
    var chunks = [];

    res.on('data', function (chunk) {
      chunks.push(chunk);
    });

    res.on('end', function (chunk) {
      var body = Buffer.concat(chunks);
      console.log(body.toString());
    });

    res.on('error', function (error) {
      console.error(error);
    });
  });

  var postData = qs.stringify({
    phone: '01000000000',
    callback: '15444370',
    message: 'SMS TEST MESSAGE',
    refkey: 'RESTAPITEST1547771538',
  });

  req.write(postData);

  req.end();
  ```

- 이 부분 또한 기본 내장 라이브러리로만 작성되어 있는 다소 불편한 코드이다.

- 그리고 장문 SMS(90자 이상)과 단문 SMS의 차이점은 API URL만 조금 차이가 있으며 내부 로직은 똑같이 진행된다.

- 공식문서를 토대로 `axios`를 이용해서 수정해보았다.

<br>
<br>

#### 2-1. SmsService에서 SMS 발송 구현

---

- 위에서 토큰을 발급받을 때에는 요청 헤더부분에 Authorization에 `SMS_ID : API_KEY`가 들어갔다면 이번엔 `SMS_ID: ACCESS_TOKEN` 값이 들어가야한다.

- 그 외에는 Body로 보낼 문자의 phone, callback, message, refkey(유니크한 고유값)이 들어가 주어야한다.

- `refkey`값에 유니크한 문자열 값을 주기 위해 `uuidv4()` 메서드를 이용했으며, 문자를 보낼때마다 유동적으로 값이 바뀔 수 있는 `token`, `phone`, `message`값은 Dto로 정의하여 타입을 고정하여 썼다.

- **sms.dto.ts**

  ```ts
  export class SmsDto {
    smsToken: string;
    testerCell: string;
    message: string;
  }
  ```

- **sms.service.ts**

  ```ts
  import 'dotenv/config';
  import axios from 'axios';
  import * as queryString from 'query-string';
  import { v4 as uuidv4 } from 'uuid';
  import { Injectable } from '@nestjs/common';
  import { SmsDto } from './dto/sms.dto';

  @Injectable()
  export class SmsService {
    async sendSms({ token, phone, message }: SmsDto): Promise<Response> {
      // baseApiKey는 base64(SMS_ID:ACCESS_TOKEN)
      const baseApiKey = Buffer.from(`${process.env.SMS_ID}:${token}`).toString('base64');
      // 고유한 refKey를 위한 uuidv4
      const refKeyStr = uuidv4();
      // 문자 발송을 위한 postData FORM
      const postData = queryString.stringify({
        phone,
        callback: '0123456789',
        message,
        refKey: refKeyStr,
        is_foreign: 'N', // 해외발송 여부
      });
      /* message.length > 90, 글자수에 따른 LMS & SMS 발송 분기 */
      await axios(
        message.length > 90 ? 'https://sms.gabia.com:443/api/send/lms' : 'https://sms.gabia.com:443/api/send/sms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + baseApiKey,
          },
          data: postData,  // 발송할 문자의 내용
        },
      );
      const result = {
        success: true,
        message: '문자메시지가 발송되었습니다.',
      };
      return result;
    }
  ```

- 공식문서의 방향에 초점을 맞춰 NestJS로 이식하였다.

<br>
<br>

## 🤔 Understanding

- 간단히 공식문서에 적힌 기본 내장 라이브러리 코드를 외장 라이브러리를 이용하여 NestJS 기반의 프레임워크에서 동작할 수 있게끔 코드를 수정하였다.

- 도움이 될지는 모르겠지만, 나름 코드를 간결히 적어보려 노력한 부분들이 전달되었으면 좋겠다.

<br>
<br>

