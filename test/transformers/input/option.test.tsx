import React from 'react';
import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/input/option';
import Option from '../../../src/components/input/option';

test('transforms a basic option', () => {
  const res = transformer(<Option value="someValue">someText</Option>);

  expect(res).toEqual({
    text: {
      type: 'plain_text',
      text: 'someText',
    },
    value: 'someValue',
  });
});

test('transforms an option with a url', () => {
  const res = transformer(<Option
    value="someValue"
    url="someUrl"
  >
    someText
  </Option>);
  expect(res).toEqual({
    text: {
      type: 'plain_text',
      text: 'someText',
    },
    value: 'someValue',
    url: 'someUrl',
  });
});
