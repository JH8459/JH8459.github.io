---
name: blog-essay-draft-author
description: Create Korean opinionated technical essay drafts for this Gatsby blog. Use when the user wants to write a personal engineering essay, tool comparison, workflow adoption story, retrospective-with-argument, or "왜 이 도구/방식으로 정착했는가" style post, and needs a reusable template plus a draft under content/.
---

# Blog Essay Draft Author

## Workflow

1. Read the project posting rules when needed:
   - `.codex/rules/content-authoring.md`
   - `references/essay-writing-guide.md`
   - `assets/essay-template.md`
2. Inspect 2-4 recent or related posts before drafting.
   - Prefer posts in the same category.
   - Prefer posts with similar tone: tool adoption, retrospective, engineering criteria.
3. Gather only missing inputs in one concise Korean question when needed:
   - working title or topic
   - date, defaulting to today's `YYYY-MM-DD`
   - category, defaulting to `Project` for tooling/workflow adoption posts
   - thumbnail URL/path, allowing blank
4. Convert the user's raw points into a thesis-driven outline.
   - Start from the personal problem.
   - Define comparison criteria.
   - Compare alternatives with concrete friction.
   - End with the author's current operating rule.
5. Produce a Markdown draft using `assets/essay-template.md`.
6. If the user asks to create a file, write it to:
   - `content/<YYYY>/<YYYY-MM-DD-CATEGORY>/index.md`
   - Use the first category for the directory suffix.
   - Preserve existing files; do not overwrite without explicit confirmation.

## Style Rules

- Write in Korean.
- Keep the author's first-person voice.
- Prefer concrete working context over generic tool marketing.
- Avoid claiming universal superiority. Frame conclusions as "내 작업 방식에서는" or "현재 내 기준에서는".
- Explain tradeoffs and the decision criteria before the final preference.
- Use short paragraphs, bullet lists for criteria, and a comparison table only when it improves scanning.
- Keep frontmatter order exactly: `emoji`, `title`, `date`, `author`, `categories`, `thumbnail`.
- Use single quotes around `date`.
- Use `author: JH8459`.
- Use `thumbnail:` even when blank.
- If thumbnail is blank, leave `<!-- TODO: 썸네일 이미지 추가 -->` after frontmatter.
- Use recent post rhythm:
  - `## <emoji> Overview`
  - numbered `###` sections with `---`
  - `## 🤔 Understanding`

## Essay Shape

Use this default shape unless the user's topic clearly needs another structure:

1. `Overview`: what changed in the author's workflow and why the topic matters.
2. `Before`: the old way of working and its friction.
3. `Comparison criteria`: what matters in the decision.
4. `Tool A`: what worked and what got in the way.
5. `Tool B`: why it fit better.
6. `Understanding`: the general lesson, not just the tool choice.

## Validation

- Run `pnpm run lint` when a draft file or skill file is added.
- Run `pnpm run build` when content/frontmatter/path changes and time permits.
- Validate this skill with `skill-creator/scripts/quick_validate.py` after editing `SKILL.md`.
