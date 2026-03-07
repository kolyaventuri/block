# Known Differences From Slack

SlackBlock intentionally does not behave like a raw JSON schema wrapper.

## Supported scope is explicit

SlackBlock models a documented subset of Block Kit. New Slack features are not automatically available.

Use these docs as the source of truth:
- [support-matrix.md](./support-matrix.md)
- [roadmap.md](./roadmap.md)

## JSX API instead of raw JSON

Slack uses `snake_case` JSON fields. SlackBlock uses JSX components with `camelCase` props.

Examples:
- `action_id` becomes `actionId`
- `block_id` becomes `blockId`
- arrays such as section fields or select options are often expressed as JSX children

## Text behavior is explicit

`<Text>` defaults to Slack `mrkdwn`, not plain text.

That means:
- formatting is preserved by default
- untrusted content should be escaped with `escapeMrkdwn()`
- use `plainText` when you want Slack `plain_text`

## Validation is configurable

SlackBlock does not always throw on invalid input.

Behavior depends on `validate` mode:
- `'warn'` is the default
- `'strict'` throws `SlackblockValidationError`
- `'off'` skips validation entirely

## Unsupported children are skipped outside strict mode

If SlackBlock encounters a JSX child it does not support:
- `'warn'` logs a warning and continues
- `'off'` skips it silently
- `'strict'` throws

## `<Section>` supports a JSX-oriented API

Slack `section` blocks allow text, fields, or both. SlackBlock mirrors that but exposes a JSX-friendly shape:
- `text` can be a string or `<Text>`
- `fields` can be passed explicitly
- field children are also supported for convenience
- `expand` is supported directly on the component

## `Message.color` uses legacy attachments

SlackBlock supports a convenience `color` prop on `<Message>`. This is not a native Block Kit field.

When used, SlackBlock wraps the rendered blocks in a legacy attachment so Slack can display the colored left border.

## `blockKitBuilderUrl()` is only a preview helper

`blockKitBuilderUrl()` builds a Block Kit Builder URL by encoding your payload into the URL fragment.

That means:
- it is useful for local debugging and documentation
- very large payloads can produce impractically long URLs
- it should not be treated as a production transport or storage format
