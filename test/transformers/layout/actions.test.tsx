import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/layout/actions';
import buttonTransformer from '../../../src/transformers/block/button';
import Actions from '../../../src/components/layout/actions';
import Button from '../../../src/components/block/button';

test('transforms a basic actions block', () => {
  const button = <Button actionId="aid">FooBar</Button>;
  const transformedButton = buttonTransformer(button);

  const res = transformer(<Actions>
    {button}
  </Actions>);

  expect(res).toEqual({
    type: 'actions',
    elements: [transformedButton],
  });
});

test('it transforms action blocks with more data', () => {
  const res = transformer(<Actions blockId="blockId">
    <Button actionId="aid">Foo</Button>
  </Actions>);

  expect(res.block_id).toBe('blockId');
});
