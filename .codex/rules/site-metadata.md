# Site Metadata Guide

## 기본 원칙

- 사이트 전역 정보는 `gatsby-meta-config.ts`에서 관리합니다.
- Gatsby `siteMetadata`는 `gatsby-config.ts`에서 `metaConfig`를 주입해 구성합니다.
- 타입 변경이 필요한 경우 `src/types/site.ts`와 `src/types/about.ts`를 함께 확인합니다.
- 환경 변수는 `.env.example`과 `gatsby-meta-config.ts`의 매핑을 함께 갱신합니다.

## SEO

- SEO 메타 태그는 `src/components/seo/index.tsx`에서 관리합니다.
- 기본 제목, 설명, 언어, 사이트 URL, OG 이미지는 `gatsby-meta-config.ts`를 기준으로 합니다.
- 페이지별 제목/설명은 `Seo` 컴포넌트 props로 전달합니다.
- canonical URL은 `siteUrl + pathname`으로 생성되므로 `siteUrl` 끝에 슬래시를 붙이지 않습니다.
- `ogImage`가 상대 경로이면 `static/` 기준 공개 파일로 취급합니다.

## About 데이터

- About 페이지 데이터는 `gatsby-meta-config.ts`의 `about` 아래에서 관리합니다.
- 이력서형 About 화면의 경력·프로젝트·학력·스킬·자격증·링크 데이터는 `about.resume` 아래에서 관리합니다.
- 외부 활동은 `about.resume.activities`에서 관리하며, 오픈소스처럼 한 활동에 여러 프로젝트가 있으면 `projects`의 `title`, `bullets`, `links`로 프로젝트별 성과와 근거 링크를 묶습니다. PR 제안·병합과 재현·제보를 구분해 표기합니다.
- `careers`, `openSource`, `externalActivities`, `projects`에는 샘플 구조가 포함되어 있습니다. 새 항목을 추가할 때 샘플 블록은 삭제하지 않습니다.
- About GraphQL 쿼리는 `src/pages/about.tsx`에 있습니다. `about.resume` 필드를 추가하면 쿼리와 `src/types/about.ts` 타입을 함께 갱신합니다.
- `/about`은 독립형 이력서 페이지로 제공하며, 브라우저 인쇄 시 이력서 전용 인쇄 스타일을 적용합니다.
- 이력서 인쇄는 `@page resume`의 여백을 0으로 두어 브라우저 기본 날짜·제목 머리글을 억제하고, `.resume-sheet`의 내부 여백으로 본문 위치를 유지합니다. 인쇄 검증은 머리글 강제 제거 옵션 없이도 기본 머리글·꼬리글이 노출되지 않는지 확인합니다.
- 화면과 A4 인쇄는 4페이지로 나눕니다. 1페이지는 소개·체험뷰, 2페이지는 나머지 경력, 3페이지는 개인 프로젝트·스킬·교육·자격증, 4페이지는 외부 활동입니다. 페이지 배치를 바꾸면 인쇄 결과의 페이지 수와 내용 넘침을 확인합니다. 스킬은 분류별 가로 행에 태그를 배치하고 너비에 맞춰 줄바꿈합니다.
- 프로젝트 카드 이미지는 `assets/`의 파일명을 `thumbnailUrl`에 넣는 기존 방식을 따릅니다.

## 댓글과 외부 서비스

- Giscus 설정은 `comments.giscus`에서 관리합니다.
- Giscus 위젯은 pathname 기반 매핑을 사용합니다. 포스트 slug를 바꾸면 댓글 매핑에 영향이 생길 수 있습니다.
- Google Analytics 환경 변수 이름은 현재 코드 기준 `GOOGLE_TRAKING_ID`입니다. 철자 변경은 코드와 `.env.example`을 함께 바꿔야 합니다.

## RSS와 검색 엔진

- RSS 설정은 `gatsby-config.ts`의 `gatsby-plugin-feed`에서 관리합니다.
- robots와 sitemap 설정은 `gatsby-config.ts`의 `gatsby-plugin-robots-txt`, `gatsby-plugin-sitemap`을 확인합니다.
- RSS item URL은 `site.siteMetadata.siteUrl + node.fields.slug` 조합입니다.
