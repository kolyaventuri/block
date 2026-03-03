import {type Element} from '../../constants/types';
import {type Props as RichTextQuoteProperties} from '../../components/rich-text/quote';

import {toInlineElements} from './utils';

type RichTextQuoteType = {
  type: 'rich_text_quote';
  elements: Array<Record<string, unknown>>;
};

const transformRichTextQuote = (child: Element): RichTextQuoteType => {
  const {children} = child.props as RichTextQuoteProperties;

  return {
    type: 'rich_text_quote',
    elements: toInlineElements(children),
  };
};

export default transformRichTextQuote;
