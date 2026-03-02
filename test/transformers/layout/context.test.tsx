import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/layout/context';
import textTransformer from '../../../src/transformers/block/text';
import imageTransformer from '../../../src/transformers/block/image';
import Context from '../../../src/components/layout/context';
import Text from '../../../src/components/block/text';
import Image from '../../../src/components/block/image';

test('transforms a basic context block', () => {
  const text = <Text>FooBar</Text>;
  const image = <Image url="someUrl" alt="someAlt"/>;

  const transformedText = textTransformer(text);
  const transformedImage = imageTransformer(image);

  const res = transformer(<Context>
    {text}
    {image}
  </Context>);

  expect(res).toEqual({
    type: 'context',
    elements: [
      transformedText,
      transformedImage,
    ],
  });
});

test('transforms a more complex context block', () => {
  const res = transformer(<Context blockId="blockId">
    <Text>FooBar</Text>
  </Context>);

  expect(res.block_id).toBe('blockId');
});
