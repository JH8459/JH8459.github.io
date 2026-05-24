# Deployment Guide

## 스크립트

- `pnpm run build`: `gatsby clean && gatsby build`
- `pnpm run start`: `gatsby clean && pnpm run develop`
- `pnpm run deploy`: 빌드 후 `CNAME`을 `public/CNAME`으로 복사하고 `gh-pages -d public -x`를 실행합니다.

## 배포 대상

- 배포 결과물은 `public/` 디렉터리입니다.
- 커스텀 도메인은 루트 `CNAME` 파일로 관리합니다.
- GitHub Pages 배포 전 `CNAME`이 `public/CNAME`으로 복사되어야 합니다.

## 검증

- 문서만 변경한 경우 최소 `pnpm run lint`를 실행합니다.
- Gatsby 설정, GraphQL 쿼리, 콘텐츠 구조, 메타데이터를 바꾼 경우 `pnpm run build`를 우선 실행합니다.
- 배포 명령은 원격 브랜치에 영향을 주므로 사용자가 배포를 명시적으로 요청했을 때 실행합니다.

## 주의사항

- `.env`는 커밋하지 않습니다.
- Firebase와 Google Analytics 값은 환경 변수로 주입합니다.
- `public/`과 `.cache/`는 생성 산출물로 취급하고 직접 수정하지 않습니다.
- Gatsby 캐시로 인해 이상 동작이 보이면 `pnpm run clean` 또는 `pnpm run start`를 사용합니다.
