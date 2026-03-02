
type TopProperties = {
  title: string;
  confirm: string;
  deny: string;
};

/* This is a dumb workaround to merging props */
export type ConfirmationProps = TopProperties & {
  children: JSX.Element;
};

type Properties = ConfirmationProps;

export default class Confirmation {
  static slackType = 'Confirmation';
  declare props: Properties;
}
