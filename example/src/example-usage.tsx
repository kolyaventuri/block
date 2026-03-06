import render from "slackblock";
import { postMessage } from "./postMessage";
import { Message, Section, Header, Text } from "slackblock/block";
import {App} from '@slack/bolt';

export const app = new App({
  token: '',
  signingSecret: '',
});


const channel = 'C123';
const user = 'U123';
const text = 'Please specify an instance name';

/**
 * Example 1A: Simple ephemeral message (user presence implies ephemeral)
 */
await postMessage({
  channel,
  user,
  text,
});


/**
 * Example 1B: Rendered message via the postMessage wrapper.
 *
 * render() with no routing options returns BoltCompatiblePayload (no channel/user),
 * so they can be added by the caller without duplicate-key issues.
 */
const message = render(
  <Message text={text}/>
);
await postMessage({
  channel,
  user,
  ...message,
});


/**
 * Example 2: render() with channel option → SlackPostMessagePayload, no cast.
 */
const message2 = render(
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

app.client.chat.postMessage(message2);

/**
 * Example 3: channel + user → SlackPostEphemeralPayload, no cast.
 */
const message3 = render(
  <Message text="Hi there" />,
  {channel, user},
);

app.client.chat.postEphemeral(message3);
