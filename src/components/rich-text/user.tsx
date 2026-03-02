
export type Props = {
  userId: string;
};

export default class RichTextUser {
  static slackType = 'RichTextUser';
  declare props: Props;
}
