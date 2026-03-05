/**
 * /help — posts an ephemeral Block Kit message visible only to the invoker.
 *
 * Triggered by: the slash command "/help" (configure in Slack app manifest)
 */

import type {App} from '@slack/bolt';
import {renderToBlocks} from 'slackblock';
import {
  Header,
  Section,
  Text,
  Divider,
  RichText,
  RichTextSection,
  RichTextText,
  RichTextList,
} from 'slackblock/block';

export function registerEphemeralCommands(app: App) {
  app.command('/help', async ({command, ack, client}) => {
    await ack();

    const blocks = renderToBlocks(
      <>
        <Header text="Available commands" />
        <Section text={<Text>Only you can see this message.</Text>} />
        <Divider />
        <RichText>
          <RichTextList style="bullet">
            <RichTextSection>
              <RichTextText style={{bold: true}}>/deploy-status</RichTextText>
              <RichTextText> — post a deployment summary to this channel</RichTextText>
            </RichTextSection>
            <RichTextSection>
              <RichTextText style={{bold: true}}>/dm-me</RichTextText>
              <RichTextText> — receive a direct message from the bot</RichTextText>
            </RichTextSection>
            <RichTextSection>
              <RichTextText style={{bold: true}}>/help</RichTextText>
              <RichTextText> — show this message</RichTextText>
            </RichTextSection>
          </RichTextList>
        </RichText>
      </>,
    );

    await client.chat.postEphemeral({
      channel: command.channel_id,
      user: command.user_id,
      text: 'Available commands',
      blocks,
    });
  });
}
