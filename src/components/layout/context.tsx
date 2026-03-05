
export type ImageOrText = JSX.Element;

export type Props = {
  children: ImageOrText | ImageOrText[];
  blockId?: string;
};

/**
 * A context block — displays small text and images in a horizontal row.
 *
 * Accepts up to 10 `<Text>` or `<Image>` elements as children.
 *
 * @example
 * ```tsx
 * <Context>
 *   <Image url="https://example.com/avatar.png" alt="avatar" />
 *   <Text>Posted by *Jane Doe*</Text>
 * </Context>
 * ```
 */
export default class Context {
  static slackType = 'Context';
  declare props: Props;
}
