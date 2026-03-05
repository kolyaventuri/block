# Changelog

## 2.0.0-beta.1

### Patch Changes

- 2dc3b09: Fixes included files

## 2.0.0-beta.0

### Major Changes

- e243699: ---

  React dependency removed — migrate jsxImportSource to "slackblock"

  In your tsconfig.json, change:
  "jsxImportSource": "react" → "jsxImportSource": "slackblock"

  Remove react / react-dom from your dependencies. No JSX syntax changes required.

  ***

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

### 1.1.0

- Drop `@slack/web-api` runtime dependency; types replicated locally
- Lower Node engine requirement to `>=20` (from `>=24`)
- Add CI matrix for Node 20, 22, and 24
- Break circular transformer import via mutable registry pattern
- Extract shared `normalizeChildren` utility
- Add `"sideEffects": false` for bundler tree-shaking
- Add end-to-end pipeline tests covering all major block/input/rich-text types
- Fix publish hygiene: delete `.npmignore`, rename `prepublish` → `prepublishOnly`

### 1.0.1

- Upgrade `@slack/web-api` to 7.14.1 (resolves CVE-2026-25639 via axios upgrade)
- Bump `rollup` to 4.59.0 (resolves CVE-2026-27606)
- Bump `minimatch` to 10.2.3+ (resolves CVE-2026-27904, CVE-2026-27903, CVE-2026-26996)
- Resolve CVE-2025-69873 via ajv 6.14.0 (already latest in range)
- Resolve CVE-2026-25547 via minimatch 10.2.3+ (replaces @isaacs/brace-expansion)

### 1.0.0

- Modernize tooling (Node 24, pnpm, tsup, Vitest, XO, Husky + lint-staged)
- Stabilize parser/transformer routing and align output types to serialized JSON
- Expand Block Kit coverage (header, rich_text, video, checkboxes, time/datetime pickers)
- Add rich_text helpers and improved select/input features
- Add validation warnings for Slack limits

### 0.4.0

- Allow for `<Section/>` blocks to have `null` components (useful for conditional renders)

### 0.3.1

- Fix issue that caused an error to be thrown if a child is `null`

### 0.3.0

- Add `Container` block to allow for better conditional rendering

### 0.2.0

- Add ability to color messages

### 0.1.0

- Add all additional props to the top level `<Message/>` component
- Remove `token` / `channel` prop since they are out of scope for the component

### 0.0.4

- Fix issue where `<Actions/>` block would have incorrect type

### 0.0.3

- Fix issue where `<Button/>` element was outputting `actionId` when it should be `action_id`

### 0.0.1 / 0.0.2

- Initial release
