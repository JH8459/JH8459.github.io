# Firebase Guide

## 기본 원칙

- Firebase SDK는 v12 모듈러 API를 사용합니다.
- 현재 프로젝트에서는 Realtime Database만 사용합니다.
- 새로운 Firebase 기능을 추가할 때는 사용 범위와 영향 범위를 명확히 제한합니다.
- 환경 변수와 공개 가능한 설정 값은 `gatsby-meta-config.ts`를 통해 매핑합니다.

## 사용 위치

- Firebase 초기화와 Realtime Database 접근은 페이지 또는 템플릿에서 명시적으로 구성합니다.
- 현재 조회수 기능은 `src/templates/blog-template.tsx`와 `src/templates/category-template.tsx`에서 Realtime Database를 직접 읽습니다.
- 조회수 경로는 `posts/<slug에서 슬래시를 제거한 키>` 형식입니다.
- 개발 환경에서는 상세 페이지 조회수를 증가시키지 않습니다.
- 여러 위치에서 재사용되는 로직만 `src/utils/` 등 공용 유틸로 분리합니다.
- 클라이언트에서 노출되면 안 되는 값은 Gatsby 공개 환경 변수로 전달하지 않습니다.

## 확장 규칙

- 새로운 Firebase 서비스를 추가할 때는 별도 문서를 추가합니다. 예: `firebase-auth.md`
- 보안 규칙을 변경할 때는 변경 이유와 영향 범위를 별도 변경 로그 또는 PR 설명에 기록합니다.
- Realtime Database 경로를 추가하거나 바꿀 때는 읽기/쓰기 권한과 null 데이터 처리 방식을 함께 검토합니다.
- 조회수 정렬이나 통계 기능을 변경할 때는 Firebase 읽기 실패 시 UI가 깨지지 않도록 기본값을 유지합니다.
