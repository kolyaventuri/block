
export type Props = {
  actionId: string;
  placeholder?: string;
  initialDate?: string;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

export default class DatePicker {
  static slackType = 'DatePicker';
  declare props: Props;
}
