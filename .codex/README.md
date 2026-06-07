# Codex Guide

이 디렉터리는 Codex 기준 프로젝트 가이드 문서를 보관합니다.

## 문서 목록

- `rules/project-context.md`: 프로젝트 구조, 기술 스택, 공통 컨벤션
- `rules/git-convention.md`: 커밋 메시지와 브랜치 규칙
- `rules/react-gatsby.md`: React/Gatsby 작업 규칙
- `rules/tailwind.md`: Tailwind CSS 작업 규칙
- `rules/firebase.md`: Firebase Realtime Database 작업 규칙
- `rules/content-authoring.md`: 블로그 포스트 작성과 콘텐츠 구조 규칙
- `rules/site-metadata.md`: 사이트 메타데이터, SEO, About 데이터 규칙
- `rules/deployment.md`: 빌드와 GitHub Pages 배포 규칙
- `rules/remote-operations.md`: 원격 저장소 쓰기/수정/삭제 승인 규칙
- `../.agents/skills/blog-draft-author/SKILL.md`: 포스트 원고 초안 작성 스킬
- `../.agents/skills/blog-pr-workflow/SKILL.md`: PR 기반 커밋, push, PR 작성 스킬
- `../.agents/skills/blog-review-workflow/SKILL.md`: 통합 리뷰 스킬
- `../.agents/skills/blog-critical-review/SKILL.md`: 위험 중심 리뷰 스킬
- `../.agents/skills/blog-docs-update/SKILL.md`: diff 기준 문서 정합성 갱신 스킬
- `../.agents/skills/blog-publish-workflow/SKILL.md`: Gatsby 블로그 공개면/게시 흐름 수정 스킬
- `../.agents/skills/blog-commit-workflow/SKILL.md`: 명시 요청 시 PR 없이 직접 반영하는 예외 스킬

루트 `AGENTS.md`는 Codex가 먼저 읽는 진입점이며, 세부 규칙은 이 디렉터리의 문서를 참조합니다.

## 스킬 판단

현재 추가된 포스트 초안 작성, PR, 리뷰, 문서 갱신, 게시 워크플로우는 이 저장소에 강하게 묶인 스킬입니다. Codex 공식 repo-local skill discovery 경로인 `.agents/skills/` 안에서 프로젝트 로컬 스킬로 관리합니다.

`programmers-badge-v2`의 `.agents/skills`를 검토한 결과, 범용 절차는 블로그 규칙에 맞춰 아래처럼 이식했습니다.

- `commit`, `pr-workflow`: `blog-pr-workflow`로 통합하고, 기존 `blog-commit-workflow`는 PR 없는 직접 반영 예외로 축소
- `review-workflow`, `critical-review`: `blog-review-workflow`, `blog-critical-review`로 Gatsby/콘텐츠/배포 위험 기준을 반영
- `docs-update`: `blog-docs-update`로 블로그 문서 source-of-truth에 맞게 조정
- `web-publish`: `blog-publish-workflow`로 Gatsby 공개 페이지, 포스트, SEO, GitHub Pages 흐름에 맞게 조정

다음 스킬은 현재 블로그 구조와 맞지 않아 이식하지 않았습니다.

- `nas-deploy`: API DockerHub/NAS 배포 전용이라 GitHub Pages 블로그 배포와 맞지 않습니다.
- `senior-review-flow`: 참조 저장소의 API/Extension custom reviewer agent에 의존하므로, 블로그 전용 reviewer agent를 만들기 전까지는 보류합니다.

전역 스킬 후보가 생기는 경우는 다음과 같습니다.

- 여러 저장소에서 같은 Gatsby 블로그 포스트 생성 절차를 반복할 때
- 이미지 업로드, 썸네일 생성, 포스트 디렉터리 생성까지 자동화하는 스크립트를 묶을 때
- 외부 CMS나 Notion에서 콘텐츠를 가져오는 반복 워크플로우가 생길 때
- 여러 개인 저장소에서 같은 PR 없는 fast-forward 반영 절차를 반복할 때
