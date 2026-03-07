# Component Reference

All components are imported from `slackblock/block`:

```ts
import {
  Message, Section, Header, Actions, Context,
  // ...
} from 'slackblock/block';
```

---

## Layout blocks

These are the top-level building blocks of a Slack message or modal.

---

### `<Message>`

The required root element for `render()` / `renderToMessage()`. Represents a Slack chat message.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `JSX.Element \| JSX.Element[]` | Yes | Block elements to include in the message |
| `text` | `string` | — | Fallback text shown in notifications and when blocks cannot render |
| `color` | `string` | — | Hex color (e.g. `"#36a64f"`) or named color. Wraps blocks in a legacy attachment for a colored left border |
| `username` | `string` | — | Override the bot's display name |
| `iconEmoji` | `string` | — | Override the bot's icon with an emoji (e.g. `":robot_face:"`) |
| `iconUrl` | `string` | — | Override the bot's icon with an image URL |
| `asUser` | `boolean` | — | Post as the authenticated user instead of the bot |
| `markdown` | `boolean` | — | Set `mrkdwn` field. Defaults to Slack's own default (`true`) |
| `parse` | `'full' \| 'none'` | — | Text parsing mode |
| `replyTo` | `string` | — | Thread timestamp (`thread_ts`) to reply to |
| `replyBroadcast` | `boolean` | — | Also send the reply to the channel |
| `unfurlLinks` | `boolean` | — | Unfurl links in the message |
| `unfurlMedia` | `boolean` | — | Unfurl media (images, videos) in the message |

```tsx
<Message text="Fallback" color="#36a64f" username="Deploy Bot" iconEmoji=":rocket:">
  <Header text="Deploy complete" />
</Message>
```

---

### `<Section>`

A section block. Supports primary text, optional fields, and an optional accessory element.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `JSX.Element` | Conditionally | Primary text — typically a `<Text>` element. Required when no field children are present |
| `blockId` | `string` | — | Unique identifier for the block |
| `children` | `<Text> \| <Text>[]` | — | Fields displayed in a two-column grid below the text |
| `accessory` | block element | — | An interactive element displayed to the right |

```tsx
<Section
  text={<Text>Hello *Block Kit*.</Text>}
  accessory={<Button actionId="more">More</Button>}
>
  <Text plainText>Field A</Text>
  <Text plainText>Field B</Text>
</Section>
```

Runtime validation also accepts fields-only sections. The current TypeScript prop type still requires `text`, so this pattern needs a cast until the `Section` API is widened:

```tsx
<Section text={undefined as never}>
  <Text plainText>Status</Text>
  <Text>Ready</Text>
</Section>
```

---

### `<Header>`

A header block displaying large, bold text.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `text` | `string` | Yes | Plain text content (max 150 characters) |
| `blockId` | `string` | — | Unique identifier for the block |
| `emoji` | `boolean` | — | Allow emoji in the header text |

```tsx
<Header text="Welcome to the team!" emoji />
```

---

### `<Actions>`

An actions block containing interactive elements displayed in a row.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | interactive element(s) | Yes | `<Button>`, `<Select>`, `<Overflow>`, `<DatePicker>`, `<TimePicker>`, `<DateTimePicker>` |
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<Actions>
  <Button actionId="approve" style="primary">Approve</Button>
  <Button actionId="deny" style="danger">Deny</Button>
</Actions>
```

---

### `<Context>`

A context block displaying a row of small text and images.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `<Text>` or `<Image>` element(s) | Yes | Up to 10 text or image elements |
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<Context>
  <Image url="https://example.com/avatar.png" alt="avatar" />
  <Text>Posted by *Jane Doe*</Text>
</Context>
```

---

### `<Divider>`

A horizontal rule that visually separates blocks.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<Divider />
```

---

### `<Input>`

A block that wraps a single interactive input element with a label.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Input label text (max 2000 characters) |
| `element` | input element | Yes | The input element: `<TextInput>`, `<Select>`, `<DatePicker>`, etc. |
| `hint` | `string` | — | Hint text shown below the input |
| `optional` | `boolean` | — | Mark the field as optional |
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<Input
  label="Your name"
  element={<TextInput actionId="name" placeholder="Jane Doe" />}
/>
```

---

### `<Image>` (layout block)

An image block that displays a full-width image.

> Import as `ImageLayout` to disambiguate from the `<Image>` element.

```ts
import { ImageLayout } from 'slackblock/block';
```

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | URL of the image |
| `alt` | `string` | Yes | Alt text for accessibility |
| `title` | `string` | — | Title displayed above the image |
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<ImageLayout
  url="https://example.com/chart.png"
  alt="Sales chart"
  title="Q4 Results"
/>
```

---

### `<File>`

A file block that embeds a remote file shared in Slack.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `externalId` | `string` | Yes | The external ID of the remote file |
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<File externalId="my-file-id" />
```

---

### `<Video>`

A video block that embeds an external video.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Video title (max 200 characters) |
| `videoUrl` | `string` | Yes | URL of the video |
| `thumbnailUrl` | `string` | Yes | URL of the thumbnail image |
| `altText` | `string` | Yes | Alt text for the thumbnail |
| `titleUrl` | `string` | — | URL the title links to |
| `description` | `string` | — | Description text (max 200 characters) |
| `authorName` | `string` | — | Author name (max 50 characters) |
| `providerName` | `string` | — | Video provider name (e.g. `"YouTube"`) |
| `providerIconUrl` | `string` | — | URL of the provider icon |
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<Video
  title="Product Demo"
  videoUrl="https://example.com/demo.mp4"
  thumbnailUrl="https://example.com/thumb.png"
  altText="Product demo video"
  authorName="Product Team"
/>
```

---

### `<RichText>`

A rich text block for rendering formatted text with inline styling, lists, quotes, and code.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | rich text element(s) | Yes | `<RichTextSection>`, `<RichTextList>`, `<RichTextQuote>`, `<RichTextPreformatted>` |
| `blockId` | `string` | — | Unique identifier for the block |

```tsx
<RichText>
  <RichTextSection>
    <RichTextText style={{ bold: true }}>Hello</RichTextText>
  </RichTextSection>
</RichText>
```

---

### `<Container>`

A utility component that renders its children as-is without adding any wrapper block. Useful for conditional rendering and for mapping arrays of elements without introducing an extra layer.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | JSX element(s) | Yes | Any block elements |

```tsx
<Message text="Hello">
  {isAdmin && (
    <Container>
      <Section text={<Text>Admin section</Text>} />
      <Divider />
    </Container>
  )}
</Message>
```

---

## Block elements

Elements used as props or inside other blocks (not standalone blocks).

---

### `<Text>`

Renders a mrkdwn or plain_text text object. Used as the `text` prop on `<Section>`, in `<Context>`, and other places.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `string` | Yes | The text content |
| `plainText` | `boolean` | — | Use `plain_text` type instead of `mrkdwn` |
| `emoji` | `boolean` | — | Render emoji in plain text mode |
| `verbatim` | `boolean` | — | Disable automatic link detection in mrkdwn |

```tsx
<Text>Hello *world*</Text>
<Text plainText emoji>Hello :wave:</Text>
```

---

### `<Image>` (element)

An image element used inside `<Context>` or as a `<Section>` accessory.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | URL of the image |
| `alt` | `string` | Yes | Alt text for accessibility |

```tsx
<Context>
  <Image url="https://example.com/icon.png" alt="icon" />
  <Text>Some context</Text>
</Context>
```

---

### `<Button>`

A button element.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `string` | Yes | Button label (max 75 characters) |
| `actionId` | `string` | Yes | Unique identifier for the action |
| `value` | `string` | — | Value sent with the action payload |
| `url` | `string` | — | URL to open when the button is clicked (max 3000 characters) |
| `style` | `'primary' \| 'danger'` | — | Button style |
| `accessibilityLabel` | `string` | — | Screen reader label (max 75 characters) |
| `confirm` | `<Confirmation>` | — | Confirmation dialog before triggering the action |

```tsx
<Button actionId="submit" style="primary" value="yes">Submit</Button>
<Button actionId="delete" style="danger" confirm={<Confirmation ...>}>Delete</Confirmation>
```

---

### `<Confirmation>`

A confirmation dialog attached to interactive elements.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `title` | `string` | Yes | Dialog title (max 100 characters) |
| `confirm` | `string` | Yes | Text of the confirm button (max 30 characters) |
| `deny` | `string` | Yes | Text of the cancel button (max 30 characters) |
| `children` | `<Text>` | Yes | Body text of the dialog |

```tsx
const confirmDialog = (
  <Confirmation title="Are you sure?" confirm="Yes, delete" deny="Cancel">
    <Text plainText>This action cannot be undone.</Text>
  </Confirmation>
);

<Button actionId="delete" confirm={confirmDialog}>Delete</Button>
```

---

## Input elements

Interactive form controls, used as the `element` prop inside `<Input>` or as children of `<Actions>`.

---

### `<TextInput>`

A plain text input field.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `actionId` | `string` | Yes | Unique identifier for the action |
| `placeholder` | `string` | — | Placeholder text |
| `initial` | `string` | — | Initial value |
| `multiline` | `boolean` | — | Show as a textarea |
| `minLength` | `number` | — | Minimum character count |
| `maxLength` | `number` | — | Maximum character count (max 3000) |
| `focusOnLoad` | `boolean` | — | Auto-focus this input when the view loads |
| `dispatchActionConfig` | `{ triggerActionsOn: Array<'on_enter_pressed' \| 'on_character_entered'> }` | — | When to dispatch block actions |

```tsx
<Input
  label="Your message"
  element={
    <TextInput
      actionId="msg"
      placeholder="Type here..."
      multiline
      maxLength={500}
    />
  }
/>
```

---

### `<Select>`

A dropdown select menu. Supports static, external, user, conversation, and channel list types, as well as multi-select.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `placeholder` | `string` | Yes | Placeholder text |
| `actionId` | `string` | Yes | Unique identifier for the action |
| `type` | `'static' \| 'external' \| 'user' \| 'conversation' \| 'channel'` | — | Data source (default: `'static'`) |
| `multi` | `boolean` | — | Allow multiple selections |
| `children` | `<Option> \| <OptionGroup>` | Conditionally | Required for `static` selects. Use either options or option groups, not both |
| `initialOptions` | `<Option>[]` | — | Pre-selected options |
| `initialUsers` | `string[]` | — | Pre-selected user IDs (for `user` type) |
| `initialConversations` | `string[]` | — | Pre-selected conversation IDs |
| `initialChannels` | `string[]` | — | Pre-selected channel IDs |
| `maxSelectedItems` | `number` | — | Maximum selections (multi only) |
| `minQueryLength` | `number` | — | Minimum query length (external type) |
| `confirm` | `<Confirmation>` | — | Confirmation dialog |
| `focusOnLoad` | `boolean` | — | Auto-focus on view load |
| `defaultToCurrentConversation` | `boolean` | — | Pre-select the current conversation |
| `responseUrlEnabled` | `boolean` | — | Include response URL in the payload |
| `filter` | `ConversationFilter` | — | Filter conversation list |

```tsx
// Static single-select
<Select placeholder="Pick one" actionId="color">
  <Option value="red">Red</Option>
  <Option value="blue">Blue</Option>
</Select>

// User multi-select
<Select type="user" multi placeholder="Pick users" actionId="mentions" />
```

Static select limits:
- `options`: up to 100
- `option_groups`: up to 100
- `placeholder`: max 150 characters
- `actionId`: max 255 characters

---

### `<Option>`

An option item for `<Select>`, `<Checkboxes>`, `<RadioGroup>`, or `<Overflow>`.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `string` | Yes | Display label |
| `value` | `string` | Yes | Value sent in the action payload |
| `description` | `string` | — | Secondary text shown below the label |
| `url` | `string` | — | URL to open (overflow menus only) |

```tsx
<Option value="opt_a" description="The first option">Option A</Option>
```

---

### `<OptionGroup>`

Groups options under a label in a static `<Select>`.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `label` | `string` | Yes | Group label |
| `children` | `<Option> \| <Option>[]` | Yes | Options in the group |

```tsx
<Select placeholder="Pick one" actionId="grouped">
  <OptionGroup label="Fruits">
    <Option value="apple">Apple</Option>
    <Option value="banana">Banana</Option>
  </OptionGroup>
  <OptionGroup label="Vegetables">
    <Option value="carrot">Carrot</Option>
  </OptionGroup>
</Select>
```

---

### `<Checkboxes>`

A group of checkboxes.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `actionId` | `string` | Yes | Unique identifier for the action |
| `children` | `<Option> \| <Option>[]` | Yes | Checkbox options (up to 10) |
| `initialOptions` | `<Option>[]` | — | Pre-checked options |
| `confirm` | `<Confirmation>` | — | Confirmation dialog |
| `focusOnLoad` | `boolean` | — | Auto-focus on view load |

```tsx
<Checkboxes actionId="prefs" initialOptions={[optionA]}>
  <Option value="a">Option A</Option>
  <Option value="b">Option B</Option>
</Checkboxes>
```

---

### `<RadioGroup>`

A group of radio buttons (single selection).

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `actionId` | `string` | Yes | Unique identifier for the action |
| `children` | `<Option> \| <Option>[]` | Yes | Radio options (up to 10) |
| `initialOption` | `<Option>` | — | Pre-selected option |
| `confirm` | `<Confirmation>` | — | Confirmation dialog |
| `focusOnLoad` | `boolean` | — | Auto-focus on view load |

```tsx
<RadioGroup actionId="size" initialOption={<Option value="m">Medium</Option>}>
  <Option value="s">Small</Option>
  <Option value="m">Medium</Option>
  <Option value="l">Large</Option>
</RadioGroup>
```

---

### `<Overflow>`

An overflow menu (the "..." button) with a list of options.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `actionId` | `string` | Yes | Unique identifier for the action |
| `children` | `<Option> \| <Option>[]` | Yes | Menu options (up to 5) |
| `confirm` | `<Confirmation>` | — | Confirmation dialog |

```tsx
<Overflow actionId="more">
  <Option value="edit">Edit</Option>
  <Option value="delete">Delete</Option>
  <Option value="docs" url="https://example.com/docs">View docs</Option>
</Overflow>
```

---

### `<DatePicker>`

A date picker input.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `actionId` | `string` | Yes | Unique identifier for the action |
| `placeholder` | `string` | — | Placeholder text |
| `initialDate` | `string` | — | Initial date in `YYYY-MM-DD` format |
| `confirm` | `<Confirmation>` | — | Confirmation dialog |
| `focusOnLoad` | `boolean` | — | Auto-focus on view load |

```tsx
<DatePicker actionId="due_date" initialDate="2024-12-31" placeholder="Select a date" />
```

---

### `<TimePicker>`

A time picker input.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `actionId` | `string` | Yes | Unique identifier for the action |
| `placeholder` | `string` | — | Placeholder text |
| `initialTime` | `string` | — | Initial time in `HH:mm` (24-hour) format |
| `confirm` | `<Confirmation>` | — | Confirmation dialog |
| `focusOnLoad` | `boolean` | — | Auto-focus on view load |

```tsx
<TimePicker actionId="meeting_time" initialTime="09:00" />
```

---

### `<DateTimePicker>`

A combined date and time picker.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `actionId` | `string` | Yes | Unique identifier for the action |
| `initialDateTime` | `number` | — | Initial Unix timestamp |
| `confirm` | `<Confirmation>` | — | Confirmation dialog |
| `focusOnLoad` | `boolean` | — | Auto-focus on view load |

```tsx
<DateTimePicker actionId="scheduled_at" initialDateTime={1700000000} />
```

---

## Rich text elements

Used inside `<RichText>` to compose formatted text content.

---

### `<RichTextSection>`

An inline container for rich text elements within a `<RichText>` block.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | rich text element(s) or string(s) | Yes | Inline rich text content |

```tsx
<RichTextSection>
  <RichTextText style={{ bold: true }}>Hello</RichTextText>
  {' '}
  <RichTextText>world</RichTextText>
</RichTextSection>
```

---

### `<RichTextText>`

Styled text within a rich text section.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `string` | Yes | The text content |
| `style` | `{ bold?: boolean; italic?: boolean; strike?: boolean; code?: boolean }` | — | Text style |

```tsx
<RichTextText style={{ bold: true, italic: true }}>Bold italic</RichTextText>
```

---

### `<RichTextLink>`

A hyperlink within rich text.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `url` | `string` | Yes | Link URL |
| `children` | `string` | — | Link text (shows URL if omitted) |
| `style` | `{ bold?: boolean; italic?: boolean; strike?: boolean; code?: boolean }` | — | Text style |

```tsx
<RichTextLink url="https://example.com" style={{ bold: true }}>Visit us</RichTextLink>
```

---

### `<RichTextList>`

A bulleted or numbered list.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `style` | `'bullet' \| 'ordered'` | Yes | List style |
| `children` | `<RichTextSection>[]` | Yes | List items — each item should be a `<RichTextSection>` |
| `indent` | `number` | — | Indent level (0–6) |
| `border` | `number` | — | Border style |

```tsx
<RichTextList style="bullet">
  <RichTextSection><RichTextText>First item</RichTextText></RichTextSection>
  <RichTextSection><RichTextText>Second item</RichTextText></RichTextSection>
</RichTextList>
```

---

### `<RichTextQuote>`

A blockquote within rich text.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | rich text element(s) or string(s) | Yes | Quoted content |

```tsx
<RichTextQuote>
  <RichTextText>This is a quoted passage.</RichTextText>
</RichTextQuote>
```

---

### `<RichTextPreformatted>`

A preformatted code block within rich text.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | rich text element(s) or string(s) | Yes | Preformatted content |

```tsx
<RichTextPreformatted>
  <RichTextText style={{ code: true }}>const x = 1;</RichTextText>
</RichTextPreformatted>
```

---

### `<RichTextUser>`

Mentions a Slack user by ID.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `userId` | `string` | Yes | Slack user ID (e.g. `"U123456"`) |

```tsx
<RichTextUser userId="U123456" />
```

---

### `<RichTextChannel>`

Mentions a Slack channel by ID.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `channelId` | `string` | Yes | Slack channel ID (e.g. `"C123456"`) |

```tsx
<RichTextChannel channelId="C123456" />
```

---

### `<RichTextUserGroup>`

Mentions a Slack user group by ID.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `usergroupId` | `string` | Yes | Slack user group ID (e.g. `"S123456"`) |

```tsx
<RichTextUserGroup usergroupId="S123456" />
```

---

### `<RichTextEmoji>`

Renders an emoji by name.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `name` | `string` | Yes | Emoji name without colons (e.g. `"wave"`) |

```tsx
<RichTextEmoji name="wave" />
```

---

### `<RichTextBroadcast>`

A `@here`, `@channel`, or `@everyone` mention.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `range` | `'here' \| 'channel' \| 'everyone'` | Yes | Broadcast range |

```tsx
<RichTextBroadcast range="here" />
```

---

### `<RichTextDate>`

Renders a formatted date that adapts to the viewer's timezone.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `timestamp` | `number` | Yes | Unix timestamp |
| `format` | `string` | Yes | [Slack date format string](https://api.slack.com/reference/surfaces/formatting#date-formatting) (e.g. `"{date_num} {time}"`) |
| `fallback` | `string` | Yes | Text shown if the timestamp cannot be rendered |

```tsx
<RichTextDate
  timestamp={1700000000}
  format="{date_long} at {time}"
  fallback="Nov 14, 2023 at 22:13"
/>
```
