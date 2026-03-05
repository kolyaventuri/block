---
"slackblock": major
---

---

React dependency removed — migrate jsxImportSource to "slackblock"

In your tsconfig.json, change:  
 "jsxImportSource": "react" → "jsxImportSource": "slackblock"

Remove react / react-dom from your dependencies. No JSX syntax changes required.

---

Breaking changes:

- React peer dependency dropped; replaced with a zero-dependency custom JSX runtime
- @slack/web-api runtime dependency removed; Slack types are now bundled locally
- Node.js >=20 required (previously >=18 was tolerated in practice)
- render() now defaults to validate: 'warn', emitting console warnings when output
  would violate Slack Block Kit limits (text too long, too many options, etc.).
  Pass { validate: 'off' } to suppress all warnings.

New API:

- renderToBlocks(element, options?) — returns Block[] directly; use for modals and
  home tabs where no <Message> wrapper is needed. Fragments are unwrapped transparently.
- renderToMessage(element, options?) — named alias for render(); both are equivalent.
- blockKitBuilderUrl(blocks) — generates a Block Kit Builder preview URL for a block array.
- escapeMrkdwn(text) — escapes Slack mrkdwn special characters in plain text strings.
- validate option on render() / renderToBlocks() / renderToMessage():
  'warn' (default) — console.warn on limit violations
  'strict' — throws SlackblockValidationError on any violation
  'off' — no validation
- SlackblockValidationError — structured error with .path, .rule, and .message fields.
- RenderOptions and ValidationMode types exported from package root.

Other improvements:

- strictNullChecks enabled; zero `any` types in source
- All public components and render functions have JSDoc
- Component reference at docs/components.md
- Validation guide at docs/validation.md
- Migration guides from jsx-slack and slack-block-builder at docs/migrating-\*.md
- 12 Block Kit JSON samples in examples/block-kit/ covering all validatable components
- Changesets-based release automation with npm provenance
