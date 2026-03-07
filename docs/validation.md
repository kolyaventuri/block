# Validation

SlackBlock validates supported JSX trees against the Slack rules it currently models: required fields, string length limits, collection limits, date/time formats, and a small number of structural rules.

Validation runs in all public render entrypoints:

```ts
render(element, {validate: 'strict'});
renderToMessage(element, {validate: 'strict'});
renderToBlocks(element, {validate: 'strict'});
```

## Modes

| Mode | Default? | What happens |
|---|---|---|
| `'warn'` | Yes | Rendering continues and SlackBlock logs a warning with component path information |
| `'strict'` | No | Rendering stops and SlackBlock throws `SlackblockValidationError` |
| `'off'` | No | SlackBlock skips validation entirely |

Use cases:
- `'warn'`: good default for app runtime when you want visibility without breaking message delivery.
- `'strict'`: recommended for tests, CI, and template verification.
- `'off'`: only for cases where you intentionally do not want runtime validation.

## Same violation in each mode

Given the same invalid payload:

```tsx
<Message>
  <Actions>
    <Button actionId={undefined as never}>Approve</Button>
  </Actions>
</Message>
```

`'warn'`:

```ts
render(element, {validate: 'warn'});
// console.warn("[slackblock] Message > Actions > Button: actionId is required.")
// render still returns a payload
```

`'strict'`:

```ts
render(element, {validate: 'strict'});
// throws SlackblockValidationError
```

`'off'`:

```ts
render(element, {validate: 'off'});
// no warning, no exception
```

## Error contract

`SlackblockValidationError` is thrown only in `'strict'` mode.

```ts
import {SlackblockValidationError} from 'slackblock';
```

Stable fields:

| Field | Type | Meaning |
|---|---|---|
| `message` | `string` | Full message including component path |
| `path` | `string` | Component path where the issue was detected |
| `rule` | `ValidationRule` | Stable top-level category |
| `subcode` | `string \| undefined` | Optional detailed machine-readable code |
| `component` | `string \| undefined` | Component associated with the issue |
| `field` | `string \| undefined` | Field associated with the issue |
| `issue` | `ValidationIssue` | The full normalized issue object |

Current exported types:

```ts
type ValidationRule =
  | 'required-field'
  | 'too-long'
  | 'too-many'
  | 'invalid-format'
  | 'invalid-structure'
  | 'unsupported-child';

type ValidationIssue = {
  message: string;
  path: string;
  rule: ValidationRule;
  subcode?: string;
  component?: string;
  field?: string;
};
```

Example:

```ts
try {
  render(
    <Message>
      <Header text={'x'.repeat(200)}/>
    </Message>,
    {validate: 'strict'},
  );
} catch (error) {
  if (error instanceof SlackblockValidationError) {
    console.error(error.message);
    // Message > Header: Header text exceeds 150 characters.

    console.error(error.path);
    // Message > Header

    console.error(error.rule);
    // too-long

    console.error(error.subcode);
    // value-too-long
  }
}
```

## Rule categories

Use `rule` for stable programmatic branching. Use `subcode` when you need the specific detail.

### `required-field`

Triggered when a required prop or child is missing.

Common subcodes:
- `action-id-required`
- `elements-required`
- `options-required`
- `text-required`
- `label-required`
- `element-required`
- `external-id-required`
- `url-required`
- `alt-required`
- `title-required`
- `confirm-required`
- `deny-required`

Example:

```tsx
<Overflow>
  <Option value="archive">Archive</Option>
</Overflow>
// rule: "required-field"
// subcode: "action-id-required"
```

### `too-long`

Triggered when a supported string prop exceeds Slack's documented limit.

Current subcode:
- `value-too-long`

Representative limits:

| Field | Limit |
|---|---|
| `Message.text` hard limit | 40,000 chars |
| `Message.text` recommended limit | 4,000 chars |
| `Header.text` | 150 chars |
| `Button` label | 75 chars |
| `Input.label` | 2,000 chars |
| `Confirmation.text` | 300 chars |
| `Video.title` | 200 chars |
| `actionId` | 255 chars |
| `blockId` | 255 chars |
| `placeholder` | 150 chars |

### `too-many`

Triggered when a supported collection exceeds Slack's documented count limit.

Current subcode:
- `too-many-items`

Representative limits:

| Collection | Limit |
|---|---|
| message blocks | 50 |
| `Actions` elements | 25 |
| `Section` fields | 10 |
| `Context` elements | 10 |
| `Checkboxes` options | 10 |
| `RadioGroup` options | 10 |
| `Overflow` options | 5 |
| `Select` options | 100 |
| `Select` option groups | 100 |
| `OptionGroup` options | 100 |

### `invalid-format`

Triggered when a supported formatted prop does not match the expected wire format.

Current subcodes:
- `invalid-date-format`
- `invalid-time-format`

Supported format checks:

| Field | Required format |
|---|---|
| `DatePicker.initialDate` | `YYYY-MM-DD` |
| `TimePicker.initialTime` | `HH:mm` |

### `invalid-structure`

Triggered when a component requires one of several allowed shapes and none were provided.

Current subcode:
- `text-or-fields-required`

Example:

```tsx
<Section />
// rule: "invalid-structure"
// subcode: "text-or-fields-required"
```

### `unsupported-child`

Triggered when SlackBlock encounters a JSX child it does not know how to transform.

Current subcode:
- `unknown-type`

In `'warn'` mode SlackBlock warns and continues. In `'off'` mode it silently skips the unsupported child.

## Common failures

Missing required field:

```tsx
render(
  <Message>
    <Input label="Name" element={<TextInput actionId={undefined as never}/>}/>
  </Message>,
  {validate: 'strict'},
);
// rule: required-field
// subcode: action-id-required
// field: actionId
```

Length violation:

```tsx
render(
  <Message>
    <Header text={'x'.repeat(200)}/>
  </Message>,
  {validate: 'strict'},
);
// rule: too-long
// subcode: value-too-long
```

Count violation:

```tsx
const options = Array.from({length: 6}, (_, index) => (
  <Option value={`opt-${index}`}>{`Option ${index}`}</Option>
));

render(
  <Message>
    <Actions>
      <Overflow actionId="more">{options}</Overflow>
    </Actions>
  </Message>,
  {validate: 'strict'},
);
// rule: too-many
// subcode: too-many-items
```

Format violation:

```tsx
render(
  <Message>
    <Actions>
      <DatePicker actionId="date" initialDate="03/07/2026"/>
    </Actions>
  </Message>,
  {validate: 'strict'},
);
// rule: invalid-format
// subcode: invalid-date-format
// field: initialDate
```

Structure violation:

```tsx
render(
  <Message>
    <Section />
  </Message>,
  {validate: 'strict'},
);
// rule: invalid-structure
// subcode: text-or-fields-required
```

## Migration note

If you previously matched older granular rule strings directly, switch to the stable category in `rule` and the detailed value in `subcode`.

| Old check | New check |
|---|---|
| `error.rule === 'action-id-required'` | `error.rule === 'required-field' && error.subcode === 'action-id-required'` |
| `error.rule === 'value-too-long'` | `error.rule === 'too-long' && error.subcode === 'value-too-long'` |
| `error.rule === 'too-many-items'` | `error.rule === 'too-many' && error.subcode === 'too-many-items'` |
| `error.rule === 'invalid-date-format'` | `error.rule === 'invalid-format' && error.subcode === 'invalid-date-format'` |
| `error.rule === 'unknown-type'` | `error.rule === 'unsupported-child' && error.subcode === 'unknown-type'` |

## Testing recommendation

Use `'strict'` mode in tests so invalid templates fail immediately:

```ts
import {expect, test} from 'vitest';
import render from 'slackblock';
import {Header, Message} from 'slackblock/block';

test('message template stays valid', () => {
  expect(() => render(
    <Message text="Hello">
      <Header text="Welcome"/>
    </Message>,
    {validate: 'strict'},
  )).not.toThrow();
});
```

For escaping and untrusted text handling, see [security.md](./security.md).
