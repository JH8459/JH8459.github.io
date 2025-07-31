---
emoji: 📚
title: Presigned URL S3 파일 업로드
date: '2024-12-01'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

이전 포스팅 중 <a href="https://blog.jh8459.com/2024-11-07-TIL/" target="_blank">AWS Solution Architect Associate (SAA-03 자격증 접수)</a>에서 현재 인프라 갖는 한계점에 대해서 언급한적이 있었다.

<br>
<details>
<summary><strong>영상 저장 시점 마다 발생하는 트래픽</strong></summary>

<br>

> <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-12-01-TIL/%E1%84%90%E1%85%B3%E1%84%85%E1%85%A2%E1%84%91%E1%85%B5%E1%86%A8.png"/>
>
>  - 웹캠과 화면 공유 영상 2가지의 영상 파일을 과목이 종료되는 동시에 모든 응시자가 녹화 영상을 송신하는 과정에서 발생하는 트래픽

</details>
<br>

평상시 수시 채용 기간에는 문제없지만 상/하반기 공개 채용 기간에 발생하는 트래픽은 유연하지 못한 온프레미스 환경에서는 어느덧 한계에 임박함을 느꼈다.

위 문제를 해결하기 위한 과정을 간략하게 기록하고자 포스팅을 남긴다.

<br>
<br>

### 1. 현재 사용중인 인프라 구조의 문제점

---

아래는 응시자들의 녹화 영상이 저장되는 흐름도를 설명하기 위해 기타 요소(L4 로드밸런서 등등)들은 생략한 간단한 도식도이다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-12-01-TIL/infra.png"/>
<br>

IDC 내부로 응시자의 녹화 영상들이 동시에 업로드 되며 이 과정에서 높은 순간 트래픽과 많은 양의 쓰기 작업이 발생하고 있다.

- 이 과정에 몇몇 인원의 화상 연결이 끊어지거나 녹화 영상 저장이 실패하는 이슈가 발생하곤했다.

<br>
<br>

서비스가 확장됨에 따라 이용자 수가 늘어나고 있으나 유연하지 못한 온프레미스 환경에서 서비스 사용량에 따라 인프라를 유동적으로 변경하기는 쉽지 않음을 깨달았다. (24시간 사용되는 RTC 서버에 로드밸런서를 붙히거나 SSD 쓰기 버퍼를 늘리기 위해 레이드 구성을 하는 행위는 쉽지않다.. 😂)

영상 저장만큼은 트래픽을 대신 받아줄 클라우드 서비스 사용 건의를하였고 승인을 받아 인프라 구성을 부분적으로 변경하기로 결정하였다. (미리 말씀드리자면 여러 솔루션 중 <strong>Presigned URL</strong>을 이용하여 클라이언트가 직접 AWS S3로 영상 파일을 업로드하는 구조로 변경하였다.)

<br>
<br>

### 2. Presigned URL 이란?
---

AWS S3 버킷에 객체를 업로드하려면 AWS 보안 자격 증명이나 권한이 있어야만 업로드할 수 있지만 미리 서명된 URL을 사용하게 된다면 권한을 미리 임시 획득한 URL로 S3 버킷에 파일을 업로드 할 수 있도록 허용된다.

> <a href="https://docs.aws.amazon.com/ko_kr/AmazonS3/latest/userguide/PresignedUrlUploadObject.html" target="_blank">미리 서명된 URL을 통해 객체 공유 공식문서 바로가기</a>

<br>
<br>

클라이언트가 직접 파일 업로드를 위해서는 아래 절차를 거쳐 미리 서명된 URL을 획득하여 S3에 파일 업로드를 진행할 수 있다.

1. S3 접근 권한이 없는 사용자가 접근 권한이 있는 API 서버에게 S3에 접근할 수 있도록 임시 URL 생성 요청.
2. API 서버에서 S3에게 Presigned URL 발행 요청.
3. S3에서 권한 확인 후 Presigned URL 생성 후 반환.
4. API 서버에서 사용자에게 URL 반환.
5. 사용자는 발행받은 URL으로 S3에 `PUT` 메소드로 파일 업로드 수행.

<br>

이 과정에서 URL이 탈취되더라도 피해를 최소화 할 수 있게끔 만료기간등을 지정할 수 있는 옵션등이 존재한다.

<br>
<br>

### 3. 변경된 인프라 구조
---

우선 아래와 같은 S3 Presigned URL을 발행받는 클래스를 정의하여 필요한 곳에서 주입하여 사용하였다. (파일 종류에 따라 디렉토리 구조를 잘 잡아주어서 추후에 일정 주기로 오래된 영상을 정리 할 수 있도록 신경쓰었다.)

```typescript
@Injectable()
export class AwsService {
  private readonly S3_CLIENT: S3Client;
  private readonly S3_REGION: string;
  private readonly S3_ACCESS_KEY_ID: string;
  private readonly S3_SECRET_ACCESS_KEY: string;

  constructor(private configService: ConfigService) {
    this.S3_REGION = this.configService.get<string>('S3_REGION');
    this.S3_ACCESS_KEY_ID = this.configService.get<string>('S3_ACCESS_KEY_ID');
    this.S3_SECRET_ACCESS_KEY = this.configService.get<string>('S3_SECRET_ACCESS_KEY');
    // AWS S3 클라이언트 초기화. 환경 설정 정보를 사용하여 AWS 리전, Access Key, Secret Key를 설정.
    this.S3_CLIENT = new S3Client({
      region: this.S3_REGION,
      credentials: {
        accessKeyId: this.S3_ACCESS_KEY_ID,
        secretAccessKey: this.S3_SECRET_ACCESS_KEY,
      },
    });
  }

  async getSignedUrl(bucketName: string, filePath: string): Promise<string> {
    // S3 버킷에 대한 URL을 생성하는 명령 생성
    const command = new PutObjectCommand({
      Bucket: bucketName, // S3 버킷 이름
      Key: filePath, // 업로드될 파일의 경로 및 이름
    });
    // 명령을 S3 클라이언트에 전달하여 서명된 URL을 생성 (만료기간 10분)
    const signedUrl = await getSignedUrl(this.S3_CLIENT, command, { expiresIn: 600 });
    // 서명된 URL을 반환
    return signedUrl;
  }
}
```

위 `getSignedUrl` 함수를 통하여 미리 서명된 URL을 파일 종류에 따라서 발급받아서 클라이언트가 직접 업로드하는 구조로 변경하였다. 

결국 변경된 인프라 구조를 간단하게 도식도로 그려보면 아래의 구조로 변경되었다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-12-01-TIL/after_infra.png"/>
<br>

절차는 다소 복잡해졌지만 결국 현재 발생중인 가장 큰 문제점인 높은 용량의 영상 업로드 트래픽(붉은 화살표)을 IDC 내부에서 처리하지 않을 수 있게 되었다.

<br>
<br>

## 🤔 Understanding

아무래도 비용적인 측면으로는 바라보면 클라우드 서비스는 부정적인건 사실이다. 때문에 현재 사용중인 온프레미스 환경을 포기하긴 어렵다.

다만 유연하게 변경하기 어려운 온프레미스 특성상 인프라를 늘리거나 줄이기는 쉽지 않다. 그렇기에 부분적인 클라우드 서비스 도입을 데이터에 기반한 여러 문서들로 설득하려 노력하였다. (결실을 봐서 다행이다 😮‍💨.)

앞으로 변경된 인프라로 운영해보며 필요한 후속 조치들 또한 남아있다. (보관 기간에 따라 발생하는 비용 최적화를 위한 AWS Lambda 함수를 통한 스케쥴러 도입 등)

앞으로도 도입할만한 AWS 서비스들을 조금 더 찾아보고 인프라를 개선해볼 수 있도록 여러 서비스들을 찾아봐야겠다.

<br>
<br>

```toc

```
