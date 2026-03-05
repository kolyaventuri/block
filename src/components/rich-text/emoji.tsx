
export type Props = {
  name: string;
};

/**
 * Renders an emoji by name in rich text.
 *
 * @example
 * ```tsx
 * <RichTextEmoji name="wave" />
 * ```
 */
export default class RichTextEmoji {
  static slackType = 'RichTextEmoji';
  declare props: Props;
}
