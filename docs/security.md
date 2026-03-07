# Security And Escaping

Slack `mrkdwn` is not plain text. Characters like `*`, `_`, `` ` ``, `~`, `<`, and `>` have formatting or parsing meaning inside Slack text objects.

SlackBlock preserves that behavior by default. It does not automatically escape every string you pass into mrkdwn-capable fields.

## When to escape

Escape untrusted or user-generated content before putting it into mrkdwn text.

Examples of content that should usually be escaped:
- user names or freeform comments inserted into `<Text>`
- ticket titles, issue names, or commit messages from external systems
- any string you did not author and do not want Slack formatting to interpret

Use `escapeMrkdwn()`:

```ts
import {escapeMrkdwn} from 'slackblock';

const safe = escapeMrkdwn(userInput);
```

## Where escaping matters

These cases usually need escaping when the content is untrusted:
- `<Text>{userInput}</Text>` because `<Text>` defaults to `mrkdwn`
- `Section` content that resolves to mrkdwn text
- any composed string that intentionally uses mrkdwn for the surrounding template but interpolates untrusted values

Example:

```tsx
import render, {escapeMrkdwn} from 'slackblock';
import {Message, Section, Text} from 'slackblock/block';

const actor = escapeMrkdwn(user.displayName);
const comment = escapeMrkdwn(user.comment);

render(
  <Message text="New comment">
    <Section text={<Text>{`${actor} said: ${comment}`}</Text>}/>
  </Message>,
);
```

## When escaping is usually unnecessary

`plain_text` fields do not use mrkdwn formatting rules. In SlackBlock, that means content such as:
- `<Text plainText>{value}</Text>`
- placeholders
- input labels and hints
- button labels
- confirmation titles, confirm labels, and deny labels
- header text

Those fields still have their own Slack limits, but mrkdwn escaping is not the main concern there.

## Important limitation

SlackBlock does not try to guess which strings are safe. That is your application's job.

This is intentional:
- sometimes you want real mrkdwn formatting
- sometimes you want literal user content
- automatic escaping would make the formatted case incorrect

If you mix trusted formatting with untrusted values, escape only the untrusted parts.

Bad:

```tsx
<Text>{`*${userInput}*`}</Text>
```

Better:

```tsx
<Text>{`*${escapeMrkdwn(userInput)}*`}</Text>
```

## Related helpers

`escapeMrkdwn()` is a text-safety helper.

`blockKitBuilderUrl()` is a development helper. It is useful for previewing payloads, but it is not a security boundary and should not be treated as an API transport mechanism.

For broader package behavior differences, see [known-differences.md](./known-differences.md).
