import {type Element} from '../../constants/types';
import {type Props as RadioGroupProperties} from '../../components/input/radio-group';
import {type ConfirmationType} from '../block/confirmation';
import {transformElements, transformOptional} from '../transform';
import {warnIfTooLong, warnIfTooMany, requireField} from '../../utils/validation';
import {MAX_ACTION_ID_LENGTH, MAX_RADIO_OPTIONS} from '../../constants/limits';

import {type OptionType} from './option';

export type RadioGroupType = {
  type: 'radio_buttons';
  action_id: string;
  options: OptionType[];
  initial_option?: OptionType;
  confirm?: ConfirmationType;
  focus_on_load?: boolean;
};

const transformRadioGroup = (child: Element): RadioGroupType => {
  const {actionId, children, initialOption, confirm, focusOnLoad} = child.props as RadioGroupProperties;

  requireField('actionId', actionId);
  warnIfTooLong('RadioGroup action_id', actionId, MAX_ACTION_ID_LENGTH);

  const elements = Array.isArray(children) ? children : [children];
  requireField('options', elements);

  const res: RadioGroupType = {
    type: 'radio_buttons',
    action_id: actionId,
    options: transformElements<OptionType>(elements as Element[]),
  };

  warnIfTooMany('RadioGroup options', res.options, MAX_RADIO_OPTIONS);

  if (initialOption) {
    const transformedOption = transformOptional<OptionType>(initialOption as Element);
    if (transformedOption) {
      res.initial_option = transformedOption;
    }
  }

  if (confirm) {
    const transformedConfirm = transformOptional<ConfirmationType>(confirm as Element);
    if (transformedConfirm) {
      res.confirm = transformedConfirm;
    }
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformRadioGroup;
