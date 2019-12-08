import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/input/radio-group';
import optionTransformer from '../../../src/transformers/input/option';
import confirmTansformer from '../../../src/transformers/block/confirmation';

import RadioGroup from '../../../src/components/input/radio-group';
import Option from '../../../src/components/input/option';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms a basic RadioGroup block', t => {
  const option = <Option value="V">O</Option>;
  const option2 = <Option value="O">V</Option>;
  const options = [option, option2].map(optionTransformer);

  const res = transformer(
    <RadioGroup actionId="aid">
      {option}
      {option2}
    </RadioGroup>
  );

  t.deepEqual(res, {
    type: 'radio_buttons',
    action_id: 'aid',
    options
  });
});

test('can have an initial option', t => {
  const option = <Option value="V">O</Option>;
  const option2 = <Option value="O">V</Option>;
  const options = [option, option2].map(optionTransformer);

  const res = transformer(
    <RadioGroup actionId="aid" initialOption={option2}>
      {option}
      {option2}
    </RadioGroup>
  );

  t.deepEqual(res, {
    type: 'radio_buttons',
    action_id: 'aid',
    options,
    initial_option: optionTransformer(option2)
  });
});

test('can have a confirmation', t => {
  const option = <Option value="V">O</Option>;
  const option2 = <Option value="O">V</Option>;
  const options = [option, option2].map(optionTransformer);

  const confirmation = (
    <Confirmation
      title="cTitle"
      confirm="cConfirm"
      deny="cDeny"
    >
      <Text>Foo</Text>
    </Confirmation>
  );
  const transformedConf = confirmTansformer(confirmation);

  const res = transformer(
    <RadioGroup actionId="aid" confirm={confirmation}>
      {option}
      {option2}
    </RadioGroup>
  );

  t.deepEqual(res, {
    type: 'radio_buttons',
    action_id: 'aid',
    options,
    confirm: transformedConf
  });
});
