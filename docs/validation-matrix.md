# Validation Matrix

Internal implementation checklist for the supported SlackBlock surface in phase 1.

| Component | Required Fields | One-of Constraints | Length Limits | Count Limits | Format Rules |
|---|---|---|---|---|---|
| `Message` | — | `children` or `text` required to render | `text` hard 40,000, recommended 4,000 | `blocks` max 50 | — |
| `Text` | `text` | — | `text` max 3,000 | — | — |
| `Button` | `text`, `actionId` | — | `text` 75, `actionId` 255, `url` 3,000, `value` 2,000, `accessibilityLabel` 75 | — | — |
| `Image` | `url`, `alt` | — | `url` 3,000, `alt` 2,000 | — | — |
| `Confirmation` | `title`, `text`, `confirm`, `deny` | — | `title` 100, `text` 300, `confirm` 30, `deny` 30 | — | — |
| `Actions` | `elements` | — | `blockId` 255 | `elements` max 25 | — |
| `Context` | `elements` | — | `blockId` 255 | `elements` max 10 | — |
| `Divider` | — | — | `blockId` 255 | — | — |
| `File` | `externalId` | — | `blockId` 255 | — | — |
| `Header` | `text` | — | `text` 150, `blockId` 255 | — | — |
| `ImageLayout` | `url`, `alt` | — | `url` 3,000, `alt` 2,000, `title` 2,000, `blockId` 255 | — | — |
| `Input` | `label`, `element` | — | `label` 2,000, `hint` 2,000, `blockId` 255 | — | — |
| `RichText` | `elements` | `elements` prop or rich-text children | `blockId` 255 | — | — |
| `Section` | — | `text` or non-empty `fields` | `blockId` 255, field text 2,000 | `fields` max 10 | — |
| `Video` | `title`, `videoUrl`, `thumbnailUrl`, `altText` | — | `title` 200, `description` 200, `authorName` 50, `blockId` 255 | — | — |
| `TextInput` | `actionId` | — | `actionId` 255, `placeholder` 150 | — | — |
| `DatePicker` | `actionId` | — | `actionId` 255, `placeholder` 150 | — | `initialDate` must be `YYYY-MM-DD` |
| `DateTimePicker` | `actionId` | — | `actionId` 255 | — | — |
| `TimePicker` | `actionId` | — | `actionId` 255, `placeholder` 150 | — | `initialTime` must be `HH:MM` |
| `Checkboxes` | `actionId`, `options` | — | `actionId` 255 | `options` max 10 | — |
| `RadioGroup` | `actionId`, `options` | — | `actionId` 255 | `options` max 10 | — |
| `Select` | `actionId`, `placeholder` | Static selects require non-empty `options` or `option_groups` children | `actionId` 255, `placeholder` 150 | `options` max 100, `option_groups` max 100 | — |
| `Overflow` | `actionId`, `options` | — | `actionId` 255 | `options` max 5 | — |
| `Option` | `text`, `value` | — | `text` 75, `value` 150, `description` 75, `url` 3,000 | — | — |
| `OptionGroup` | `label`, `options` | — | `label` 75 | `options` max 100 | — |
