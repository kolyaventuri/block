---
"slackblock": major
---

- **Validation coverage is materially stricter across the supported surface.**
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
