---
"slackblock": major
---

### Breaking Changes

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
