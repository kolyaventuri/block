import {type Element} from '../../constants/types';
import {type Props as CheckboxesProperties} from '../../components/input/checkboxes';
import {type ConfirmationType} from '../block/confirmation';
import {transformElements, transformOptional} from '../transform';
import {warnIfTooLong, warnIfTooMany, requireField} from '../../utils/validation';
import {MAX_ACTION_ID_LENGTH, MAX_CHECKBOX_OPTIONS} from '../../constants/limits';

import {type OptionType} from './option';

export type CheckboxesType = {
  type: 'checkboxes';
  action_id: string;
  options: OptionType[];
  initial_options?: OptionType[];
  confirm?: ConfirmationType;
  focus_on_load?: boolean;
};

const transformCheckboxes = (child: Element): CheckboxesType => {
  const {actionId, children, initialOptions, confirm, focusOnLoad} = child.props as CheckboxesProperties;

  requireField('actionId', actionId);
  warnIfTooLong('Checkboxes action_id', actionId, MAX_ACTION_ID_LENGTH);

  const elements = Array.isArray(children) ? children : [children];
  requireField('options', elements);

  const res: CheckboxesType = {
    type: 'checkboxes',
    action_id: actionId,
    options: transformElements<OptionType>(elements as Element[]),
  };

  warnIfTooMany('Checkboxes options', res.options, MAX_CHECKBOX_OPTIONS);

  if (initialOptions && initialOptions.length > 0) {
    res.initial_options = transformElements<OptionType>(initialOptions as Element[]);
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

export default transformCheckboxes;
