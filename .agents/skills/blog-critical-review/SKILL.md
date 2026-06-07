---
name: blog-critical-review
description: "이 Gatsby 블로그 저장소의 변경을 위험 중심으로 리뷰합니다. 사용자가 critical, skeptical, regression, source-of-truth, stale docs, broken link, missing validation, unsafe assumption 리뷰를 요청하거나 blog-review-workflow의 critical lane으로 호출할 때 사용합니다."
---

# Blog Critical Review

변경을 칭찬하거나 요약하기보다, PR merge 전에 막아야 할 실패를 먼저 찾는다.

## Required Context

리뷰 전에 아래를 확인한다.

- `git status --short --branch`
- `git diff --stat`
- `git diff --name-only`
- staged change가 있으면 `git diff --cached --stat`와 `git diff --cached --name-only`
- `AGENTS.md`, `.codex/README.md`, 관련 `.codex/rules/*`
- `.codex/rules/remote-operations.md`
- base 비교가 필요하면 사용자가 지정한 base 또는 `origin/master`

## Risk Priority

아래 순서로 본다.

1. Gatsby build/runtime failure
2. GraphQL query, frontmatter, slug/category, page creation 회귀
3. Firebase Realtime Database 경로, 공개 환경 변수, 실패 처리 문제
4. SEO, canonical URL, sitemap, RSS, OG image source-of-truth drift
5. GitHub Pages 배포, `CNAME`, `public/`, `.cache/` 산출물 오염
6. 깨진 링크, stale docs, 잘못된 경로 안내
7. 검증 누락이나 실행하지 못한 validation

## Severity

- `CRITICAL`: merge하면 build/runtime/deploy가 깨지거나, secret/data 노출 또는 명백한 source-of-truth 위반이 생긴다.
- `WARNING`: 실제 회귀 가능성, stale docs, 누락된 검증, 유지보수 리스크가 있다.
- `SUGGESTION`: merge를 막지는 않지만 후속 정리가 유의미하다.

## Finding Rules

- 실제 파일과 line을 붙인다.
- diff 또는 현재 파일에서 확인한 사실을 근거로 삼는다.
- 추정이면 추정이라고 명시한다.
- 취향, 문체, 네이밍만으로 finding을 만들지 않는다.
- review-only 요청이면 파일을 수정하지 않는다.
- PR 리뷰 코멘트, inline comment, review thread reply는 사용자가 명시적으로 요청하고 실행 직전 승인한 경우에만 작성한다.

Finding 형식:

```text
SEVERITY [file](absolute-path:line): 짧은 제목
영향: 왜 문제인지.
근거: diff 또는 현재 파일에서 확인한 사실.
권장: 최소 수정 방향.
```

문제가 없으면 `blocking finding 없음`을 먼저 쓰고 남은 검증 공백만 적는다.
