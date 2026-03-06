/**
 * /dm-me — opens a DM channel with the invoker and posts a Block Kit message.
 *
 * Triggered by: the slash command "/dm-me" (configure in Slack app manifest)
 */

import type {App} from '@slack/bolt';
import type {ChatPostMessageArguments} from '@slack/web-api';
import render from 'slackblock';
import {
  Message,
  Header,
  Section,
  Text,
  Actions,
  Button,
} from 'slackblock/block';

export function registerDmCommands(app: App) {
  app.command('/dm-me', async ({command, ack, client}) => {
    await ack();

    // Open (or reuse) a DM conversation with the user.
    const {channel} = await client.conversations.open({
      users: command.user_id,
    });

    if (!channel?.id) {
      return;
    }

    const message = render(
      <Message text="Hey! Here's your personal summary.">
        <Header text="Your summary" />
        <Section
          text={
            <Text verbatim={false}>
              {'Here\'s a quick overview of your recent activity.'}
            </Text>
          }
        />
        <Actions>
          <Button actionId="view_profile" style="primary">
            View profile
          </Button>
          <Button actionId="dismiss">
            Dismiss
          </Button>
        </Actions>
      </Message>,
    );

    await client.chat.postMessage({channel: channel.id, ...message} as unknown as ChatPostMessageArguments);
  });

  // Handle the "Dismiss" button from the DM message.
  app.action('dismiss', async ({ack, respond}) => {
    await ack();
    await respond({delete_original: true});
  });
}
