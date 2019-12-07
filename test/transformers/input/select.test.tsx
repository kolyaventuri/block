import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/input/select';
import Select from '../../../src/components/input/select';

import optionTransformer from '../../../src/transformers/input/option';
import Option from '../../../src/components/input/option';

import optionGroupTransformer from '../../../src/transformers/input/option-group';
import OptionGroup from '../../../src/components/input/option-group';

test('transforms a select with options', t => {
  const option = <Option value="v">O</Option>;
  const options = [optionTransformer(option)];

  const res = transformer(
    <Select placeholder="placeholder" actionId="aid">
      {option}
    </Select>
  );

  t.deepEqual(res, {
    type: 'multi_static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder'
    },
    action_id: 'aid',
    options
  });
});

test('transforms a select with OptionGroups', t => {
  const option = <Option value="v">O</Option>;
  const option2 = <Option value="O">V</Option>;

  const optionGroup = <OptionGroup label="ogLabel">{option}{option2}</OptionGroup>;
  const optionGroups = [optionGroupTransformer(optionGroup)];

  const res = transformer(
    <Select placeholder="placeholder" actionId="aid">
      {optionGroup}
    </Select>
  );

  t.deepEqual(res, {
    type: 'multi_static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder'
    },
    action_id: 'aid',
    option_groups: optionGroups
  });
});
