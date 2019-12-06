import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/layout/image';
import Image from '../../../src/components/layout/image';
import Text from '../../../src/components/block/text';

test('transforms a basic image layout', t => {
  const res = transformer(
    <Image
      url="someUrl"
      alt="someAlt"
    />
  );

  t.deepEqual(res, {
    type: 'image',
    image_url: 'someUrl',
    alt_text: 'someAlt'
  });
});

test('transforms a more advanced image layout', t => {
  const res = transformer(
    <Image
      url="someUrl"
      alt="someAlt"
      title="someTitle"
      blockId="blockId"
    />
  );

  t.deepEqual(res, {
    type: 'image',
    image_url: 'someUrl',
    alt_text: 'someAlt',
    title: {
      type: 'plain_text',
      text: 'someTitle'
    },
    block_id: 'blockId'
  });
});
