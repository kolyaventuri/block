import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/layout/actions';
import buttonTransformer from '../../../src/transformers/block/button';
import Actions from '../../../src/components/layout/actions';
import Button from '../../../src/components/block/button';

test('transforms a basic actions block', t => {
  const button = <Button actionId="aid">FooBar</Button>;
  const transformedButton = buttonTransformer(button);

  const res = transformer(
    <Actions>
      {button}
    </Actions>
  );

  t.deepEqual(res, {
    type: 'actions',
    elements: [transformedButton]
  });
});

test('it transforms action blocks with more data', t => {
  const res = transformer(
    <Actions blockId="blockId">
      <Button actionId="aid">Foo</Button>
    </Actions>
  );

  t.is(res.block_id, 'blockId');
});
