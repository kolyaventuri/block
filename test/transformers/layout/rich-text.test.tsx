import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/layout/rich-text';
import RichText, {type RichTextElement} from '../../../src/components/layout/rich-text';
import RichTextSection from '../../../src/components/rich-text/section';
import RichTextText from '../../../src/components/rich-text/text';

test('transforms a rich_text block', () => {
  const elements: RichTextElement[] = [
    {type: 'rich_text_section', elements: [{type: 'text', text: 'Hi'}]},
  ];

  const res = transformer(<RichText elements={elements}/>);

  expect(res).toEqual({
    type: 'rich_text',
    elements,
  });
});

test('transforms rich_text block_id', () => {
  const elements: RichTextElement[] = [{type: 'rich_text_section', elements: []}];

  const res = transformer(<RichText elements={elements} blockId="blockId"/>);

  expect(res).toEqual({
    type: 'rich_text',
    elements,
    block_id: 'blockId',
  });
});

test('transforms rich_text children', () => {
  const res = transformer(<RichText>
    <RichTextSection>
      <RichTextText>Hi</RichTextText>
    </RichTextSection>
  </RichText>);

  expect(res).toEqual({
    type: 'rich_text',
    elements: [
      {
        type: 'rich_text_section',
        elements: [
          {type: 'text', text: 'Hi'},
        ],
      },
    ],
  });
});
