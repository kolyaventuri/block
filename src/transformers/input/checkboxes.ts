import {type Element} from '../../constants/types';
import {type Props as CheckboxesProperties} from '../../components/input/checkboxes';
import {type ConfirmationType} from '../block/confirmation';
import {transform} from '../transform';
import {warnIfTooLong} from '../../utils/validation';

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
  const {actionId, children, initialOptions, confirm, focusOnLoad}: CheckboxesProperties = child.props;

  warnIfTooLong('Checkboxes action_id', actionId, 255);

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  const res: CheckboxesType = {
    type: 'checkboxes',
    action_id: actionId,
    options: elements.map(element => transform(element as Element)) as OptionType[],
  };

  if (initialOptions && initialOptions.length > 0) {
    res.initial_options = initialOptions.map(option => transform(option as Element)) as OptionType[];
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformCheckboxes;
