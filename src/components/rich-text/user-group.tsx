
export type Props = {
  usergroupId: string;
};

export default class RichTextUserGroup {
  static slackType = 'RichTextUserGroup';
  declare props: Props;
}
