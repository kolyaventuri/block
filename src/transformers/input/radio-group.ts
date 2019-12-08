import {Element} from '../../constants/types';
import {Props as RadioGroupProps} from '../../components/input/radio-group';
import {ConfirmationType} from '../block/confirmation';
import {OptionType} from './option';
import {transform} from '..';

export type RadioGroupType = {
  type: 'radio_buttons';
  action_id: string;
  options: OptionType[];
  initial_option?: OptionType;
  confirm?: ConfirmationType;
};

export default (child: Element): RadioGroupType => {
  const {actionId, children, initialOption, confirm}: RadioGroupProps = child.props;

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  const res: RadioGroupType = {
    type: 'radio_buttons',
    action_id: actionId,
    options: elements.map(element => transform(element as Element)) as OptionType[]
  };

  if (initialOption) {
    res.initial_option = transform(initialOption as Element) as OptionType;
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  return res;
};
