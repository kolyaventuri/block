# Migrating from jsx-slack

[jsx-slack](https://github.com/yhatt/jsx-slack) is a JSX-based Slack Block Kit library. Both libraries follow a similar JSX approach, but differ in component names, rendering API, and how text / fields are composed.

---

## Key differences

| | jsx-slack | slackblock |
|---|---|---|
| JSX runtime | Own runtime (`jsxImportSource: "jsx-slack"`) | Own runtime (`jsxImportSource: "slackblock"`) |
| Surface container | `<Blocks>` | `<Message>` for messages; `renderToBlocks()` for modals/home tabs |
| Section fields | `<Field>` children | `<Text>` children |
| Confirmation | `<Confirm>` | `<Confirmation>` |
| Mrkdwn text | HTML-like tags (`<b>`, `<i>`, inline HTML) | `<Text>` with mrkdwn syntax, or `<RichText>` components |
| Template literals | `jsxslack` tag | Not supported |
| Validation | Throws on invalid props | Configurable: `'off'`, `'warn'` (default), `'strict'` |

---

## TypeScript setup

Both libraries use the modern JSX transform — just swap the import source:

**jsx-slack:**
```json
{
  "compilerOptions": {
    "jsxImportSource": "jsx-slack"
  }
}
```

**slackblock:**
```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "slackblock"
  }
}
```

---

## Rendering a message

**jsx-slack:**
```tsx
import { Blocks, Section } from 'jsx-slack';

const blocks = (
  <Blocks>
    <Section>Hello</Section>
  </Blocks>
);
```

**slackblock:**
```tsx
import render from 'slackblock';
import { Message, Section, Text } from 'slackblock/block';

const message = render(
  <Message text="Hello">
    <Section text={<Text>Hello</Text>} />
  </Message>
);
```

For modals and home tabs (blocks array only):
```tsx
import { renderToBlocks } from 'slackblock';
import { Section, Text } from 'slackblock/block';

const blocks = renderToBlocks(<Section text={<Text>Hello</Text>} />);
```

---

## Section text and fields

**jsx-slack** accepts text as children directly, with HTML-like formatting:
```tsx
<Section>
  Hello <b>world</b>
  <Field>Field A</Field>
  <Field>Field B</Field>
</Section>
```

**slackblock** separates concerns explicitly:
- `text` prop for the primary text (a `<Text>` element with mrkdwn)
- Children of `<Section>` become fields

```tsx
<Section text={<Text>Hello *world*</Text>}>
  <Text>Field A</Text>
  <Text>Field B</Text>
</Section>
```

---

## Confirmation dialogs

**jsx-slack:** `<Confirm>` component

**slackblock:** `<Confirmation>` component (note the full name)

```tsx
const dialog = (
  <Confirmation title="Are you sure?" confirm="Yes, delete" deny="Cancel">
    <Text plainText>This action cannot be undone.</Text>
  </Confirmation>
);

<Button actionId="delete" confirm={dialog} style="danger">Delete</Button>
```

---

## Input blocks

**jsx-slack:** Input element is a child of `<Input>`:
```tsx
<Input label="Name">
  <TextInput actionId="name" />
</Input>
```

**slackblock:** Input element goes in the `element` prop:
```tsx
<Input
  label="Name"
  element={<TextInput actionId="name" />}
/>
```

---

## Validation

**jsx-slack** throws on invalid props by default.

**slackblock** defaults to `'warn'` mode. To match jsx-slack's behavior:

```tsx
render(<Message>...</Message>, { validate: 'strict' });
```

See [validation.md](./validation.md) for details.
