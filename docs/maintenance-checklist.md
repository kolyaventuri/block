# Maintenance Checklist

This document is the maintainer-side process for keeping SlackBlock aligned with Slack Block Kit without letting support drift from implementation.

## Periodic Slack Surface Audit

Run a surface audit:
- before each release branch cut
- after notable Slack Block Kit changes
- any time a support-matrix entry looks stale

Audit steps:
1. Review Slack Block Kit docs for current blocks, elements, composition objects, and notable field changes.
2. Compare Slack's current surface against [support-matrix.md](./support-matrix.md).
3. Check whether any existing SlackBlock component has fallen behind Slack's documented required fields, limits, or formats.
4. Log newly discovered gaps as GitHub issues.
5. Update [roadmap.md](./roadmap.md) if a newly discovered gap fits the package direction.
6. Update [support-matrix.md](./support-matrix.md) only for behavior that is actually implemented.

When logging an issue from an audit, include:
- the Slack feature name
- links to the relevant Slack docs
- current SlackBlock status
- whether the gap is docs-only, validation-only, or missing feature support
- whether the change is likely patch, minor, or major

## New Feature Conformance Checklist

Do not merge a new Slack surface area addition until all applicable items are done.

Required for every new component or supported feature expansion:
- public type definition or component props
- serializer / transformer implementation
- transformer registration and public exports where applicable
- validation rules for required fields, limits, formats, and structural constraints that SlackBlock models
- warn mode behavior verified
- strict mode behavior verified
- off mode behavior verified when relevant
- unit tests or fixture tests for canonical serialization
- validation tests for boundary and failure cases
- docs update in the public component reference or feature guide
- [support-matrix.md](./support-matrix.md) updated
- migration notes if the public API or behavior changed materially

Before merge, confirm:
- the feature is actually in scope for SlackBlock
- the API shape matches the established JSX model
- docs do not overclaim unsupported Slack behavior
- CI coverage and smoke checks still pass

## Versioning Discipline

Use semver based on consumer impact, not just implementation size.

| Change type | Expected version impact |
|---|---|
| docs-only clarification with no behavior change | patch or minor |
| new supported block / element / helper | minor |
| additive non-breaking API like a new render option | minor |
| tighter `strict` validation that may fail previously passing payloads | evaluate as breaking first |
| changed validation error contract | major unless introduced compatibly |
| removed or behaviorally incompatible public API | major |

Questions to ask before release:
- Could an existing `strict`-mode test suite now fail?
- Could downstream code matching on validation errors break?
- Does the support matrix claim more or less than the code actually does?
- Does the changelog explain the user-visible impact clearly?

## Pull Request Review Checklist

For maintainers reviewing feature PRs:
- confirm the implementation matches the issue scope
- confirm tests cover serialization and validation behavior
- confirm docs were updated for any public API or support change
- confirm support matrix status matches the code
- confirm semver impact is reflected in release notes or branch planning
