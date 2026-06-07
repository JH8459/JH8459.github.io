# Posting Workflow Reference

## Required Intake

Ask for missing values in one message:

```text
원고 초안에 필요한 값만 확인할게요.

- 제목/주제:
- 날짜: 오늘(<YYYY-MM-DD>)로 진행하거나 특정 날짜를 주세요.
- 카테고리: 예) Backend, JavaScript, Web, TIL, Book, Retrospect, Project
- 썸네일 URL/경로: 비워두면 `thumbnail:`만 남겨둘게요.
```

If the user already provided any value, do not ask again.

## Date

- Default to today's date in `YYYY-MM-DD`.
- If the environment gives a current date, use it.
- If not obvious, run `date +%F` from the repo.
- Accept explicit user dates when provided.
- The year directory is the year part of the selected date.

## Category Emoji Mapping

Use the first category to choose the frontmatter emoji.

| Category | Emoji |
| --- | --- |
| `TIL` | `📚` |
| `Backend` | `📚` |
| `JavaScript` | `📚` |
| `Web` | `📚` |
| `Book` | `📖` |
| `Retrospect` | `🤔` |
| `Project` | `🔥` |

For unknown categories, use `📚` unless the user explicitly requests another emoji.

## Path

When creating a file:

- Use `content/<YYYY>/<YYYY-MM-DD-CATEGORY>/index.md`.
- Use the selected date and first category.
- Keep category casing as provided by the user.
- Avoid spaces and special characters in the path.

Example:

```text
content/2026/2026-05-24-BACKEND/index.md
```

## Drafting Style

- Write in Korean.
- Prefer concrete engineering context, tradeoffs, and examples.
- Use existing post rhythm: frontmatter, optional image, `## <emoji> OverView`, numbered sections, `## 🤔 Understanding`.
- Use code blocks with Prism-friendly language identifiers such as `ts`, `tsx`, `js`, `sh`, `yml`, `dockerfile`, `gql`.
