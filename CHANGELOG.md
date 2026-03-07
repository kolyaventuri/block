# Changelog

## 3.0.0

### Major Changes

- 2741b49: - **Validation coverage is materially stricter across the supported surface.**
  - Missing required props now raise validation issues for more components in `strict` mode, including `TextInput`, `Overflow`, `File`, block/layout images, `Input`, `Confirmation`, and other supported validated components.
  - `Section` now rejects payloads that provide neither `text` nor `fields` in `strict` mode.
  - Additional Slack count and length limits are now enforced for supported components such as `Overflow`, `Checkboxes`, `RadioGroup`, `Select`, `Button`, `Input`, `Confirmation`, and `Video`.
  - **Validation error matching should use `rule` + `subcode`.**
    - `SlackblockValidationError.rule` now uses stable top-level categories like `required-field`, `too-long`, `too-many`, `invalid-format`, `invalid-structure`, and `unsupported-child`.
    - Previous granular values now live in `subcode`. Consumers matching directly on older `rule` strings should update their logic.
  - **`Section` API corrected to match supported Slack behavior.**
    - Supports `text`, `fields`, `text + fields`, and `expand`.
    - Fields-only sections are supported through the public API.
    - String `text` is serialized directly into a mrkdwn text object.
  - **Warn-mode validation reporting is now configurable.**
    - `RenderOptions.onValidation` receives the normalized `ValidationIssue` object in warn mode.
    - Default `console.warn` behavior remains unchanged when no reporter is provided.
    - Applies to both `render()` and `renderToBlocks()`.
  - **Coverage is now enforced in CI.**
    - Added `test:coverage` and wired it into the CI workflow.
  - **Packed artifact smoke testing is now part of verification.**
    - The package is built, packed, installed into a fixture project, type-checked, and exercised through the JSX runtime.
  - **Public export coverage was expanded.**
    - Root exports, `block`, `jsx-runtime`, and `jsx-dev-runtime` are now explicitly tested.
  - **Validation conformance coverage was expanded.**
    - Supported validated components now have table-driven minimum, invalid, and boundary coverage.
  - **Support coverage is now explicit.**
    - Added a public support matrix and roadmap so the package no longer implies full Block Kit coverage.
  - **Validation docs were rewritten around the current contract.**
    - Includes mode behavior, error shape, stable rules, subcodes, and common failures.
  - **Security and escaping guidance was added.**
    - Documents that Slack `mrkdwn` is not plain text, that `<Text>` defaults to mrkdwn, and that `escapeMrkdwn()` should be used for untrusted content.
  - **Known differences from raw Slack JSON are now documented.**
    - Covers JSX modeling choices, `camelCase` props, `Message.color` attachment wrapping, and helper limitations such as large `blockKitBuilderUrl()` payloads.
  - **Contributor and maintainer process docs were added.**
    - Added a maintainer checklist, Slack-surface issue template, and updated contribution / PR guidance for support-matrix, validation, and semver discipline.

## 3.0.0-beta.0

### Major Changes

- 007f656: - **Validation coverage is materially stricter across the supported surface.**
  - Missing required props now raise validation issues for more components in `strict` mode, including `TextInput`, `Overflow`, `File`, block/layout images, `Input`, `Confirmation`, and other supported validated components.
  - `Section` now rejects payloads that provide neither `text` nor `fields` in `strict` mode.
  - Additional Slack count and length limits are now enforced for supported components such as `Overflow`, `Checkboxes`, `RadioGroup`, `Select`, `Button`, `Input`, `Confirmation`, and `Video`.
  - **Validation error matching should use `rule` + `subcode`.**
    - `SlackblockValidationError.rule` now uses stable top-level categories like `required-field`, `too-long`, `too-many`, `invalid-format`, `invalid-structure`, and `unsupported-child`.
    - Previous granular values now live in `subcode`. Consumers matching directly on older `rule` strings should update their logic.
  - **`Section` API corrected to match supported Slack behavior.**
    - Supports `text`, `fields`, `text + fields`, and `expand`.
    - Fields-only sections are supported through the public API.
    - String `text` is serialized directly into a mrkdwn text object.
  - **Warn-mode validation reporting is now configurable.**
    - `RenderOptions.onValidation` receives the normalized `ValidationIssue` object in warn mode.
    - Default `console.warn` behavior remains unchanged when no reporter is provided.
    - Applies to both `render()` and `renderToBlocks()`.
  - **Coverage is now enforced in CI.**
    - Added `test:coverage` and wired it into the CI workflow.
  - **Packed artifact smoke testing is now part of verification.**
    - The package is built, packed, installed into a fixture project, type-checked, and exercised through the JSX runtime.
  - **Public export coverage was expanded.**
    - Root exports, `block`, `jsx-runtime`, and `jsx-dev-runtime` are now explicitly tested.
  - **Validation conformance coverage was expanded.**
    - Supported validated components now have table-driven minimum, invalid, and boundary coverage.
  - **Support coverage is now explicit.**
    - Added a public support matrix and roadmap so the package no longer implies full Block Kit coverage.
  - **Validation docs were rewritten around the current contract.**
    - Includes mode behavior, error shape, stable rules, subcodes, and common failures.
  - **Security and escaping guidance was added.**
    - Documents that Slack `mrkdwn` is not plain text, that `<Text>` defaults to mrkdwn, and that `escapeMrkdwn()` should be used for untrusted content.
  - **Known differences from raw Slack JSON are now documented.**
    - Covers JSX modeling choices, `camelCase` props, `Message.color` attachment wrapping, and helper limitations such as large `blockKitBuilderUrl()` payloads.
  - **Contributor and maintainer process docs were added.**
    - Added a maintainer checklist, Slack-surface issue template, and updated contribution / PR guidance for support-matrix, validation, and semver discipline.

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
