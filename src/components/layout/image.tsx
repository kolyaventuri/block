
export type Props = {
  url: string;
  alt: string;
  title?: string;
  blockId?: string;
};

export default class Image {
  static slackType = 'ImageLayout';
  declare props: Props;
}
