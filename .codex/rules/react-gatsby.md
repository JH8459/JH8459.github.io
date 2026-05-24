# React/Gatsby Guide

## 기본 원칙

- React 18과 Gatsby 5 구성을 유지합니다.
- 페이지는 `src/pages/`, 템플릿은 `src/templates/`, 재사용 컴포넌트는 `src/components/`에 둡니다.
- 빌드 관련 변경은 `gatsby-config.ts`, `gatsby-node.ts`, `gatsby-browser.ts`를 먼저 확인합니다.
- Gatsby 플러그인 변경은 `gatsby-config.ts`와 관련 타입/환경 설정의 영향을 함께 검토합니다.

## 컴포넌트 규칙

- 함수형 컴포넌트를 사용합니다.
- 재사용 컴포넌트는 `src/components/<component-name>/index.tsx` 패턴을 따릅니다.
- 페이지 단위 로직은 `src/pages/` 또는 `src/templates/`에서 처리합니다.
- 여러 컴포넌트에서 공유되는 타입은 `src/types/`에 분리합니다.
- UI 상태와 데이터 변환 로직은 컴포넌트 내부에 과도하게 섞이지 않도록 필요한 경우 유틸로 분리합니다.

## Gatsby 작업 규칙

- 콘텐츠 소스는 `content/`의 마크다운 구조를 기준으로 합니다.
- `gatsby-node.ts`는 마크다운 상위 디렉터리 basename을 slug로 사용합니다. 포스트 디렉터리명을 바꾸면 URL이 바뀝니다.
- 카테고리 목록 페이지는 `createPostsPages`에서 생성하며, `All` 카테고리를 기본으로 포함합니다.
- 카테고리 필터는 `frontmatter.categories.includes(currentCategory)`를 사용하므로 부분 문자열 충돌 가능성을 고려합니다.
- 이미지와 정적 자산은 기존 `assets/`와 `static/` 사용 방식을 따릅니다.
- GraphQL 쿼리, 페이지 생성, slug/category 변경은 `gatsby-node.ts`와 템플릿 영향을 함께 확인합니다.
- `Post` 모델은 GraphQL `MarkdownRemark` 노드를 UI용 모델로 변환합니다. frontmatter 필드를 추가하면 `src/types/post.ts`, `src/models/post.ts`, 관련 GraphQL 쿼리를 함께 갱신합니다.
- SEO나 메타 데이터 변경은 `src/components/seo/`와 `gatsby-meta-config.ts`를 함께 확인합니다.
- 댓글은 `src/components/giscus/`에서 Giscus 스크립트를 주입하며, 설정 값은 `gatsby-meta-config.ts`의 `comments.giscus`를 기준으로 합니다.

## 확장 규칙

- 데이터 소스를 추가할 때는 별도 문서를 추가합니다. 예: `gatsby-data.md`
- 빌드 파이프라인을 바꿀 때는 변경 이유와 영향 범위를 기록합니다.
- 개발 서버 안정성을 해칠 수 있는 lint/build 결합은 피하고, `pnpm run lint`를 별도로 실행합니다.
