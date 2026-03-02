import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/input/time-picker';
import TimePicker from '../../../src/components/input/time-picker';
import Confirmation from '../../../src/components/block/confirmation';
import confirmationTransformer from '../../../src/transformers/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms a time picker', () => {
  const res = transformer(<TimePicker actionId="aid"/>);

  expect(res).toEqual({
    type: 'timepicker',
    action_id: 'aid',
  });
});

test('transforms a time picker with details', () => {
  const confirm = (
    <Confirmation
      title="t"
      confirm="confirm"
      deny="deny"
    >
      <Text>c</Text>
    </Confirmation>
  );

  const res = transformer(<TimePicker
    actionId="aid"
    placeholder="Pick"
    initialTime="09:30"
    confirm={confirm}
  />);

  expect(res).toEqual({
    type: 'timepicker',
    action_id: 'aid',
    placeholder: {
      type: 'plain_text',
      text: 'Pick',
    },
    initial_time: '09:30',
    confirm: confirmationTransformer(confirm),
  });
});

test('rejects invalid times', () => {
  const function_ = () => transformer(<TimePicker actionId="aid" initialTime="30:99"/>);

  expect(function_).toThrow();
});

test('transforms focus_on_load for time picker', () => {
  const res = transformer(<TimePicker actionId="aid" focusOnLoad/>);

  expect(res).toEqual({
    type: 'timepicker',
    action_id: 'aid',
    focus_on_load: true,
  });
});
