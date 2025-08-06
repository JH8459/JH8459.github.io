---
emoji: 📚
title: AWS Solution Architect Associate (SAA-03 자격증 접수)
date: '2024-11-07'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

24년도 하반기 공채 시즌이 끝나고 온프레미스 환경에서 구축한 인프라가 점차 한계에 다다르고 있음을 느꼈다. (유연하지 못한 인프라 구조가 갖는 한계라 생각한다.)

아래 사진은 오전 9시부터 시작하여 오후 1시에 종료되는 온라인 인적성검사 네트워크 트래픽 그래프이다. 매 교시가 종료될 때마다 영상을 저장하는 부분에서 많은 트래픽이 발생하고 있으며, 이 트래픽의 부하분산이 가장 큰 해결 과제이다.

<br>
<br>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-07-TIL/%E1%84%90%E1%85%B3%E1%84%85%E1%85%A2%E1%84%91%E1%85%B5%E1%86%A8.png"/>
<br>
<center><strong>붉은색 동그라미가 각 교시가 종료될 때마다 영상이 저장되는 시점이다. 🔥</strong></center><br><br>

평소 수시 채용 기간은 전혀 문제가 없지만, 상/하반기 집중 채용기간에는 많은 인원들이 응시하게된다. 접수 인원을 토대로 응시 예상 인원을 산정하고 있지만, 예상보다 높은 응시 인원이 발생하는 경우가 생기기도 한다.

이럴 때마다 유연하지 못한 온프레미스 환경에서는 부하를 감수하고 일정을 진행한 경험도 있다. (이 때문에 주말 출근도 종종 이뤄지고 있다. 😂)

<br>
<br>

AWS 서비스 중 <strong>API GateWay</strong>와 <strong>AWS Lambda</strong>를 사용하는 서버리스 인프라를 부분적으로 도입을 검토하고 있고 이 외에도 <strong>Best Practice</strong>가 무엇인지 고민을 하고 있다.

이 과정에서 자연 스럽게 자격증 취득 또한 관심이 갔다. <del>(아무래도 동기부여 목적이 가장크다!)</del> 오늘은 자격증 취득 학습하기에 앞서 사전 준비 과정과 앞으로 학습 목표를 간단히 적어보기 위해 포스팅을 남긴다.

<br>
<br>

### 1부. AWS Certified: Associate Challenge 참여하기

---

AWS Certified는 취득 비용이 만만치 않다. <del>(높은 환율 또한 한 몫한다..)</del>

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-07-TIL/cost.png"/>
<br>
<center><strong>무려 150$ 💰</strong></center><br><br>

자격증 취득 비용은 회사 복지로 응시료는 지원을 받긴 하지만 <del>(합격시 1회만 지원받는다!)</del> 떨어질 확률(?) 또한 존재하므로 응시료를 낮출 목적으로 조사해보니 매년 응시료 감면 챌린지가 있다는 걸 확인하였다.

- <a href="https://pages.awscloud.com/kr-traincert-certification-challenge-associate-2023-reg.html" target="_blank">AWS Associate 자격증 챌린지 - 2023</a>
- <a href="https://pages.awscloud.com/GLOBAL-ln-GC-Traincert-Associate-Certification-Challenge-Registration-2024.html?trk=1d696fd8-8f9d-437d-a235-263e41a73c4a&sc_channel=el" target="_blank">AWS Associate 자격증 챌린지 - 2024</a>

챌린지 등록만하면 50% 감면 바우처 코드가 메일로 수신되니 응시 전 꼭! 등록하자. (<strong>~2024-12-12</strong>)

응시료 바우처를 적용하니 한화로 98,643원이 실제로 결제 금액이 청구되었다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-11-07-TIL/bill.png"/>
<br>
<center><strong>바우처 이름이 "exclude Japan(?)" 조금 찜찜하긴하다..</strong></center><br><br>

바우처명이 조금 찜찜(?)한 구석은 있으나 결제까지 무난히 되었으므로 넘어가도록했다.

<br>
<br>

### 2부. 온라인 / 오프라인 선택

---

이건 후기 글을 조사하며 느낀건데, 온라인 응시가 생각보다 불편하다라는게 보편적인 의견이 많았다.

온라인 응시 환경 조성만 2시간 넘게하였다는 후기 글도 보았고, 온라인 감독관이 외국인이여서 커뮤니케이션에서 조금 어려웠다는 후기도 많이 보였다.

반면에 오프라인 응시는 신분증만 잘 챙겨간다면 간단한 몸 수색(?) 후 빠르게 진행되었다는 후기가 많이보여서 오프라인으로 선택하였다.

거주 지역이 수도권이라면 오프라인 선택이 나쁘진 않아보이지만 예약을 미리 잡아야하므로 최소 한달 전에 미리 신청하는걸 추천한다.

작성일 11월 7일 기준으로 12월 28일 응시 예정이다. 한달 반 전 예약은 무리없이 진행하였다.

<br>
<br>

## 🤔 Understanding

오늘은 간단히 응시료 감면을 위한 바우처 등록 및 시험 일자 예약만 진행하였다. 

포스팅을 마치면 <a href="https://d1.awsstatic.com/ko_KR/training-and-certification/docs-sa-assoc/AWS-Certified-Solutions-Architect-Associate_Exam-Guide.pdf" target="_blank">AWS Certified Solutions Architect - Associate(SAA-C03) 시험 안내서</a> 정도만 읽어보는 정도로 마무리를 지을 예정이다.

조사해본 결과 자격 검증 문항 구성이 버전에 따라 바뀐다하니 응시 기간 또한 전략적으로 접근해야할 듯하다. 다행히 현재 <strong>SAA-C03</strong> 버전은 1년 넘게 진행되고 있어서 Dump 문제들도 쉽게 구할 수 있어서 응시하기에 좋은 시기라 생각한다.

학습하는 기간은 약 한달 반 가량될 듯 하지만 연말이다 보니 시간을 얼마나 쏟을 수 있을지는 모르겠다. 학습하는 과정을 기록으로 남기고자 0일차 부터 포스팅을 남겨본다. <del>꼭 한번에 붙자..!!</del>

<br>
<br>

