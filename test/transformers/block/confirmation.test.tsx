import test from 'ava';
import React from 'react';

import transformer from '../../../src/transformers/block/confirmation';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms properly', t => {
  const res = transformer(
    <Confirmation
      title='SomeTitle'
      confirm='SomeConfirm'
      deny='SomeDeny'
    >
      <Text>FooBar</Text>
    </Confirmation>
  );

  t.deepEqual(res, {
    title: {
      type: 'plain_text',
      text: 'SomeTitle'
    },
    text: {
      type: 'mrkdwn',
      text: 'FooBar'
    },
    confirm: {
      type: 'plain_text',
      text: 'SomeConfirm'
    },
    deny: {
      type: 'plain_text',
      text: 'SomeDeny'
    }
  });
});
