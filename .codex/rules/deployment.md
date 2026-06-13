# Deployment Guide

## 스크립트

- `pnpm run build`: `gatsby clean && gatsby build`
- `pnpm run start`: `gatsby clean && pnpm run develop`
- `pnpm run deploy`: 빌드 후 `CNAME`을 `public/CNAME`으로 복사하고 `gh-pages -d public -x`를 실행합니다.

## CI

- `.github/workflows/ci.yml`은 `master` 대상 PR과 `master` push에서 실행됩니다.
- CI의 `validate` job은 `pnpm install --frozen-lockfile`, `pnpm run lint`, `pnpm run build`를 수행합니다.
- CI의 `deploy` job은 `master` push에서만 실행되며, `validate` 성공 후 `pnpm run build`, `CNAME` 복사, `public/` 디렉터리의 GitHub Pages artifact 업로드와 배포를 수행합니다.
- `deploy` job의 production build는 GitHub Secrets의 Firebase/Analytics 환경 변수를 주입합니다.
- `deploy` job은 Firebase 런타임 설정에 필요한 `FIREBASE_*` secret이 비어 있으면 build 전에 실패해야 합니다.

## 배포 대상

- 배포 결과물은 `public/` 디렉터리입니다.
- 커스텀 도메인은 루트 `CNAME` 파일로 관리합니다.
- GitHub Pages 배포 전 `CNAME`이 `public/CNAME`으로 복사되어야 합니다.
- 저장소 Pages 설정의 Build and deployment Source는 `GitHub Actions`여야 합니다.

## 검증

- 문서만 변경한 경우 최소 `pnpm run lint`를 실행합니다.
- Gatsby 설정, GraphQL 쿼리, 콘텐츠 구조, 메타데이터를 바꾼 경우 `pnpm run build`를 우선 실행합니다.
- 배포 명령은 원격 브랜치에 영향을 주므로 사용자가 배포를 명시적으로 요청하고, `.codex/rules/remote-operations.md` 기준으로 실행 직전 승인했을 때만 실행합니다.

## 주의사항

- `.env`는 커밋하지 않습니다.
- Firebase와 Google Analytics 값은 로컬에서는 `.env`, CI 배포에서는 GitHub Secrets로 주입합니다.
- `public/`과 `.cache/`는 생성 산출물로 취급하고 직접 수정하지 않습니다.
- Gatsby 캐시로 인해 이상 동작이 보이면 `pnpm run clean` 또는 `pnpm run start`를 사용합니다.
- GitHub Pages Actions 기반 자동 배포는 deploy job의 `contents: read`, `pages: write`, `id-token: write` 권한이 필요합니다.
- `gh-pages` 브랜치 publish 방식은 사용하지 않습니다.
