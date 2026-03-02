
import type Confirmation from './confirmation';

type TopProperties = {
  children: string;
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
  accessibilityLabel?: string;
};

export type ButtonProps = TopProperties & {
  confirm?: JSX.Element;
};

type Properties = ButtonProps;

export default class Button {
  static slackType = 'Button';
  declare props: Properties;
}
