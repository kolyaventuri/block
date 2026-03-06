import render from "slackblock";
import { Message, Section, Header, Text } from "slackblock/block";
import {App} from '@slack/bolt';

export const app = new App({
  token: '',
  signingSecret: '',
});


const channel = 'C123';
const user = 'U123';

/**
 * Example 1: render() with channel option → SlackPostMessagePayload, no cast.
 */
const message1 = render(
  <Message>
    <Header text="Your summary" />
    <Section
      text={
        <Text verbatim={false}>
          {'Here\'s a quick overview of your recent activity.'}
        </Text>
      }
    />
  </Message>,
  {channel},
);

app.client.chat.postMessage(message1);

/**
 * Example 2: channel + user → SlackPostEphemeralPayload, no cast.
 */
const message2 = render(
  <Message text="Hi there" />,
  {channel, user},
);

app.client.chat.postEphemeral(message2);

/**
 * Example 3: Mixed usage
 */
const message3 = render(<Message text="Hi there!" />);
app.client.chat.postMessage({
  channel,
  ...message3,
});
