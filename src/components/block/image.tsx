import {SlackComponent} from '../base';

export type Props = {
  url: string;
  alt: string;
};

/**
 * An image element — displays an inline image inside `<Context>` or as a
 * `<Section>` accessory.
 *
 * For a full-width image block, use `<ImageLayout>` instead.
 *
 * @example
 * ```tsx
 * <Context>
 *   <Image url="https://example.com/icon.png" alt="icon" />
 *   <Text>Some context</Text>
 * </Context>
 * ```
 */
export default class Image extends SlackComponent {
  static slackType = 'Image';
  declare props: Props;
}
