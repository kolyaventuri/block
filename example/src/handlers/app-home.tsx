/**
 * App Home tab — published whenever a user opens the app's Home tab.
 *
 * Uses renderToBlocks() + views.publish with type: 'home'.
 */

import type {App} from '@slack/bolt';
import {renderToBlocks} from 'slackblock';
import {
  Header,
  Section,
  Text,
  Divider,
  Actions,
  Button,
  RichText,
  RichTextSection,
  RichTextText,
  RichTextList,
} from 'slackblock/block';

export function registerAppHome(app: App) {
  app.event('app_home_opened', async ({event, client}) => {
    if (event.tab !== 'home') return;

    const blocks = renderToBlocks(
      <>
        <Header text="Welcome to My App" />
        <Section
          text={
            <Text>
              {"Hello! Here's what you can do from this home tab."}
            </Text>
          }
        />
        <Divider />
        <Section text={<Text verbatim={false}>*Quick actions*</Text>} />
        <Actions>
          <Button actionId="create_item" style="primary">
            Create item
          </Button>
          <Button actionId="view_report">View report</Button>
          <Button actionId="open_settings">Settings</Button>
        </Actions>
        <Divider />
        <Section text={<Text verbatim={false}>*Getting started*</Text>} />
        <RichText>
          <RichTextList style="bullet">
            <RichTextSection>
              <RichTextText>Use </RichTextText>
              <RichTextText style={{bold: true}}>Create item</RichTextText>
              <RichTextText> to add your first entry.</RichTextText>
            </RichTextSection>
            <RichTextSection>
              <RichTextText>Check </RichTextText>
              <RichTextText style={{bold: true}}>View report</RichTextText>
              <RichTextText> for a summary of recent activity.</RichTextText>
            </RichTextSection>
            <RichTextSection>
              <RichTextText>Visit </RichTextText>
              <RichTextText style={{bold: true}}>Settings</RichTextText>
              <RichTextText> to configure notifications.</RichTextText>
            </RichTextSection>
          </RichTextList>
        </RichText>
      </>,
    );

    await client.views.publish({
      user_id: event.user,
      view: {
        type: 'home',
        blocks,
      },
    });
  });

  // Handle action buttons from the home tab.
  app.action('create_item', async ({ack}) => ack());
  app.action('view_report', async ({ack}) => ack());
  app.action('open_settings', async ({ack}) => ack());
}
