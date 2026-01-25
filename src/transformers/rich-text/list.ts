import {type Element} from '../../constants/types';
import {type Props as RichTextListProperties} from '../../components/rich-text/list';
import {type RichTextListStyle} from '../../components/rich-text/types';

import {toBlockElements} from './utils';

export type RichTextListType = {
  type: 'rich_text_list';
  style: RichTextListStyle;
  elements: Array<Record<string, unknown>>;
  indent?: number;
  border?: number;
};

const transformRichTextList = (child: Element): RichTextListType => {
  const {style, children, indent, border}: RichTextListProperties = child.props;

  const res: RichTextListType = {
    type: 'rich_text_list',
    style,
    elements: toBlockElements(children),
  };

  if (indent !== undefined) {
    res.indent = indent;
  }

  if (border !== undefined) {
    res.border = border;
  }

  return res;
};

export default transformRichTextList;
