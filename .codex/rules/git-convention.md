# Git Convention & Workflow

모든 응답과 커밋 메시지는 한국어로 작성합니다.

## 커밋 메시지

### 타입

| 타입 | 설명 |
| --- | --- |
| `feat` | 기능 추가/변경 |
| `refac` | 리팩토링, 입출력 변경 없음 |
| `fix` | 버그 수정 |
| `docs` | 문서 변경 |
| `chore` | 기타 빌드/설정 변경 |
| `test` | 테스트 추가/수정 |
| `style` | 포맷팅, 로직 변경 없음 |
| `perf` | 성능 개선 |

### 형식

```text
<type>(<scope>): <subject>

<body optional>
```

### 규칙

- 제목은 50자 이내로 작성합니다.
- 제목 끝에 마침표를 붙이지 않습니다.
- 제목은 명령형으로 작성합니다.
- 본문은 선택사항이며, 무엇을 왜 바꿨는지 설명합니다.

### 예시

```bash
# 좋은 예
git commit -m "feat(auth): 구글 로그인 추가"
git commit -m "fix(api): null 체크 누락 수정"
git commit -m "refac(user): 메서드 분리"

# 나쁜 예
git commit -m "update code"
git commit -m "feat: 인증 추가 및 문서"
```

## 커밋 워크플로우

### 1. 변경 사항 분석

```bash
git status
git diff HEAD
git log --oneline -10
```

### 2. 분리 커밋 판단

반드시 분리합니다.

- 서로 다른 타입의 변경이 섞인 경우
- 독립적인 기능이 2개 이상인 경우
- 서로 다른 모듈/도메인의 변경이 섞인 경우

하나로 묶어도 됩니다.

- 같은 타입과 같은 기능의 변경인 경우
- 같은 기능의 구현과 테스트가 함께 있는 경우

### 3. 커밋 실행

```bash
# 분리 커밋
git add src/auth/
git commit -m "feat(auth): 구글 로그인 추가"
git add src/user/
git commit -m "fix(user): 프로필 업데이트 버그 수정"

# 단일 커밋
git add .
git commit -m "feat(payment): 결제 모듈 구현"
```

## 커밋 체크리스트

- Type이 변경 의도와 일치하는가?
- Scope가 명확한가?
- 제목이 50자 이내인가?
- 분리해야 할 변경을 섞지 않았는가?
- 가능한 검증 명령을 실행했는가?

## 브랜치 네이밍

| 상황 | 형식 | 예시 |
| --- | --- | --- |
| 일반 작업 | `<type>-<description>` | `feat-user-auth` |
| JIRA 티켓 기반 | `<JIRA-ID>-<description>` | `SD-1234-add-user-api` |

### 규칙

- kebab-case를 사용합니다.
- 하이픈 `-`만 사용하고 슬래시 `/`는 사용하지 않습니다.
- 영어로 간결하게 작성합니다.
- JIRA 티켓이 있으면 티켓 ID를 우선 사용합니다.
