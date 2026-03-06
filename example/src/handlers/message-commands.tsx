/**
 * /deploy-status — posts a rich Block Kit message to a channel.
 *
 * Triggered by: the slash command "/deploy-status" (configure in Slack app manifest)
 */

import type {App} from '@slack/bolt';
import render from 'slackblock';
import {
  Message,
  Header,
  Section,
  Text,
  Divider,
  Actions,
  Button,
  Context,
} from 'slackblock/block';

export function registerMessageCommands(app: App) {
  app.command('/deploy-status', async ({command, ack, client}) => {
    await ack();

    const message = render(
      <Message text="Deployment complete: my-service v1.4.2">
        <Header text="Deployment Complete" />
        <Section
          text={
            <Text verbatim={false}>
              {'*Service:* my-service\n*Version:* v1.4.2\n*Environment:* production'}
            </Text>
          }
        />
        <Divider />
        <Actions>
          <Button actionId="view_logs" url="https://example.com/logs">
            View logs
          </Button>
          <Button actionId="rollback" style="danger">
            Rollback
          </Button>
        </Actions>
        <Context>
          <Text>Deployed by @deploy-bot at 14:32 UTC</Text>
        </Context>
      </Message>,
      {channel: command.channel_id},
    );

    await client.chat.postMessage(message);
  });
}
