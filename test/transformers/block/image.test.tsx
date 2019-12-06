import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/block/image';
import Image from '../../../src/components/block/image';

test('transforms an image block', t => {
  const res = transformer(
    <Image
      url="someUrl"
      alt="someAlt"
    />
  );

  t.deepEqual(res, {
    type: 'image',
    url: 'someUrl',
    alt: 'someAlt'
  });
});
