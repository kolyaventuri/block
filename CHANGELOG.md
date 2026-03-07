# Changelog

## 2.0.0

### Major Changes

- e243699: ### Breaking Changes
  - **React dependency removed** — change `"jsxImportSource": "react"` to `"jsxImportSource": "slackblock"` in your `tsconfig.json`. Remove `react` / `react-dom` from your dependencies. No JSX syntax changes required.
  - **`@slack/web-api` runtime dependency removed** — Slack types are now bundled locally. No API surface changes; remove the package if it was only a transitive dependency.
  - **Node.js >=20 required.**
  - **`render()` validates by default** — output is checked against Slack Block Kit limits and a `console.warn` is emitted on violations. Pass `{ validate: 'off' }` to suppress all warnings.

  ### New API

  **Render functions**
  - `renderToBlocks(element, options?)` — returns `Block[]` directly. Use for modals and home tabs where no `<Message>` wrapper is needed; top-level Fragments are unwrapped automatically.
  - `renderToMessage(element, options?)` — named alias for `render()`; both are equivalent.

  **Typed `render()` overloads for Bolt**
  - `render(el)` → `BoltCompatiblePayload` — for `say()` / `respond()`, no cast needed.
  - `render(el, { channel })` → `SlackPostMessagePayload` — directly assignable to `client.chat.postMessage()`.
  - `render(el, { channel, user })` → `SlackPostEphemeralPayload` — directly assignable to `client.chat.postEphemeral()`.

  **Helpers**
  - `blockKitBuilderUrl(blocks)` — generates a Block Kit Builder preview URL for a block array.
  - `escapeMrkdwn(text)` — escapes Slack mrkdwn special characters in a plain-text string.

  **Validation**
  - `validate` option on all render functions: `'warn'` (default), `'strict'` (throws), `'off'` (silent).
  - `SlackblockValidationError` — structured error class with `.path`, `.rule`, and `.message` fields.

  **Exported types**
  - `BoltCompatiblePayload`, `SlackPostMessagePayload`, `SlackPostEphemeralPayload`
  - `SlackMessageDraft`, `SerializedBlock`, `SerializedElement`, `SerializedOption`
  - `RenderOptions`, `ValidationMode`

  ### Other Improvements
  - `strictNullChecks` enabled throughout; zero `any` types in source.
  - All public components and render functions documented with JSDoc.
  - Component reference at `docs/components.md`.
  - Validation guide at `docs/validation.md`.
  - Migration guides from jsx-slack and slack-block-builder at `docs/migrating-*.md`.
  - Practical Bolt example app at `examples/bolt-app/`.
  - 12 Block Kit JSON samples in `examples/block-kit/` covering all validatable components.
  - Golden test suite with full pipeline coverage.
  - Changesets-based release automation with npm provenance.

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
