import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/layout/divider';
import Divider from '../../../src/components/layout/divider';

test('transforms a basic divider', () => {
  const res = transformer(<Divider/>);

  expect(res).toEqual({type: 'divider'});
});

test('transforms a divider with id', () => {
  const res = transformer(<Divider blockId="blockId"/>);

  expect(res).toEqual({
    type: 'divider',
    block_id: 'blockId',
  });
});
