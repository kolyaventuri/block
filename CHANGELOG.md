# Changelog

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
