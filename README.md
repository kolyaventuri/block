# SlackBlock

JSX-based Slack Block Kit message renderer

[![CI](https://github.com/kolyaventuri/block/actions/workflows/ci.yml/badge.svg)](https://github.com/kolyaventuri/block/actions/workflows/ci.yml)
[![npm](https://img.shields.io/npm/v/slackblock)](https://www.npmjs.com/package/slackblock)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/types-included-blue)](https://www.typescriptlang.org/)

Build Slack messages with JSX. No React required — SlackBlock ships its own lightweight JSX runtime. Write your blocks as components, call `render()`, and post the result straight to the Slack API.

SlackBlock supports a documented subset of Slack Block Kit rather than the full surface area. See [docs/support-matrix.md](docs/support-matrix.md) for the current coverage and [docs/roadmap.md](docs/roadmap.md) for the main gaps being tracked.

---

## Compatibility

| | Supported |
|---|---|
| Node.js | `>= 20` |
| TypeScript | `>= 5.0` |
| React | Not required — uses a built-in JSX runtime |

---

## Install

```sh
npm install slackblock
# or
pnpm add slackblock
# or
yarn add slackblock
```

---

## TypeScript setup

Add the following options to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "slackblock"
  }
}
```

This tells TypeScript to use SlackBlock's built-in JSX runtime instead of React.

---

## Quick start

```tsx
import render from 'slackblock';
import { Message, Section, Text, Header, Divider, Actions, Button } from 'slackblock/block';

const message = render(
  <Message text="Deployment complete">
    <Header text="Deploy finished" />
    <Section text={<Text>Service *api* deployed to production.</Text>} />
    <Divider />
    <Actions>
      <Button actionId="view_logs" url="https://example.com/logs">View logs</Button>
      <Button actionId="rollback" style="danger">Rollback</Button>
    </Actions>
  </Message>,
  { channel: 'C0123456789' },
);

// message is typed as SlackPostMessagePayload — pass directly, no cast needed:
await slackClient.chat.postMessage(message);
```

The rendered output is a plain object you can spread directly into `chat.postMessage`.

---

## API

### `render(element, options?)` — default export

Renders a `<Message>` tree to a full Slack message payload. The return type is narrowed automatically based on the options you pass:

```ts
import render from 'slackblock';

// No channel — BoltCompatiblePayload (for say/respond)
const msg = render(<Message text="Hello">...</Message>);
await say(msg);

// channel — SlackPostMessagePayload (directly usable with chat.postMessage)
const msg = render(<Message text="Hello">...</Message>, { channel: 'C0123456789' });
await client.chat.postMessage(msg); // no cast needed

// channel + user — SlackPostEphemeralPayload (directly usable with chat.postEphemeral)
const msg = render(<Message text="Hello" />, { channel: '#general', user: userId });
await client.chat.postEphemeral(msg); // no cast needed
```

The top-level element must be a `<Message>`. Throws a `TypeError` otherwise.

### `renderToMessage(element, options?)`

Named alias for `render`. Use whichever reads more naturally in your codebase.

```ts
import { renderToMessage } from 'slackblock';
```

### `renderToBlocks(element, options?)`

Renders any JSX element (or fragment) directly to a `Block[]` array, without a `<Message>` wrapper. Useful for modals and home tabs, which accept a `blocks` array rather than a full message payload.

```tsx
import { renderToBlocks } from 'slackblock';
import { Section, Text } from 'slackblock/block';

const blocks = renderToBlocks(
  <>
    <Section text={<Text>Hello from a modal</Text>} />
  </>
);
// → [{ type: "section", text: { type: "mrkdwn", text: "Hello from a modal" } }]
```

### `blockKitBuilderUrl(blocks)`

Returns a [Block Kit Builder](https://app.slack.com/block-kit-builder) URL for the given blocks. Open it in a browser to preview layout and interactivity during development.

```ts
import { renderToBlocks, blockKitBuilderUrl } from 'slackblock';

const blocks = renderToBlocks(<Section text={<Text>Hello</Text>} />);
console.log(blockKitBuilderUrl(blocks));
// → https://app.slack.com/block-kit-builder#{"blocks":[...]}
```

### `escapeMrkdwn(text)`

Escapes Slack mrkdwn special characters (`*`, `_`, `~`, `` ` ``, `>`, `&`, `<`, `>`) in a string. Use this when inserting untrusted user content into a mrkdwn text field.

```ts
import { escapeMrkdwn } from 'slackblock';

const safe = escapeMrkdwn(userInput); // "hello *world*" → "hello \*world\*"
```

### Options

Both `render` / `renderToMessage` / `renderToBlocks` accept an optional `options` object:

```ts
type RenderOptions = {
  validate?: 'off' | 'warn' | 'strict'; // default: 'warn'
  channel?: string; // included in the payload; narrows return type to SlackPostMessagePayload
  user?: string;    // requires channel; narrows return type to SlackPostEphemeralPayload
};
```

See [docs/validation.md](docs/validation.md) for details.

---

## Validation

SlackBlock validates your message against Slack's documented limits and required fields. The `validate` option controls what happens when a violation is detected:

| Mode | Behavior |
|------|----------|
| `'warn'` (default) | Logs a warning to `console.warn`; rendering continues |
| `'strict'` | Throws a `SlackblockValidationError` |
| `'off'` | No validation |

```tsx
// Throw on any violation — recommended for tests
const message = render(<Message>...</Message>, { validate: 'strict' });
```

```ts
import { SlackblockValidationError } from 'slackblock';

try {
  render(<Message>...</Message>, { validate: 'strict' });
} catch (err) {
  if (err instanceof SlackblockValidationError) {
    console.error(err.message); // "Message > Header: Header text exceeds 150 characters."
    console.error(err.path);    // "Message > Header"
    console.error(err.rule);    // "too-long"
    console.error(err.subcode); // "value-too-long"
  }
}
```

Strict mode now catches missing required props and structural gaps across the supported surface, including:
- missing `actionId` on interactive elements like `TextInput` and `Overflow`
- missing `externalId` on `<File>`
- missing `url` / `alt` on `<Image>` and `<ImageLayout>`
- missing `label` / `element` on `<Input>`
- incomplete `<Confirmation>` dialogs
- `<Section>` blocks with neither primary text nor fields

See [docs/validation.md](docs/validation.md) for the stable rule categories and current subcodes.

---

## Conventions

**camelCase props** — Slack's API uses `snake_case`; SlackBlock uses `camelCase` props that map to the correct API fields:

```tsx
// Slack API: { "block_id": "...", "action_id": "..." }
<Button blockId="my_block" actionId="my_action">Click me</Button>
```

**Children as fields** — When Slack expects an array (e.g. select options, section fields), pass them as JSX children:

```tsx
<Select placeholder="Pick one" actionId="pick">
  <Option value="a">Option A</Option>
  <Option value="b">Option B</Option>
</Select>
```

`<Section>` also supports an explicit `fields` prop and Slack's `expand` flag:

```tsx
<Section
  text="Build status"
  fields={[
    <Text plainText>Commit</Text>,
    <Text>{sha}</Text>,
  ]}
  expand
/>
```

**Conditional rendering** — Use `<Container>` to wrap elements that may or may not render, or use standard JS short-circuit expressions:

```tsx
<Message text="Hello">
  {isAdmin && <Section text={<Text>Admin panel</Text>} />}
  <Container>
    {items.map(item => <Section key={item.id} text={<Text>{item.name}</Text>} />)}
  </Container>
</Message>
```

**Color / attachment** — Setting `color` on `<Message>` wraps blocks in a legacy attachment for the colored left border. `color` accepts any hex value or Slack named colors:

```tsx
<Message text="Alert" color="#ff0000">
  <Section text={<Text>Something went wrong.</Text>} />
</Message>
```

---

## Support Coverage

SlackBlock does not try to mirror every Slack Block Kit primitive immediately. The supported subset is explicit:

- supported coverage: [docs/support-matrix.md](docs/support-matrix.md)
- public component API: [docs/components.md](docs/components.md)
- planned gaps: [docs/roadmap.md](docs/roadmap.md)

If a block, element, or composition object is not listed as `Supported` in the support matrix, do not assume it is available.

---

## Further reading

- [Component reference](docs/components.md) — all components with props tables
- [Support matrix](docs/support-matrix.md) — current Block Kit coverage
- [Roadmap](docs/roadmap.md) — tracked gaps and likely next additions
- [Validation guide](docs/validation.md) — validation modes and error handling
- [Migrating from jsx-slack](docs/migrating-from-jsx-slack.md)
- [Migrating from slack-block-builder](docs/migrating-from-slack-block-builder.md)
- [Slack Block Kit reference](https://api.slack.com/block-kit)

---

## License

MIT
