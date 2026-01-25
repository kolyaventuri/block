import React from 'react';
import {expect, test} from 'vitest';

import parser from '../../src/parser';
import Image from '../../src/components/block/image';
import ImageLayout from '../../src/components/layout/image';

test('routes ImageLayout separately from Image', () => {
  const blockImage = <Image url="blockUrl" alt="blockAlt"/>;
  const layoutImage = <ImageLayout url="layoutUrl" alt="layoutAlt"/>;

  const res = parser([blockImage, layoutImage]);

  expect(res).toEqual({
    blocks: [
      {
        type: 'image',
        image_url: 'blockUrl',
        alt_text: 'blockAlt',
      },
      {
        type: 'image',
        image_url: 'layoutUrl',
        alt_text: 'layoutAlt',
      },
    ],
  });
});
