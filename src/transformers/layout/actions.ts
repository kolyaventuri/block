import {type Element, type SerializedInteractiveBlockElement, type InteractiveBlockElement} from '../../constants/types';
import {type Props as ActionProperties} from '../../components/layout/actions';
import {transform} from '../transform';
import {warnIfTooLong, warnIfTooMany} from '../../utils/validation';
import {MAX_BLOCK_ID_LENGTH, MAX_ACTIONS_ELEMENTS} from '../../constants/limits';

export type ActionType = {
  type: 'actions';
  elements: SerializedInteractiveBlockElement[];
  block_id?: string;
};

const transformActions = (child: Element): ActionType => {
  const {children, blockId} = child.props as ActionProperties;

  warnIfTooLong('block_id', blockId, MAX_BLOCK_ID_LENGTH);

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

  warnIfTooMany('Actions elements', res.elements, MAX_ACTIONS_ELEMENTS);

  return res;
};

export default transformActions;
