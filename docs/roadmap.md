# Roadmap

This is the current list of notable Block Kit gaps that fit SlackBlock's direction and are worth tracking.

## Suggested Roadmap Items

### Blocks

1. `markdown` block
   Reason: useful modern text surface that Slack now supports directly.

2. `table` block
   Reason: common layout need and a notable gap in the current block set.

3. `context_actions` block
   Reason: newer compact action surface that pairs with Slack's AI-oriented UX.

### Elements

1. `workflow_button`
   Reason: fills a modern interactive gap and needs dedicated API design.

2. `icon_button`
   Reason: appears in newer compact-action patterns and should be modeled explicitly.

3. `feedback_buttons`
   Reason: modern Slack feedback patterns are increasingly common in AI-style message flows.

4. `file_input`
   Reason: useful for modal-style workflows and currently absent from the input set.

5. `number_input`, `email_text_input`, `url_text_input`
   Reason: these extend the input surface in predictable ways and fit the package's existing form model.

6. `rich_text_input`
   Reason: complements the existing rich-text output support.

### Composition Objects

1. `slack_file` image sources
   Reason: image blocks and image elements currently only support public URLs.

2. broader dispatch-action configuration support
   Reason: the object exists today, but support is narrower than Slack's full reusable shape.

## Notes

- These are roadmap candidates, not guarantees.
- The support matrix remains the source of truth for what is implemented now.
- When a roadmap item lands, update both `docs/support-matrix.md` and the public component reference.
