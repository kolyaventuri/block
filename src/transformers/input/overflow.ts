import {type Element} from '../../constants/types';
import {type Props as OverflowProperties} from '../../components/input/overflow';
import {type ConfirmationType} from '../block/confirmation';
import {transform} from '..';
import {warnIfTooLong} from '../../utils/validation';

import {type OptionType} from './option';

export type OverflowType = {
  type: 'overflow';
  action_id: string;
  options: OptionType[];
  confirm?: ConfirmationType;
  focus_on_load?: boolean;
};

const transformOverflow = (child: Element): OverflowType => {
  const {actionId, children, confirm, focusOnLoad}: OverflowProperties = child.props;

  warnIfTooLong('Overflow action_id', actionId, 255);

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  const res: OverflowType = {
    type: 'overflow',
    action_id: actionId,
    options: elements.map(element => transform(element as Element)) as OptionType[],
  };

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformOverflow;
