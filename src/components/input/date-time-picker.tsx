
export type Props = {
  actionId: string;
  initialDateTime?: number;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

export default class DateTimePicker {
  static slackType = 'DateTimePicker';
  declare props: Props;
}
