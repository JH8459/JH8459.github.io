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
- 커밋 메시지와 PR 제목의 type은 아래 허용 타입만 사용합니다.

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

파일은 의도한 대상만 명시적으로 stage 합니다. `git add .` 또는 `git add -A`는 생성물, 로컬 설정, 시크릿 후보 파일이 섞일 수 있으므로 사용하지 않습니다.

```bash
# 분리 커밋
git add src/auth/auth.ts src/auth/auth.test.ts
git commit -m "feat(auth): 구글 로그인 추가"
git add src/user/profile.ts
git commit -m "fix(user): 프로필 업데이트 버그 수정"

# 단일 커밋
git add src/payment/payment.ts src/payment/payment.test.ts
git commit -m "feat(payment): 결제 모듈 구현"
```

### 4. 커밋 수정

이미 만든 커밋을 수정해야 할 때는 기본적으로 `--amend`와 force push 대신 새 커밋을 만듭니다.

```bash
git add src/auth/auth.ts
git commit -m "fix(auth): 누락된 타입 추가"
```

`git commit --amend`, `git push --force`, `git push --force-with-lease`는 공유 브랜치 히스토리를 바꿀 수 있으므로 사용자가 명시적으로 요청하고 `.codex/rules/remote-operations.md` 기준으로 실행 직전 승인한 경우에만 사용합니다.

## 커밋 체크리스트

- Type이 변경 의도와 일치하는가?
- Scope가 명확한가?
- 제목이 50자 이내인가?
- 분리해야 할 변경을 섞지 않았는가?
- 의도한 파일만 명시적으로 stage 했는가?
- 가능한 검증 명령을 실행했는가?

## 브랜치 네이밍

| 상황 | 형식 | 예시 |
| --- | --- | --- |
| 일반 작업 | `<type>-<description>` | `feat-search-page` |
| 긴급 수정 | `hotfix-<description>` | `hotfix-build-error` |

### 허용 prefix

일반 작업 브랜치의 `<type>`은 커밋 타입과 같은 아래 prefix만 사용합니다.

| prefix | 용도 | 예시 |
| --- | --- | --- |
| `feat-` | 기능, 화면, 사용자에게 보이는 콘텐츠 추가/변경 | `feat-category-filter` |
| `fix-` | 버그 수정 | `fix-comment-count` |
| `refac-` | 동작 변경 없는 구조 개선 | `refac-post-template` |
| `docs-` | 문서, 포스트 원고, AI 규칙 문서 변경 | `docs-pr-workflow` |
| `chore-` | 빌드, 설정, 의존성, 저장소 관리 | `chore-eslint-config` |
| `test-` | 테스트 추가/수정 | `test-post-query` |
| `style-` | 포맷팅, 시각 스타일 조정 | `style-header-spacing` |
| `perf-` | 성능 개선 | `perf-image-loading` |
| `hotfix-` | 운영 긴급 수정. PR 제목 type은 `fix`를 사용합니다. | `hotfix-build-error` |

### 규칙

- kebab-case를 사용합니다.
- 하이픈 `-`만 사용하고 슬래시 `/`는 사용하지 않습니다.
- 영어로 간결하게 작성합니다.
- PR용 head 브랜치는 `master`이면 안 됩니다. `master` 변경은 PR base로만 사용합니다.
- PR 제목의 type은 브랜치 prefix와 일치해야 합니다. 예: `refac-*` 브랜치의 PR 제목은 `refac: ...`로 작성합니다.
- `hotfix-*` 브랜치의 PR 제목 type은 `fix`로 작성합니다.
