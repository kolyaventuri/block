# SlackBlock
JSX-based Slack message renderer

[![CI](https://github.com/kolyaventuri/block/actions/workflows/ci.yml/badge.svg)](https://github.com/kolyaventuri/block/actions/workflows/ci.yml)

## What
A message builder for Slack bots, using JSX with a React-compatible API. Generally follows the [Block Kit](https://api.slack.com/block-kit) naming and options.

## Getting started
Install the library with your package manager, for example `pnpm add slackblock`.

- Import the renderer with `import render from 'slackblock';`
- Import the top level `Message` block, along with any blocks you need from `import { Message, Section, Text, ... } from 'slackblock/block';`
- Build your message!
```jsx
/* example */

const text = <Text plainText>Hello</Text>;

const message = render(
  <Message>
    <Section text={text}>
      <Text>Some *message* for _Slack_.</Text>
    </Section>
  </Message>
);

console.log(message);
/*
  {
    "blocks": [
      {
        "type": "section",
        "text": {
          "type": "plain_text",
          "text": "Hello"
        },
        "fields": [
          {
            "type": "mrkdwn",
            "text": "Some *message* for _Slack_."
          }
        ]
      }
    ]
  }
*/
```

There is a `<Container/>` component, which allows for conditional rendering by passing through the children as though it didn't exist.
```jsx
const elem = (
  <Container>
    <Text>Test</Text>
  </Container>
);

const shouldDoThing = ...;

const message = render(
  <Message>
    {shouldDoThing && elem}
  </Message>
);
```

## Things to note
- The outputted message only needs to have your `token` and desired `channel_id` added, and it will be ready to send to the slack API!
- React is a peer dependency and used only as a JSX runtime (no DOM renderer required).
- There is limited input validation (for example, date/time formats and select constraints). Warnings are emitted for common Slack limits (IDs, text lengths, block counts). Non-recognized blocks will be ignored, but Slack will be the ultimate decider if your message is valid. Validation is on the roadmap.
- There is currently almost no documentation. This will be resolved, but in general...
  - If a Slack message wants a property in format `foo_bar`, you will add it as a `fooBar` property in your message(ex: `<Element fooBar='blah'/>`)
  - If a component such as a `<Section/>` wants fields which seem like children, they probably are for the sake of rendering. This is especially important with `select` menus, as your `<Option/>` tags will be passed as children
    - ex:
     ```jsx
       <Select ...>
         <Option value="val">text</Option>
         <Option value="val2">text2</Option>
       </Select>
     ``` 

## Supported blocks and elements
Blocks: `Message` (top-level), `Section`, `Actions`, `Context`, `Divider`, `File`, `Image` (block), `Header`, `Input`, `RichText`, `Video`.

Elements: `Text`, `Image` (element), `Button`, `Confirmation`, `Select`, `Option`, `OptionGroup`, `Overflow`, `RadioGroup`, `Checkboxes`, `DatePicker`, `TimePicker`, `DateTimePicker`, `TextInput`.

Rich text helpers: `RichTextSection`, `RichTextList`, `RichTextQuote`, `RichTextPreformatted`, `RichTextText`, `RichTextLink`, `RichTextUser`, `RichTextChannel`, `RichTextEmoji`, `RichTextDate`, `RichTextBroadcast`, `RichTextUserGroup`.

Field support highlights: `select` filters/min query length, `option` description, `focusOnLoad` for inputs, `dispatchActionConfig` for text inputs, and `accessibilityLabel` on buttons.


## TODO
- Add real documentation
- Add validation
- Add richer rich_text validation
