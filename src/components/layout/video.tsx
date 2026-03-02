
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

export default class Video {
  static slackType = 'Video';
  declare props: Props;
}
