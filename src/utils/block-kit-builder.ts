import {type Block} from '../constants/types';

/**
 * Returns a Slack Block Kit Builder URL for previewing the given blocks.
 * Open the URL in a browser to inspect layout and interactivity.
 */
export const blockKitBuilderUrl = (blocks: Block[]): string =>
  `https://app.slack.com/block-kit-builder#${JSON.stringify({blocks})}`;
