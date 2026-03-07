import {type Element} from '../../constants/types';
import {type Props as RichTextProperties} from '../../components/layout/rich-text';
import {toBlockElements} from '../rich-text/utils';
import {warnIfTooLong, requireField} from '../../utils/validation';

export type RichTextType = {
  type: 'rich_text';
  elements: Array<Record<string, unknown>>;
  block_id?: string;
};

const transformRichText = (child: Element): RichTextType => {
  const {elements, children, blockId} = child.props as RichTextProperties;
  const richTextElements = elements ?? toBlockElements(children);

  warnIfTooLong('block_id', blockId, 255);
  requireField('elements', richTextElements);

  const res: RichTextType = {
    type: 'rich_text',
    elements: richTextElements,
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformRichText;
