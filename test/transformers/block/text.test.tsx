import React from 'react';
import test from 'ava';
import Text from '../../../src/components/block/text';
import transform from '../../../src/transformers/block/text';

test('transforms text block', t => {
  const result = transform(<Text>Foo</Text>);

  t.deepEqual(result, {
    type: 'mrkdwn',
    text: 'Foo'
  });
});

test('transforms with optional parameters if supplied', t => {
  const result = transform(
    <Text
      plainText
      emoji
      verbatim
    >
      FooBar
    </Text>
  );

  t.deepEqual(result, {
    type: 'plain_text',
    text: 'FooBar',
    emoji: true,
    verbatim: true
  });
});
