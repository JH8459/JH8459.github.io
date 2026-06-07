---
name: blog-pr-workflow
description: "이 Gatsby 블로그 저장소의 변경을 커밋, push, PR 준비 단위로 정리합니다. 사용자가 '커밋 해줘', 'push 해줘', 'PR 작성해줘', 'PR 만들어줘', '커밋하고 PR 올려줘', 'PR 기반 워크플로우'라고 요청하거나 PR 제목/본문, 커밋 분리, 브랜치 상태, push 전 검증을 원할 때 사용합니다. PR 생성은 사용자가 명시적으로 요청하고, 생성 직전 최종 확인을 받은 뒤에만 실행합니다."
---

# Blog PR Workflow

이 스킬은 블로그 변경을 reviewable commit으로 정리하고, 요청 범위에 따라 push 또는 PR 준비까지 처리하는 기본 절차다.
사용자가 명시적으로 "PR 없이" 또는 "master에 바로 반영"을 요청하면 `blog-commit-workflow`를 사용한다.

## Required Context

작업 전에 아래를 확인한다.

- `AGENTS.md`
- `.codex/rules/git-convention.md`
- `.codex/rules/project-context.md`
- `.codex/rules/remote-operations.md`
- 변경 범위에 맞는 `.codex/rules/*`
- `.github/PULL_REQUEST_TEMPLATE.md`가 있으면 PR 본문 기준으로 사용한다.

현재 상태는 아래 순서로 본다.

- `git status --short --branch`
- `git diff --stat`
- `git diff --name-only`
- staged change가 있으면 `git diff --cached --name-only`
- `git branch --show-current`

## Work Unit Split

커밋은 목적과 블로그 경계 기준으로 나눈다.

- `Content`: `content/**`, 포스트 전용 이미지, draft/frontmatter 변경
- `Gatsby`: `src/**`, `gatsby-config.ts`, `gatsby-node.ts`, `gatsby-browser.ts`
- `Metadata`: `gatsby-meta-config.ts`, `src/types/site.ts`, `src/types/about.ts`, `.env.example`
- `Style`: `tailwind.config.js`, `postcss.config.js`, `src/styles/**`
- `Deploy`: `CNAME`, `package.json` scripts, GitHub Pages 또는 배포 설정
- `AI`: `.codex/**`, `AGENTS.md`, `conductor.json`, PR/리뷰/스킬 워크플로우

서로 다른 목적이면 분리하고, 같은 사용자 흐름을 완성하는 코드와 최소 문서는 함께 둘 수 있다.

## Branch Rules

- 현재 브랜치는 사용자가 명시하지 않으면 rename하지 않는다.
- 새 브랜치가 필요할 때만 `.codex/rules/git-convention.md`의 kebab-case 규칙을 따른다.
- Conductor workspace에서 현재 브랜치명이 규칙과 다르면 push/PR 전에 보고하고, 사용자가 원할 때만 새 compliant branch를 만든다.
- PR base는 기본적으로 `master`다.

## Validation

검증은 변경 범위에 맞게 실행한다.

- AI/docs-only: 스킬 frontmatter, 경로, 문서 링크 정합성 확인. 가능하면 `pnpm run lint`.
- Content/frontmatter/slug/category: `pnpm run lint`, 필요하면 `pnpm run build`.
- Gatsby/React/Firebase/SEO/build config: `pnpm run lint`와 `pnpm run build`.
- Deploy script 또는 dependency 변경: `pnpm run lint`, `pnpm run build`, 관련 설정 파일 확인.

사용자가 배포를 명시하지 않으면 `pnpm run deploy`는 실행하지 않는다.

## Requested Scope

사용자 요청을 먼저 아래 중 하나로 분류한다.

- `commit-only`: "커밋 해줘"처럼 로컬 커밋만 요청한 경우. 커밋 후 멈추고 push/PR은 만들지 않는다.
- `push-only`: "push 해줘"처럼 원격 push까지만 요청한 경우. push 후 멈추고 PR은 만들지 않는다.
- `pr-prepare`: "PR 준비", "PR 제목/본문 작성"처럼 PR 내용을 준비하지만 생성을 명시하지 않은 경우. PR title/body를 작성하고 사용자 확인을 기다린다.
- `pr-create`: "PR 만들어줘", "PR 올려줘"처럼 PR 생성을 명시한 경우. 그래도 생성 직전에 title/body/base/head를 보여주고 사용자 확인을 받는다.

요청 범위가 애매하면 더 큰 side effect를 선택하지 않는다. 예를 들어 "커밋 해줘"는 `commit-only`로 처리한다.

## Commit And PR Flow

1. diff를 work unit으로 분류한다.
2. 커밋 계획을 짧게 세우고 관련 파일만 stage한다.
3. 필요한 검증을 실행한다.
4. 커밋 메시지는 `.codex/rules/git-convention.md` 형식을 따른다.
   - 형식: `<type>(<scope>): <subject>`
   - 허용 타입: `feat`, `refac`, `fix`, `docs`, `chore`, `test`, `style`, `perf`
   - 제목은 한글, 50자 이내, 마침표 없음.
5. `commit-only`이면 커밋 결과와 검증 결과를 보고하고 멈춘다.
6. `push-only`, `pr-prepare`, `pr-create`이면 `git push -u origin HEAD`를 실행하기 직전에 `.codex/rules/remote-operations.md` 형식으로 사용자 승인을 받는다.
7. `push-only`이면 push 결과를 보고하고 멈춘다.
8. PR 본문은 `.github/PULL_REQUEST_TEMPLATE.md`가 있으면 그대로 채우고, 없으면 `.context/pr-body.md`에 `요약`, `변경 사항`, `검증`, `배포 영향`을 작성한다.
9. PR 생성 전 아래 정보를 사용자에게 보여주고 `.codex/rules/remote-operations.md` 형식으로 승인을 받는다.
   - base branch
   - head branch
   - PR title
   - PR body file path
   - 실행할 `gh pr create` 명령
10. 사용자가 명확히 승인한 경우에만 `gh pr create --base master --title "<title>" --body-file .context/pr-body.md`로 PR을 만든다.
11. 사용자가 승인하지 않거나 응답이 없으면 PR을 만들지 않고, 준비된 title/body와 다음 명령만 보고한다.

## Remote Operation Guardrails

- `git push`, `gh pr create`, `gh pr edit`, `gh api`의 write method 등 원격 저장소를 변경하는 명령은 실행 직전 사용자 승인이 필요하다.
- PR 본문이나 제목 수정도 원격 수정이므로 승인 없이 실행하지 않는다.
- PR 리뷰 코멘트, review thread reply, inline comment는 이 스킬의 기본 동작이 아니며, 사용자가 명시적으로 요청하고 실행 직전 승인한 경우에만 작성한다.

## Reporting

최종 보고에는 아래를 포함한다.

- 커밋 해시와 메시지
- push 대상 브랜치
- PR 제목과 URL
- 실행한 검증
- 배포하지 않았거나 수동 확인이 필요한 항목
