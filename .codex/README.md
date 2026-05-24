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
- `skills/blog-draft-author/SKILL.md`: 포스트 원고 초안 작성 스킬

루트 `AGENTS.md`는 Codex가 먼저 읽는 진입점이며, 세부 규칙은 이 디렉터리의 문서를 참조합니다.

## 스킬 판단

현재 추가된 포스트 초안 작성 흐름은 이 저장소에 강하게 묶인 스킬입니다. 전역 Codex 스킬로 분리하기보다는 `.codex/skills/` 안에서 프로젝트 로컬 스킬로 관리합니다.

전역 스킬 후보가 생기는 경우는 다음과 같습니다.

- 여러 저장소에서 같은 Gatsby 블로그 포스트 생성 절차를 반복할 때
- 이미지 업로드, 썸네일 생성, 포스트 디렉터리 생성까지 자동화하는 스크립트를 묶을 때
- 외부 CMS나 Notion에서 콘텐츠를 가져오는 반복 워크플로우가 생길 때
