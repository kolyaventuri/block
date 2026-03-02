import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/rich-text/section';
import RichTextSection from '../../../src/components/rich-text/section';
import RichTextLink from '../../../src/components/rich-text/link';

test('transforms a rich_text_section with inline elements', () => {
  const res = transformer(<RichTextSection>
    Plain
    <RichTextLink url="https://example.com">Link</RichTextLink>
  </RichTextSection>);

  expect(res).toEqual({
    type: 'rich_text_section',
    elements: [
      {type: 'text', text: 'Plain'},
      {type: 'link', url: 'https://example.com', text: 'Link'},
    ],
  });
});
