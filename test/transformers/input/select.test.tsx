import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/input/select';
import Select from '../../../src/components/input/select';

import optionTransformer from '../../../src/transformers/input/option';
import Option from '../../../src/components/input/option';

import optionGroupTransformer from '../../../src/transformers/input/option-group';
import OptionGroup from '../../../src/components/input/option-group';

import confirmationTransformer from '../../../src/transformers/block/confirmation';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

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

test('disallows options AND optionGroups in the same select block', t => {
  const fn = () => transformer(
    <Select placeholder="p" actionId="a">
      <Option value="v">O</Option>
      <OptionGroup label="l">
        <Option value="o">V</Option>
      </OptionGroup>
    </Select>
  );

  t.throws(fn);
});

test('it transforms additional options on the Select block', t => {
  const option = <Option value="v">O</Option>;
  const option2 = <Option value="c">C</Option>;
  const options = [option, option2].map(optionTransformer);

  const initialOptions = [option];
  const transformedInitialOptions = initialOptions.map(optionTransformer);
  
  const confirm = (
    <Confirmation
      title="cTitle"
      confirm="confirm"
      deny="deny"
    >
      <Text>cText</Text>
    </Confirmation>
  );
  const transformedConfirm = confirmationTransformer(confirm);

  const res = transformer(
    <Select
      placeholder="placeholder"
      actionId="aid"
      initialOptions={initialOptions}
      confirm={confirm}
      maxSelectedItems={2}
    >
      {option}
      {option2}
    </Select>
  );

  t.deepEqual(res, {
    type: 'multi_static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder'
    },
    action_id: 'aid',
    options,
    confirm: transformedConfirm,
    initial_options: transformedInitialOptions,
    max_selected_items: 2
  });
});

test('can transform a selcet with external options', t => {
  const fn = () => transformer(
    <Select
      placeholder="placeholder"
      actionId="aid"
      external
    />
  );

  t.notThrows(fn);
  const res = fn();

  t.deepEqual(res, {
    type: 'multi_external_select',
    placeholder:  {
      type: 'plain_text',
      text: 'placeholder'
    },
    action_id: 'aid'
  });
});

test('does not transform child options when external', t => {
  const res = transformer(
    <Select
      placeholder="p"
      actionId="aid"
      external
    >
      <Option value="V">O</Option>
    </Select>
  );

  t.deepEqual(res, {
    type: 'multi_external_select',
    placeholder:  {
      type: 'plain_text',
      text: 'p'
    },
    action_id: 'aid'
  });
});
