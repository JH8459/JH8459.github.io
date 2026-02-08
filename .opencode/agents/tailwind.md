# Tailwind Guide

## 기본 원칙

- Tailwind v4 사용, 전역 CSS는 `@import "tailwindcss";`
- 유틸리티 클래스 우선, 커스텀 CSS는 최소화
- `@apply`는 전역 스타일(`src/styles/global.css`)에만 사용

## 설정

- 테마 확장은 `tailwind.config.js`의 `theme.extend`에 추가
- 플러그인은 필요 시 `tailwind.config.js`의 `plugins`에서 관리
- PostCSS 설정은 `postcss.config.js`에서 관리

## 확장 규칙

- 큰 규모의 스타일 규칙은 별도 문서로 분리 (예: `tailwind-typography.md`)
