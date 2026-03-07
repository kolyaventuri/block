import {SlackComponent} from '../base';

export type Props = {
  channelId: string;
};

/**
 * Mentions a Slack channel by ID in rich text (renders as `#channel-name`).
 *
 * @example
 * ```tsx
 * <RichTextChannel channelId="C123456" />
 * ```
 */
export default class RichTextChannel extends SlackComponent {
  static slackType = 'RichTextChannel';
  declare props: Props;
}
