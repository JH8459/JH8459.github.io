# Remote Operations Guide

## 기본 원칙

- 원격 저장소에 쓰기, 수정, 삭제 side effect가 있는 명령은 실행 직전에 사용자 승인을 받습니다.
- 사용자가 앞선 메시지에서 큰 방향을 요청했더라도, 실제 원격 변경 명령을 실행하기 전에는 명령, 대상, 영향을 다시 보여주고 확인받습니다.
- 원격 읽기 명령은 승인 없이 실행할 수 있습니다. 예: `gh pr view`, `gh pr list`, `gh api` GET, `git fetch`.
- PR 리뷰 코멘트, inline comment, review 제출은 사용자가 명시적으로 요청하고 실행 직전에 승인한 경우에만 남깁니다.
- 단순 리뷰 요청은 원격 코멘트를 남기지 않고 대화 응답으로만 보고합니다.

## 승인 필요 명령

아래 명령은 실행 직전 사용자 승인이 필요합니다.

- `git push`, `git push --tags`, force push 계열
- `gh pr create`, `gh pr edit`, `gh pr merge`, `gh pr close`, `gh pr reopen`
- `gh pr comment`, `gh pr review`, PR review thread/comment reply
- `gh issue create`, `gh issue edit`, `gh issue comment`, `gh issue close`, `gh issue reopen`
- `gh release create`, `gh release edit`, `gh release delete`, `gh workflow run`
- `gh api`의 `POST`, `PATCH`, `PUT`, `DELETE` 요청
- 원격 브랜치, 태그, release, issue, PR, review 상태를 변경하는 기타 명령

## 승인 요청 형식

승인을 요청할 때는 아래를 짧게 제시합니다.

- 실행할 명령
- 대상 원격 저장소와 브랜치, PR, issue, release 등
- 예상되는 변경 내용
- 되돌리기 어려운 영향이 있는지

사용자가 명확히 승인하지 않으면 명령을 실행하지 않습니다.

## 금지

- PR 리뷰 요청만으로 GitHub에 리뷰 코멘트나 inline comment를 남기지 않습니다.
- PR 본문, 제목, 라벨, 리뷰 상태를 사용자 승인 없이 수정하지 않습니다.
- 원격에 대한 삭제, force push, merge는 기존 승인보다 더 엄격하게 다루며, 명령별 명시 승인을 받습니다.
