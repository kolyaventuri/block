import {type Element} from '../../constants/types';
import {type Props as RichTextSectionProperties} from '../../components/rich-text/section';

import {toInlineElements} from './utils';

export type RichTextSectionType = {
  type: 'rich_text_section';
  elements: Array<Record<string, unknown>>;
};

const transformRichTextSection = (child: Element): RichTextSectionType => {
  const {children} = child.props as RichTextSectionProperties;

  return {
    type: 'rich_text_section',
    elements: toInlineElements(children),
  };
};

export default transformRichTextSection;
