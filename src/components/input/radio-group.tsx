
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  actionId: string;
  children: SingleOrArray<JSX.Element>;
  initialOption?: JSX.Element;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

export default class RadioGroup {
  static slackType = 'RadioGroup';
  declare props: Props;
}
