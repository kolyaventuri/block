import React from 'react';
import test from 'ava';

import transformer from '../../../src/transformers/input/text';
import Text from '../../../src/components/input/text';

test('it transforms a basic text input', t => {
  const res = transformer(
    <Text actionId="actionId"/>
  );

  t.deepEqual(res, {
    type: 'plain_text_input',
    action_id: 'actionId'
  });
});

test('it transforms an advanced text input', t => {
  const res = transformer(
    <Text
      actionId="actionId"
      placeholder="placeholder"
      initial="initial"
      minLength={10}
      maxLength={20}
      multiline
    />
  );

  t.deepEqual(res, {
    type: 'plain_text_input',
    action_id: 'actionId',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder'
    },
    initial_value: 'initial',
    min_length: 10,
    max_length: 20,
    multiline: true
  });
});
