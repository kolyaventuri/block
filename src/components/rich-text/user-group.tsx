
export type Props = {
  usergroupId: string;
};

/**
 * Mentions a Slack user group by ID in rich text.
 *
 * @example
 * ```tsx
 * <RichTextUserGroup usergroupId="S123456" />
 * ```
 */
export default class RichTextUserGroup {
  static slackType = 'RichTextUserGroup';
  declare props: Props;
}
