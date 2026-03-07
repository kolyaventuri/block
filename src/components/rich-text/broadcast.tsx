import {SlackComponent} from '../base';

import {type RichTextBroadcastRange} from './types';

export type Props = {
  range: RichTextBroadcastRange;
};

/**
 * A `@here`, `@channel`, or `@everyone` broadcast mention in rich text.
 *
 * @example
 * ```tsx
 * <RichTextBroadcast range="here" />
 * ```
 */
export default class RichTextBroadcast extends SlackComponent {
  static slackType = 'RichTextBroadcast';
  declare props: Props;
}
