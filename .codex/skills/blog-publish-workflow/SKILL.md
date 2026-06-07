---
name: blog-publish-workflow
description: "이 Gatsby 블로그의 공개 페이지, 포스트, About/SEO 메타데이터, UI 컴포넌트, Tailwind 스타일, GitHub Pages 게시 흐름을 만들거나 수정할 때 사용합니다. 사용자가 블로그 화면, 페이지, 게시, 콘텐츠 노출, SEO, Gatsby 라우팅, 공개면 배포 영향을 요청하면 사용합니다."
---

# Blog Publish Workflow

Gatsby 블로그의 public surface를 바꿀 때 필요한 규칙과 검증을 묶는다.

## Required Context

작업 전에 변경 범위에 맞춰 아래를 확인한다.

- `.codex/rules/project-context.md`
- `.codex/rules/react-gatsby.md`
- `.codex/rules/tailwind.md`
- `.codex/rules/site-metadata.md`
- `.codex/rules/content-authoring.md`
- `.codex/rules/deployment.md`
- Firebase/댓글/조회수 영향이 있으면 `.codex/rules/firebase.md`

## Scope Classification

변경 목적을 먼저 분류한다.

- `post`: `content/**`의 포스트, frontmatter, 썸네일, 카테고리
- `page`: `src/pages/**`의 공개 페이지
- `template`: `src/templates/**`, slug/category/page creation 영향
- `component`: `src/components/**`, `src/layout/**`
- `metadata`: `gatsby-meta-config.ts`, SEO, About 데이터, RSS/sitemap
- `style`: Tailwind theme, global CSS, typography
- `deploy`: GitHub Pages, `CNAME`, build/deploy script

## Workflow

1. route ownership을 정한다.
   - 정적 페이지는 `src/pages/`
   - 포스트 상세/카테고리는 `src/templates/`와 `gatsby-node.ts`
   - 콘텐츠는 `content/`
   - 사이트 전역 정보는 `gatsby-meta-config.ts`
2. 포스트 slug, category, 댓글 매핑, RSS/sitemap 영향 여부를 확인한다.
3. UI 변경은 기존 컴포넌트/레이아웃 패턴과 Tailwind v4 규칙을 우선한다.
4. SEO나 외부 링크 정보는 `gatsby-meta-config.ts`를 source-of-truth로 유지한다.
5. Firebase 조회수나 Giscus 댓글 변경은 클라이언트 노출 값과 실패 시 기본 UI를 함께 점검한다.
6. 배포는 사용자가 명시적으로 요청한 경우에만 실행한다.
7. 문서가 stale해지면 `blog-docs-update` 기준으로 필요한 문서만 갱신한다.

## Validation

- 기본: `pnpm run lint`
- GraphQL, Gatsby config, frontmatter 구조, template, metadata, route 변경: `pnpm run build`
- 배포 명령은 원격 브랜치에 영향을 주므로 명시 요청 없이는 실행하지 않는다.

## Reporting

최종 보고에는 아래를 포함한다.

- 수정한 public surface
- slug/category/SEO/Firebase/deploy 영향 여부
- 실행한 검증
- 배포 또는 수동 확인이 남은 항목
