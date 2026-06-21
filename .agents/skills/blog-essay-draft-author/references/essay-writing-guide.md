# Essay Writing Guide

## Purpose

Use this reference for personal engineering essays that explain why the author adopted a tool, workflow, architecture, or team practice.

## Intake Model

Extract these fields from the user's request:

- `topic`: the exact subject of the essay.
- `old_workflow`: how the author previously worked.
- `candidate_tools`: tools, practices, or approaches being compared.
- `decision_criteria`: the standards that mattered in practice.
- `frictions`: concrete problems that pushed the author away from an option.
- `settled_choice`: the option the author currently prefers.
- `lesson`: the broader rule the author wants to keep.

Ask only for missing fields that block a useful draft.

## Category And Emoji

Default category mapping:

- Tooling, workflow, personal automation: `Project`, emoji `🔥`
- Learning note or usage guide: `TIL`, emoji `📚`
- Career or personal reflection: `Retrospect`, emoji `🤔`
- Book-driven essay: `Book`, emoji `📖`

Use the first category to choose the path suffix.

## Voice

- Use "나는" naturally, but do not start every paragraph with it.
- Keep claims tied to the author's context.
- Prefer "정착했다", "불편했다", "기준이 되었다" over abstract phrases like "생산성 향상".
- Avoid marketing copy. Mention names only as tools in a workflow.
- Include caveats when comparing tools: usage timing, personal preference, project constraints.

## Structure Pattern

Recommended section sequence:

1. The workflow shift.
2. Why worktree-based parallel agents became useful.
3. What was inconvenient in the first tool.
4. Why the settled tool matched the author's constraints.
5. What the author learned about AI agent tools.

## Useful Comparison Criteria

- Worktree name control.
- Branch naming control.
- Whether the tool injects hidden prompts or preserves the base CLI behavior.
- How easy it is to inspect code in a separate IDE.
- Whether the agent session can be reproduced with plain terminal commands.
- How much the tool respects the user's repository rules.

## Ending

End with a principle rather than a slogan. Good endings explain what the author will keep doing:

- keep code review in the IDE;
- delegate isolated tasks to worktree agents;
- prefer tools that expose rather than hide the underlying execution model;
- treat AI agent orchestration as workflow design, not model selection alone.
