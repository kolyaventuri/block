/**
 * Example: Slack App Home tab
 *
 * The App Home surface accepts a `blocks` array — use `renderToBlocks()` and
 * pass the result to `views.publish` with `type: 'home'`.
 *
 * Run (after `pnpm build`):
 *   npx tsx examples/home-tab.tsx
 */

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

const blocks = renderToBlocks(<>
	<Header text='Welcome to My App' />
	<Section
		text={
			<Text>
				{'Hello! Here\'s what you can do from this home tab.'}
			</Text>
		}
	/>
	<Divider />
	<Section text={<Text verbatim={false}>*Quick actions*</Text>} />
	<Actions>
		<Button actionId='create_item' style='primary'>
			Create item
		</Button>
		<Button actionId='view_report'>View report</Button>
		<Button actionId='open_settings'>Settings</Button>
	</Actions>
	<Divider />
	<Section text={<Text verbatim={false}>*Getting started*</Text>} />
	<RichText>
		<RichTextList style='bullet'>
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
</>);

// Assemble the home tab payload for views.publish.
const homeTab = {
	type: 'home',
	blocks,
};

console.log(JSON.stringify(homeTab, null, 2));
