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

SAA-03 합격 후기글을 찾아보면 덤프 문제를 많이 풀이해보는게 지름길이란건 금방 찾아볼 수 있다.

다만, 아직 한달 반 가량 기간이 남은 시점이기 때문에 무작정 덤프 문항 반복 풀이를 시작하는거 보다는 AWS에서 제공하는 시험 준비 <a href="https://explore.skillbuilder.aws/learn/course/external/view/elearning/16410/exam-prep-aws-certified-solutions-architect-associate-saa-c03-na-hangug-eo-gang-ui?trk=120ebd7c-2290-47ba-8973-b7bb852aee18&sc_channel=el)%EC%9D%84" target="_blank">Skill Builder 강의</a>를 한번 따라가보자 생각하였다.

AWS에서 제공하는 SAA-03 Skil Builder 강의를 듣고 간략한 후기를 남기기 위해 포스팅을 남긴다.


<br>
<br>

### Module 1. 시험에 대해 알아보기

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

전반적으로 시험 개요에 대한 설명들로 구성되어 있었다. 영상을 꼼꼼히 시청하기 보다는 뒤에 나오는 <a href="https://explore.skillbuilder.aws/files/a/w/aws_prod1_docebosaas_com/1731398400/yeYMC-Tug8Knrzz6VSNqiw/item/71d8b2b92e965f9e59b8f39274f8249a39aa244669d68bd4bdf6947c55d67c7a.pdf?enhanced_signature=PE8wbjj16jr2HSXEjyRWk6iZRmV2hz35LUCfjJlv5ow" target="_blank">시험 안내서</a>를 한번 정독하는 걸 추천한다.

<br>
<br>

### Module 2. 시험 스타일 문제 알아보기

---

<strong>Module 2.</strong>은 실제 자격증 시험에 사용하는 문항 구성을 미리 점검해 볼 수 있게 구성되어있다.

AWS에서 제공하는 공식 연습 문항 세트인 <strong>AWS Certified Solutions Architect – Associate Official Practice Question Set (SAA-C03 - Korean)</strong>을 체험해 볼 수 있었다. (학습을 안한 상태에서의 정답률은 30%가 나왔다..😂)

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/aws_%E1%84%8B%E1%85%A9%E1%84%83%E1%85%A1%E1%86%B8%E1%84%85%E1%85%B2%E1%86%AF.png"/>
<br>
<center><strong>열심히 공부하자..!! 🔥</strong></center><br><br>

어디까지나 연습 문항 세트일 뿐이기 때문에 시험 스타일 문제를 미리 경험해보는 것에 의미를 두고 넘어가도록했다.

<br>
<br>

### Module 3. 시험 주제 알아보기

---

<strong>Module 3.</strong>은 시험 준비를 위해 AWS에서 제공하는 아래와 같은 유사한 교육 과정들을 추천한다.

- <a href="https://explore.skillbuilder.aws/learn/course/external/view/elearning/8319/architecting-on-aws-online-course-supplement" target="_blank">Architecting on AWS</a>
- <a href="https://aws.amazon.com/ko/getting-started/cloud-essentials/" target="_blank">Getting Started: AWS Cloud Essentials</a>
- <a href="https://explore.skillbuilder.aws/learn/course/internal/view/elearning/1851/aws-technical-essentials" target="_blank">AWS Technical Essentials</a>

추가 리소스로 <a href="https://explore.skillbuilder.aws/learn/course/internal/view/elearning/7636/cloud-quest" target="_blank">AWS Cloud Quest</a>라는 AWS 서비스를 추천(?)한다. (그냥 둘러보기만하였다.)

전반적으로 자격증 취득 시험 공부를 본격적으로 진행하기 전에 선행할 수 있는 학습 과정을 추천하고 있다. AWS 실무 능력을 향상시키는데는 큰 도움이 될 수 있겠지만 넘어가도록했다.

<br>
<br>

### Module 4. 시험 준비

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
<summary>연습 문제</summary>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-2-1.png"/>

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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-2-2.png"/>

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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-2-3.png"/>
  
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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-3-1.png"/>
  
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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-3-2.png"/>
  
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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-4-2.png"/>
  
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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-4-3.png"/>
  
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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-4-4.png"/>
  
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

이미 <strong>4-4-1.</strong>에서 스토리지 솔루션 (객체 / 블록 / 파일) 에 대해서는 미리 간략히 학습하였다. 이번 장에서는 비용을 최적화 할 수 있는 방안에 대해서 설명한다. 

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
  <summary>연습 문제</summary>

  <img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-12-TIL/4-5-1.png"/>
  
</details>

<br>
<br>

### 5. 시험 등록

---

<br>
<br>

### 6. 과정 마무리

---

<br>
<br>

## 🤔 Understanding

<br>
<br>

```toc

```
