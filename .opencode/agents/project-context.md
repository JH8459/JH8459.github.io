# Project Context

## 개요

- Gatsby 기반 개인 블로그 프로젝트
- Tailwind CSS 사용, PostCSS 구성
- Firebase Realtime Database 연동

## 프로젝트 컨벤션

- 설정/환경 값은 `gatsby-meta-config.js`에서 매핑하고 `gatsby-config.js`에서 참조
- 페이지는 `src/pages/`, 템플릿은 `src/templates/`, 재사용 컴포넌트는 `src/components/`에 둠
- 콘텐츠는 `content/`에 마크다운 기반으로 관리
- 전역 스타일은 `src/styles/global.css` 한 곳에서 관리
- Tailwind 클래스 사용을 우선하고, 필요한 경우에만 CSS 커스텀 규칙 추가
- Tailwind v4 기준: 전역 CSS에서 `@import "tailwindcss";` 사용
- `@apply`는 전역 스타일에서만 사용, 컴포넌트별 CSS 분리는 지양
- 컬러/타이포 등 테마 값은 `tailwind.config.js`의 `theme.extend`에 추가

## 세부 가이드

- Firebase 지침: `.opencode/agents/firebase.md`
- Tailwind 지침: `.opencode/agents/tailwind.md`
- React/Gatsby 지침: `.opencode/agents/react-gatsby.md`

## 코드 스타일

- React 컴포넌트는 함수형으로 작성
- 불필요한 주석 추가 금지, 비명확한 로직에만 최소 주석
- 파일은 ASCII 우선, 이미 유니코드가 있는 경우만 유지

## 데이터/파이어베이스

- Firebase SDK v12 모듈러 API 사용 유지
- Realtime Database 접근은 페이지/템플릿에서 명시적으로 구성

## 기술 스택

- Gatsby 5
- React 18
- Tailwind CSS 4
- PostCSS
- Firebase SDK 12

## 주요 디렉토리

- `src/`: 페이지/템플릿/컴포넌트 소스
- `content/`: 마크다운/MDX 콘텐츠
- `static/`: 정적 자산
- `assets/`: 기타 리소스

## 의존성/빌드

- Node LTS 기준, `npm` 사용
- Gatsby 5 + React 18 유지
- 빌드/개발 스크립트는 `package.json`에 정의

## 설정 파일

- `gatsby-config.js`: Gatsby 플러그인/사이트 설정
- `gatsby-meta-config.js`: 메타 및 환경 변수 매핑
- `tailwind.config.js`: Tailwind 테마/플러그인 설정
- `postcss.config.js`: Tailwind/PostCSS 플러그인

## 스타일링

- 전역 스타일: `src/styles/global.css`
- Tailwind v4는 `@import "tailwindcss";` 사용

## 스크립트

- `npm run develop`: 로컬 개발 서버
- `npm run build`: 프로덕션 빌드
- `npm run serve`: 빌드 결과 서빙
