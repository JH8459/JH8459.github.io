---
name: blog-review-workflow
description: "이 Gatsby 블로그 저장소의 diff 또는 PR을 통합 리뷰합니다. 사용자가 '리뷰 해줘', '코드 리뷰', 'PR 리뷰', 'diff 리뷰', '변경 사항 봐줘'라고 요청할 때 senior 품질 관점과 critical 회귀/위험 관점을 함께 적용합니다."
---

# Blog Review Workflow

일반 리뷰 요청의 진입점이다. 설계/품질 관점과 회귀/위험 관점을 나눠 보고, findings-first로 합친다.

## Required Context

리뷰 전에 아래를 확인한다.

- `AGENTS.md`
- `.codex/README.md`
- `.codex/rules/project-context.md`
- `.codex/rules/git-convention.md`
- 변경 범위에 맞는 `.codex/rules/*`
- `git status --short --branch`
- `git diff --stat`
- `git diff --name-only`
- base 비교가 필요하고 사용자가 지정하지 않았으면 `origin/master...HEAD`

## Review Lanes

Senior lane은 구조와 유지보수성을 본다.

- Gatsby 페이지/템플릿/컴포넌트 경계
- Markdown frontmatter, slug, category, GraphQL query 영향
- `gatsby-meta-config.ts` source-of-truth 유지
- Tailwind v4와 전역 스타일 규칙
- Firebase Realtime Database 접근 범위와 실패 처리
- 검증 범위가 변경 위험에 맞는지

Critical lane은 merge 전에 막아야 할 실패를 본다. 세부 기준은 `../blog-critical-review/SKILL.md`를 따른다.

## Execution

- 파일을 수정하지 않고 read-only로 리뷰한다.
- 사용자가 명시적으로 subagent/parallel review를 요청한 경우에만 별도 agent를 사용한다.
- 그 외에는 현재 agent 안에서 senior lane과 critical lane을 독립적으로 수행한 뒤 결론만 합친다.
- 같은 root cause의 finding은 하나로 합치고 더 높은 severity를 유지한다.
- 취향이나 문체만으로 finding을 만들지 않는다.

## Output Format

보고는 아래 순서를 따른다.

1. Findings
2. Open Questions
3. Validation Gaps
4. Short Summary

Finding 형식:

```text
SEVERITY [file](absolute-path:line): 제목
영향: 왜 문제인지.
근거: diff 또는 현재 파일에서 확인한 사실.
권장: 최소 수정 방향.
Lane: Senior 또는 Critical
```

문제가 없으면 `blocking finding 없음`을 먼저 쓴다.
