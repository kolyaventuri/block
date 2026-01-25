import React from 'react';
import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/input/date-picker';
import DatePicker from '../../../src/components/input/date-picker';
import confirmTransformer from '../../../src/transformers/block/confirmation';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms a simple DatePicker', () => {
  const res = transformer(<DatePicker
    actionId="actionId"
  />);

  expect(res).toEqual({
    type: 'datepicker',
    action_id: 'actionId',
  });
});

test('transforms an advanced DatePicker', () => {
  const confirm = (
    <Confirmation
      title="someTitle"
      confirm="confirm"
      deny="deny"
    >
      <Text>Foo</Text>
    </Confirmation>
  );
  const transformedConfirm = confirmTransformer(confirm);

  const res = transformer(<DatePicker
    actionId="actionId"
    placeholder="placeholder"
    initialDate="2007-01-25"
    confirm={confirm}
  />);

  expect(res).toEqual({
    type: 'datepicker',
    action_id: 'actionId',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    initial_date: '2007-01-25',
    confirm: transformedConfirm,
  });
});

test('rejects invalid dates', () => {
  const function_ = () => transformer(<DatePicker
    actionId="aid"
    initialDate="invalid-date"
  />);

  expect(function_).toThrow();
});

test('rejects invalid calendar dates', () => {
  const function_ = () => transformer(<DatePicker
    actionId="aid"
    initialDate="2024-02-31"
  />);

  expect(function_).toThrow();
});
