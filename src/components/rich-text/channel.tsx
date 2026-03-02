
export type Props = {
  channelId: string;
};

export default class RichTextChannel {
  static slackType = 'RichTextChannel';
  declare props: Props;
}
