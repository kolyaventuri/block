
export type Props = {
  externalId: string;
  blockId?: string;
};

export default class File {
  static slackType = 'File';
  declare props: Props;
}
