
import type Confirmation from '../block/confirmation';
import {type SingleOrArray} from '../../utils/type-helpers';

import type Option from './option';

export type Props = {
  actionId: string;
  children: SingleOrArray<JSX.Element>;
  initialOptions?: JSX.Element[];
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

export default class Checkboxes {
  static slackType = 'Checkboxes';
  declare props: Props;
}
