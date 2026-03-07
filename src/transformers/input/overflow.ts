import {type Element} from '../../constants/types';
import {type Props as OverflowProperties} from '../../components/input/overflow';
import {type ConfirmationType} from '../block/confirmation';
import {transformElements, transformOptional} from '../transform';
import {warnIfTooLong, warnIfTooMany, requireField} from '../../utils/validation';
import {MAX_ACTION_ID_LENGTH, MAX_OVERFLOW_OPTIONS} from '../../constants/limits';

import {type OptionType} from './option';

export type OverflowType = {
  type: 'overflow';
  action_id: string;
  options: OptionType[];
  confirm?: ConfirmationType;
};

const transformOverflow = (child: Element): OverflowType => {
  const {actionId, children, confirm} = child.props as OverflowProperties;

  const elements = Array.isArray(children) ? children : [children];
  requireField('actionId', actionId);
  requireField('options', elements);
  warnIfTooLong('Overflow action_id', actionId, MAX_ACTION_ID_LENGTH);

  const res: OverflowType = {
    type: 'overflow',
    action_id: actionId,
    options: transformElements<OptionType>(elements as Element[]),
  };

  warnIfTooMany('Overflow options', res.options, MAX_OVERFLOW_OPTIONS);

  if (confirm) {
    const transformedConfirm = transformOptional<ConfirmationType>(confirm as Element);
    if (transformedConfirm) {
      res.confirm = transformedConfirm;
    }
  }

  return res;
};

export default transformOverflow;
