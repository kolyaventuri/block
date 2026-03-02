
export type Props = {
  url: string;
  alt: string;
};

export default class Image {
  static slackType = 'Image';
  declare props: Props;
}
