
import {type Element} from '../../constants/types';
import {type Props as HeaderProperties} from '../../components/layout/header';
import {type TextType} from '../block/text';
import {transform} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {MAX_HEADER_TEXT, MAX_BLOCK_ID_LENGTH} from '../../constants/limits';

export type HeaderType = {
  type: 'header';
  text: TextType;
  block_id?: string;
};

const transformHeader = (child: Element): HeaderType => {
  const {text, blockId, emoji} = child.props as HeaderProperties;

  requireField('text', text);
  warnIfTooLong('Header text', text, MAX_HEADER_TEXT);
  warnIfTooLong('block_id', blockId, MAX_BLOCK_ID_LENGTH);

  const res: HeaderType = {
    type: 'header',
    text: transform(<Text plainText emoji={emoji}>{text ?? ''}</Text>) as TextType,
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformHeader;
