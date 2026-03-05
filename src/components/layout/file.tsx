
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
export default class File {
  static slackType = 'File';
  declare props: Props;
}
