---
name: blog-draft-author
description: Create Korean blog post draft frontmatter and body templates for this Gatsby blog. Use when the user asks "원고 초안 작성해줘", "게시글 초안 작성", "블로그 원고 템플릿", or wants a new post draft using this repository's content rules, category emoji mapping, fixed author, date/category/thumbnail intake, and the default OverView/Understanding Markdown structure.
---

# Blog Draft Author

## Workflow

1. Load project posting rules when needed:
   - `../../rules/content-authoring.md`
   - `references/posting-workflow.md`
   - `assets/draft-template.md`
2. Gather missing inputs in one concise Korean question:
   - title or topic
   - date: default to today's date in `YYYY-MM-DD`; accept an explicit user-provided date
   - category: ask the user; support multiple categories separated by spaces
   - thumbnail: ask for URL/path; allow blank so the user can fill it later
3. Set fixed values:
   - `author: JH8459`
   - `emoji`: infer from the first category using `references/posting-workflow.md`
4. Produce a Markdown draft using `assets/draft-template.md`.
5. If the user asks to create a file, write it to:
   - `content/<YYYY>/<YYYY-MM-DD-CATEGORY>/index.md`
   - Use the first category for the directory suffix.
   - Preserve existing files; do not overwrite without explicit confirmation.

## Output Rules

- Respond in Korean.
- Keep frontmatter exactly in this order: `emoji`, `title`, `date`, `author`, `categories`, `thumbnail`.
- Use single quotes around the `date`.
- Include `thumbnail:` even when blank.
- If thumbnail is present, include an initial `<img src="..."/>` line after frontmatter.
- If thumbnail is blank, leave a `<!-- TODO: 썸네일 이미지 추가 -->` marker after frontmatter.
- Use the default body sections:
  - `## <emoji> OverView`
  - `### 1. ...`
  - `## 🤔 Understanding`
- Include `<br>` spacing blocks consistent with existing posts, but keep the draft readable and not overfilled.
