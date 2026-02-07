# Git Convention & Workflow

모든 응답과 커밋 메시지는 **한국어**로 작성합니다.

## 커밋 메시지

### 타입 (Type)

| 타입    | 설명                        |
| ------- | --------------------------- |
| `feat`  | 기능 추가/변경              |
| `refac` | 리팩토링 (입출력 변경 없음) |
| `fix`   | 버그 수정                   |
| `docs`  | 문서 변경                   |
| `chore` | 기타 (빌드, 설정 등)        |
| `test`  | 테스트 추가/수정            |
| `style` | 포맷팅 (로직 변경 없음)     |
| `perf`  | 성능 개선                   |

### 형식

```
<type>(<scope>): <subject>

<body (optional)>
```

**규칙:**

- 제목 50자 이내, 마침표 없음, 명령형
- 본문 선택사항 (무엇을, 왜)

### 좋은/나쁜 예시

```bash
# ✅ 좋은 예
feat(auth): 구글 로그인 추가
fix(api): null 체크 누락 수정
refac(user): 메서드 분리

# ❌ 나쁜 예
git add . && git commit -m "update code"  # 불명확
feat: 인증 추가 및 문서  # 2개로 분리 필요
```

---

## 커밋 워크플로우

### 1. 변경 사항 분석

```bash
git status
git diff HEAD
git log --oneline -10
```

### 2. 분리 커밋 판단

**반드시 분리:**

- 서로 다른 Type (feat + fix)
- 독립적인 기능 2개 이상
- 서로 다른 모듈/도메인

**하나로 묶어도 됨:**

- 같은 Type, 같은 기능
- 테스트 + 구현 (같은 기능)

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

### 커밋 체크리스트

- [ ] Type이 변경 의도와 일치하는가?
- [ ] Scope가 명확한가?
- [ ] 설명이 50자 이내인가?
- [ ] 분리해야 할 변경을 섞지 않았는가?
- [ ] 빌드가 성공하는가?

---

## 브랜치 네이밍

### 형식

| 상황               | 형식                      | 예시                   |
| ------------------ | ------------------------- | ---------------------- |
| 일반 작업          | `<type>-<description>`    | `feat-user-auth`       |
| **JIRA 티켓 기반** | `<JIRA-ID>-<description>` | `SD-1234-add-user-api` |

**규칙:**

- **kebab-case** (하이픈 `-`만, 슬래시 `/` 금지)
- 영어, 간결하게
- JIRA 티켓 있으면 티켓 ID 우선 사용

---
