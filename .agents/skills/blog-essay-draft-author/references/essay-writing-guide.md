# Essay Writing Guide

## Purpose

Use this reference for personal engineering essays that explain why the author adopted a tool, workflow, architecture, or team practice.

## Intake Model

Extract these fields from the user's request:

- `topic`: the exact subject of the essay.
- `context`: the work situation, team setting, project constraint, or reading context.
- `previous_state`: how the author previously worked, thought, or made decisions.
- `options`: tools, practices, architectures, ideas, or choices being compared, if any.
- `decision_criteria`: the standards that mattered in practice.
- `frictions`: concrete problems, tensions, or repeated costs that made the topic worth writing about.
- `current_stance`: the option, practice, interpretation, or operating rule the author currently prefers.
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

Use these as topic-neutral slots. Rename, merge, or skip slots when the user's input makes another structure clearer.

1. The concrete change, question, or claim.
2. The previous state and why it became insufficient.
3. The decision criteria or interpretation lens.
4. The alternatives, tradeoffs, or examples that clarify the choice.
5. The current stance and the operating rule the author wants to keep.

Do not inject AI Agent, worktree, CLI, branch, or IDE sections unless the user explicitly provides that topic.

## Useful Comparison Criteria

Choose criteria that match the topic. Useful generic criteria include:

- Fit with the author's actual workflow or team process.
- Reproducibility and ease of inspection.
- Operational cost, maintenance cost, or review cost.
- Compatibility with existing rules, constraints, and ownership boundaries.
- Failure modes and how easily mistakes can be detected.
- Learning curve versus long-term leverage.
- Impact on collaboration, documentation, or decision traceability.

For book-driven essays, compare the idea against the author's working experience instead of forcing product or tool criteria.

## Ending

End with a principle rather than a slogan. Good endings explain what the author will keep doing:

- keep the decision inspectable;
- choose based on repeated friction, not novelty;
- make constraints explicit before picking a solution;
- preserve a way to revisit the decision when the context changes.
