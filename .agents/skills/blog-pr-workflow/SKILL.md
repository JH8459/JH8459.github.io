---
name: blog-pr-workflow
description: "이 Gatsby 블로그 저장소의 변경을 커밋, push, PR 준비 단위로 정리합니다. 사용자가 '커밋 해줘', 'push 해줘', 'PR 작성해줘', 'PR 만들어줘', '커밋하고 PR 올려줘', 'PR 기반 워크플로우'라고 요청하거나 PR 제목/본문, 커밋 분리, 브랜치 상태, push 전 검증을 원할 때 사용합니다. PR 본문은 템플릿 기준으로 작성하고, PR 생성/수정은 사용자에게 제목과 본문을 보여준 뒤 승인받은 경우에만 실행합니다."
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
- `.github/PULL_REQUEST_TEMPLATE.md`

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
- 새 브랜치가 필요할 때는 `.codex/rules/git-convention.md`의 kebab-case와 prefix 규칙을 따른다.
- PR용 head 브랜치는 `master`이면 안 된다. `master`는 PR base로만 사용한다.
- PR을 만들 때 허용되는 브랜치 prefix는 `feat-`, `fix-`, `refac-`, `docs-`, `chore-`, `test-`, `style-`, `perf-`, `hotfix-`, 또는 JIRA 기반 `<JIRA-ID>-`다.
- `hotfix-*` 브랜치는 PR 제목 type을 `fix`로 사용한다. 그 외 type prefix 브랜치는 PR 제목 type과 prefix가 일치해야 한다. 예: `refac-*` 브랜치의 PR 제목은 `refac: ...`, `chore-*` 브랜치의 PR 제목은 `chore: ...`로 작성한다.
- JIRA 기반 브랜치는 커밋 다수결 type 또는 사용자 명시 type을 PR 제목에 사용하되, PR 본문 참고 사항에 티켓 링크나 티켓 부재 사유를 적는다.
- Conductor workspace에서 현재 브랜치명이 규칙과 다르면 push/PR 전에 보고하고, 사용자가 원할 때만 새 compliant branch를 만든다.
- PR base는 기본적으로 `master`다.
- `pr-create`에서 현재 브랜치가 PR base와 같으면 push 전에 중단한다. `master`를 직접 갱신하지 않고, PR용 작업 브랜치 생성 또는 전환을 사용자에게 요청한다.

## PR Pre-check

`pr-create`는 아래 조건을 `git push` 전에 확인한다. 실패하면 PR 생성을 중단하고 사용자가 선택할 수 있는 최소 조치만 보고한다.

- `.github/PULL_REQUEST_TEMPLATE.md`가 존재해야 한다. 없으면 임의 PR 본문 골격을 만들지 않고 템플릿 생성을 먼저 요청한다.
- 현재 브랜치가 `master` 또는 PR base와 같으면 중단한다.
- 현재 브랜치명이 `.codex/rules/git-convention.md`의 허용 prefix 규칙을 만족해야 한다.
- `origin/master..HEAD` 기준 commit이 1개 이상 있어야 한다. `origin/master`가 없거나 오래되었으면 원격 읽기 명령인 `git fetch origin`으로 갱신한 뒤 다시 확인할 수 있다.
- PR 제목 type과 브랜치 prefix가 일치해야 한다. 불일치하면 브랜치명 수정 또는 PR 제목 type 수정을 사용자에게 요청한다.
- upstream이 없거나 unpushed commit이 있으면 차단하지 않지만, `git push -u origin HEAD` 실행 직전 원격 쓰기 승인을 받는다.

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
- `pr-prepare`: "PR 준비", "PR 제목/본문 작성"처럼 PR 내용을 준비하지만 생성을 명시하지 않은 경우. PR title/body를 템플릿 기준으로 작성하고 멈춘다. 원격 push나 PR 생성은 하지 않는다.
- `pr-create`: "PR 만들어줘", "PR 올려줘"처럼 PR 생성을 명시한 경우. 그래도 생성 직전에 title/body/base/head를 보여주고 사용자 확인을 받는다.

요청 범위가 애매하면 더 큰 side effect를 선택하지 않는다. 예를 들어 "커밋 해줘"는 `commit-only`로 처리한다.

## Commit And PR Flow

1. diff를 work unit으로 분류한다.
2. 커밋 계획을 짧게 세우고 관련 파일만 stage한다.
   - `git add .` 또는 `git add -A`를 사용하지 않는다.
   - 생성물, 로컬 설정, 시크릿 후보 파일은 stage 하지 않는다.
3. 필요한 검증을 실행한다.
4. 커밋 메시지는 `.codex/rules/git-convention.md` 형식을 따른다.
   - 형식: `<type>(<scope>): <subject>`
   - 허용 타입: `feat`, `refac`, `fix`, `docs`, `chore`, `test`, `style`, `perf`
   - 제목은 한글, 50자 이내, 마침표 없음.
5. `commit-only`이면 커밋 결과와 검증 결과를 보고하고 멈춘다.
6. `pr-prepare` 또는 `pr-create`이면 PR 제목을 작성한다.
   - PR 제목 형식은 `<type>: <subject>`로 작성한다.
   - PR 제목에는 커밋 scope 괄호를 넣지 않는다.
   - PR 제목 type은 현재 브랜치 prefix와 맞춘다.
   - PR 본문 파일은 생성하지 않는다.
   - `.github/PULL_REQUEST_TEMPLATE.md`를 반드시 읽고, 템플릿의 섹션과 체크리스트를 기준으로 PR 본문을 채운다.
   - 템플릿의 섹션 헤딩은 삭제하거나 임의 섹션으로 대체하지 않는다.
   - 해당 없는 섹션은 `- 해당 없음` 또는 짧은 사유로 채운다.
   - 검증하지 않은 항목은 체크하지 않고, 생략한 이유가 있으면 `참고 사항`에 적는다.
7. `pr-prepare`이면 PR title/body를 보고하고 멈춘다. `git push`와 `gh pr create`는 실행하지 않는다.
8. `pr-create`이면 `PR Pre-check`를 실행한다.
9. `push-only` 또는 `pr-create`이면 `git push -u origin HEAD`를 실행하기 직전에 `.codex/rules/remote-operations.md` 형식으로 사용자 승인을 받는다.
10. `push-only`이면 push 결과를 보고하고 멈춘다.
11. PR 생성 전 아래 정보를 사용자에게 보여주고 `.codex/rules/remote-operations.md` 형식으로 승인을 받는다.
   - base branch
   - head branch
   - PR title
   - `.github/PULL_REQUEST_TEMPLATE.md` 기준으로 채운 PR body 전문
   - 실행할 `gh pr create` 명령
12. 사용자가 명확히 승인한 경우에만 `gh pr create --base master --title "<title>" --body "<body>"`로 PR을 만든다.
    - PR 본문 전달을 위해 임시 파일이나 `.context/pr-body.md`를 만들지 않는다.
13. 사용자가 승인하지 않거나 응답이 없으면 PR을 만들지 않고, 준비된 title과 다음 명령만 보고한다.

## Remote Operation Guardrails

- `git push`, `gh pr create`, `gh pr edit`, `gh api`의 write method 등 원격 저장소를 변경하는 명령은 실행 직전 사용자 승인이 필요하다.
- PR 본문이나 제목 수정도 원격 수정이므로, 템플릿 기준으로 작성한 수정안을 먼저 보여주고 승인 없이 실행하지 않는다.
- PR 리뷰 코멘트, review thread reply, inline comment는 이 스킬의 기본 동작이 아니며, 사용자가 명시적으로 요청하고 실행 직전 승인한 경우에만 작성한다.
- PR 본문 파일이나 임시 body file은 만들지 않는다. `gh pr edit --body` 같은 원격 수정 명령은 별도 승인이 필요하다.
- `git commit --amend`, `git push --force`, `git push --force-with-lease`는 기본 흐름에서 사용하지 않는다. 사용자가 명시적으로 요청한 경우에도 실행 직전 별도 승인을 받는다.

## Reporting

최종 보고에는 아래를 포함한다.

- 커밋 해시와 메시지
- push 대상 브랜치
- PR 제목과 URL
- PR 본문이 `.github/PULL_REQUEST_TEMPLATE.md` 기준으로 작성되었는지
- 실행한 검증
- 배포하지 않았거나 수동 확인이 필요한 항목
