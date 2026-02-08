# blog.jh8459.com

개인 기술 블로그 프로젝트입니다. Gatsby 기반으로 콘텐츠(마크다운)를 관리하고, About 페이지에 경력/프로젝트 정보를 노출합니다.

## 주요 기능

- 마크다운 기반 포스트 작성/분류
- RSS 피드 생성
- 이미지 최적화 및 코드 하이라이트(Prism)
- About 페이지(요약/경력/학력/자격/프로젝트)
- Firebase 기반 방문자 통계 연동

## 기술 스택

- Gatsby, React, TypeScript
- Tailwind CSS, PostCSS
- Firebase, GTag

## 로컬 실행

```
pnpm install
pnpm start
```

## 스크립트

- `pnpm start`: 개발 서버 실행 (clean + develop)
- `pnpm develop`: 개발 서버 실행
- `pnpm build`: 프로덕션 빌드
- `pnpm serve`: 빌드 결과 서빙
- `pnpm lint`: ESLint 실행
- `pnpm clean`: 캐시 정리

## 배포

```
pnpm run deploy
```

`public` 결과물을 GitHub Pages에 배포합니다.

## 콘텐츠 작성

`content/<YYYY>/<YYYY-MM-DD-POST>/index.md` 경로에 포스트를 추가합니다.

## 환경 변수

Firebase/Analytics 설정은 환경 변수로 관리합니다. 필요 변수는 `gatsby-meta-config.ts`를 참고하세요.
