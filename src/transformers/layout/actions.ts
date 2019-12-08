import {Element, SerializedInteractiveBlockElement, InteractiveBlockElement} from '../../constants/types';
import {Props as ActionProps} from '../../components/layout/actions';
import {transform} from '..';

type ActionType = {
  type: 'actions';
  elements: SerializedInteractiveBlockElement[];
  block_id?: string;
};

export default (child: Element): ActionType => {
  const {children, blockId}: ActionProps = child.props;

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements] as InteractiveBlockElement[];
  }

  const res: ActionType = {
    type: 'actions',
    elements: elements.map(element => transform(element as Element) as SerializedInteractiveBlockElement)
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};
