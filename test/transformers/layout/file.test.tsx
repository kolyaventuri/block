import React from 'react';
import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/layout/file';
import File from '../../../src/components/layout/file';

test('transforms a basic file', () => {
  const res = transformer(<File externalId="externalId"/>);

  expect(res).toEqual({
    type: 'file',
    source: 'remote',
    external_id: 'externalId',
  });
});

test('transforms a file with block id', () => {
  const res = transformer(<File externalId="ext" blockId="block"/>);

  expect(res).toEqual({
    type: 'file',
    source: 'remote',
    external_id: 'ext',
    block_id: 'block',
  });
});
