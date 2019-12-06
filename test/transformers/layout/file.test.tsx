import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/layout/file';
import File from '../../../src/components/layout/file';

test('transforms a basic file', t => {
  const res = transformer(<File externalId="externalId"/>);

  t.deepEqual(res, {
    type: 'file',
    source: 'remote',
    external_id: 'externalId'
  });
});

test('transforms a file with block id', t => {
  const res = transformer(<File externalId="ext" blockId="block"/>);

  t.deepEqual(res, {
    type: 'file',
    source: 'remote',
    external_id: 'ext',
    block_id: 'block'
  });
});
