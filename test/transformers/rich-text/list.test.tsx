import React from 'react';
import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/rich-text/list';
import RichTextList from '../../../src/components/rich-text/list';
import RichTextSection from '../../../src/components/rich-text/section';
import RichTextText from '../../../src/components/rich-text/text';

test('transforms a rich_text_list', () => {
  const res = transformer(<RichTextList style="bullet" indent={1}>
    <RichTextSection>
      <RichTextText>One</RichTextText>
    </RichTextSection>
    Two
  </RichTextList>);

  expect(res).toEqual({
    type: 'rich_text_list',
    style: 'bullet',
    indent: 1,
    elements: [
      {
        type: 'rich_text_section',
        elements: [
          {type: 'text', text: 'One'},
        ],
      },
      {
        type: 'rich_text_section',
        elements: [
          {type: 'text', text: 'Two'},
        ],
      },
    ],
  });
});
