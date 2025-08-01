---
emoji: 📚
title: AWS Solution Architect Associate (AWS Skill Builder 강의 후기)
date: '2024-11-12'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

<strong>SAA-03</strong> 자격증 합격 후기글을 찾아보면 덤프 문제를 많이 풀이해보는게 지름길이란건 금방 찾아볼 수 있다.

다만, 아직 한달 반 가량 기간이 남은 시점이기 때문에 무작정 덤프 문항 반복 풀이를 시작하는거 보다는 AWS에서 제공하는 시험 준비 <a href="https://explore.skillbuilder.aws/learn/course/external/view/elearning/16410/exam-prep-aws-certified-solutions-architect-associate-saa-c03-na-hangug-eo-gang-ui?trk=120ebd7c-2290-47ba-8973-b7bb852aee18&sc_channel=el)%EC%9D%84" target="_blank">Skill Builder 강의</a>를 한번 따라가보자 생각하였다.

AWS에서 제공하는 SAA-03 Skil Builder 강의를 듣고 간략한 후기를 남기기 위해 포스팅을 남긴다.


<br>
<br>

### 1. 시험에 대해 알아보기

---

<strong>Module 1.</strong>은 20분 가량의 영상과 함께 시험에 대한 간략한 개요를 안내하고 있다. 영상의 내용을 간략히 요약하자면 아래와 같았다.

- 이 자격증은 AWS에서 고성능 아키텍처를 가진 시스템을 설계 및 구현할 수 있는 역량을 검증한다.
- 이 시험은 아래와 같은 네가지 영역을 다루며 다음과 같이 세분화된다.
  - 보안 아키텍처 설계 (30%)
  - 복원력을 갖춘 아키텍처 설계 (26%)
  - 고성능 아키텍처 설계 (24%)
  - 비용이 최적화된 아키텍처 설계 (20%)
- SAA-03에서는 약 30여개의 새로운 서비스와 기능을 추가로 다룬다.
- 시험 문제 유형은 아래의 두가지 유형이 존재한다.
  - 다중 선택 (객관식) 및 다중 응답 (다답식)

전반적으로 시험 개요에 대한 설명들로 구성되어 있었다. 영상을 꼼꼼히 시청하기 보다는 뒤에 나오는 <a href="https://d1.awsstatic.com/ko_KR/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf" target="_blank">시험 안내서</a>를 한번 정독하는 걸 추천한다.

<br>
<br>

### 2. 시험 스타일 문제 알아보기

---

<strong>Module 2.</strong>은 실제 자격증 시험에 사용하는 문항 구성을 미리 점검해 볼 수 있게 구성되어있다.

AWS에서 제공하는 공식 연습 문항 세트인 <strong>AWS Certified Solutions Architect – Associate Official Practice Question Set (SAA-C03 - Korean)</strong>을 체험해 볼 수 있었다. (학습을 안한 상태에서의 정답률은 30%가 나왔다..😂)

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/aws_%E1%84%8B%E1%85%A9%E1%84%83%E1%85%A1%E1%86%B8%E1%84%85%E1%85%B2%E1%86%AF.png"/>
<br>
<center><strong>열심히 공부하자..!! 🔥</strong></center><br><br>

어디까지나 연습 문항 세트일 뿐이기 때문에 시험 스타일 문제를 미리 경험해보는 것에 의미를 두고 넘어가도록했다.

<br>
<br>

### 3. 시험 주제 알아보기

---

<strong>Module 3.</strong>은 시험 준비를 위해 AWS에서 제공하는 아래와 같은 유사한 교육 과정들을 추천한다.

- <a href="https://explore.skillbuilder.aws/learn/course/external/view/elearning/8319/architecting-on-aws-online-course-supplement" target="_blank">Architecting on AWS</a>
- <a href="https://aws.amazon.com/ko/getting-started/cloud-essentials/" target="_blank">Getting Started: AWS Cloud Essentials</a>
- <a href="https://explore.skillbuilder.aws/learn/course/internal/view/elearning/1851/aws-technical-essentials" target="_blank">AWS Technical Essentials</a>

추가 리소스로 <a href="https://explore.skillbuilder.aws/learn/course/internal/view/elearning/7636/cloud-quest" target="_blank">AWS Cloud Quest</a>라는 AWS 서비스를 추천(?)한다. <del>(그냥 둘러보기만하였다.)</del>

전반적으로 자격증 취득 시험 공부를 본격적으로 진행하기 전에 선행할 수 있는 학습 과정을 추천하고 있다. AWS 실무 능력을 향상시키는데는 큰 도움이 될 수 있겠지만 넘어가도록했다.

<br>
<br>

### 4. 시험 준비

---

<strong>Module 4.</strong>는 시험에 필요한 전반적인 내용을 담는 동영상 강의들이 제공되었으며 각 챕터 마다 간략한 후기를 아래에 정리해보았다.

<br>
<br>

#### 4-1. 기본 사항

---

자격증 시험에 필요한 기본 사항을 중점적으로 살펴보는 챕터였다.

특히, 안전하고 복원력을 갖췄으며 비용 최적화된 고성능 솔루션을 설계하는 방법을 알고 이해하는데 집중해야 한다 말하고 있다. <strong>(AWS Well-Architected Framewor)</strong>

클라우드 컴퓨팅의 기초 개념부터 좋은 아키텍쳐의 모범사례를 언급하며 특히, 이번 SAA-03 시험에 새롭게 추가된 <strong>"지속 가능성"</strong>에 대해 중요하다 반복 언급한다.

솔루션 아키텍트라면 복원력을 갖춘 아키텍처의 설계 방법을 알아야하며 개발자라면 장애에 대처하고 장애가 발생한 시스템을 진단, 복구 및 방지할 수 있는 애플리케이션을 빌드할 수 있는 역량 또한 갖춰야한다 말한다.

이 자격증을 취득하기 위해 필요한 기본 소양을 간략히 설명해주는 영상이었다.

<br>
<br>

#### 4-2. 보안 아키텍처 설계

---

보안은 환경에서 가장 중요한 측면 중 하나이기 때문에 시험 전반에 걸쳐서 끊임없이 나오는 주제이기에 보안에 대한 중요성을 언급한다.

보안 아키텍처 설계는 아래의 큰 세개의 범주로 나뉜다 설명한다.

<br>
<br>

##### 4-2-1. AWS 리소스에 대한 보안 액세스 설계

---

- 퍼블릭, 프라이빗, 하이브리드 및 멀티 클라우드 환경 간의 차이점과 이러한 모든 환경에 대한 보안 액세스
- IAM 사용자 및 루트 사용자에게 AWS 보안 모범 사례 적용
- IAM 사용자, 그룹 역할 및 정책을 포함한 유연한 권한 부여 모델 설계
- 역할 기반 액세스 제어 전략 설계
- 여러 AWS 계정에 대한 보안 전략 설계
- AWS 서비스에 대한 리소스 정책의 적절한 사용 결정
- 디렉터리 서비스를 IAM 역할과 페더레이션해야 할 경우 결정

특히, <strong>"정책"</strong>이라는 AWS 객체를 통하여 원하는 리소스에 접근할 수 있는 권한을 얻게된다는 내용이 기억에 남는다. 이 외에도 최소 권한의 원칙 등 보안에 대한 기초적이지만 가장 중요한 요소들을 설명하는 영상이었다. (+ 학습 영상과 관련된 연습 문제가 이어서 나온다.)

<br>
<details>
<summary><strong>연습 문제</strong></summary>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-2-1.png"/>
<br>

  - <strong>A</strong>: 이 방법은 루트 사용자에게 모든 AWS 서비스의 모든 리소스에 대한 전체권한을 부여하는 방법이므로 올바르지 않다.
  - <strong>C</strong>: 이 방법은 루트 사용자가 고유한 계정에 대한 역할을 맡을 수 없기 떄문에 올바르지 않다.
  - <strong>E</strong>: 루트 계정이 삭제되면 모든 리소스가 삭제된다. <del>당연히 오답</del>

</details>

<br>
<br>

##### 4-2-2. 보안 워크로드 및 애플리케이션 설계

---

- 보안 구성 요소로 VPC 아키텍처 설계
- 네트워크 세분화 전략 결정
- AWS 서비스를 통합하여 애플리케이션 보호
- AWS 클라우드와의 외부 네트워크 연결 보호

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-2-2.png"/>
  <br>

  - <strong>A</strong>: 네트워크 ACL은 트래픽을 허용하고 차단할 수 있지만 서브넷 경계에서만 작동한다. 동일한 서브넷 내부에서 실행되는 두 EC2 인스턴스를 제어하기에는 적절한 솔루션이 아니다.
  - <strong>C</strong>: VPC 피어링은 별도의 개별 VPC 간의 통신을 할 수 있도록 허용하지만 트래픽 차단 기능을 제공하지 않는다.
  - <strong>D</strong>: 라우팅 테이블은 서브넷 또는 게이트웨이의 네트워크 트래픽이 전달되는 위치를 결정하는데 사용하는 경로 규칙 집합이다. 동일한 서브넷에 있는 애플리케이션에 대해 트래픽 차단 등에 대한 기능은 제공하지 않는다.

</details>

<br>
<br>

##### 4-2-3. 적절한 데이터 보안 제어 결정

---

- 저장 데이터 암호화
- 전송 중 데이터 암호화
- 암호화 키에 대한 액세스 정책 구현

여러 서비스를 이용하여 인증서를 갱신하고 데이터를 암호화를 하는 기법을 간단히 소개한다. 

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-2-3.png"/>
  <br>

  - <strong>B</strong>: 데이터 키가 아닌 SSL 키를 저장하는데 AWS Certificate Manager를 사용하므로 오답이다.
  - <strong>C</strong>: 인스턴스 스토어 볼륨은 임시로 설계된 스토리지이므로 내구성 요구사항에 알맞지 않다.
  - <strong>D</strong>: S3에서는 직접 키 관리를 수행할 방법이 없으며 KMS 정책은 KMS 내부에 저장된 키에 대해서만 작동하므로 오답이다.
  
</details>

<br>
<br>

#### 4-3. 복원력을 갖춘 아키텍처 설계

---

복원력을 갖춘 워크로드는 워크로드 구성 요소의 로드, 공격 및 구성 요소 장애로 인해서 스트레스를 받을 때 복구할 수 있는 기능이 있어야한다 강조한다.

복원력을 갖춘 아키텍처 설계는 아래의 큰 두가지 범주로 나뉜다 설명한다.

<br>
<br>

##### 4-3-1. 확장 가능하고 느슨하게 결합된 아키텍처 설계

---

- 요구 사항을 기반으로 이벤트 중심, 마이로서비스 또는 멀티 티어 아키텍처 설계
- 아키텍처 설계에 사용되는 구성 요소에 대한 크기 조정 전략 결정
- 느슨한 결합을 달성하는 데 필요한 AWS 서비스 결정
- 컨테이너를 사용해야 할 경우 결정
- 서버리스 기술 및 패턴을 사용해야 할 경우 결정
- 요구 사항을 기반으로 적절한 컴퓨팅, 스토리지, 네트워킹 및 데이터베이스 기술 권장
- 워크로드에 목적 기반 AWS 서비스 사용

가용성 및 내결함성을 고려하는 아키텍처를 고려하기 위해 위 요소를 강조한다.

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-3-1.png"/>
  <br>

  - <strong>A</strong>: Amazon Kinesis 및 Kinesis Data Streams은 중복 레코드를 초래할 수 있으므로 오답이다.
  - <strong>B</strong>: Amazon Kinesis Data Firehose는 중복 레코드를 초래할 수 있으므로 오답이다.
  - <strong>C</strong>: Amazon SNS는 대기열 서비스가 아니고 메시지 서비스 이므로 올바른 솔루션이 아니다.
  
</details>

<br>
<br>

##### 4-3-2. 고가용성 및 내결함성 아키텍처 설계

---

전반적으로 <strong>4-3-1.</strong> 내용과 거의 유사하지만, 아래의 요인들을 중점으로 둔 시스템 설계이다.

- 고가용성: <strong>고가용성</strong> 설계는 가동 중단 시간을 최소화하기 위한 설계를 의미한다.
- 내결함성: <strong>내결함성</strong> 설계는 가동 중단이 없도록 설계하는 것을 의미한다.

또한, 재해시 복구 설계(시스템이 재해 상황중에도 작동하도록 설계하는 것)까지 고려한다는 점을 차이점으로 둘 수 있다. 재해 복구시에는 목표를 설정하여 복구해야한다 강조한다.

- 복구 시점 목표 (RPO): 마지막 데이터 복구 시점 이후 허용되는 최대 시간. 즉, 백업 주기를 일컫는다.
- 복구 시간 목표 (RTO): 서비스 중단 시점과 서비스 복원 시점 사이에 허용되는 최대 시간. 즉, 서비스 복구에 필요한 최대 지연 시간을 일컫는다.

이 목표의 요구치에 따라 여러 재해 복구 전략을 간단하게 소개하며, 중점으로 볼 영역으로는 아래와 같은 작업을 수행하는 방법에 대해 추가 학습을 권유한다.

- 인프라 무결성을 보장하기 위한 자동화 전략 결정
- AWS 리전 또는 가용 영역 전반에서 고가용성 또는 내결함성 아키텍처를 제공하는 데 필요한 AWS 서비스 결정
- 비즈니스 요구 사항에 따라 지표 식별
- 단일 장애 지점을 완화하기 위한 설계 구현
- 데이터의 내구성 및 가용성을 보장하기 위한 전략 구현
- 비즈니스 요구 사항을 충족하는 적절한 DR 전략 선택
- 레거시 애플리케이션 및 클라우드용으로 구축되지 않은 애플리케이션의 신뢰성을 향상하는 AWS 서비스 사용
- 워크로드에 목적 기반 AWS 서비스 사용

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-3-2.png"/>
  <br>

  - <strong>A</strong>: 고가용성을 위해서는 여러 가용 영역에서 인스턴스를 호스트해야한다. 하나의 가용 영역 선택은 올바르지 않은 답변이다.
  - <strong>B</strong>: 피어링된 VPC는 두 VPC 간의 통신을 허용하지만 애플리케이션의 고가용성에 대한 요구 사항을 해결하지는 못한다.
  - <strong>D</strong>: 애플리케이션 로드밸런서의 구성은 단일 리전에서만 작동할 수 있기에 오답이다.
  
</details>

<br>
<br>

#### 4-4. 고성능 아키텍처 설계

---

고성능 솔루션을 설계할 때 고려해야 할 주요 계층으로 아래 요인들을 꼽는다.

- 컴퓨팅 계층
- 스토리지 계층
- 데이터베이스 계층
- 네트워크 계층

위와 더불어 데이터 수집 및 변환 솔루션을 중점적으로 학습해야 한다 강조한다.

<br>
<br>

##### 4-4-1. 고성능 및 확장 가능한 스토리지 솔루션 결정

---

AWS에서 스토리지는 크게 세가지 형태로 존재하며 대표적인 서비스는 아래와 같다.

- 객체 (Amazon S3)
- 블록 (Amazon EBS)
- 파일 (Amazon EFS)

아키텍처는 애플리케이션에 알맞는 스토리지 솔루션을 결정할 줄 알아야한다 강조한다. 이번 장을 요약하자면 아래와 같다. <del>(스토리지 솔루션의 연습문제는 없다.)</del>

- 성능 요구를 충족하는 스토리지 서비스 및 구성 결정
- 향후 요구 사항을 수용하도록 크기를 유연하게 조정할 수 있는 스토리지 서비스 결정

<br>
<br>

##### 4-4-2. 고성능의 탄력적인 컴퓨팅 솔루션 설계

---

AWS에서 컴퓨팅은 크게 세가지 형태로 존재하며 대표적인 서비스는 아래와 같다.

- 인스턴스 (Amazon EC2)
- 컨테이너 (Amazon ECS, Amazon EKS)
- 함수 (AWS Lambda)

아키텍처는 애플리케이션에 알맞는 컴퓨팅 솔루션을 결정할 줄 알아야한다 강조한다. 이번 장을 요약하자면 아래와 같다. 

- 구성 요소가 크기를 독립적으로 조정할 수 있도록 워크로드 분리
- 크기 조정 작업을 수행하기 위한 지표 및 조건 식별
- 비즈니스 요구 사항을 충족하는 적절한 컴퓨팅 옵션 및 기능 (Ex. EC2 인스턴스 유형) 선택
- 비즈니스 요구 사항을 충족하는 적절한 리소스 유형 및 크기 (Ex. Lambda 메모리 양) 선택

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-4-2.png"/>
  <br>

  - <strong>A</strong>: 인스턴스 크기가 클수록 비용이 증가하므로 비용 효율적인 방식이 아니기에 오답이다.
  - <strong>B</strong>: 스팟 인스턴스는 온디맨드 인스턴스보다 비용 효율적이지만 성능 향상 관점에서 바라본다면 변화가 없다. 온디맨드 인스턴스 대비하여 비용 효율성만 감소할 수 있으므로 오답이다.
  - <strong>D</strong>: Amazon Lambda 함수 런타임은 최대 15분이라는 제한이 있기 때문에 오답이다.
  
</details>

<br>
<br>

##### 4-4-3. 고성능 데이터베이스 솔루션 결정

---

아키텍처는 애플리케이션에 알맞는 데이터베이스 솔루션을 결정할 줄 알아야한다 강조한다. 이번 장을 요약하자면 아래와 같다.

- 데이터베이스 아키텍처 설계
- 적절한 데이터베이스 엔진 결정
- 적절한 데이터베이스 유형 결정
- 비즈니스 요구 사항을 충족하도록 캐싱 통합
- 비즈니스 요구 사항을 충족하도록 읽기 전용 복제본 구성

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-4-3.png"/>
  <br>

  - <strong>B</strong>: Amazon DocumentDB는 키 값 데이터베이스가 아니기 때문에 오답이다.
  - <strong>C</strong>: 실행 가능한 솔루션이지만 Amazon Lambda 함수를 작성하기 위해서는 사용자 정의 함수가 필요하고 유지보수 되어야한다. 이는 다소 많은 운영 오버헤드를 발생시키므로 오답이다.
  - <strong>E</strong>: Amazon Kinesis를 사용하여 데이터를 Amazon Redshift에 전달할 수는 있지만 요구사항에 맞는 데이터를 분석하기에는 적절하지 않다. Amazon S3는 여러 다양한 소스의 데이터를 쉽게 결합할 수 있는 솔루션이므로 더 나은 선택지가 존재하므로 오답이다.
  
</details>

<br>
<br>

##### 4-4-4. 고성능 및 확장 가능한 네트워크 아키텍처 결정

---

아키텍처를 잇는 네트워크는 인프라 구성에서 빠질 수 없는 요소이다. 그만큼, 기본 사항이 가장 중요하다 강조한다. 이번 장을 요약하자면 아래와 같다.

- 다양한 아키텍처 (Ex. 글로벌, 하이브리드, 멀티 티어) 에 대한 네트워크 토폴로지 생성
- 향후 요구 사항을 수용할 수 있도록 크기를 조정할 수 있는 네트워크 구성 결정
- 비즈니스 요구 사항을 충족하도록 리소스의 적절한 배치 결정
- 적절한 로드 밸런싱 전략 선택

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-4-4.png"/>
  <br>

  - <strong>A</strong>: CAA 레코드는 도메인 또는 하위 도메인에 대한 인증서를 발급할 수 있는 인증 기관을 지정한다. 따라서, CAA 레코드는 이 시나리오에서 도움이 되지 않기에 오답이다.
  - <strong>B</strong>: 하나의 VPC는 최대 125개의 피어링 연결을 허용할 수 있다. 질문은 계정당 4개의 VPC가 있는 계정이 50개가 넘게 존재하므로 최대 허용 개수를 초과한다.
  - <strong>D</strong>: VPN 연결을 생성하고 관리하는 과정에서 많은 운영 오버헤드가 발생하므로 오답이다.
  
</details>

<br>
<br>

##### 4-4-5. 고성능 데이터 수집 및 변환 솔루션 결정

---

아키텍처는 애플리케이션에 알맞는 데이터 수집 및 변환 솔루션을 결정할 줄 알아야한다 강조한다. 이번 장을 요약하자면 아래와 같다.

- 데이터 레이크 구축 및 보호
- 데이터 스트리밍 아키텍처 설계
- 데이터 전송 솔루션 설계
- 시각화 전략 구현
- 데이터 처리를 위한 적절한 컴퓨팅 옵션 선택
- 수집에 적합한 구성 선택
- 형식 간 데이터 변환 (Ex. .csv => .parquet)

<br>
<br>

#### 4-5. 비용이 최적화된 아키텍처 설계

---

이 영역에서는 스토리지, 컴퓨팅, 데이터베이스 그리고 네트워크에 대해 비용이 최적화된 솔루션을 알아보는 장이다. 즉, 가장 낮은 가격으로 비즈니스 가치를 제공할 수 있는 능력을 뜻한다.

이 영역은 아래의 네가지 작업 설명으로 구분된다.

- 비용이 최적화된 스토리지 솔루션 설계
- 비용이 최적화된 컴퓨팅 솔루션 설계
- 비용이 최적화된 데이터베이스 솔루션 설계
- 비용이 최정화된 네트워크 아키텍처 설계

<br>
<br>

##### 4-5-1. 비용이 최적화된 스토리지 솔루션 설계

---

이미 [고성능 및 확장 가능한 스토리지 솔루션 결정](#4-4-1-고성능-및-확장-가능한-스토리지-솔루션-결정)에서 스토리지 솔루션 (객체 / 블록 / 파일) 에 대해서는 미리 간략히 학습하였다. 이번 장에서는 비용을 최적화 할 수 있는 방안에 대해서 설명한다. 

요약하자면 아래와 같다.

- AWS Auto Scaling과 EC2 Auto Scaling 통합
- 자동으로 크기가 조정되는 AWS 서비스 인식
- 스토리지의 적정 크기 결정
- 데이터 수명 주기 규칙 구현
- S3 스토리지 등급 및 객체 수명 주기 관리
- 적절한 백업 및 아카이브 솔루션 선택
- 스토리지 서비스로의 데이터 마이그레이션에 적합한 서비스 선택

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-5-1.png"/>
  <br>

  - <strong>A</strong>: Amazon S3에 대한 파일 인터페이스를 지원하는 솔루션.
  - <strong>C</strong>: Amazon EFS는 Linux 기반 워크로드를 위한 파일 시스템 솔루션.
  - <strong>D</strong>: Amazon S3는 EC2 인스턴스에 탑재할 수는 없으므로 오답.
  
</details>

<br>
<br>

##### 4-5-2. 비용이 최적화된 컴퓨팅 솔루션 설계

---

이미 [고성능의 탄력적인 컴퓨팅 솔루션 설계](#4-4-2-고성능의-탄력적인-컴퓨팅-솔루션-설계)에서 컴퓨팅 솔루션 (인스턴스 / 컨테이너 / 함수) 에 대해서는 미리 간략히 학습하였다. 이번 장에서는 비용을 최적화 할 수 있는 방안에 대해서 설명한다.

비용 최적화를 하기 위한 아래의 핵심 요소들을 설명한다.

- 최적의 크기 조정
- 탄력성 증대
  - 수직적 인스턴스의 탄력성 증가는 가동 중단 시간이 존재하지만, 수평적 크기 조정은 가동 중단 시간이 존재하지 않는다.
- 올바른 요금 모델 선택
- 사용량에 맞춰 스토리지 조정
  - 컴퓨팅 환경에 맞게 스토리지 크기를 적절히 조정해야한다.
- 측정 및 모니터링
  - 아키텍처는 지속적으로 변경될 가능성이 매우크다. 측정과 모니터링을 통해서 크기를 줄이거나 늘리는 등의 유연한 아키텍처 설계가 필요하다.

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-5-2.png"/>
  <br>

  - <strong>A</strong>: 신속한 크기 조정 불가 (크기 조정 과정에서 추가 EC2 부팅이 필요하므로 몇 분 정도의 시간 소모 필요) / 비용 효율적이지 못함 (EC2 기반 서비스이므로 유휴 상태에도 비용이 지불됨)
  - <strong>C</strong>: 위와 동일한 이유로 오답.
  - <strong>D</strong>: 위와 동일한 이유로 오답. (ECS 또한 EC2 기반이다. ECS 클러스트의 크기를 조정해야 하는 경우에 몇 분 정도의 시간 소모 필요)
  
</details>

<br>
<br>

##### 4-5-3. 비용이 최적화된 데이터베이스 솔루션 설계

---

이미 [고성능 데이터베이스 솔루션 결정](#4-4-3-고성능-데이터베이스-솔루션-결정)에서 데이터 유형에 따라 올바른 데이터베이스 솔루션을 선택하는 방법에 대해서는 미리 간략히 학습하였다. 이번 장에서는 비용을 최적화 할 수 있는 방안에 대해서 설명한다.

비용 최적화를 하기 위한 아래의 핵심 요소들을 설명한다.

- 최상의 크기 조정 전략 선택
  - 읽기 요청의 비중이 많은 데이터베이스의 경우 인스턴스를 늘리기 보다는 읽기 전용 복제본 혹은 캐시 레이어를 추가한다.
- 백업 계획 구현
- AWS Managed Services 사용
  - 서버를 유지 관리하는 운영상의 부담을 제거하므로 비용 최적화에 큰 도움이 된다.

<br>
<br>

##### 4-5-4. 비용이 최적화된 네트워크 아키텍처 설계

---

이미 [고성능 및 확장 가능한 네트워크 아키텍처 결정](#4-4-4-고성능-및-확장-가능한-네트워크-아키텍처-결정)에서 네트워크 아키텍처를 선택하는 방법에 대해서는 미리 간략히 학습하였다. AWS 클라우드 인프라에서 네트워크는 가상화되어 있으며 사용하는 만큼 비용을 지불하게 된다. 이번 장에서는 비용을 최적화 할 수 있는 방안에 대해서 설명한다.

- 네트워크에 적합한 NAT 게이트웨이 유형 구성
- 적절한 제한 전략 선택
- 네트워크에 적합한 대역폭 할당 선택
- 적절한 네트워크 경로를 구성하여 네트워크 전송 비용 최소화
- 콘텐츠 전송 네트워크 (CDN) 및 엣지 캐싱에 대한 전략적 요구 사항 결정
- 네트워크 최적화를 위한 기존 워크로드 검토

<br>
<details>
  <summary><strong>연습 문제</strong></summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-5-4.png"/>
  <br>

  - <strong>B</strong>: 배스천 호스트는 EC2 인스턴스에 접근시 비용이 발생하므로 비용 효율적인 솔루션은 아니다.
  - <strong>C</strong>: NAT 게이트웨이는 수신이 아닌 송신 네트워크 트래픽만 허용하므로 기술적으로 불가능하다.
  - <strong>D</strong>: VPN 연결은 추가 비용이 발생하므로 비용 효율적인 솔루션은 아니다.
  
</details>

<br>
<br>

### 5. 과정 마무리

---

다시 한번 시험 콘텐츠에 대한 비중이 리마인드 된다.

- 영역 1: 보안 아키텍처 설계 ( 30% )
- 영역 2: 복원력을 갖춘 아키텍처 설계 ( 26% )
- 영역 1: 고성능 아키텍처 설계 ( 24% )
- 영역 1: 비용이 최적화된 아키텍처 설계 ( 20% )

<del>보안이 제일 재미없는데.. 비중이 제일 높다.</del> 비중에 따라 학습을 어떤 부분에 몰두 할 수 있는지 다시한번 점검할 수 있었다.

또한, 이 영상의 목적은 자격증 시험에 필요한 지식을 가르치기 위한 것이 아니라 자격증 시험에 응시하기 위한 준비 상태 수준을 확인하고 어떤 부분을 보완해야하는지 스스로 자체 평가하는 방법을 제공하기 위함임을 강조한다.

그리고 마지막으로 시험 응시에 관련한 유용한 팁을 제공한다.

- 답변을 보기 전에 먼저, 질문을 읽고 이해하라.
- 핵심 문구 및 수식 어구를 먼저 파악하라.
- 주제에 관해 알고 있는 내용을 기반으로 보기 중 일부를 먼저 배제하라.
- 확인된 핵심 문구 및 수식 어구를 염두에 두고 나머지 보기와 비교하고 대조하라.
- 한 문제에 너무 많은 시간을 할애하고 있다면 최선의 추측을 선택 후 나중에 검토하라.

<br>
<br>

## 🤔 Understanding

[과정 마무리](#5-과정-마무리)에 나온대로 자격증 시험에 필요한 내용들을 깊게 학습할 수 있었던 콘텐츠는 아니였다. 

어떤 영역에 더 많은 시간을 투자해야하는지, 그리고 그 영역에서 가장 깊게 학습해야할 요소들은 무엇인지에 대해서 얕게나마 알아볼 수 있었던 시간이었다.

만약 자격증 시험을 준비할 시간이 충분한 상황이라면 이 영상을 한번쯤 듣고 난 뒤 어떤 방식으로 학습해야할 지 방향을 정리하기 좋아보인다. 하지만, 시험을 준비할 시간이 촉박하다면 이 영상 시청을 과감히 생략하고 문항 풀이를 반복하는게 시간 절약 측면에서는 유리할듯하다. (자격증 시험에 필요한 내용들을 학습할 수 있는 영상은 아니다.)

앞으로의 자격증 시험 대비를 위한 학습은 시험 콘텐츠 비중에 맞게끔 기출 문제들 위주로 반복 풀이를 해볼 예정이다. 따라서 자격증 관련된 학습 내용은 이 번 포스팅이 마지막이 될 듯하다.

12월 28일 이후 시험 후기로 마지막 포스팅을 남기도록하겠다.

<br>
<br>

```toc

```
