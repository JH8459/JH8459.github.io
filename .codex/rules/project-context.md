# Project Context

## 개요

- Gatsby 기반 개인 블로그 프로젝트입니다.
- React 18, Gatsby 5, Tailwind CSS 4, PostCSS를 사용합니다.
- Firebase SDK 12와 Realtime Database를 연동합니다.
- 패키지 매니저는 `pnpm`을 사용합니다.

## 주요 디렉터리

- `src/pages/`: Gatsby 페이지
- `src/templates/`: Gatsby 템플릿
- `src/components/`: 재사용 컴포넌트
- `src/layout/`: 레이아웃
- `src/models/`: 도메인 모델
- `src/types/`: 공용 타입 선언
- `src/utils/`: 공용 유틸리티
- `src/styles/`: 전역 스타일
- `content/`: 마크다운 콘텐츠
- `static/`: 정적 자산
- `assets/`: 프로젝트 리소스
- `public/`: 빌드 결과물, 커밋 대상으로 보지 않음

## 설정 파일

- `gatsby-config.ts`: Gatsby 플러그인과 사이트 설정
- `gatsby-meta-config.ts`: 메타 정보와 환경 변수 매핑
- `gatsby-node.ts`: Gatsby Node API 구현
- `gatsby-browser.ts`: 브라우저 엔트리 설정
- `tailwind.config.js`: Tailwind 테마와 플러그인 설정
- `postcss.config.js`: Tailwind/PostCSS 플러그인 설정
- `.eslintrc.cjs`: ESLint 설정

## 프로젝트 컨벤션

- 설정/환경 값은 `gatsby-meta-config.ts`에서 매핑하고 `gatsby-config.ts`에서 참조합니다.
- 페이지는 `src/pages/`, 템플릿은 `src/templates/`, 재사용 컴포넌트는 `src/components/`에 둡니다.
- 콘텐츠는 `content/`에 마크다운 기반으로 관리합니다.
- 포스트 slug는 `gatsby-node.ts`에서 마크다운 파일의 상위 디렉터리 basename으로 생성합니다.
- 카테고리는 frontmatter의 `categories` 문자열을 공백으로 분리해 사용합니다.
- 전역 스타일은 `src/styles/global.css` 한 곳에서 관리합니다.
- Tailwind 유틸리티 클래스를 우선하고, 필요한 경우에만 CSS 커스텀 규칙을 추가합니다.
- Tailwind v4 기준으로 전역 CSS에서 `@import "tailwindcss";`를 사용합니다.
- `@apply`는 전역 스타일에서만 사용하고, 컴포넌트별 CSS 분리는 지양합니다.
- 컬러, 타이포그래피 등 테마 값은 `tailwind.config.js`의 `theme.extend`에 추가합니다.

## TypeScript/TSX 컨벤션

- 컴포넌트 파일은 `.tsx`, 그 외 TypeScript 파일은 `.ts`를 사용합니다.
- 공용 타입은 `src/types/`에 분리합니다.
- `any` 사용은 피하고, 불가피한 경우 해당 파일 범위에서만 예외를 둡니다.
- 함수, 훅, 핸들러에는 한글 JSDoc을 작성합니다.
- JSDoc에는 `@description`을 포함하고, 필요 시 `@param`과 `@return`을 명시합니다.
- 컴포넌트 내부 비즈니스 로직은 필요한 경우에만 일반 주석으로 의도를 설명합니다.

## 코드 스타일

- React 컴포넌트는 함수형으로 작성합니다.
- 기존 코드 스타일과 파일 배치 규칙을 우선합니다.
- 불필요한 주석은 추가하지 않습니다.
- 파일은 ASCII를 우선하되, 기존 문서/콘텐츠처럼 한글이 필요한 파일은 한글을 유지합니다.

## 스크립트

- `pnpm run develop`: 로컬 개발 서버
- `pnpm run build`: 프로덕션 빌드
- `pnpm run serve`: 빌드 결과 서빙
- `pnpm run lint`: ESLint 검사
- `pnpm run clean`: Gatsby 캐시 정리
- `pnpm run deploy`: 빌드 후 `public/`을 GitHub Pages로 배포

## 세부 가이드

- Firebase 지침: `.codex/rules/firebase.md`
- Tailwind 지침: `.codex/rules/tailwind.md`
- React/Gatsby 지침: `.codex/rules/react-gatsby.md`
- Git 지침: `.codex/rules/git-convention.md`
- 콘텐츠 작성 지침: `.codex/rules/content-authoring.md`
- 사이트 메타데이터 지침: `.codex/rules/site-metadata.md`
- 배포 지침: `.codex/rules/deployment.md`
- 원격 저장소 작업 지침: `.codex/rules/remote-operations.md`
