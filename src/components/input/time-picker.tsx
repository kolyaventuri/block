
export type Props = {
  actionId: string;
  placeholder?: string;
  initialTime?: string;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

export default class TimePicker {
  static slackType = 'TimePicker';
  declare props: Props;
}
