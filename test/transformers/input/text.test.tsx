import React from 'react';
import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/input/text';
import Text from '../../../src/components/input/text';

test('it transforms a basic text input', () => {
  const res = transformer(<Text actionId="actionId"/>);

  expect(res).toEqual({
    type: 'plain_text_input',
    action_id: 'actionId',
  });
});

test('it transforms an advanced text input', () => {
  const res = transformer(<Text
    multiline
    actionId="actionId"
    placeholder="placeholder"
    initial="initial"
    minLength={10}
    maxLength={20}
  />);

  expect(res).toEqual({
    type: 'plain_text_input',
    action_id: 'actionId',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    initial_value: 'initial',
    min_length: 10,
    max_length: 20,
    multiline: true,
  });
});
