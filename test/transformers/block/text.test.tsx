import {test, expect} from 'vitest';

import Text from '../../../src/components/block/text';
import transform from '../../../src/transformers/block/text';

test('transforms text block', () => {
  const result = transform(<Text>Foo</Text>);

  expect(result).toEqual({
    type: 'mrkdwn',
    text: 'Foo',
  });
});

test('transforms with optional parameters if supplied', () => {
  const result = transform(<Text
    plainText
    emoji
    verbatim
  >
    FooBar
  </Text>);

  expect(result).toEqual({
    type: 'plain_text',
    text: 'FooBar',
    emoji: true,
    verbatim: true,
  });
});
