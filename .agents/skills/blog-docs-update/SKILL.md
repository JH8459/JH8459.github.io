---
name: blog-docs-update
description: "이 Gatsby 블로그 저장소의 코드, 콘텐츠 구조, 배포, 메타데이터, 스킬, 워크플로우 변경으로 문서가 stale해질 수 있을 때 사용합니다. README, AGENTS.md, .codex/rules, .agents/skills, PR 템플릿의 source-of-truth 정합성을 현재 diff 기준으로 갱신합니다."
---

# Blog Docs Update

현재 diff로 인해 stale해진 문서만 갱신한다. 실제 구현보다 앞선 aspirational 문서는 쓰지 않는다.

## Required Context

작업 전에 아래를 확인한다.

- `git status --short --branch`
- `git diff --name-only`
- staged change가 있으면 `git diff --cached --name-only`
- `.codex/README.md`
- `.codex/rules/project-context.md`
- `.codex/rules/remote-operations.md`
- 변경 범위에 맞는 `.codex/rules/*`

## Doc Surfaces

- `AGENTS.md`: Codex가 먼저 읽는 경로 안내와 상위 원칙
- `.codex/README.md`: `.codex` 문서/스킬 인덱스
- `.codex/rules/*`: source-of-truth 규칙
- `.agents/skills/*/SKILL.md`: 반복 워크플로우
- `.github/PULL_REQUEST_TEMPLATE.md`: PR 기반 리뷰/검증 체크리스트
- `README.md`: 사용자-facing 프로젝트 개요

## Diff Mapping

- `content/**`: `.codex/rules/content-authoring.md`, `blog-draft-author`
- `src/pages/**`, `src/templates/**`, `src/components/**`, `src/layout/**`: `.codex/rules/react-gatsby.md`, 필요하면 `.codex/rules/tailwind.md`
- `gatsby-config.ts`, `gatsby-node.ts`, `gatsby-browser.ts`: `.codex/rules/react-gatsby.md`, `.codex/rules/deployment.md`
- `gatsby-meta-config.ts`, `.env.example`, `src/types/site.ts`, `src/types/about.ts`: `.codex/rules/site-metadata.md`, 필요하면 `.codex/rules/firebase.md`
- `package.json`, `pnpm-lock.yaml`, `CNAME`, 배포 스크립트: `.codex/rules/deployment.md`
- `.codex/**`, `AGENTS.md`, `conductor.json`, `.github/PULL_REQUEST_TEMPLATE.md`: `.codex/README.md`와 관련 skill 문서
- 원격 저장소 작업 정책 변경: `.codex/rules/remote-operations.md`, 관련 PR/리뷰/커밋 skill 문서

## Workflow

1. diff를 behavior change와 docs/workflow change로 나눈다.
2. source-of-truth 문서를 먼저 결정한다.
3. source-of-truth를 갱신한 뒤 인덱스 문서와 PR 템플릿을 맞춘다.
4. 같은 규칙을 여러 문서에 중복 복사하지 않는다.
5. 존재하지 않는 스크립트, 배포 단계, 환경 변수를 문서에 추가하지 않는다.
6. skill을 수정했으면 frontmatter description과 `agents/openai.yaml`이 맞는지 확인한다.

## Validation

- 문서 경로가 실제 파일과 맞는지 확인한다.
- skill 변경 시 `quick_validate.py`로 해당 skill을 검증한다.
- 코드 변경 없이 문서만 바꾼 경우에도 가능하면 `pnpm run lint`를 실행한다.

## Reporting

최종 보고에는 아래를 포함한다.

- 어떤 diff를 기준으로 문서를 판단했는지
- 갱신한 source-of-truth와 인덱스 문서
- 실행한 검증
- 의도적으로 갱신하지 않은 문서와 이유
