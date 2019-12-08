import {Element} from '../../constants/types';
import {Props as OverflowProps} from '../../components/input/overflow';
import {ConfirmationType} from '../block/confirmation';
import {OptionType} from './option';
import {transform} from '..';

export type OverflowType = {
  type: 'overflow';
  action_id: string;
  options: OptionType[];
  confirm?: ConfirmationType;
};

export default (child: Element): OverflowType => {
  const {actionId, children, confirm}: OverflowProps = child.props;

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  const res: OverflowType = {
    type: 'overflow',
    action_id: actionId,
    options: elements.map(element => transform(element as Element)) as OptionType[]
  };

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  return res;
};
