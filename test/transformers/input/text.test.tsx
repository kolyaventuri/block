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

test('it transforms focus_on_load', () => {
  const res = transformer(<Text actionId="actionId" focusOnLoad/>);

  expect(res).toEqual({
    type: 'plain_text_input',
    action_id: 'actionId',
    focus_on_load: true,
  });
});

test('it transforms dispatch_action_config', () => {
  const res = transformer(<Text
    actionId="actionId"
    dispatchActionConfig={{
      triggerActionsOn: ['on_enter_pressed', 'on_character_entered'],
    }}
  />);

  expect(res).toEqual({
    type: 'plain_text_input',
    action_id: 'actionId',
    dispatch_action_config: {
      trigger_actions_on: ['on_enter_pressed', 'on_character_entered'],
    },
  });
});
