# Phase D — Validation Plan

Derived from deep research on Slack Block Kit and message API limits.
Covers gaps between what is currently warned and what the Slack API enforces.

## Bugs (wrong limits)

- [x] **Fix `Option value` limit: 75 → 150** (`src/transformers/input/option.tsx`)
  - Spec says 150 chars; current code uses 75 (copy-paste error from option text)

## Missing per-field warnings

- [x] **Header block: warn when `text` > 150 chars** (`src/transformers/layout/header.tsx`)
  - Most common real-world `invalid_blocks` cause; only `block_id` is checked today

- [x] **Image block: warn on `alt_text` > 2,000, `image_url` > 3,000, `title` > 2,000** (`src/transformers/layout/image.tsx`)
  - None of these three fields are validated

- [x] **Video block: warn when `description` > 200 chars** (`src/transformers/layout/video.tsx`)
  - `block_id` is checked but not description length

- [x] **Confirm dialog: warn when `title` > 100 and `text` > 300 chars** (`src/transformers/block/confirmation.tsx`)
  - No validation at all today

- [x] **Option: warn when `url` > 3,000 chars** (`src/transformers/input/option.tsx`)
  - `text`/`value`/`description` are checked; `url` is not

## Missing per-count warnings

- [x] **OptionGroup: warn when `options` > 100** (`src/transformers/input/option-group.tsx`)
  - Label length is checked; options count is not

## Message-level warnings

- [x] **Message `text`: warn when > 4,000 chars (UX) and > 40,000 chars (truncation)** (`src/renderer/index.ts`)
  - Two thresholds: soft recommendation at 4k, hard truncation at 40k

## Stricter context-specific limits

- [x] **Section field texts: warn at 2,000 chars** (`src/transformers/layout/section.ts`)
  - Fields go through generic `transformText` (3k cap) but Slack spec says 2k per field
  - Needs either a context param on `transformText` or a post-transform check in `transformSection`

## Future blocks (not yet implemented)

These will need validation wired in when the blocks are added:

- **Markdown block**: cumulative 12,000-char budget across all markdown blocks in a payload (not per-block)
- **Table block**: 100 rows max, 20 cells per row, 20 `column_settings` max, only 1 table per message (`invalid_attachments: only_one_table_allowed`)

## Reference: limits catalog

| Location | Field | Limit | Source |
|---|---|---|---|
| Message | blocks count | 50 | Documented |
| Message | `text` length | 4,000 soft / 40,000 truncation | Documented |
| Message | attachments count | 100 | Documented |
| Block | `block_id` | 255 chars | Documented |
| Text object | `text` | 3,000 chars | Documented |
| Section | `text` | 3,000 chars | Documented |
| Section | `fields` count | 10 items | Documented |
| Section | each `fields[i].text` | 2,000 chars | Documented |
| Actions | `elements` count | 25 | Documented |
| Context | `elements` count | 10 | Documented |
| Header | `text` | 150 chars | Documented |
| Image | `alt_text` | 2,000 chars | Documented |
| Image | `image_url` | 3,000 chars | Documented |
| Image | `title.text` | 2,000 chars | Documented |
| Video | `description.text` | 200 chars | Documented |
| Markdown blocks | cumulative total | 12,000 chars | Documented |
| Table | rows count | 100 | Documented |
| Table | cells per row | 20 | Documented |
| Table | `column_settings` count | 20 | Documented |
| Table | tables per message | 1 | Documented |
| Option | `text.text` | 75 chars | Documented |
| Option | `value` | 150 chars | Documented |
| Option | `description.text` | 75 chars | Documented |
| Option | `url` | 3,000 chars | Documented |
| OptionGroup | `label.text` | 75 chars | Documented |
| OptionGroup | `options` count | 100 | Documented |
| Confirm | `title` | 100 chars | Documented |
| Confirm | `text.text` | 300 chars | Documented |

### Observed (not Slack-documented)

- Payload-level failures reported around ~13,200 chars across all blocks combined — treat as a practical ceiling
- Text block failures observed near ~2,958 chars (likely JSON escaping overhead) — keep a buffer below the 3,000 hard cap
