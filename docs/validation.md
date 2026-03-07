# Validation

SlackBlock validates your JSX against Slack's documented limits and required fields before rendering. This catches mistakes early — during development or in tests — rather than at Slack API call time.

---

## Validation modes

Pass `validate` in the options object to any render function:

```ts
render(element, { validate: 'strict' });
renderToMessage(element, { validate: 'strict' });
renderToBlocks(element, { validate: 'strict' });
```

| Mode | Default? | Behavior |
|------|----------|----------|
| `'warn'` | Yes | Logs a warning via `console.warn`; rendering continues |
| `'strict'` | — | Throws a `SlackblockValidationError`; rendering halts |
| `'off'` | — | No validation; no output |

### Choosing a mode

- **`'warn'`** — good for production. Violations are logged but don't crash your bot.
- **`'strict'`** — recommended for tests. Use it to ensure your message templates are valid before deploying.
- **`'off'`** — use only when you're deliberately constructing payloads that bend the rules or when validation overhead is a concern.

---

## `SlackblockValidationError`

Thrown in `'strict'` mode. Import it for `instanceof` checks:

```ts
import { SlackblockValidationError } from 'slackblock';
```

### Fields

| Field | Type | Description |
|-------|------|-------------|
| `message` | `string` | Full error message including path (e.g. `"Message > Header: Header text exceeds 150 characters."`) |
| `path` | `string` | Component path at the point of failure (e.g. `"Message > Header"`) |
| `rule` | `string` | Rule identifier (see table below) |

### Example

```ts
try {
  render(
    <Message text="Hello">
      <Header text={"x".repeat(200)} />
    </Message>,
    { validate: 'strict' }
  );
} catch (err) {
  if (err instanceof SlackblockValidationError) {
    console.error(err.message);
    // → "Message > Header: Header text exceeds 150 characters."

    console.error(err.path);
    // → "Message > Header"

    console.error(err.rule);
    // → "value-too-long"
  }
}
```

---

## Current Rule Strings

SlackBlock currently emits granular `error.rule` values. The public contract is not normalized yet, so the exact string depends on the failing field.

### Required-field rules

Triggered when a required prop is missing.

Examples:
- `action-id-required`
- `external-id-required`
- `label-required`
- `element-required`
- `title-required`
- `confirm-required`
- `deny-required`
- `text-required`
- `url-required`
- `alt-required`
- `options-required`
- `elements-required`
- `text-or-fields-required`

Common components now covered:
- `Button`: `actionId`, text
- `TextInput`: `actionId`
- `Overflow`: `actionId`, options
- `File`: `externalId`
- `Image` / `ImageLayout`: `url`, `alt`
- `Input`: `label`, `element`
- `Confirmation`: `title`, `confirm`, `deny`, body text
- `Section`: `text` or field children
- `Checkboxes`: `actionId`, options
- `RadioGroup`: `actionId`, options
- `Select`: `actionId`, `placeholder`, and static-select options

```tsx
<Button>Submit</Button>
// rule: "action-id-required"
```

### Length rules

Triggered when a string prop exceeds Slack's documented character limit.

Runtime rule: `value-too-long`

| Component / Prop | Limit |
|------------------|-------|
| `Message.text` (hard limit) | 40,000 chars |
| `Message.text` (recommended) | 4,000 chars |
| `Header.text` | 150 chars |
| `Input.label` | 2,000 chars |
| `Input.hint` | 2,000 chars |
| `Confirmation.title` | 100 chars |
| `Confirmation.text` | 300 chars |
| `Confirmation.confirm` | 30 chars |
| `Confirmation.deny` | 30 chars |
| `Button` label | 75 chars |
| `Button.accessibilityLabel` | 75 chars |
| `Button.url` | 3,000 chars |
| `Button.value` | 2,000 chars |
| `Option` label | 75 chars |
| `Option.value` | 150 chars |
| `Option.description` | 75 chars |
| `Option.url` | 3,000 chars |
| `OptionGroup.label` | 75 chars |
| `Image.url` | 3,000 chars |
| `Image.alt` | 2,000 chars |
| `Image.title` | 2,000 chars |
| `Video.title` | 200 chars |
| `Video.description` | 200 chars |
| `Video.authorName` | 50 chars |
| `blockId` | 255 chars |
| `actionId` | 255 chars |
| `placeholder` | 150 chars |

### Count rules

Triggered when a collection exceeds Slack's documented count limit.

Runtime rule: `too-many-items`

| Component / Collection | Limit |
|------------------------|-------|
| `Message` blocks | 50 |
| `Section` fields (children) | 10 |
| `Actions` elements | 25 |
| `Context` elements | 10 |
| `Checkboxes` options | 10 |
| `RadioGroup` options | 10 |
| `Overflow` options | 5 |
| `Select` options | 100 |
| `Select` option groups | 100 |
| `OptionGroup` options | 100 |

### Format rules

Triggered when a date or time prop does not match the required format.

Runtime rules:
- `invalid-date-format`
- `invalid-time-format`

| Prop | Required format |
|------|----------------|
| `DatePicker.initialDate` | `YYYY-MM-DD` |
| `TimePicker.initialTime` | `HH:mm` (24-hour) |

### Structural rules

Triggered when a supported component is missing one of several acceptable alternatives.

Runtime rules:
- `text-or-fields-required`

### Unknown transformer rule

Runtime rule: `unknown-type`

Triggered when a component is not recognized by SlackBlock's transformer registry. Unrecognized components are silently dropped from the output unless validation is strict.

---

## Testing with strict mode

Use `validate: 'strict'` in your test suite to catch validation issues early:

```ts
import { describe, it, expect } from 'vitest'; // or jest, mocha, etc.
import render, { SlackblockValidationError } from 'slackblock';
import { Message, Header } from 'slackblock/block';

describe('my message', () => {
  it('renders without validation errors', () => {
    expect(() =>
      render(
        <Message text="Hello">
          <Header text="Welcome" />
        </Message>,
        { validate: 'strict' }
      )
    ).not.toThrow();
  });

  it('throws on oversized header', () => {
    expect(() =>
      render(
        <Message text="Hello">
          <Header text={"x".repeat(200)} />
        </Message>,
        { validate: 'strict' }
      )
    ).toThrow(SlackblockValidationError);
  });
});
```

---

## `escapeMrkdwn`

A utility for safely inserting untrusted user content into mrkdwn text fields.

```ts
import { escapeMrkdwn } from 'slackblock';
```

Escapes the following characters:
- `&` → `&amp;`
- `<` → `&lt;`
- `>` → `&gt;`
- `*`, `_`, `~`, `` ` `` → prepended with a zero-width space to prevent formatting

### Example

```tsx
import render, { escapeMrkdwn } from 'slackblock';
import { Message, Section, Text } from 'slackblock/block';

const userComment = 'Hello *world* <script>';
const safe = escapeMrkdwn(userComment);
// → "Hello \u200B*world\u200B* &lt;script&gt;"

render(
  <Message text="New comment">
    <Section text={<Text>{safe}</Text>} />
  </Message>
);
```
