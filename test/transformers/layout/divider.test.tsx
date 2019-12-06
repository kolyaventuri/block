import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/layout/divider';
import Divider from '../../../src/components/layout/divider';

test('transforms a basic divider', t => {
  const res = transformer(<Divider/>);

  t.deepEqual(res, {type: 'divider'});
});

test('transforms a divider with id', t => {
  const res = transformer(<Divider blockId="blockId"/>);

  t.deepEqual(res, {
    type: 'divider',
    block_id: 'blockId'
  });
});
