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

test('transforms an option with a description', () => {
  const res = transformer(<Option
    value="someValue"
    description="someDescription"
  >
    someText
  </Option>);

  expect(res).toEqual({
    text: {
      type: 'plain_text',
      text: 'someText',
    },
    value: 'someValue',
    description: {
      type: 'plain_text',
      text: 'someDescription',
    },
  });
});
