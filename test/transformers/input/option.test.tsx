import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/input/option';
import Option from '../../../src/components/input/option';

test('transforms a basic option', t => {
  const res = transformer(<Option value="someValue">someText</Option>);

  t.deepEqual(res, {
    text: {
      type: 'plain_text',
      text: 'someText'
    },
    value: 'someValue'
  });
});

test('transforms an option with a url', t => {
  const res = transformer(
    <Option
      value="someValue"
      url="someUrl"
    >
      someText
    </Option>
   );
   t.deepEqual(res, {
    text: {
      type: 'plain_text',
      text: 'someText'
    },
    value: 'someValue',
    url: 'someUrl'
  });
});
