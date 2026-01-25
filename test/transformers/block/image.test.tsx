import React from 'react';
import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/block/image';
import Image from '../../../src/components/block/image';

test('transforms an image block', () => {
  const res = transformer(<Image
    url="someUrl"
    alt="someAlt"
  />);

  expect(res).toEqual({
    type: 'image',
    url: 'someUrl',
    alt: 'someAlt',
  });
});
