
export type Props = {
  label: string;
  children: JSX.Element | JSX.Element[];
};

export default class OptionGroup {
  static slackType = 'OptionGroup';
  declare props: Props;
}
