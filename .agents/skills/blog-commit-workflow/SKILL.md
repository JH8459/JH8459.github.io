---
name: blog-commit-workflow
description: "이 Gatsby 블로그 저장소에서 사용자가 명시적으로 'PR 없이', 'master에 바로 반영', 'PR 없이 병합해줘', '직접 origin/master로 push해줘'라고 요청할 때만 PR 없는 커밋/반영 워크플로우를 실행합니다. 일반적인 커밋, push, PR 준비 요청은 blog-pr-workflow를 사용합니다."
---

# 커밋 워크플로우

## 작업 흐름

이 스킬은 개인 Gatsby 블로그를 PR 없이 직접 반영해야 할 때만 쓰는 예외 워크플로우입니다. 일반적인 커밋, push, PR 준비는 `.agents/skills/blog-pr-workflow/SKILL.md`를 사용합니다.

사용자가 "커밋 해줘"처럼 PR 없는 반영을 명시하지 않은 경우 이 스킬을 사용하지 않습니다.

1. 작업 전 관련 저장소 규칙을 읽습니다.
   - `.codex/rules/git-convention.md`
   - `.codex/rules/project-context.md`
   - `.codex/rules/remote-operations.md`
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

아래 원격 변경 명령을 실행하기 직전에는 `.codex/rules/remote-operations.md` 형식으로 사용자 승인을 받습니다.

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
