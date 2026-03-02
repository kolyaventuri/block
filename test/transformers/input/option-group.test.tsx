import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/input/option-group';
import optionTransformer from '../../../src/transformers/input/option';
import Option from '../../../src/components/input/option';
import OptionGroup from '../../../src/components/input/option-group';

test('transforms an OptionGroup', () => {
  const option = <Option value="val">SomeOption</Option>;
  const transformedOption = optionTransformer(option);

  const res = transformer(<OptionGroup label="someLabel">
    {option}
  </OptionGroup>);

  expect(res).toEqual({
    label: {
      type: 'plain_text',
      text: 'someLabel',
    },
    options: [transformedOption],
  });
});
