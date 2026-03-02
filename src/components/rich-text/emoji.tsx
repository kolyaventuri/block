
export type Props = {
  name: string;
};

export default class RichTextEmoji {
  static slackType = 'RichTextEmoji';
  declare props: Props;
}
