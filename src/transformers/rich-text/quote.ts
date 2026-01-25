import {type Element} from '../../constants/types';
import {type Props as RichTextQuoteProperties} from '../../components/rich-text/quote';

import {toInlineElements} from './utils';

export type RichTextQuoteType = {
  type: 'rich_text_quote';
  elements: Array<Record<string, unknown>>;
};

const transformRichTextQuote = (child: Element): RichTextQuoteType => {
  const {children}: RichTextQuoteProperties = child.props;

  return {
    type: 'rich_text_quote',
    elements: toInlineElements(children),
  };
};

export default transformRichTextQuote;
