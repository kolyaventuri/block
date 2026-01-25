import {type Element} from '../../constants/types';
import {type Props as RichTextProperties, type RichTextElement} from '../../components/layout/rich-text';

export type RichTextType = {
  type: 'rich_text';
  elements: RichTextElement[];
  block_id?: string;
};

const transformRichText = (child: Element): RichTextType => {
  const {elements, blockId}: RichTextProperties = child.props;

  const res: RichTextType = {
    type: 'rich_text',
    elements,
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformRichText;
