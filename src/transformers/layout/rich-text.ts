import {type Element} from '../../constants/types';
import {type Props as RichTextProperties} from '../../components/layout/rich-text';
import {toBlockElements} from '../rich-text/utils';

export type RichTextType = {
  type: 'rich_text';
  elements: Array<Record<string, unknown>>;
  block_id?: string;
};

const transformRichText = (child: Element): RichTextType => {
  const {elements, children, blockId}: RichTextProperties = child.props;

  const res: RichTextType = {
    type: 'rich_text',
    elements: elements ?? toBlockElements(children),
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformRichText;
