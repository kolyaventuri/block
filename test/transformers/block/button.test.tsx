import test from 'ava';
import React from 'react';

import transformer from '../../../src/transformers/block/button';
import confirmTransformer from '../../../src/transformers/block/confirmation';
import Button from '../../../src/components/block/button';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

test('can transform a basic button', t => {
  const res = transformer(
    <Button actionId='actionId'>
      FooBar
    </Button>
  );

  t.deepEqual(res, {
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'FooBar'
    },
    actionId: 'actionId'
  });
});

test('can transform a more advanced button', t => {
  const confirm = (
    <Confirmation
      title='ConfirmTitle'
      confirm='Confirm'
      deny='Deny'
    >
      <Text>FooBar</Text>
    </Confirmation>
  );

  const transformedConfirm = confirmTransformer(confirm);
  const res = transformer(
    <Button
      actionId='actionId'
      url='someURL'
      value='someValue'
      style='danger'
      confirm={confirm}
    >
      FooBar
    </Button>
  );

  t.deepEqual(res, {
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'FooBar'
    },
    actionId: 'actionId',
    url: 'someURL',
    value: 'someValue',
    style: 'danger',
    confirm: transformedConfirm
  });
});
