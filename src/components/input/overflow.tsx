
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  actionId: string;
  children: SingleOrArray<JSX.Element>;
  confirm?: JSX.Element;
};

export default class Overflow {
  static slackType = 'Overflow';
  declare props: Props;
}
