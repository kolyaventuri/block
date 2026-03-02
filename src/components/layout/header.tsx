
export type Props = {
  text: string;
  blockId?: string;
  emoji?: boolean;
};

export default class Header {
  static slackType = 'Header';
  declare props: Props;
}
