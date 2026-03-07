# Migrating from slack-block-builder

[slack-block-builder](https://github.com/raycharius/slack-block-builder) uses a fluent builder API (method chaining). This guide maps the builder pattern to slackblock's JSX approach.

---

## Key differences

| | slack-block-builder | slackblock |
|---|---|---|
| Syntax | Fluent builder (method chaining) | JSX |
| Output | Call `.buildToJSON()` or `.buildToObject()` | Plain JS object, ready to spread |
| Select variants | Separate classes per source type (`StaticSelect`, `UserSelect`, etc.) | Single `<Select>` with a `type` prop |
| Confirmation dialog | `ConfirmationDialog()` builder | `<Confirmation>` component |
| Radio buttons | `RadioButtons()` / `RadioButton()` | `<RadioGroup>` / `<Option>` |
| Overflow menu | `OverflowMenu()` | `<Overflow>` |
| Modals / home tabs | `Modal()`, `HomeTab()` builders | `renderToBlocks()` |
| Validation | Runtime validation on `.build()` | Configurable: `'off'`, `'warn'`, `'strict'` |

---

## TypeScript setup

**slack-block-builder** needs no TSConfig changes.

**slackblock** uses the modern JSX transform:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "slackblock"
  }
}
```

---

## Basic message

**slack-block-builder:**
```ts
import { Message, Blocks } from 'slack-block-builder';

const msg = Message()
  .text('Hello')
  .blocks(
    Blocks.Section({ text: 'Hello *Block Kit*.' }),
    Blocks.Divider(),
  )
  .buildToJSON();
```

**slackblock:**
```tsx
import render from 'slackblock';
import { Message, Section, Text, Divider } from 'slackblock/block';

const msg = render(
  <Message text="Hello">
    <Section text={<Text>Hello *Block Kit*.</Text>} />
    <Divider />
  </Message>
);
```

The result is already a plain object — no `.buildToJSON()` step needed.

---

## Posting to `chat.postMessage`

**slack-block-builder:**
```ts
await client.chat.postMessage({
  channel: 'C0123456789',
  ...Message().text('Hello').blocks(...).buildToJSON(),
});
```

**slackblock:**
```tsx
const msg = render(
  <Message text="Hello"><Section text={<Text>Hello</Text>} /></Message>,
  { channel: 'C0123456789' },
);
await client.chat.postMessage(msg); // typed as SlackPostMessagePayload, no cast needed
```

You can also spread if you prefer to supply the channel at call-site:

```tsx
await client.chat.postMessage({
  channel: 'C0123456789',
  ...render(<Message text="Hello"><Section text={<Text>Hello</Text>} /></Message>),
});
```

---

## Blocks for modals and home tabs

**slack-block-builder:**
```ts
import { Modal, Blocks, Elements } from 'slack-block-builder';

const modal = Modal({ title: 'My Modal' })
  .blocks(
    Blocks.Input({ label: 'Name' })
      .element(Elements.TextInput({ actionId: 'name' })),
  )
  .buildToObject();
```

**slackblock:**
```tsx
import { renderToBlocks } from 'slackblock';
import { Input, TextInput } from 'slackblock/block';

const blocks = renderToBlocks(
  <Input label="Name" element={<TextInput actionId="name" />} />
);

await client.views.open({
  trigger_id: triggerId,
  view: {
    type: 'modal',
    title: { type: 'plain_text', text: 'My Modal' },
    blocks,
  },
});
```

---

## Sections

**slack-block-builder:**
```ts
Blocks.Section()
  .text('Primary text')
  .fields('Field one', 'Field two')
  .accessory(Elements.Button({ text: 'Click', actionId: 'btn' }))
```

**slackblock:**
```tsx
<Section
  text="Primary text"
  fields={[<Text>Field one</Text>, <Text>Field two</Text>]}
  accessory={<Button actionId="btn">Click</Button>}
/>
```

Fields can be passed via the `fields` prop or as children of `<Section>`.

---

## Select menus

slack-block-builder has separate classes per data source; slackblock uses a single `<Select>` with a `type` prop:

| slack-block-builder | slackblock |
|---|---|
| `Elements.StaticSelect()` | `<Select>` (default, `type="static"`) |
| `Elements.ExternalSelect()` | `<Select type="external">` |
| `Elements.UserSelect()` | `<Select type="user">` |
| `Elements.ConversationSelect()` | `<Select type="conversation">` |
| `Elements.ChannelSelect()` | `<Select type="channel">` |
| Multi-variants | Add `multi` prop to any `<Select>` |

```tsx
// Static single-select
<Select placeholder="Pick one" actionId="color">
  <Option value="red">Red</Option>
  <Option value="blue">Blue</Option>
</Select>

// User multi-select
<Select type="user" multi placeholder="Pick users" actionId="mentions" />
```

---

## Radio buttons

**slack-block-builder:** `RadioButtons()` builder with `RadioButton()` items.

**slackblock:** `<RadioGroup>` with `<Option>` children:

```tsx
<RadioGroup actionId="size">
  <Option value="s">Small</Option>
  <Option value="m">Medium</Option>
  <Option value="l">Large</Option>
</RadioGroup>
```

---

## Overflow menu

**slack-block-builder:** `Elements.OverflowMenu()` builder.

**slackblock:** `<Overflow>` with `<Option>` children:

```tsx
<Overflow actionId="more">
  <Option value="edit">Edit</Option>
  <Option value="delete">Delete</Option>
</Overflow>
```

---

## Confirmation dialogs

**slack-block-builder:** `Bits.ConfirmationDialog()` builder.

**slackblock:** `<Confirmation>` component passed via the `confirm` prop:

```tsx
const dialog = (
  <Confirmation title="Are you sure?" confirm="Yes, delete" deny="Cancel">
    <Text plainText>This cannot be undone.</Text>
  </Confirmation>
);

<Button actionId="delete" confirm={dialog} style="danger">Delete</Button>
```

---

## Validation

**slack-block-builder** validates on `.build()` and throws on invalid input.

**slackblock** defaults to `'warn'` mode (console warnings). To match the throwing behavior:

```tsx
render(<Message>...</Message>, { validate: 'strict' });
```

See [validation.md](./validation.md) for the full validation reference.

---

## Preview in Block Kit Builder

**slack-block-builder** includes a Block Kit Builder URL helper.

**slackblock** has `blockKitBuilderUrl`:

```ts
import { renderToBlocks, blockKitBuilderUrl } from 'slackblock';

const blocks = renderToBlocks(<Section text={<Text>Hello</Text>} />);
console.log(blockKitBuilderUrl(blocks));
// → https://app.slack.com/block-kit-builder#{"blocks":[...]}
```
