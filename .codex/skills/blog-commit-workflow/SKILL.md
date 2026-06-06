---
name: blog-commit-workflow
description: "이 저장소의 PR 없는 커밋 워크플로우를 실행합니다. 변경 사항을 점검하고, 한국어 컨벤셔널 커밋을 만들고, 필요한 pnpm 검증을 실행하며, 요청 시 PR 없이 origin/master로 반영합니다. 사용자가 '커밋 해줘', '커밋하고 push 해줘', 'master에 반영해줘', 'PR 없이 병합해줘'라고 말하거나 개인 Gatsby 블로그에서 커밋/push를 요청할 때 사용합니다."
---

# 커밋 워크플로우

## 작업 흐름

이 스킬은 개인 Gatsby 블로그를 혼자 관리할 때 쓰는 커밋 워크플로우용입니다. 현재 작업 브랜치에서 변경을 정리하고, `master`를 반영 대상으로 유지하며, 사용자가 명시적으로 요청하지 않는 한 GitHub PR은 만들지 않습니다.

1. 작업 전 관련 저장소 규칙을 읽습니다.
   - `.codex/rules/git-convention.md`
   - `.codex/rules/project-context.md`
   - 빌드, 배포, Gatsby, 메타데이터, 콘텐츠 동작에 영향이 있으면 `.codex/rules/deployment.md`
2. 저장소 상태를 확인합니다.
   - `git status --short --branch`
   - `git diff HEAD`
   - `git log --oneline -10`
   - `git branch --show-current`
3. `.codex/rules/git-convention.md` 기준으로 커밋 분리 여부를 판단합니다.
   - 변경 의도, 타입, 도메인이 다르면 커밋을 분리합니다.
   - 각 커밋에는 의도한 파일만 stage 합니다.
   - `public/`, `.cache/`, `node_modules/`, `.env`, `.context/` 같은 생성물이나 로컬 전용 파일은 stage 하지 않습니다.
4. 가능하면 커밋 전에 검증을 실행합니다.
   - 기본값: `pnpm run lint`
   - Gatsby 설정, GraphQL, 템플릿, 메타데이터, 콘텐츠 구조, 의존성, 빌드 관련 변경이면 `pnpm run build`도 실행합니다.
   - 사용자가 명시적으로 배포를 요청하지 않으면 `pnpm run deploy`는 실행하지 않습니다.
5. 한국어 컨벤셔널 커밋을 만듭니다.
   - 형식: `<type>(<scope>): <subject>`
   - 제목은 50자 이내, 명령형, 마침표 없이 작성합니다.
   - 허용 타입은 `feat`, `refac`, `fix`, `docs`, `chore`, `test`, `style`, `perf`입니다.

## PR 없는 반영

사용자가 "커밋 해줘"만 요청하면 로컬 커밋까지만 수행하고, 커밋 해시와 검증 결과를 요약합니다.

사용자가 push, `master` 반영, 병합, PR 없는 워크플로우를 요청하면 검증과 커밋 성공 후 아래 순서로 처리합니다.

```bash
git fetch origin
git rebase origin/master
git push origin HEAD:master
```

이 방식은 PR이나 merge commit 없이 `master` 히스토리를 선형으로 유지합니다. 검증 실패, rebase 충돌, `origin/master` 업데이트 실패가 발생하면 중단하고 원인을 보고합니다. `master`에는 절대 force push 하지 않습니다.

## 안전장치

- 한국어로 응답합니다.
- 현재 브랜치 이름을 바꾸지 않습니다.
- 사용자가 해당 작업을 명시적으로 요청하지 않는 한 `git reset --hard`, `git checkout --` 같은 destructive 명령을 사용하지 않습니다.
- 요청한 커밋과 무관한 사용자 변경은 보존하고 되돌리지 않습니다.
- 무관한 변경이 섞여 있고 사용자 의도가 모호하면 명확히 관련된 파일만 stage 하고, 커밋하지 않은 파일을 설명합니다.
- 작업 트리가 비어 있으면 커밋할 내용이 없다고 보고합니다.
- 사용자가 명시적으로 요청할 때만 현재 작업 환경을 정리합니다.

## 최종 응답

다음을 보고합니다.
- 커밋 해시와 커밋 메시지
- 실행한 검증 명령과 결과
- `origin/master` 반영 여부
- 의도적으로 커밋하지 않은 파일
