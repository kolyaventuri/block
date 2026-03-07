import {SlackComponent} from '../base';

export type Props = {
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  altText: string;
  titleUrl?: string;
  description?: string;
  authorName?: string;
  providerName?: string;
  providerIconUrl?: string;
  blockId?: string;
};

/**
 * A video block — embeds an external video with a thumbnail, title, and metadata.
 *
 * @example
 * ```tsx
 * <Video
 *   title="Product Demo"
 *   videoUrl="https://example.com/demo.mp4"
 *   thumbnailUrl="https://example.com/thumb.png"
 *   altText="Product demo video"
 *   authorName="Product Team"
 * />
 * ```
 */
export default class Video extends SlackComponent {
  static slackType = 'Video';
  declare props: Props;
}
