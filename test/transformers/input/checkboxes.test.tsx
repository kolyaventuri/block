import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/input/checkboxes';
import Checkboxes from '../../../src/components/input/checkboxes';
import Option from '../../../src/components/input/option';
import optionTransformer from '../../../src/transformers/input/option';
import Confirmation from '../../../src/components/block/confirmation';
import confirmationTransformer from '../../../src/transformers/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms checkboxes', () => {
  const option = <Option value="v">O</Option>;
  const option2 = <Option value="w">W</Option>;

  const res = transformer(<Checkboxes actionId="aid">
    {option}
    {option2}
  </Checkboxes>);

  expect(res).toEqual({
    type: 'checkboxes',
    action_id: 'aid',
    options: [option, option2].map(option => optionTransformer(option)),
  });
});

test('transforms checkboxes with initial options and confirmation', () => {
  const option = <Option value="v">O</Option>;
  const option2 = <Option value="w">W</Option>;
  const initialOptions = [option];

  const confirm = (
    <Confirmation
      title="t"
      confirm="confirm"
      deny="deny"
    >
      <Text>c</Text>
    </Confirmation>
  );

  const res = transformer(<Checkboxes
    actionId="aid"
    initialOptions={initialOptions}
    confirm={confirm}
  >
    {option}
    {option2}
  </Checkboxes>);

  expect(res).toEqual({
    type: 'checkboxes',
    action_id: 'aid',
    options: [option, option2].map(option => optionTransformer(option)),
    initial_options: initialOptions.map(option => optionTransformer(option)),
    confirm: confirmationTransformer(confirm),
  });
});

test('transforms checkboxes focus_on_load', () => {
  const option = <Option value="v">O</Option>;

  const res = transformer(<Checkboxes actionId="aid" focusOnLoad>
    {option}
  </Checkboxes>);

  expect(res).toEqual({
    type: 'checkboxes',
    action_id: 'aid',
    options: [option].map(option => optionTransformer(option)),
    focus_on_load: true,
  });
});
