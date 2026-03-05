/**
 * Example: Slack modal view
 *
 * Modals accept a `blocks` array in their payload — use `renderToBlocks()` to
 * produce it directly without a `<Message>` wrapper, then pass the result to
 * `views.open` (or `views.push` / `views.update`).
 *
 * Run (after `pnpm build`):
 *   npx tsx examples/modal.tsx
 */

import {renderToBlocks} from 'slackblock';
import {
	Header,
	Section,
	Text,
	Input,
	TextInput,
	Select,
	Option,
	Divider,
} from 'slackblock/block';

const blocks = renderToBlocks(<>
	<Header text='Submit a request' />
	<Section text={<Text>Fill in the details below and click *Submit*.</Text>} />
	<Divider />
	<Input
		label='Request title'
		element={
			<TextInput
				actionId='title'
				placeholder='Short description of the request'
				maxLength={80}
			/>
		}
	/>
	<Input
		label='Priority'
		element={
			<Select placeholder='Select priority' actionId='priority'>
				<Option value='low'>Low</Option>
				<Option value='medium'>Medium</Option>
				<Option value='high'>High</Option>
			</Select>
		}
	/>
	<Input
		label='Details'
		optional
		element={
			<TextInput
				actionId='details'
				placeholder='Any additional context...'
				multiline
			/>
		}
	/>
</>);

// Assemble the modal payload for views.open / views.push / views.update.
const modal = {
	type: 'modal',
	callback_id: 'submit_request',
	title: {type: 'plain_text', text: 'Submit a request'},
	submit: {type: 'plain_text', text: 'Submit'},
	close: {type: 'plain_text', text: 'Cancel'},
	blocks,
};

console.log(JSON.stringify(modal, null, 2));
