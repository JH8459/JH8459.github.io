---
emoji: ð
title: NestJS + ê°ë¹ì ë©ìì§ API ê°ë° ê°ì´ë
date: '2022-05-06'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## âï¸ **T**oday **I** **L**earned

---

<br>

- íë¡ì í¸ì¤ SMS ë°ì¡ì´ íìí ë¶ë¶ì ê°ë¹ìì ë¬¸ì ìë¹ì¤ë¥¼ ì´ì©íê³  ìë¤.

- ê°ë¹ì ë¬¸ììë¹ì¤ ê°ë° ê°ì´ë ê³µìë¬¸ìììë Node íê²½ìì ë¨ì `https` ë´ì¥ ë¼ì´ë¸ë¬ë¦¬ë¥¼ ì´ì©í https ìì²­ì ë³´ë´ì´ ì¬ì©íê³  ìë¤.

- íì¬ íë¡ì í¸ë NodeJSìì NestJS íë ììí¬ë¥¼ ê¸°ë°ì¼ë¡ íê³ ìë¤.

  ë í¼ë°ì¤ë¤ì´ ë§ì§ ììì ê°ë°ê³¼ì ìì ê²ªìë ë¶í¸í¨ë¤ì´ ììê¸°ì ëì ê°ì ìí©ì ê²ªë ì´ë¤ìê² ëìì´ ëê³ ì ê¸ì ë¨ê¸´ë¤.

<br>
<br>

### 1. ì¬ì©ì ì¸ì¦

---

- ê°ë¹ì ê³µì ê°ë° ê°ì´ë ë¬¸ììë ë¤ìê³¼ ê°ì´ ìë´ê° ëì´ìë¤.

  ![áá³áá³ááµá«áá£áº 2022-05-06 áá©áá® 9 20 49](https://user-images.githubusercontent.com/83164003/167132404-cbc69353-9e16-4eb1-b758-556f2cbd5dcc.png)

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

- ë´ì¥ ë¼ì´ë¸ë¬ë¦¬ë§ ì´ì©í ìì(?)í ì½ëì´ê¸° ëë¬¸ì í´ë¹ ê°ì´ë ë¬¸ìë§ ë³´ê³  NestJS ê¸°ë°ì íì¬ íë¡ì í¸ì ë´ì ë´ê¸°ì ì´ë ¤ìì´ ììë¤.

  ê·¸ ê³¼ì ì ìµëí ìì¸í ë´ìë³´ë ¤íë¤.

<br>
<br>

#### 1-1. SMS ë°ì¡ê¸°ë¥ ëª¨ëí

---

- ì°ì  SMSë¥¼ ë³´ë´ê¸° ìí ê¸°ë¥ë§ ëª¨ëë¡ ë¹¼ì ì²ë¦¬íê¸° ìí´ ìë¡ì´ ëª¨ëì ìì±íìë¤.

  ```
  nest g mo
  ```

- ì ëªë ¹ì´ë¡ `sms` ì´ë¦ì ìë¡ì´ ëª¨ëì ìì±í´ ì£¼ìë¤.

- DB ê´ë ¨ë ììì´ë ë³´ì/ì¸ì¦ê´ë ¨ë ê¸°ë¥ì ìì´ ììíê² SMS ë°ì¡ì ìí ê°ë¹ì ì¸ì¦ & ë°ì¡ ê¸°ë¥ë§ ì¶©ì¤í ìíí  ê²ì´ê¸° ëë¬¸ì Service íì¼ë§ íë¡ë°ì´ëë¡ ì¬ì©íê¸°ë¡ íìë¤.

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

- í´ë¹ ëª¨ëì `SmsService` (ê°ë¹ì ì¸ì¦ & ë°ì¡ ê¸°ë¥) ì¸ì¤í´ì¤ë¥¼ ê³µì íê¸° ìí´ `exports` ë°°ì´ìì ë£ì´ì£¼ìë¤.

<br>
<br>

#### 1-2. SmsServiceìì ì¬ì©ì ì¸ì¦ êµ¬í

---

- ì°ì  ê°ë¹ì ì¸ì¦ì ë°ì¼ë ¤ë©´ ì í¨í API URLë¡ SMS IDì API Keyë¡ í í°ì ë°ííë ìì²­ì ë³´ë´ê³  ìëµì ë°ìì¼ íë¤.

- ê³µìë¬¸ì ê°ì´ë ë¬¸ìììë Node ë´ì¥ ë¼ì´ë¸ë¬ë¦¬ì¸ `https`ë¥¼ ì´ì©íì¬ ìì²­ê³¼ ìëµì ë³´ë´ë ê±¸ íì¸ í  ì ìë¤.

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

- ë´ì¥ ë¼ì´ë¸ë¬ë¦¬ë ì¼ì¼í ì¤ì í ê² ë§ë¤ë³´ë.. ~~(ê·ì°®ë¤)~~

  ë³´ë¤ë ì¡°ê¸ ìµìí `axios` ì¸ë¶ ë¼ì´ë¸ë¬ë¦¬ë¥¼ ì´ì©í´ì ìì²­ì ë³´ë´ëë¡ ì§íí´ë³´ìë¤.

  > http/https ë¼ì´ë¸ë¬ë¦¬ë ì¬ë¬ ì¸ë¶ ë¼ì´ë¸ë¬ë¦¬(`got`, `request`, `fetch`, `axios`..ë±ë±)ë¤ì´ ì¡´ì¬íë¤. ë¤ìì ê¸°íê° ëë©´ ê°ê°ì ì¥ë¨ì ë¤ì ì¶ë ¤ ì ë¦¬í´ë´ì¼ê² ë¤.

- ê³µìë¬¸ìë¥¼ ìµëí ë°ë¼ê°ë ë°©í¥ì¼ë¡ ì½ëë¥¼ ìì±íë¤.

  ```ts
  import 'dotenv/config';
  import axios from 'axios';
  import * as queryString from 'query-string';
  import { Injectable } from '@nestjs/common';

  @Injectable()
  export class SmsService {
    async getSmsToken(): Promise<string> {
      // í í°ì ë°ê¸ë°ê¸° ìí API URL
      const tokenUrl = 'https://sms.gabia.com/oauth/token';
      // baseApiKeyë base64(SMS_ID:API_KEY), ìì´ëì í¤ê°ì .env íê²½ë³ìì ë´ìì ì¬ì©
      const baseApiKey = Buffer.from(`${process.env.SMS_ID}:${process.env.SMS_API_KEY}`).toString('base64');
      const postData = queryString.stringify({ grant_type: 'client_credentials' });
      // ìëµê°ì ë°ìì¤ë axios ìì²­
      const response = await axios(tokenUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${baseApiKey}` // 'Basic ' ê³µë°± íì¹¸ì ë£ì´ì¼ íë¤
        },
        data: postData,
      });
      // responseì¤ access_tokenê°ë§ ê°ì ¸ì¨ë¤
      const token = response.data.access_token;
      return token;
    }
  ```

- íì¤í `axios`ê° í¸ë¦¬íë¤.

  íìí ê°ë¤ì ë³ìì ë´ì ì ì í ìµìì ë±ë± ë£ì´ì£¼ë©´ ëë¤.

- ë¦¬í´ê°ì¼ë¡ `token`ì ëì ¸ ì£¼ê¸° ëë¬¸ì, í´ë¹ í í°ê°ì ì´ì©íì¬ ë¬¸ì ë°ì¡í  ë ì í¨í ì¬ì©ìì¸ì§ ì¸ì¦ì´ ì´ë¤ì§ ì ìë¤.

<br>
<br>

### 2. SMS ë°ì¡ íê¸°

---

- ![áá³áá³ááµá«áá£áº 2022-05-06 áá©áá® 10 18 14](https://user-images.githubusercontent.com/83164003/167139136-5f4f31b8-b3d1-4b9c-bf12-2a8331295532.png)

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

- ì´ ë¶ë¶ ëí ê¸°ë³¸ ë´ì¥ ë¼ì´ë¸ë¬ë¦¬ë¡ë§ ìì±ëì´ ìë ë¤ì ë¶í¸í ì½ëì´ë¤.

- ê·¸ë¦¬ê³  ì¥ë¬¸ SMS(90ì ì´ì)ê³¼ ë¨ë¬¸ SMSì ì°¨ì´ì ì API URLë§ ì¡°ê¸ ì°¨ì´ê° ìì¼ë©° ë´ë¶ ë¡ì§ì ëê°ì´ ì§íëë¤.

- ê³µìë¬¸ìë¥¼ í ëë¡ `axios`ë¥¼ ì´ì©í´ì ìì í´ë³´ìë¤.

<br>
<br>

#### 2-1. SmsServiceìì SMS ë°ì¡ êµ¬í

---

- ììì í í°ì ë°ê¸ë°ì ëìë ìì²­ í¤ëë¶ë¶ì Authorizationì `SMS_ID : API_KEY`ê° ë¤ì´ê°ë¤ë©´ ì´ë²ì `SMS_ID: ACCESS_TOKEN` ê°ì´ ë¤ì´ê°ì¼íë¤.

- ê·¸ ì¸ìë Bodyë¡ ë³´ë¼ ë¬¸ìì phone, callback, message, refkey(ì ëí¬í ê³ ì ê°)ì´ ë¤ì´ê° ì£¼ì´ì¼íë¤.

- `refkey`ê°ì ì ëí¬í ë¬¸ìì´ ê°ì ì£¼ê¸° ìí´ `uuidv4()` ë©ìëë¥¼ ì´ì©íì¼ë©°, ë¬¸ìë¥¼ ë³´ë¼ëë§ë¤ ì ëì ì¼ë¡ ê°ì´ ë°ë ì ìë `token`, `phone`, `message`ê°ì Dtoë¡ ì ìíì¬ íìì ê³ ì íì¬ ì¼ë¤.

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
      // baseApiKeyë base64(SMS_ID:ACCESS_TOKEN)
      const baseApiKey = Buffer.from(`${process.env.SMS_ID}:${token}`).toString('base64');
      // ê³ ì í refKeyë¥¼ ìí uuidv4
      const refKeyStr = uuidv4();
      // ë¬¸ì ë°ì¡ì ìí postData FORM
      const postData = queryString.stringify({
        phone,
        callback: '0123456789',
        message,
        refKey: refKeyStr,
        is_foreign: 'N', // í´ì¸ë°ì¡ ì¬ë¶
      });
      /* message.length > 90, ê¸ììì ë°ë¥¸ LMS & SMS ë°ì¡ ë¶ê¸° */
      await axios(
        message.length > 90 ? 'https://sms.gabia.com:443/api/send/lms' : 'https://sms.gabia.com:443/api/send/sms',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: 'Basic ' + baseApiKey,
          },
          data: postData,  // ë°ì¡í  ë¬¸ìì ë´ì©
        },
      );
      const result = {
        success: true,
        message: 'ë¬¸ìë©ìì§ê° ë°ì¡ëììµëë¤.',
      };
      return result;
    }
  ```

- ê³µìë¬¸ìì ë°©í¥ì ì´ì ì ë§ì¶° NestJSë¡ ì´ìíìë¤.

<br>
<br>

## ð¤ Understanding

---

- ê°ë¨í ê³µìë¬¸ìì ì í ê¸°ë³¸ ë´ì¥ ë¼ì´ë¸ë¬ë¦¬ ì½ëë¥¼ ì¸ì¥ ë¼ì´ë¸ë¬ë¦¬ë¥¼ ì´ì©íì¬ NestJS ê¸°ë°ì íë ììí¬ìì ëìí  ì ìê²ë ì½ëë¥¼ ìì íìë¤.

- ëìì´ ë ì§ë ëª¨ë¥´ê² ì§ë§, ëë¦ ì½ëë¥¼ ê°ê²°í ì ì´ë³´ë ¤ ë¸ë ¥í ë¶ë¶ë¤ì´ ì ë¬ëìì¼ë©´ ì¢ê² ë¤.

<br>
<br>

```toc

```
