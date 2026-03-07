
import {type Element, type SerializedInputBlockElement} from '../../constants/types';
import {type TextType} from '../block/text';
import {type Props as InputProperties} from '../../components/layout/input';
import {transform, transformOptional} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {MAX_BLOCK_ID_LENGTH, MAX_INPUT_HINT, MAX_INPUT_LABEL} from '../../constants/limits';

export type InputType = {
  type: 'input';
  label: TextType;
  element: SerializedInputBlockElement;
  hint?: TextType;
  optional?: boolean;
  block_id?: string;
};

const transformInput = (child: Element): InputType => {
  const {label, element, hint, optional, blockId} = child.props as InputProperties;
  const resolvedElement: SerializedInputBlockElement = element
    ? transformOptional<SerializedInputBlockElement>(element as Element) ?? {type: 'plain_text_input', action_id: ''}
    : {type: 'plain_text_input', action_id: ''};

  requireField('label', label);
  requireField('element', element);
  warnIfTooLong('Input label', label, MAX_INPUT_LABEL);
  warnIfTooLong('Input hint', hint, MAX_INPUT_HINT);
  warnIfTooLong('block_id', blockId, MAX_BLOCK_ID_LENGTH);

  const res: InputType = {
    type: 'input',
    label: transform(<Text plainText>{label ?? ''}</Text>) as TextType,
    element: resolvedElement,
  };

  if (hint) {
    res.hint = transform(<Text plainText>{hint}</Text>) as TextType;
  }

  if (optional) {
    res.optional = true;
  }

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformInput;
