
export type Props = {
  children: string;
  value: string;
  url?: string;
  description?: string;
};

export default class Option {
  static slackType = 'Option';
  declare props: Props;
}
