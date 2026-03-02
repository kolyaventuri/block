import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/input/overflow';
import optionTransformer from '../../../src/transformers/input/option';
import confirmTansformer from '../../../src/transformers/block/confirmation';
import Overflow from '../../../src/components/input/overflow';
import Option from '../../../src/components/input/option';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms a basic Overflow block', () => {
  const option = <Option value="V">O</Option>;
  const options = [optionTransformer(option)];

  const res = transformer(<Overflow actionId="aid">
    {option}
  </Overflow>);

  expect(res).toEqual({
    type: 'overflow',
    action_id: 'aid',
    options,
  });
});

test('transforms an Overflow block with a confirmation', () => {
  const option = <Option value="V">O</Option>;
  const options = [optionTransformer(option)];

  const confirmation = (
    <Confirmation
      title="cTitle"
      confirm="cConfirm"
      deny="cDeny"
    >
      <Text>Foo</Text>
    </Confirmation>
  );
  const transformedConfig = confirmTansformer(confirmation);

  const res = transformer(<Overflow actionId="aid" confirm={confirmation}>
    {option}
  </Overflow>);

  expect(res).toEqual({
    type: 'overflow',
    action_id: 'aid',
    options,
    confirm: transformedConfig,
  });
});
