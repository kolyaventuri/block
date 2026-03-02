
export type Props = {
  blockId?: string;
};

export default class Divider {
  static slackType = 'Divider';
  declare props: Props;
}
