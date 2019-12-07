import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/input/option-group';
import optionTransformer from '../../../src/transformers/input/option';
import Option from '../../../src/components/input/option';
import OptionGroup from '../../../src/components/input/option-group';

test('transforms an OptionGroup', t => {
  const option = <Option value="val">SomeOption</Option>;
  const transformedOption = optionTransformer(option);

  const res = transformer(
    <OptionGroup label="someLabel">
      {option}
    </OptionGroup>
  );

  t.deepEqual(res, {
    label: {
      type: 'plain_text',
      text: 'someLabel'
    },
    options: [transformedOption]
  });
});
