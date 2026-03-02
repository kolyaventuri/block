
import {type InputBlockElement} from '../../constants/types';

export type Props = {
  label: string;
  element: InputBlockElement;
  hint?: string;
  optional?: boolean;
  blockId?: string;
};

export default class Input {
  static slackType = 'Input';
  declare props: Props;
}
