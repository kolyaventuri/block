import {SlackComponent} from '../base';

export type Props = {
  externalId: string;
  blockId?: string;
};

/**
 * A file block — embeds a remote file that has been shared in Slack.
 *
 * @example
 * ```tsx
 * <File externalId="my-report-id" />
 * ```
 */
export default class File extends SlackComponent {
  static slackType = 'File';
  declare props: Props;
}
