
export type Props = {
  url: string;
  alt: string;
  title?: string;
  blockId?: string;
};

/**
 * An image layout block — displays a full-width image.
 *
 * Imported as `ImageLayout` to avoid ambiguity with the `<Image>` element.
 *
 * @example
 * ```tsx
 * import { ImageLayout } from 'slackblock/block';
 *
 * <ImageLayout
 *   url="https://example.com/chart.png"
 *   alt="Sales chart"
 *   title="Q4 Results"
 * />
 * ```
 */
export default class Image {
  static slackType = 'ImageLayout';
  declare props: Props;
}
