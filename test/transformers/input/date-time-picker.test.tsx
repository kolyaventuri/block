import React from 'react';
import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/input/date-time-picker';
import DateTimePicker from '../../../src/components/input/date-time-picker';
import Confirmation from '../../../src/components/block/confirmation';
import confirmationTransformer from '../../../src/transformers/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms a datetime picker', () => {
  const res = transformer(<DateTimePicker actionId="aid"/>);

  expect(res).toEqual({
    type: 'datetimepicker',
    action_id: 'aid',
  });
});

test('transforms a datetime picker with details', () => {
  const confirm = (
    <Confirmation
      title="t"
      confirm="confirm"
      deny="deny"
    >
      <Text>c</Text>
    </Confirmation>
  );

  const res = transformer(<DateTimePicker
    actionId="aid"
    initialDateTime={1_700_000_000}
    confirm={confirm}
  />);

  expect(res).toEqual({
    type: 'datetimepicker',
    action_id: 'aid',
    initial_date_time: 1_700_000_000,
    confirm: confirmationTransformer(confirm),
  });
});

test('rejects non-integer timestamps', () => {
  const function_ = () => transformer(<DateTimePicker actionId="aid" initialDateTime={1.5}/>);

  expect(function_).toThrow();
});

test('transforms focus_on_load for datetime picker', () => {
  const res = transformer(<DateTimePicker actionId="aid" focusOnLoad/>);

  expect(res).toEqual({
    type: 'datetimepicker',
    action_id: 'aid',
    focus_on_load: true,
  });
});
