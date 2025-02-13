---
emoji: 📚
title: AWS Lambda + EventBridge를 사용한 S3 리소스 관리
date: '2025-01-17'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

이전 포스팅 중 <a href="https://blog.jh8459.com/2024-12-01-TIL/" target="_blank">Presigned URL S3 파일 업로드</a>에서 사용자들이 사용하는 리소스(녹화영상 및 다수의 이미지 파일)들을 이제 S3로 직접 업로드가 되도록 인프라 구성을 부분적으로 변경하였다.

또한 파일 타입에 따라 규칙적인 경로 구성을 갖도록 구성했었는데 이러한 일정한 규칙을 근거로 <strong>AWS Lambda + EventBridge</strong>를 사용하여 리소스를 자동으로 관리하는 과정을 간략하게 기록하고자 포스팅을 남긴다.

<br>
<br>

### 1. 현재 사용중인 AWS S3의 문제점

---

현재 사용자들이 사용하는 모든 리소스들은 아래와 같은 방법으로 <strong>미리 서명된 URL</strong>을 발급 받은 뒤 클라이언트 측에서 직접 AWS S3로 업로드를 하고 있다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-12-01-TIL/after_infra.png"/>
<br>

요즘 채용 트렌트가 상,하반기로 나누어 진행하는 이른바 대규모 공개 채용(공채)보다는 365일 수시로 채용하는 경우가 많다.

수시 채용 특성상 지원자들을 한 장소 혹은 특정일자에 모두 맞춰서 채용 절차를 진행하기 어려우므로 유동적으로 운영하는 경우가 많다. 그렇기에 사내 서비스 또한 이에 맞추어 365일 24시간 중단없이 운영되야한다.

<br>
<br>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-01-17-TIL/SKCT.png"/>
<br>
<center><strong>많은 기업에서 위와 같이 일정 기간동안 온라인 인적성 검사를 진행한다.</strong></center><br><br>

그렇기 때문에 예측하기 어려운 불특정한 일시에 S3에 리소스들이 쌓일 수 밖에 없으며 이로인하여 보관 비용 문제가 누적될 수 밖에 없는 구조이다.

<br>
<br>

### 2. AWS Lambda 함수 생성

---

우선 AWS Lambda를 통하여 S3의 리소스 관리를 선택한 이유는 아래 이유가 가장 주요하다.

<br>

1. S3의 생명주기 설정은 접두사(prefix) 규칙만으로 제어를 할 수 있기에 커스터마이징에 한계가 있다.
2. S3 리소스 정리는 계획상 하루 한번만 동작할 예정이기에 사용량에 따라 과금되는 AWS Lambda 과금 모델은 비용 합리적이다.
3. 특정 인프라에 종속되지 않는 완전 관리형 서비스이므로 유지보수가 편리하다.

<br>

위 이유 외에도 AWS Lambda에서 `node.js`로 Javascript 코드를 실행할 수 있는 것 또한 큰 결정 이유이기도 하다.

매일 한국시간 기준(KST)으로 자정 정각에 동작할 핸들러 함수는 미리 정의해둔 S3 폴더 규칙에 따라서 입맛에 맞게 구현하였고 리소스가 삭제된 후 슬랙 웹 훅으로 삭제된 리소스들의 대한 알림을 받아 볼 수 있게끔 구현해두었다.

<br>
<details>
<summary><strong>AWS Lambda 핸들러 함수 코드 샘플</strong></summary>

<br>

```javascript
import { S3Client, ListObjectsV2Command, DeleteObjectsCommand } from '@aws-sdk/client-s3';
import https from 'https';

// S3 클라이언트 초기화
const s3 = new S3Client({ region: 'ap-northeast-2' }); // S3 리전 설정
const SLACK_WEBHOOK_URL = '...'; // Slack 웹훅 URL

/**
 * Lambda 핸들러 함수
 */
export const handler = async () => {
  const bucketName = 'acg-rtc'; // S3 버킷 이름
  const prefixes = ['NEW_ACG/', 'ACG/', 'SK/', 'CJ/', 'NEW_LG/', 'LG/']; // S3 접두어 목록

  // 오늘 기준 30일 전 날짜를 계산하여 cutoffDateString 생성 (YYYY-MM-DD 형식)
  const getCutoffDateString = () => {
    const now = new Date(); // 현재 날짜 가져오기
    now.setDate(now.getDate() - 30); // 30일 전으로 이동
    return now.toISOString().split('T')[0]; // YYYY-MM-DD 형식으로 변환
  };

  const cutoffDateString = getCutoffDateString(); // 기준 날짜 계산

  let totalDeletedSize = 0; // 총 삭제한 리소스 크기 합산
  const allDeletedKeys = []; // 삭제된 키 목록
  const deletedClients = []; // 삭제된 고객사 목록 및 정보

/**
   * 숫자에 1,000 단위로 콤마 추가
   * @param {number} number - 포맷할 숫자
   * @returns {string} 콤마가 추가된 숫자 문자열
   */
  const formatNumberWithCommas = (number) => {
    return new Intl.NumberFormat('ko-KR').format(number);
  };
  
  /**
   * 크기를 적절한 단위로 변환 (MB, GB, TB 등)
   * @param {number} sizeInBytes - 크기 (바이트)
   * @returns {string} 적절한 단위로 변환된 크기 문자열
   */
  const formatSize = (sizeInBytes) => {
    if (sizeInBytes < 1024 ** 2) {
      return `${(sizeInBytes / 1024).toFixed(2)} KB`;
    } else if (sizeInBytes < 1024 ** 3) {
      return `${(sizeInBytes / 1024 ** 2).toFixed(2)} MB`;
    } else if (sizeInBytes < 1024 ** 4) {
      return `${(sizeInBytes / 1024 ** 3).toFixed(2)} GB`;
    } else {
      return `${(sizeInBytes / 1024 ** 4).toFixed(2)} TB`;
    }
  };

  /**
   * S3 객체 삭제 함수
   * 특정 prefix와 cutoffDateString에 따라 삭제할 객체를 필터링하여 삭제
   */
  const deleteObjectsByDate = async (prefix, cutoffDateString) => {
    const deletedKeys = [];
    let prefixDeletedSize = 0; // 특정 prefix에서 삭제한 크기 합산
    let continuationToken = null;

    do {
      const response = await s3.send(
        new ListObjectsV2Command({
          Bucket: bucketName,
          Prefix: prefix, // 탐색할 접두어
          MaxKeys: 1000, // 한 번에 최대 1000개 객체 반환
          ContinuationToken: continuationToken, // 페이징 토큰
        })
      );

      if (!response.Contents || response.Contents.length === 0) {
        break; // 더 이상 처리할 객체가 없음
      }

      // 기준 날짜 이전의 객체 필터링
      const objectsToDelete = response.Contents.filter((obj) => {
        const keyParts = obj.Key.split('/');
        const datePart = keyParts[1]; // 키에서 YYYYMMDD 추출

        return /^\d{8}$/.test(datePart) && datePart < cutoffDateString.replace(/-/g, ''); // 날짜 조건 확인
      });

      // 삭제 요청 수행 (1,000개 단위로 나누어서 삭제)
      for (let i = 0; i < objectsToDelete.length; i += 1000) {
        const batchToDelete = objectsToDelete.slice(i, i + 1000); // 1,000개씩 분할

        await s3.send(
          new DeleteObjectsCommand({
            Bucket: bucketName,
            Delete: {
              Objects: batchToDelete.map((obj) => ({ Key: obj.Key })),
            },
          })
        );

        // 삭제된 객체 키 및 크기 합산
        deletedKeys.push(...batchToDelete.map((obj) => obj.Key));
        const batchDeletedSize = batchToDelete.reduce((sum, obj) => sum + obj.Size, 0);
        prefixDeletedSize += batchDeletedSize;
        totalDeletedSize += batchDeletedSize; // 전체 삭제 크기 합산
      }

      continuationToken = response.NextContinuationToken; // 다음 페이지를 위한 토큰 설정
    } while (continuationToken); // 더 이상 페이지가 없을 때까지 반복

    return { deletedKeys, prefixDeletedSize };
  };

  // 모든 Prefix에 대해 삭제 작업 수행
  const deletePromises = prefixes.map(async (prefix) => {
    try {
      const { deletedKeys, prefixDeletedSize } = await deleteObjectsByDate(prefix, cutoffDateString);
      allDeletedKeys.push(...deletedKeys);

      if (deletedKeys.length > 0) {
        deletedClients.push({
          prefix: prefix.replace('/', ''), // 접두어 이름
          count: deletedKeys.length, // 삭제된 객체 수
          size: prefixDeletedSize, // 삭제된 크기
        });
      }
    } catch (error) {
      console.error(`Failed to process prefix: ${prefix} - ${error.message}`);
    }
  });

  await Promise.all(deletePromises);

  if (allDeletedKeys.length === 0) {
    return { statusCode: 200, body: JSON.stringify({ message: 'No resources to delete.' }) };
  }

  // S3 전체 사용량 가져오기
  const getTotalS3Usage = async () => {
    let totalSize = 0;
    let continuationToken = null;

    do {
      const response = await s3.send(
        new ListObjectsV2Command({
          Bucket: bucketName,
          ContinuationToken: continuationToken,
        })
      );

      totalSize += response.Contents?.reduce((sum, obj) => sum + obj.Size, 0) || 0;
      continuationToken = response.NextContinuationToken;
    } while (continuationToken);

    return totalSize; // 바이트 단위 반환
  };

  const totalS3UsageAfterDeletion = formatSize(await getTotalS3Usage());

  // 삭제된 리소스 정보 내림차순 정렬 (크기 기준)
  deletedClients.sort((a, b) => b.size - a.size);

  // 삭제 정보 문자열 생성
  const deletionDetails = deletedClients
    .map((client) => `  - ${client.prefix}: ${formatNumberWithCommas(client.count)}건 / ${formatSize(client.size)}`)
    .join('\n');

  // Slack 알림 메시지 생성
  const message = {
    channel: '#rtc-notice',
    text: `===============================\n       ‼️ AWS S3 리소스 삭제 알림 ‼️\n------------------------------------------------\n1. S3 총 사용량: ${totalS3UsageAfterDeletion}\n2. 삭제한 리소스 크기: ${formatSize(
      totalDeletedSize
    )} (~ ${cutoffDateString})\n3. 삭제 정보:\n${deletionDetails}\n\n===============================`,
  };

  await sendSlackNotification(message);

  return { statusCode: 200, body: JSON.stringify({ message: 'Resource cleanup completed' }) };
};

/**
 * Slack 알림 전송 함수
 */
const sendSlackNotification = (message) => {
  ...// 생략
};


```

</details>
<br>

간단한 200줄 내외의 함수를 구현하였으며 관련 라이브러리 모듈들과 `package.json` 파일을 함께 압축하여 직접 업로드(10MB 미만 가능)하였고, 그렇게하여 등록된 핸들러 함수는 아래의 GUI를 통해 간편하게 테스트를 진행할 수 있었다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-01-17-TIL/lambda.png"/>
<br>
<center><strong>테스트 버튼만 누르면 작성한 핸들러 함수를 손쉽게 테스트 해볼 수 있다. 👍</strong></center><br><br>

 테스트 결과 또한 <strong>CloudWatch Logs Live Tail</strong>에서 직관적으로 확인할 수 있었기에 핸들러 함수를 구현하고 동작하는 전반적인 과정을 AWS Lambda GUI Console을 통하여 모두 제어할 수 있어서 손쉽게 금방 구현할 수 있었다.

<br>
<br>

### 3. AWS EventBridge 등록

---

마지막 단계로 매일 정해진 시간에 AWS Lambda에 등록한 핸들러 함수가 규칙적으로 호출되어 S3 리소스를 자동으로 삭제되게끔 반복시키는 설정이 필요하였고 이를 위해 <strong>AWS EventBridge</strong> 서비스를 추가로 선택하였다.

이벤트 기반 아키텍처를 구축하기 위해 알려진 서비스이지만 거창한 기능은 사용하지 않았고 미리 작성한 AWS Lambda 함수를 정해진 일정으로 등록하여 반복 실행되게끔 스케쥴링 등록을 해주기 위하여 사용하였다.

<br>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-01-17-TIL/eventbridge.png"/>
<br>
<center><strong>Cron 표현식을 사용해서 반복 이벤트 등록이 가능하다.</strong></center><br><br>

한국 표준시간대로 매일 00시에 AWS Lambda 함수가 호출되게끔 설정해주었고 다음날 AWS Lambda 모니터링 콘솔과 슬랙 웹훅 알림을 확인하여 정상 작동을 확인하였다.

<br>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2025-01-17-TIL/monitor.png"/>
<br>
<center><strong>00:00 로컬 시간대(KST) AWS Lamba 함수 호출 성공 로그 확인 ✅</strong></center><br><br>



<br>
<br>

## 🤔 Understanding

S3에 누적되는 높은 용량(영상 혹은 이미지 등)을 갖는 리소스들은 비용적인 측면 때문에 무수히 긴 보관 기간을 가질 수는 없다.

본문에 기재하진 않았지만 이 외에도 개발 환경에서 테스트 목적으로 생성되는 리소스들은 접두사 `/TEST_` 를 붙혀두어서 S3의 생명주기 설정을 통하여 관리하고 있다.

인프라를 분리하니 특정 서비스들에 종속되지 않고 AWS에서 제공하는 완전 관리형 서버리스 서비스들을 통하여 자원들을 유연하게 관리할 수 있게 되었다. (기존 온프레미스 환경에서는 스토리지 서버를 두 대로 증설하면 똑같은 스크립트를 두 서버 모두 작성해 주어야만 했다. 😂)

현재 S3에 적재되는 사용자들의 리소스들은 지원자들의 응시 기간이 모두 종료되는 시점 이후에는 녹화 영상등 저장된 리소스들의 필요성이 급감하므로 비용 효율적인 방안이 추가적으로 있을지 한번 살펴볼만한 여지가 있을 듯 하다. (예를 들자면 2주 뒤에는 리소스들을 S3 Glacier 스토리지 클래스로 이동 후 한달 뒤 완전 삭제 등등..? 🤔)

앞으로는 낮은 비용으로 높은 효율성을 얻을 수 있는 서비스들을 적극적으로 찾아서 도입을 건의 해봐야겠다.

<br>
<br>

```toc

```
