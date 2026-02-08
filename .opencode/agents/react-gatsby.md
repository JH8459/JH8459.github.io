# React/Gatsby Guide

## 기본 원칙

- React 18 유지, Gatsby 5 사용
- 페이지는 `src/pages/`, 템플릿은 `src/templates/`, 컴포넌트는 `src/components/`
- 빌드 관련 변경은 `gatsby-config.js`와 `gatsby-node.js`를 먼저 확인

## 컴포넌트 규칙

- 함수형 컴포넌트 사용
- 재사용 컴포넌트는 `src/components/`에 배치
- 페이지 단위 로직은 `src/pages/` 또는 템플릿에서 처리

## 확장 규칙

- 데이터 소스 추가 시 별도 문서로 분리 (예: `gatsby-data.md`)
- 빌드 파이프라인 변경은 변경 이유와 영향 범위를 기록
