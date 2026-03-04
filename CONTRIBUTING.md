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
pnpm run test:unit   # vitest (watch mode: pnpm run test:unit -- --watch)
pnpm run test:tsc    # TypeScript type check only
pnpm run test:lint   # xo lint only
pnpm run build       # tsup build to dist/
```

## Submitting changes

1. Fork the repo and create a branch from `master`.
2. Make your changes. Keep PRs focused — one concern per PR.
3. Ensure `pnpm run test` and `pnpm run build` pass locally.
4. Open a pull request against `master`. The PR template will guide you through the checklist.

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
5. Add unit tests in `test/transformers/`.
6. Add a generator to the proper example in `scripts/generate-block-kit-samples.cjs`

## Reporting bugs

Use the [bug report issue template](.github/ISSUE_TEMPLATE/bug_report.md).

## Proposing features

Use the [feature request issue template](.github/ISSUE_TEMPLATE/feature_request.md).
