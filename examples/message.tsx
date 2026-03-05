/**
 * Example: Slack chat message
 *
 * Demonstrates `render()` / `renderToMessage()` with a `<Message>` wrapper.
 * The result is a plain object ready to spread into `chat.postMessage`.
 *
 * Run (after `pnpm build`):
 *   npx tsx examples/message.tsx
 */

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

const message = render(<Message text='Deployment complete: my-service v1.4.2 — see details below.'>
	<Header text='Deployment Complete' />
	<Section
		text={
			<Text verbatim={false}>
				{'*Service:* my-service\n*Version:* v1.4.2\n*Environment:* production'}
			</Text>
		}
	/>
	<Divider />
	<Actions>
		<Button actionId='view_logs' url='https://example.com/logs'>
			View logs
		</Button>
		<Button actionId='rollback' style='danger'>
			Rollback
		</Button>
	</Actions>
	<Context>
		<Text>Deployed by @deploy-bot at 14:32 UTC</Text>
	</Context>
</Message>);

console.log(JSON.stringify(message, null, 2));
