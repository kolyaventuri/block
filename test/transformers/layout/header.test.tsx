import React from 'react';
import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/layout/header';
import Header from '../../../src/components/layout/header';

test('transforms a header block', () => {
  const res = transformer(<Header text="Hello"/>);

  expect(res).toEqual({
    type: 'header',
    text: {
      type: 'plain_text',
      text: 'Hello',
    },
  });
});

test('transforms header block_id and emoji', () => {
  const res = transformer(<Header text="Hello" blockId="b" emoji/>);

  expect(res).toEqual({
    type: 'header',
    block_id: 'b',
    text: {
      type: 'plain_text',
      text: 'Hello',
      emoji: true,
    },
  });
});
