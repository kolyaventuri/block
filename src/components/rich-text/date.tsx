
export type Props = {
  timestamp: number;
  format: string;
  fallback: string;
};

export default class RichTextDate {
  static slackType = 'RichTextDate';
  declare props: Props;
}
