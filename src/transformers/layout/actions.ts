import {type Element, type SerializedInteractiveBlockElement, type InteractiveBlockElement} from '../../constants/types';
import {type Props as ActionProperties} from '../../components/layout/actions';
import {transform} from '..';

type ActionType = {
  type: 'actions';
  elements: SerializedInteractiveBlockElement[];
  block_id?: string;
};

const transformActions = (child: Element): ActionType => {
  const {children, blockId}: ActionProperties = child.props;

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements] as InteractiveBlockElement[];
  }

  const res: ActionType = {
    type: 'actions',
    elements: elements.map(element => transform(element as Element) as SerializedInteractiveBlockElement),
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformActions;
