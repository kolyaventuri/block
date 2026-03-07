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

Development helper that returns a [Block Kit Builder](https://app.slack.com/block-kit-builder) URL for the given blocks. Open it in a browser to preview layout and interactivity while working on a payload.

Because the payload is encoded into the URL fragment, very large payloads can produce impractically long URLs. Treat it as a debugging convenience, not a transport format.

```ts
import { renderToBlocks, blockKitBuilderUrl } from 'slackblock';

const blocks = renderToBlocks(<Section text={<Text>Hello</Text>} />);
console.log(blockKitBuilderUrl(blocks));
// → https://app.slack.com/block-kit-builder#{"blocks":[...]}
```

### `escapeMrkdwn(text)`

Escapes Slack mrkdwn special characters in a string. Use it when inserting untrusted user content into mrkdwn text. SlackBlock does not automatically escape every string for you.

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

SlackBlock validates the supported surface against required fields, documented limits, supported format checks, and a small number of structural rules.

| Mode | Behavior |
|---|---|
| `'warn'` (default) | Logs a warning and continues rendering |
| `'strict'` | Throws `SlackblockValidationError` |
| `'off'` | Skips validation entirely |

```tsx
const message = render(<Message>...</Message>, {validate: 'strict'});
```

`SlackblockValidationError` exposes a stable contract: `message`, `path`, `rule`, optional `subcode`, optional `component`, optional `field`, and the normalized `issue` object.

See [docs/validation.md](docs/validation.md) for mode guidance, the error contract, rule categories, and common failures.

---

## Security And Escaping

Slack `mrkdwn` is not plain text, and `<Text>` defaults to mrkdwn. SlackBlock does not automatically escape every string you pass into mrkdwn-capable content.

Use `escapeMrkdwn()` for untrusted or user-generated values:

```ts
const safe = escapeMrkdwn(userInput);
```

Use `plainText` when you want Slack `plain_text` semantics instead of mrkdwn formatting. See [docs/security.md](docs/security.md) for the full guidance.

---

## Known Differences From Slack

SlackBlock intentionally differs from raw Slack JSON in a few places:
- it supports an explicit subset of Block Kit rather than the entire Slack surface
- it uses JSX with `camelCase` props instead of raw `snake_case` JSON
- `<Text>` defaults to `mrkdwn`, so untrusted text must be escaped explicitly
- `validate: 'warn'` is the default; invalid input does not always throw
- `Message.color` uses a legacy attachment wrapper for colored sidebars

See [docs/known-differences.md](docs/known-differences.md) for the longer reference.

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
- [Security and escaping](docs/security.md) — handling untrusted text safely
- [Known differences](docs/known-differences.md) — behavior that differs from raw Slack JSON
- [Migrating from jsx-slack](docs/migrating-from-jsx-slack.md)
- [Migrating from slack-block-builder](docs/migrating-from-slack-block-builder.md)
- [Slack Block Kit reference](https://api.slack.com/block-kit)

---

## License

MIT
