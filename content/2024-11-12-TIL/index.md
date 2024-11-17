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

<br>
<br>

##### 4-3-2. 고가용성 및 내결함성 아키텍처 설계

---

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
