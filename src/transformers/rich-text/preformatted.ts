import {type Element} from '../../constants/types';
import {type Props as RichTextPreformattedProperties} from '../../components/rich-text/preformatted';

import {toInlineElements} from './utils';

export type RichTextPreformattedType = {
  type: 'rich_text_preformatted';
  elements: Array<Record<string, unknown>>;
};

const transformRichTextPreformatted = (child: Element): RichTextPreformattedType => {
  const {children} = child.props as RichTextPreformattedProperties;

  return {
    type: 'rich_text_preformatted',
    elements: toInlineElements(children),
  };
};

export default transformRichTextPreformatted;
