import {type Element} from '../../constants/types';
import {type Props as RadioGroupProperties} from '../../components/input/radio-group';
import {type ConfirmationType} from '../block/confirmation';
import {transform} from '../transform';
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
    options: elements.map(element => transform(element as Element)) as OptionType[],
  };

  warnIfTooMany('RadioGroup options', res.options, MAX_RADIO_OPTIONS);

  if (initialOption) {
    res.initial_option = transform(initialOption as Element) as OptionType;
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformRadioGroup;
