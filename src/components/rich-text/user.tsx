
export type Props = {
  userId: string;
};

/**
 * Mentions a Slack user by ID in rich text (renders as `@username`).
 *
 * @example
 * ```tsx
 * <RichTextUser userId="U123456" />
 * ```
 */
export default class RichTextUser {
  static slackType = 'RichTextUser';
  declare props: Props;
}
