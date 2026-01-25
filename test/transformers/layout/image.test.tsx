import React from 'react';
import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/layout/image';
import Image from '../../../src/components/layout/image';
import Text from '../../../src/components/block/text';

test('transforms a basic image layout', () => {
  const res = transformer(<Image
    url="someUrl"
    alt="someAlt"
  />);

  expect(res).toEqual({
    type: 'image',
    image_url: 'someUrl',
    alt_text: 'someAlt',
  });
});

test('transforms a more advanced image layout', () => {
  const res = transformer(<Image
    url="someUrl"
    alt="someAlt"
    title="someTitle"
    blockId="blockId"
  />);

  expect(res).toEqual({
    type: 'image',
    image_url: 'someUrl',
    alt_text: 'someAlt',
    title: {
      type: 'plain_text',
      text: 'someTitle',
    },
    block_id: 'blockId',
  });
});
