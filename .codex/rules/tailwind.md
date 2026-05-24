# Tailwind Guide

## 기본 원칙

- Tailwind CSS 4를 사용합니다.
- 전역 CSS는 `src/styles/global.css`에서 관리하고 `@import "tailwindcss";`를 사용합니다.
- 유틸리티 클래스를 우선 사용하고, 커스텀 CSS는 최소화합니다.
- `@apply`는 `src/styles/global.css`에서만 사용합니다.

## 설정

- 테마 확장은 `tailwind.config.js`의 `theme.extend`에 추가합니다.
- 플러그인은 `tailwind.config.js`의 `plugins`에서 관리합니다.
- PostCSS 설정은 `postcss.config.js`에서 관리합니다.
- 색상, 간격, 타이포그래피 값은 기존 테마 토큰을 먼저 확인한 뒤 확장합니다.

## 스타일 작성 규칙

- 컴포넌트 전용 CSS 파일 추가는 지양합니다.
- 반복되는 클래스 조합은 컴포넌트 구조나 기존 전역 스타일로 해결할 수 있는지 먼저 검토합니다.
- 콘텐츠 영역 스타일처럼 범위가 큰 규칙은 전역 스타일에서 명확한 selector 범위를 둡니다.

## 확장 규칙

- 큰 규모의 스타일 규칙은 별도 문서로 분리합니다. 예: `tailwind-typography.md`
- 디자인 토큰을 추가할 때는 사용처와 의미가 명확해야 합니다.
