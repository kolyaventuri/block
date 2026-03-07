import {type Block} from '../constants/types';

/**
 * Development helper that returns a Slack Block Kit Builder URL for previewing
 * the given blocks. The full payload is encoded into the URL fragment, so very
 * large payloads can produce impractically long URLs.
 */
export const blockKitBuilderUrl = (blocks: Block[]): string =>
  `https://app.slack.com/block-kit-builder#${JSON.stringify({blocks})}`;
