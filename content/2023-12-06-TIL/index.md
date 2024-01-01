---
emoji: 📚
title: 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 (김영한)
date: '2023-12-06'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/TIL.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

---

<br>

- 미루고 미뤄왔던 Java 언어 공부 ~~(알고리즘 풀이를 Java로 선택하여 공부 대체중..)~~ 와 Spring Frame Work에 대한 공부를 해보려한다.

  ![spring_1.png](spring_1.png)

  우선 가장 대중적인 강의를 선택하였다.

  > <a href="https://www.inflearn.com/course/%EC%8A%A4%ED%94%84%EB%A7%81-%EC%9E%85%EB%AC%B8-%EC%8A%A4%ED%94%84%EB%A7%81%EB%B6%80%ED%8A%B8" target="_blank">인프런 - 스프링 입문 - 코드로 배우는 스프링 부트, 웹 MVC, DB 접근 기술 [김영한]</a>

  <br>

  ![spring_2.png](spring_2.png)

  작성일(2023.12.06) 기준 5530개의 수강평과 별점이 무려 5.0(!?)이나 되는 명강의로. 백엔드 주니어 개발자들의 필독 강의이자 스테디셀러로 이미 유명하다.

<br>
<br>

### 1. 프로젝트 환경설정

---

- 우선 프로젝트 환경설정에 앞서서 사전 준비물을 구성해주어야한다.
  - Java: **Java 21 LTS (23.12.06 기준)**
  - IDE: **IntelliJ**

  위 두가지 개발 도구들을 미리 설치하고 강의 수강을 진행하자.

  <br>

- 우선 Java를 선행해서 설치해 주어야 한다. 강의에서는 11버전을 언급하였으나, [강의자료]를 참조하면 자바 17 이상을 사용해달라 권고한다.

  17 버전은 공식문서에 따르면 2024년 9월까지 업데이트 지원이 예정되어있으며, 21 버전은 2026년 9월까지 업데이트 지원이 예정되어 있었다.

  이왕이면 사후관리가 조금 더 긴 21 LTS 버전을 선택하여 <a href="https://www.oracle.com/java/technologies/downloads/#java17" target="_blank">Oracle 공식 홈페이지</a>를 통하여 설치해주었다.

  ![java.png](java.png)

  MAC 환경의 유저라면 DMG 설치 마법사 패키지를 통하여 쉽게 설치할 수 있다.

  ![terminal.png](terminal.png)

  Java 설치 후 `java --version` 명령어를 통해 설치 여부를 확인해주자.

  <br>

- IDE는 <a href="https://www.jetbrains.com/ko-kr/idea/download/?section=mac" target="_blank">IntelliJ 공식 홈페이지</a>를 통하여 설치해주었다.

  ![intellij.png](intellij.png)

  **Community Edition**을 설치해주어야 무료로 사용 가능하니 이점 참고해서 설치를 해주자.


  <br>
  <br>

#### 1-1. 프로젝트 생성

---

- 기본 개발 환경이 구성되었다면, 🔗 <a href="https://start.spring.io/" target="_blank">Spring Boot 스타터 사이트</a>를 통해 아래와 같은 세팅으로 프로젝트를 생성해준다.

  ![boot.png](boot.png)

  - **Project: Gradle - Kotlin**

    > 🔗 https://github.com/gradle/gradle 참조
    > 
    > Gradle 은 빌드 자동화 및 다국어 개발 지원에 중점을 둔 빌드 도구입니다.
    > 어떤 플랫폼에서든 소프트웨어를 구축, 테스트, 게시 및 배포하는 경우 Gradle은 코드 컴파일 및 패키징부터 웹 사이트 게시까지 전체 개발 수명주기를 지원할 수 있는 유연한 모델을 제공합니다.
    >
    > Gradle은 Java, Scala, Android, Kotlin, C/C++, Groovy를 포함한 여러 언어 및 플랫폼에서 빌드 자동화를 지원하도록 설계되었으며 Eclipse, IntelliJ, Jenkins를 포함한 개발 도구 및 지속적인 통합 서버와 긴밀하게 통합됩니다.

    Gradle을 선택한 뒤 Groovy / Kotlin는 크게 중요하지 않은 듯 하다.

    다만, Kotlin을 사용시 추후 확장성(?)에서 조금 유리하지 않을까 싶어서 선택하였다.

  - **Language: Java**

  - **Spring boot: 3.2.1**

    SNAPSHOT은 아직 개발중인 버전이다. 또한, M1등은 아직 정식 릴리즈 버전이 아니므로 괄호로 쌓여있는 버전이 아닌 LTS 버전을 택해주자.

  - **Project Metadata**

    - **Group**: 기업명 등을 적어준다. (개인 프로젝트이므로 깃허브 계정을 적었다.)
    - **Artifact**: Build 결과물. (프로젝트명을 적어주었다.)
    
  - **Dependencies**

    Spring Boot 기반으로 프로젝트 생성시 기본으로 가져올 외부 라이브러리 모음

    - **Spring Web**: Spring MVC 패턴을 가진 RESTful한 웹 서버를 만들때 사용한다.
    - **Thymeleaf**: html 템플릿 엔진이 필요한 경우 사용한다.

  위 설정 세팅 후 **GENERATE** 버튼을 눌러 프로젝트를 생성해준다.



  <br>
  <br>

#### 1-2. 라이브러리 살펴보기

---

  <br>
  <br>

#### 1-3. View 환경설정

---

  <br>
  <br>

#### 1-4. 빌드하고 실행하기

---

  <br>
  <br>

### 2. 스프링 웹 개발 기초

---

  <br>
  <br>

#### 2-1. 정적 컨텐츠

---

  <br>
  <br>

#### 2-2. MVC와 템플릿 엔진

---

  <br>
  <br>

#### 2-3. API

---

  <br>
  <br>

### 3. 회원 관리 예제 - 백엔드 개발

---

  <br>
  <br>

#### 3-1. 비즈니스 요구사항 정리

---

  <br>
  <br>

#### 3-2. 회원 도메인과 리포지토리 만들기

---

  <br>
  <br>

#### 3-3. 회원 리포지토리 테스트 케이스 작성

---

  <br>
  <br>

#### 3-4. 회원 서비스 개발

---

  <br>
  <br>

#### 3-5. 회원 서비스 테스트

---

  <br>
  <br>

### 4. 스프링 빈과 의존관계

---

<br>
<br>

#### 4-1. 컴포넌트 스캔과 자동 의존관계 설정

---

  <br>
  <br>

#### 4-2. 자바 코드로 직접 스프링 빈 등록하기

---

  <br>
  <br>

### 5. 회원 관리 예제 - 웹 MVC 개발

---

  <br>
  <br>

#### 5-1. 회원 웹 기능 - 홈 화면 추가

---

  <br>
  <br>

#### 5-2. 회원 웹 기능 - 등록

---

  <br>
  <br>

#### 5-3. 회원 웹 기능 - 조회

---

  <br>
  <br>

### 6. 스프링 DB 접근 기술

---

  <br>
  <br>

#### 6-1. H2 데이터베이스 설치

---

  <br>
  <br>

#### 6-2. 순수 JDBC

---

  <br>
  <br>

#### 6-3. 스프링 통합 테스트

---

  <br>
  <br>

#### 6-4. 스프링 JdbcTemplate

---

  <br>
  <br>

#### 6-5. JPA

---

  <br>
  <br>

#### 6-6. 스프링 데이터 JPA

---

  <br>
  <br>

### 7. AOP

---

  <br>
  <br>

#### 7-1. AOP가 필요한 상황

---

  <br>
  <br>

#### 7-2. AOP 적용

---

  <br>
  <br>

### 8. 다음으로

---

  <br>
  <br>

#### 8-1. 다음으로

---

  <br>
  <br>

## 🤔 Understanding

---

-

<br>
<br>

```toc

```
