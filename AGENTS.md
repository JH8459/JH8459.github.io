# Codex Project Guide

모든 응답과 커밋 메시지는 한국어로 작성합니다.

## 먼저 읽을 문서

작업 전 `.codex/rules/`의 관련 문서를 확인하고 따릅니다.

- `.codex/rules/project-context.md`: 프로젝트 구조, 기술 스택, 공통 컨벤션
- `.codex/rules/git-convention.md`: 커밋 메시지와 브랜치 규칙
- `.codex/rules/react-gatsby.md`: React/Gatsby 작업 규칙
- `.codex/rules/tailwind.md`: Tailwind CSS 작업 규칙
- `.codex/rules/firebase.md`: Firebase Realtime Database 작업 규칙
- `.codex/rules/content-authoring.md`: 블로그 포스트 작성과 콘텐츠 구조 규칙
- `.codex/rules/site-metadata.md`: 사이트 메타데이터, SEO, About 데이터 규칙
- `.codex/rules/deployment.md`: 빌드와 GitHub Pages 배포 규칙
- `.codex/rules/remote-operations.md`: 원격 저장소 쓰기/수정/삭제 승인 규칙
- `.agents/skills/blog-draft-author/SKILL.md`: "원고 초안 작성해줘" 요청 시 사용할 포스트 초안 작성 스킬
- `.agents/skills/blog-pr-workflow/SKILL.md`: PR 기반 커밋, push, PR 작성 워크플로우
- `.agents/skills/blog-review-workflow/SKILL.md`: 리뷰 요청 시 사용할 통합 리뷰 워크플로우
- `.agents/skills/blog-docs-update/SKILL.md`: 변경 사항에 맞춘 문서 정합성 갱신 스킬
- `.agents/skills/blog-publish-workflow/SKILL.md`: 공개 페이지, 포스트, SEO, 게시 흐름 수정 스킬

## 기본 원칙

- Gatsby 5, React 18, Tailwind CSS 4, Firebase SDK 12 구성을 유지합니다.
- 패키지 매니저는 `pnpm`을 사용합니다.
- 기존 디렉터리 경계와 파일 배치 규칙을 우선합니다.
- 포스트/카테고리/slug 변경은 `gatsby-node.ts`, `src/models/post.ts`, `src/templates/`의 영향까지 함께 확인합니다.
- 사이트 소개, SEO, 댓글, 외부 링크 정보는 우선 `gatsby-meta-config.ts`에서 관리합니다.
- 사용자가 "원고 초안 작성해줘"라고 요청하면 `.agents/skills/blog-draft-author/SKILL.md`를 먼저 읽고 진행합니다.
- 커밋, push, PR 작성은 기본적으로 `.agents/skills/blog-pr-workflow/SKILL.md`의 PR 기반 절차를 따릅니다.
- 사용자가 명시적으로 PR 없는 직접 반영을 요청할 때만 `.agents/skills/blog-commit-workflow/SKILL.md`를 사용합니다.
- 원격 저장소에 쓰기, 수정, 삭제 side effect가 있는 명령은 `.codex/rules/remote-operations.md`에 따라 실행 직전 사용자 승인을 받습니다.
- PR 리뷰 코멘트나 inline comment는 사용자가 명시적으로 요청하고 실행 직전 승인한 경우에만 작성합니다.
- 불필요한 주석은 추가하지 않고, 비명확한 로직에만 최소한으로 설명합니다.
- 변경 후 가능하면 `pnpm run lint`와 관련 빌드/검증 명령을 실행합니다.
