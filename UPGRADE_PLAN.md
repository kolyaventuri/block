# Upgrade Plan

This plan modernizes the codebase, targets Node >= 20 (current LTS),
migrates to pnpm, stabilizes builds/tests, and then aligns with the
current Slack Block Kit API. The project uses JSX as a templating engine
and does not require a full React runtime unless intentionally kept.

## Goals
- Target Node >= 20 and modern TypeScript outputs.
- Migrate from npm to pnpm with a clean, reproducible install.
- Fix packaging/exports so documented imports work.
- Harden runtime behavior (parsing/transformers) and typings.
- Upgrade dependencies safely with tests guarding behavior.
- Align all blocks/elements to the latest Slack Block Kit API.

## Current State (Key Findings)
- Transformer routing now uses explicit `slackType` identifiers to avoid name collisions. (fixed)
- Parser now ignores `false`/`null`/`undefined` and fully flattens arrays. (fixed)
- Types now reflect serialized Slack JSON outputs instead of React elements. (fixed)
- Block Kit coverage expanded with new blocks/elements, with rich_text helpers and dispatch_action_config now included.

## Constraints
- Node >= 20 (LTS) as the supported runtime.
- JSX remains as a templating layer (React optional).
- Avoid regressions; keep API surface stable where possible, or document changes.

## Status (Completed So Far)
- Node >= 20 engine requirement and pnpm pin added in `package.json`.
- npm lockfile removed; `pnpm-lock.yaml` added and installs verified.
- TypeScript baseline updated to `es2019` with `moduleResolution: node16`.
- Declarations enabled with `declarationMap`, and build output standardized on `dist/`.
- Lint stack upgraded (XO 1.x + ESLint 9 + @typescript-eslint 8 + TS 5.9).
- XO config migrated to flat config in `xo.config.cjs`.
- Packaging updated with TS entry points plus `exports`/`files` map for `slackblock` and `slackblock/block`.
- Dual CJS/ESM build configured via `tsup` with `.cjs`/`.mjs` outputs in `dist/`.
- Test stack migrated to Vitest; Enzyme and AVA removed.
- React and `@types/react` upgraded to current 19.x.
- React moved to `peerDependencies` (kept in `devDependencies` for tests).
- Git hooks migrated to Husky + lint-staged; `npm-run-all` and `pre-commit` removed.
- Tests passing on Node 24 (`pnpm test`) with Vitest.
- Transformer routing stabilized with component `slackType` identifiers.
- Parser/container now ignore falsey children and fully flatten nested arrays.
- Image block vs layout fields aligned to Slack spec.
- Select `initial_*` behavior aligned (single vs multi).
- Date and time validation tightened for pickers.
- Public types updated to reflect serialized output objects.
- Added blocks/elements: `Header`, `RichText`, `Video`, `Checkboxes`, `TimePicker`, `DateTimePicker`.
- Added select enhancements (`min_query_length`, conversation filter/flags) and option descriptions.
- Added `focus_on_load` across inputs and `accessibility_label` for buttons.
- Added `dispatch_action_config` for text inputs and rich_text helper components.

## Phase 0: Baseline & Safety Net
- Add a `UPGRADE_NOTES.md` for tracked decisions, breaking changes, and rationale.
- Ensure tests run on current branch before changes; document gaps.
- Define a minimal "golden" JSON output spec for key components.

## Phase 1: Tooling + Runtime Baseline (Node >= 20)
- Set `engines.node` to `>=24` in `package.json`. (done)
- Add `packageManager` with a pinned pnpm version. (done)
- Replace `package-lock.json` with `pnpm-lock.yaml`. (done)
- Update TS config:
  - `target` to at least `es2019`. (done)
  - `moduleResolution` to `node16` or `bundler` (decide based on build tool). (set to `node16`)
  - Use `declaration` output and `declarationMap`. (done)
- Build output folder standardization: `dist/` or `lib/` (pick one). (picked `dist/`)

## Phase 2: Packaging + Exports
- Replace ad-hoc JS wrappers with TS entry points:
  - `src/index.ts` for default render export.
  - `src/block.ts` for component exports. (done)
- Add `exports` map in `package.json`: (done)
  - `.` -> `dist/index.cjs`/`dist/index.mjs` + types
  - `./block` -> `dist/block.cjs`/`dist/block.mjs` + types
- Ensure `files` whitelist includes only published artifacts. (done)
- Fix README import examples to match exports. (verified)
- Validate ESM/CJS strategy: (done)
  - Dual build via `tsup`, emitting `.cjs` and `.mjs` into `dist/`.

## Phase 3: Dependency Upgrades
- Upgrade TypeScript to current 5.x. (done)
- Replace XO + old ESLint with modern linting:
  - Option A: ESLint 9 + @typescript-eslint 8+. (done)
  - Option B: Biome for lint+format.
- Update test stack:
  - Migrate to Vitest for modern TS/JSX support. (done)
- Remove unused deps (Enzyme) and legacy adapter. (done)
- Upgrade React and `@types/react` to current 19.x. (done)
- Replace `pre-commit` with Husky + lint-staged and drop `npm-run-all`. (done)
- Update ts-node usage if still required; prefer native TS transpile in tests.

## Phase 4: JSX Runtime Decision
- Decide whether to keep React as a peer dependency or replace it:
  - If keeping React:
    - Upgrade `react` and `@types/react` to current. (done)
    - Move React to `peerDependencies` to preserve consumer compatibility. (done)
  - Ensure JSX runtime config remains correct. (done)
  - If removing React:
    - Add a small custom `jsx-runtime` (createElement) that builds element objects.
    - Document usage and add tests to ensure compatibility with JSX transforms.

## Phase 5: Core Behavior Fixes
- Fix transformer selection:
  - Assign explicit `type` identifiers or static fields to components.
  - Avoid reliance on `function.name` for block lookup.
- Harden parser:
  - Ignore `false`, `null`, and `undefined`.
  - Fully flatten nested arrays from containers.
  - Preserve string-only messages (no blocks).
- Correct Block Kit mappings:
  - `image` element vs `image` block fields.
  - Select `initial_*` fields for single vs multi.
  - Validate date format errors consistently.
- Update types to describe serialized JSON instead of React elements.
- Phase 5 complete. (done)

## Phase 6: Slack Block Kit Alignment
- Audit all supported blocks/elements against the current Slack spec.
- Add missing block types and elements (e.g. header, rich_text, checkboxes,
  timepicker, datetimepicker, button styles, file details). (done)
- Add select enhancements (min_query_length, conversation filters) and option descriptions. (done)
- Add `focus_on_load` and `accessibility_label` support where applicable. (done)
- Add rich_text helpers and `dispatch_action_config` for text inputs. (done)
- Add validation helpers (optional) with warnings for deprecated fields. (done, basic coverage)
- Update docs/examples with current Block Kit feature set.
- Remaining optional gaps: none for Phase 6; further validation tightening can be added as needed.

## Phase 7: CI + Release Hygiene
- Add CI matrix for Node 24. (done via GitHub Actions)
- Add `pnpm install --frozen-lockfile` to CI. (done)
- Ensure `build`, `lint`, and `test` pipelines are green. (done)
- Add release notes template and changelog entry format. (done)

## Testing Strategy
- Unit tests for all transformers, especially for:
  - `Section` with `fields` and `accessory`.
  - `Select` with multi/single `initial_*`.
  - `Image` block vs `Image` layout.
  - Container conditional rendering with nested arrays.
- Snapshot JSON outputs for key component trees.
- Type tests (tsd or tsd-lite) for public API typing.

## Backward Compatibility
- Keep public component names and props if possible.
- When changes are required, add clear warnings and a migration guide.
- Provide a v1.0 breaking-change boundary if needed.

## Acceptance Criteria
- Node >= 20 compatibility verified in CI.
- pnpm lockfile and builds are deterministic.
- Published package supports documented imports.
- All tests pass on Node 24.
- Block Kit outputs match current Slack spec and pass validation.
