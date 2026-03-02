
export type Props = {
  children: string;
  plainText?: boolean;
  emoji?: boolean;
  verbatim?: boolean;
};

export default class Text {
  static slackType = 'Text';
  declare props: Props;
}
