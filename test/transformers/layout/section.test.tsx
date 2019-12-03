import React from 'react';
import test from 'ava';
import Section from '../../../src/components/layout/section';
import Text from '../../../src/components/block/text';
import transformer from '../../../src/transformers/layout/section';

test('it transforms a basic Section component', t => {
  const elem = (
    <Section
      text={ <Text>FooBar</Text> }
    />
  );

  const res = transformer(elem);

  t.deepEqual(res, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'FooBar'
    }
  });
});
