---
emoji: 📚
title: VSCode ERD Editor 사용하기
date: '2024-07-18'
author: JH8459
categories: TIL
---

![github-blog.png](../../assets/common/til.jpeg)

<br>

## ✍️ **T**oday **I** **L**earned

평소 ERD(Entity Relationship Diagram)는 목적에 따라 아래와 같은 도구들을 활용하여 작성하고 관리하고 있었다.

- 프로젝트 초기 설계시엔 팀원과 함께 작성해야하므로 <a href="https://www.erdcloud.com/" target="_blank">ERDCloud</a>에서 실시간으로 ERD를 공유하며 DB 설계를 진행하였다.
- 운영 중인 서비스의 ERD를 확인해야 하는 경우엔 <a href="https://www.mysql.com/products/workbench/" target="_blank">MySQL Workbench</a>의 내장 기능을 활용해서 ERD를 추출하였다.

프로젝트 DB 구조 변경 히스토리를 Repository에 담아 관리하고자 싶어 레퍼런스를 찾아보다 VSCode 확장 도구 중에 <a href="https://docs.erd-editor.io/" target="_blank">ERD Editor</a>를 사용해보고 그 과정 중 느낀점을 공유하고자 이번 포스팅을 남긴다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-07-18-TIL/extension.png"/>
<br>
<center><strong>출시한지 얼마 안된 따끈-따끈한 Extension이다. 🔥</strong></center><br><br>

<br>
<br>

### 1. ERD의 관리 미흡으로 인한 문제점

---

우선 ERD는 데이터베이스의 구조를 시각적으로 표현하고 데이터베이스의 각 요소들 간의 관계를 명확히 보고자 필요한 도구이다. (특히, 초기 데이터베이스의 구조 설계시에는 필수적으로 필요하다 생각한다.)

다만, 서비스는 보통 점점 확장이 되어가며 초기 구성과는 데이터베이스의 구성이 변경 될 가능성이 높다. 그럴때마다 ERD를 항상 새로 그리는 건 너무 시간적으로 너무 큰 비용이 지출된다.  

실시간으로 싱크를 맞출 방법이 있다면 모르겠지만, 그게 아니라면 실제 운영 중인 데이터베이스와 ERD를 동일하게 싱크를 맞추기 위하여 서두에서 언급한 <strong>MySQL Workbench</strong>를 통해서 현재 운영 중인 데이터베이스를 기반으로 ERD를 생성하고 있었다.

- 다만, 그렇게 추출된 파일은 `.mwb`이라는 독자 규격의 확장자로 추출되게 되어 <strong>MySQL Workbench</strong>를 통해서만 확인이 가능한 점이 단점으로 존재했다.

<br>
<br>

우선 ERD를 위해 외부 도구를 계속 써야하는 불편함이 느껴져서 IDE 내부에서 처리할 수 없는지 고민하게 되었으며 필수 조건은 아래와 같았다.

1. IDE를 통해서 프로젝트의 디렉토리 내부에서 파일 형태로 관리하고 싶었다.
2. 특수한 파일 포맷이 아닌 확장성이 좋은 포맷(`.md`, `.json` 등등)으로 관리되길 되길 원했다.
3. 실제 데이터베이스와 싱크를 맞춰둔 ERD를 Repository에 담아 히스토리로 관리하고 싶었다.

여러 도구들 중 VSCode Extension인 <strong>ERD Editor</strong>을 선택하였다.

<br>
<br>

### 2. ERD Editor

---

우선 선택한 가장 큰 이유는 만족할만한 사용자 경험이다. 현재 나는 <strong>ORM</strong>을 통해 데이터베이스를 설계하고 있으며, 실제 데이터베이스를 직접 생성하는 것이 아닌 `TypeScript`로 객체를 생성하고 이를 통해 데이터베이스를 자동으로 맵핑하여 생성하고있다.

따라서, 기존 방식은 ERD 생성을 위해서 <strong>MySQL Workbench</strong>등의 외부 도구를 별도로 활용해야만 하였다.

반면에 <strong>ERD Editor</strong>는 VSCode IDE 내부에서 Extension을 설치한 뒤 `*.erd.json` 파일만 추가하면 바로 사용이 가능하였으며 SQL 파일을 읽어서 자동으로 ERD를 생성해주는 편의 기능을 제공해주었다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-07-18-TIL/import.png"/>
<br>
<center><strong>VSCode에서 단순 .json 파일에서 이러한 DX 경험이 가능하다니..! 😳</strong></center><br><br>

물론 SQL로 파일이 필요하므로 아래와 같은 간단한 명령어로 SQL 추출은 필요로 하였다.

```bash
mysqldump --single-transaction -h 000.00.00.00 -u root -p --no-data lottery > LOTTERY_DB.sql
```

이렇게 생성된 `.sql` 포맷의 파일을 넣어주면 자동으로 ERD가 생성이 완료된다.

<img src="https://jh8459.s3.ap-northeast-2.amazonaws.com/blog/2024-07-18-TIL/erd.png"/>
<br>
<center><strong>클릭 몇번이면 ERD가 VSCode안에서 생성이 된다. 👍</strong></center><br><br>

<br>
<br>

## 🤔 Understanding

사용법은 워낙 간단하고 공식 문서에서도 친절히 설명해주기에 본문에서는 생략하였다.

> 📌 <a href="https://docs.erd-editor.io/" target="_blank">docs.erd-editor.io</a> 바로가기

<br>

앞으로는 아래의 순서로 실제 운영중인 프로젝트의 데이터베이스와 ERD의 싱크를 맞추고 히스토리화 해보려한다.

1. `TypeORM`을 사용하여 엔티티 객체 ↔ 데이터베이스 맵핑
2. CLI 명령어를 통한 데이터베이스 `.sql` 파일 추출
3. 추출된 파일을 통한 ERD 생성

그리고 이렇게 싱크를 맞춘 ERD를 파일명 컨벤션을 별도로 정해서 Repository에 올려서 히스토리 또한 관리해보고자 한다.

본문의 예시는 실제로 사용중인 사이드 프로젝트를 예시로 들었지만, 실제 사내에서 운용중인 데이터베이스들도 미흡한 관리로 방치되고 있는 ERD를 다시 한번 수정해봐야겠다.

<br>
<br>

