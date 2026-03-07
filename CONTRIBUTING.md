# Contributing to SlackBlock

Thanks for your interest in contributing! Here's how to get set up and what to expect.

## Prerequisites

- Node.js >= 20
- [pnpm](https://pnpm.io/) (install with `npm i -g pnpm` or `corepack enable`)

## Setup

```sh
git clone https://github.com/kolyaventuri/block.git
cd block
pnpm install
```

## Development workflow

```sh
pnpm run test        # lint + typecheck + unit tests
pnpm run test:coverage
pnpm run test:smoke
pnpm run test:unit   # vitest (watch mode: pnpm run test:unit -- --watch)
pnpm run test:tsc    # TypeScript type check only
pnpm run test:lint   # xo lint only
pnpm run build       # tsup build to dist/
```

## Submitting changes

1. Fork the repo and create a branch from `master`.
2. Make your changes. Keep PRs focused — one concern per PR.
3. Ensure `pnpm run test` and `pnpm run build` pass locally.
4. If you changed package behavior or supported Slack surface, update the relevant docs and support matrix entries.
5. Use the PR template checklist to confirm coverage, docs, and compatibility work is complete.
6. Open a pull request against `master`. The PR template will guide you through the checklist.

## Code style

- Linting is enforced by [xo](https://github.com/xojs/xo) (ESLint under the hood).
- Run `pnpm run test:lint` to check, or rely on the pre-commit hook to auto-fix.
- 2-space indentation; semicolons mandatory 

## Adding a new block or element

1. Check to make sure you are adding a new, Slack-compatible block
   - This project is not the place to add custom block elements, please keep those in your own projects and repositories using slackblock
   - **Custom or one-off blocks will be rejected**
2. Add a component class in `src/components/` following the existing pattern
   (`static slackType`, `declare props: Props`).
3. Export it from `src/components/index.ts`.
4. Add a corresponding transformer in `src/transformers/` and register it in
   `src/transformers/index.ts`.
5. Add validation rules for required fields, limits, formats, and structural constraints where applicable.
6. Verify behavior in `warn`, `strict`, and `off` modes where relevant.
7. Add serialization and validation coverage in `test/transformers/`, `test/validation/`, and fixture or golden tests as appropriate.
8. Update public docs, including `docs/components.md` and any focused guide that changed.
9. Update `docs/support-matrix.md` if the supported Slack surface changed.
10. Add a generator to the proper, or new, example in `scripts/generate-block-kit-samples.cjs` when the example should cover the new feature.

See [docs/maintenance-checklist.md](docs/maintenance-checklist.md) for the maintainer review checklist and semver guidance.

## Semver guidance

Treat consumer impact as the primary versioning input:

- new supported blocks, elements, or additive API options are usually minor changes
- docs-only corrections are patch or minor depending on scope
- tighter `strict` validation can be breaking if downstream users relied on permissive behavior
- validation error contract changes are breaking unless introduced compatibly

If you are not sure, call out the uncertainty in the PR description.

## Reporting bugs

Use the [bug report issue template](.github/ISSUE_TEMPLATE/bug_report.md).

## Proposing features

Use the [feature request issue template](.github/ISSUE_TEMPLATE/feature_request.md) for general API ideas.

Use the [Slack surface request template](.github/ISSUE_TEMPLATE/slack_surface_request.md) for missing or outdated Block Kit support.
