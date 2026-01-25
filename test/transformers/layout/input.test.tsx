import React from 'react';
import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/layout/input';
import textTransformer from '../../../src/transformers/input/text';
import Input from '../../../src/components/layout/input';
import TextInput from '../../../src/components/input/text';

test('transforms a basic input layout block', () => {
  const plainText = <TextInput actionId="action"/>;
  const transformedText = textTransformer(plainText);

  const res = transformer(<Input
    label="someLabel"
    element={plainText}
  />);

  expect(res).toEqual({
    type: 'input',
    label: {
      type: 'plain_text',
      text: 'someLabel',
    },
    element: transformedText,
  });
});

test('transforms an advanced input layout block', () => {
  const plainText = <TextInput actionId="action"/>;
  const transformedText = textTransformer(plainText);

  const res = transformer(<Input
    optional
    label="someLabel"
    element={plainText}
    blockId="blockId"
    hint="someHint"
  />);

  expect(res).toEqual({
    type: 'input',
    label: {
      type: 'plain_text',
      text: 'someLabel',
    },
    element: transformedText,
    block_id: 'blockId',
    hint: {
      type: 'plain_text',
      text: 'someHint',
    },
    optional: true,
  });
});
