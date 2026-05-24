# Content Authoring Guide

## 포스트 경로

- 포스트는 `content/<YYYY>/<YYYY-MM-DD-CATEGORY>/index.md` 형태를 기본으로 작성합니다.
- 이미지가 필요한 포스트는 같은 디렉터리에 이미지를 두거나 외부 이미지 URL을 사용합니다.
- slug는 파일명이 아니라 포스트 디렉터리 basename으로 생성됩니다.
- 예: `content/2026/2026-02-15-JAVASCRIPT/index.md`는 `/2026-02-15-JAVASCRIPT/` 경로가 됩니다.

## 초안 작성 스킬

- 사용자가 "원고 초안 작성해줘"라고 요청하면 `.codex/skills/blog-draft-author/SKILL.md`를 사용합니다.
- 이 스킬은 날짜, 카테고리, 썸네일 입력을 받은 뒤 frontmatter와 기본 본문 구조를 생성합니다.
- 파일 생성까지 요청받은 경우에만 `content/<YYYY>/<YYYY-MM-DD-CATEGORY>/index.md`에 작성합니다.

## Frontmatter

필수 필드:

```yaml
---
emoji: 📚
title: "포스트 제목"
date: 'YYYY-MM-DD'
author: JH8459
categories: Backend
thumbnail: https://example.com/thumbnail.png
---
```

- `title`은 SEO와 카드 UI에 사용됩니다.
- `date`는 정렬과 표시 기준입니다. 기존 콘텐츠처럼 `'YYYY-MM-DD'` 문자열 형식을 사용합니다.
- `categories`는 공백으로 여러 카테고리를 표현합니다. 예: `Backend JavaScript`
- `thumbnail`은 카드/공유 이미지 후보로 쓰입니다. 외부 URL과 로컬 경로 사용 방식을 기존 포스트와 맞춥니다.
- `emoji`는 헤더와 TOC에 영향을 줄 수 있습니다. TOC에서는 레이아웃 처리를 위해 이모지가 제거됩니다.

## 본문 작성

- 글 첫 부분에는 썸네일 또는 배너 이미지를 명시적으로 넣는 패턴을 따릅니다.
- 큰 구분은 `##`, 세부 구분은 `###`를 사용합니다.
- 코드 블록 언어는 Prism alias 설정을 고려해 작성합니다. 예: `ts`, `tsx`, `js`, `sh`, `yml`, `dockerfile`, `gql`
- 이미지 캡션은 이미지 바로 다음 줄의 강조 텍스트로 표현할 수 있습니다.
- 강제 줄 간격이 필요한 기존 글 패턴은 `<br>`을 사용하지만, 새 글에서는 남용하지 않습니다.

## 카테고리와 목록

- 카테고리 페이지는 `gatsby-node.ts`에서 frontmatter의 `categories`를 기준으로 생성됩니다.
- 새 카테고리를 만들 때 별도 설정은 필요 없지만, 대소문자와 띄어쓰기를 일관되게 유지합니다.
- 카테고리 이름은 URL path에 그대로 들어갑니다. 공백이나 특수문자 사용은 피합니다.

## 이미지 위치

- 포스트 전용 이미지는 가능하면 해당 포스트 디렉터리에 둡니다.
- About/프로젝트 카드 등 사이트 공용 이미지는 `assets/`를 사용합니다.
- 루트 경로로 직접 참조하는 정적 파일은 `static/`에 둡니다.
- `src/components/image/`는 `assets/`의 이미지를 `relativePath`로 찾아 렌더링합니다.
