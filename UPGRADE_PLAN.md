# Upgrade Plan

> Last audited: 2026-03-04 against master @ 6a55c52

## Overview

The original modernization work (Node upgrade, pnpm, tsup, Vitest, JSX runtime, Block Kit
alignment) is complete. This document now tracks the remaining trust, reliability, and polish
work needed before the project can be considered fully production-ready.

---

## Completed (no further action needed)

**Tooling & runtime**
- [x] Node `>=20` engine requirement; CI matrix on 20/22/24.
- [x] Migrated from npm to pnpm; lockfile is deterministic.
- [x] TypeScript 5.x, `es2022` target (matches Node ≥20 runtime), `node16` moduleResolution, declaration maps.
- [x] Dual CJS/ESM build via tsup; `dist/` as the sole output folder.
- [x] `exports` map in `package.json` for `.` and `./block` entry points.
- [x] XO 1.x + ESLint 9 + @typescript-eslint 8 in `xo.config.cjs`; `space: true` enforced.
- [x] Husky + lint-staged; `npm-run-all` and legacy `pre-commit` removed.
- [x] `sideEffects: false` for bundler tree-shaking.
- [x] `files` whitelist is the sole publish gate; `.npmignore` deleted.

**Dependencies**
- [x] React peer dependency dropped entirely; custom JSX runtime at `src/jsx-runtime.ts` (#35).
- [x] `@slack/web-api` runtime dep removed; stable local type replicas in
      `src/constants/slack-message-types.ts` (#34/#36).
- [x] `@slack/types` retained as the only Slack-origin dependency.

**Block Kit alignment**
- [x] Transformer routing via explicit `slackType` identifiers (no `function.name` fragility).
- [x] Parser ignores `false`/`null`/`undefined`; fully flattens nested arrays.
- [x] All current Block Kit blocks and elements implemented and tested.
- [x] `focus_on_load`, `accessibility_label`, `dispatch_action_config`, rich_text helpers added.
- [x] `@slack/web-api` deep imports eliminated.

**Type safety**
- [x] `strictNullChecks: true`; all `any` removed from `src/`; `no-explicit-any` enabled.
- [x] `JSX.Element.props` typed as `Record<string, unknown>` (not `any`).

**CI / release hygiene**
- [x] GitHub Actions CI; stale CircleCI badge removed.
- [x] `CHANGELOG.md` populated through v1.1.0 (Keep a Changelog format).
- [x] Node 20/22/24 matrix in CI.
- [x] Duplicate CI run on PRs fixed (#33).

**Validation samples**
- [x] `scripts/generate-block-kit-samples.cjs` ported away from React to custom `h()`.
- [x] 12 Block Kit samples in `examples/block-kit/` covering all validatable components and props.
- [x] Invalid `RichTextDate.link` prop removed from component and transformer.

---

## Remaining Work

### Phase A — Trust signals ✅

- [x] Add governance docs:
  - [x] `CONTRIBUTING.md` — contribution guidelines, dev setup, PR checklist.
  - [x] `CODE_OF_CONDUCT.md` — Contributor Covenant.
  - [x] `SECURITY.md` — GitHub private vulnerability reporting (no email SLA).
- [x] Add `.github/ISSUE_TEMPLATE/` (bug report + feature request templates).
- [x] Add `.github/pull_request_template.md`.
- [x] Add remaining README badges: npm version, license, TypeScript types.
- [x] Add README compatibility section: Node >=20, no React required.

Acceptance criteria:
- [x] Governance docs exist and link to each other where relevant.
- [x] All README badges resolve to live targets.

---

### Phase B — Security automation ✅

- [x] Add `.github/dependabot.yml` for npm and GitHub Actions dependency updates.
- [x] Add `.github/workflows/security.yml`:
  - [x] CodeQL analysis on push/PR.
  - [x] `actions/dependency-review-action` on PRs.
  - [x] Scheduled `pnpm audit --audit-level=high`.
- [ ] Add npm provenance to publish workflow (deferred to Phase G).

Acceptance criteria:
- [x] Security workflow passes on `master`.
- [x] Dependabot opens update PRs on schedule.

---

### Phase C — Testing quality gates (foundation for Phase D) ✅

- [x] Add fixture-based "golden payload" tests: render each `examples/block-kit/` sample
      through `render()` and assert the JSON output matches the committed fixture.
      12 tests in `test/e2e/golden.test.tsx` covering all blocks and element types.
- [x] Set coverage threshold in `vitest.config.ts` (85%+ statements/branches/functions/lines).
      Current: ~97% statements, ~93% branches.
- [x] Add tests for unknown component types and parser flattening edge cases.

Acceptance criteria:
- [x] Every sample in `examples/block-kit/` has a corresponding golden test.
- [x] CI fails if coverage drops below threshold.

---

### Phase D — Validation architecture ✅

- [x] Add `validate` option to `render()`: `'off' | 'warn' | 'strict'` (default: `'warn'`).
- [x] Introduce `SlackblockValidationError` with `message`, `path`, and `rule` fields.
- [x] Centralize Slack limit constants in `src/constants/limits.ts`; all magic numbers removed from transformers.
- [x] Path-aware error messages via module singleton (`Message > Header: Header text exceeds 150 characters.`).
- [x] Strict mode throws consistently for:
  - [x] Required field omissions (`requireField()` in 9 transformers).
  - [x] Length/count limit violations (`warnIfTooLong` / `warnIfTooMany` now route through `report()`).
  - [x] Invalid date/time format inputs (date-picker, time-picker).
- [x] Validation matrix tests: `warn`/`strict`/`off` × all rule categories (35 tests in `test/validation/`).
- [x] `escapeMrkdwn()` helper exported from package root.
- [x] `SlackblockValidationError`, `RenderOptions`, `ValidationMode` exported from package root.
- [x] tsconfig `target` corrected from `es2019` → `es2022` (matches Node ≥20 runtime).

Acceptance criteria:
- [x] All three modes are tested and documented.
- [x] Error messages include component path and prop name.

---

### Phase E — API ergonomics ✅

- [x] Add `renderToBlocks(element): Block[]` helper.
- [x] Add `renderToMessage(element, options): SlackMessage` helper (wraps current `render()`).
- [x] Clarify and document `color`-to-attachment conversion behavior.
- [x] Add Block Kit Builder preview URL helper (`blockKitBuilderUrl`).

Acceptance criteria:
- [x] New helpers are documented and tested.

---

### Phase F — Documentation and adoption

- [ ] Rewrite README: value proposition, install + quick start, compatibility matrix,
      validation mode overview, links to examples.
- [ ] Add component reference (one entry per public component, props table).
- [ ] Add examples for: message, modal, home tab.
- [ ] Add migration guides from `jsx-slack` and `slack-block-builder`.

Acceptance criteria:
- [ ] A new user can build and send a valid message in under 10 minutes from the README.
- [ ] Migration guides exist for at least two alternatives.

---

### Phase G — Release automation and stabilization

- [ ] Decide release tooling: Changesets vs semantic-release vs release-please.
- [ ] Implement chosen release workflow with changelog automation.
- [ ] Tag GitHub releases aligned to npm versions (back-fill for existing versions).
- [ ] Cut a versioned release once Phases A–E are substantially complete.

---

## Recommended sequencing

| Order | Phase | Effort | Rationale |
|-------|-------|--------|-----------|
| 1 | A — Trust signals | Low | Additive, no code changes, high public signal |
| 2 | B — Security automation | Low | Mechanical; unblocks everything downstream |
| 3 | C — Golden tests | Medium | Locks current behavior; safety net before validation lands |
| 4 | D — Validation architecture | High | Core remaining technical work; unblocks D tests + F docs |
| 5 | E — API ergonomics | Low–Medium | Small surface; natural companion to D |
| 6 | F — Docs | Medium | Best written once D is stable |
| 7 | G — Release | Low | Capstone; cut once A–F are substantially done |

---

## Decisions log

| Decision | Outcome | Date | Rationale |
|----------|---------|------|-----------|
| Node support policy | `>=20` (LTS+), tested 20/22/24 | 2026-02 | Drops legacy maintenance burden |
| React runtime | Dropped; custom `src/jsx-runtime.ts` | 2026-02 (#35) | Removes peer dep; elements are plain objects |
| Slack SDK dep strategy | Removed `@slack/web-api`; local type replicas | 2026-02 (#34/#36) | Eliminates unstable deep imports |
| Release tooling | **TBD** | — | — |

---

## Risk log

| Risk | Mitigation |
|------|-----------|
| Validation strictness breaks existing users | Ship `warn` as default first; stage `strict` adoption with migration notes |
| Documentation lags code changes | Docs update required in every feature PR checklist |
| Coverage threshold introduces CI noise | Start at 80%, tune upward over two release cycles |
