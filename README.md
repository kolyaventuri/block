# SlackBlock
React-based Slack message renderer

[![CircleCI](https://circleci.com/gh/kolyaventuri/block/tree/master.svg?style=svg)](https://circleci.com/gh/kolyaventuri/block/tree/master)

## What
A message builder for Slack bots, using JSX / React syntax. Generally follows the [Block Kit](https://api.slack.com/block-kit) naming and options

## Getting started
Install the library with `npm i slackblock`

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
          "text": "plain_text",
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

## Things to note
- The outputted message only needs to have your `token` and desired `channel_id` added, and it will be ready to send to the slack API!
- There is current _very little to no_ input validation. Non-recognized blocks will be ignored, but Slack will be the ultimate decider if your message is valid. Validation is on the roadmap.
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


## TODO
- Add real documentation
- Expose types
- Add validation
