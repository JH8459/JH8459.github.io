---
name: blog-pr-workflow
description: "이 Gatsby 블로그 저장소의 변경을 PR 기반으로 정리합니다. 사용자가 'PR 작성해줘', 'PR 만들어줘', '커밋하고 PR 올려줘', 'push 하고 PR 준비해줘', 'PR 기반 워크플로우', '커밋 해줘'라고 요청하거나 PR 제목/본문, 커밋 분리, 브랜치 상태, push 전 검증을 원할 때 사용합니다."
---

# Blog PR Workflow

이 스킬은 블로그 변경을 reviewable commit으로 정리하고 PR까지 올리는 기본 절차다.
사용자가 명시적으로 "PR 없이" 또는 "master에 바로 반영"을 요청하면 `blog-commit-workflow`를 사용한다.

## Required Context

작업 전에 아래를 확인한다.

- `AGENTS.md`
- `.codex/rules/git-convention.md`
- `.codex/rules/project-context.md`
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

## Commit And PR Flow

1. diff를 work unit으로 분류한다.
2. 커밋 계획을 짧게 세우고 관련 파일만 stage한다.
3. 필요한 검증을 실행한다.
4. 커밋 메시지는 `.codex/rules/git-convention.md` 형식을 따른다.
   - 형식: `<type>(<scope>): <subject>`
   - 허용 타입: `feat`, `refac`, `fix`, `docs`, `chore`, `test`, `style`, `perf`
   - 제목은 한글, 50자 이내, 마침표 없음.
5. 사용자가 push/PR을 요청했으면 `git push -u origin HEAD`로 현재 브랜치를 올린다.
6. PR 본문은 `.github/PULL_REQUEST_TEMPLATE.md`가 있으면 그대로 채우고, 없으면 `.context/pr-body.md`에 `요약`, `변경 사항`, `검증`, `배포 영향`을 작성한다.
7. `gh pr create --base master --title "<title>" --body-file .context/pr-body.md`로 PR을 만든다.

## Reporting

최종 보고에는 아래를 포함한다.

- 커밋 해시와 메시지
- push 대상 브랜치
- PR 제목과 URL
- 실행한 검증
- 배포하지 않았거나 수동 확인이 필요한 항목
