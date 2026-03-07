# Support Matrix

SlackBlock supports a focused subset of Slack Block Kit. This document is the source of truth for what is currently modeled in the public API.

Status meanings:
- `Supported`: first-class component or helper exists and is documented
- `Partially supported`: some supported behavior exists, but not the full Slack surface
- `Planned`: not implemented yet, but a reasonable future fit for the package
- `Not supported`: currently outside the implemented scope

## Blocks

| Slack feature | Status | Notes |
|---|---|---|
| `actions` block | Supported | `<Actions>` |
| `context` block | Supported | `<Context>` |
| `divider` block | Supported | `<Divider>` |
| `file` block | Supported | `<File>` for remote files |
| `header` block | Supported | `<Header>` |
| `image` block | Supported | `<ImageLayout>` |
| `input` block | Supported | `<Input>` |
| `rich_text` block | Supported | `<RichText>` and rich-text helper components |
| `section` block | Supported | Supports `text`, `fields`, `text + fields`, and `expand` |
| `video` block | Supported | `<Video>` |
| `markdown` block | Planned | Not implemented yet |
| `table` block | Planned | Not implemented yet |
| `context_actions` block | Planned | Modern AI/feedback block, not implemented yet |
| `plan` block | Not supported | AI/task-specific block, not modeled today |
| `task_card` block | Not supported | AI/task-specific block, not modeled today |

## Block Elements

| Slack feature | Status | Notes |
|---|---|---|
| `button` element | Supported | `<Button>` |
| `checkboxes` element | Supported | `<Checkboxes>` |
| `datepicker` element | Supported | `<DatePicker>` |
| `datetimepicker` element | Supported | `<DateTimePicker>` |
| `image` element | Supported | `<Image>` |
| `overflow` element | Supported | `<Overflow>` |
| `plain_text_input` element | Supported | `<TextInput>` |
| `radio_buttons` element | Supported | `<RadioGroup>` |
| `static_select` / `multi_static_select` | Supported | `<Select>` with default `type="static"` |
| `external_select` / `multi_external_select` | Supported | `<Select type="external">` |
| `users_select` / `multi_users_select` | Supported | `<Select type="user">` |
| `conversations_select` / `multi_conversations_select` | Supported | `<Select type="conversation">` |
| `channels_select` / `multi_channels_select` | Supported | `<Select type="channel">` |
| `workflow_button` element | Planned | No API yet |
| `icon_button` element | Planned | No API yet |
| `feedback_buttons` element | Planned | No API yet |
| `file_input` element | Planned | No API yet |
| `number_input` element | Planned | No API yet |
| `email_text_input` element | Planned | No API yet |
| `url_text_input` element | Planned | No API yet |
| `rich_text_input` element | Planned | No API yet |

## Composition Objects

| Slack feature | Status | Notes |
|---|---|---|
| Text object | Supported | `<Text>` and rich-text helpers |
| Confirmation dialog object | Supported | `<Confirmation>` |
| Option object | Supported | `<Option>` |
| Option group object | Supported | `<OptionGroup>` |
| Conversation filter object | Partially supported | Supported through `Select.filter`, not as a standalone helper |
| Dispatch action configuration object | Partially supported | Supported on `<TextInput>` only |
| Slack file object | Not supported | Image blocks/elements do not support `slack_file` yet |
| Trigger object | Planned | Would arrive with workflow button support |
| Workflow object | Planned | Would arrive with workflow button support |

## Rich Text Helpers

| Slack feature | Status | Notes |
|---|---|---|
| `rich_text_section` | Supported | `<RichTextSection>` |
| `rich_text_list` | Supported | `<RichTextList>` |
| `rich_text_quote` | Supported | `<RichTextQuote>` |
| `rich_text_preformatted` | Supported | `<RichTextPreformatted>` |
| text run | Supported | `<RichTextText>` |
| link | Supported | `<RichTextLink>` |
| user mention | Supported | `<RichTextUser>` |
| channel mention | Supported | `<RichTextChannel>` |
| user group mention | Supported | `<RichTextUserGroup>` |
| emoji | Supported | `<RichTextEmoji>` |
| date token | Supported | `<RichTextDate>` |
| broadcast mention | Supported | `<RichTextBroadcast>` |

## Helpers and Runtime

| Feature | Status | Notes |
|---|---|---|
| `<Message>` wrapper | Supported | Root message component |
| `<Container>` helper | Supported | Non-Slack helper for conditional composition |
| `render()` | Supported | Full message payload renderer |
| `renderToMessage()` | Supported | Named alias of `render()` |
| `renderToBlocks()` | Supported | Block-array renderer for modals/home tabs |
| Validation modes | Supported | `off`, `warn`, `strict` |
| `SlackblockValidationError` | Supported | Stable rule categories with optional subcodes |
| `escapeMrkdwn()` | Supported | Escapes untrusted mrkdwn input |
| `blockKitBuilderUrl()` | Supported | Builder preview URL generator |
| JSX runtime | Supported | `jsx-runtime` / `jsx-dev-runtime` exports |
| Legacy attachment color wrapper | Supported | `Message.color` wraps blocks in an attachment |

## Notes

- New Slack features are not automatically supported just because they exist in Block Kit.
- If a feature is not marked `Supported`, treat it as unavailable until the matrix changes.
- The component reference documents the supported API shape; this matrix defines the supported Slack surface.
