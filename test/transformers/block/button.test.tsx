import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/block/button';
import confirmTransformer from '../../../src/transformers/block/confirmation';
import Button from '../../../src/components/block/button';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

test('can transform a basic button', () => {
  const res = transformer(<Button actionId="actionId">
    FooBar
  </Button>);

  expect(res).toEqual({
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'FooBar',
    },
    action_id: 'actionId',
  });
});

test('can transform a more advanced button', () => {
  const confirm = (
    <Confirmation
      title="ConfirmTitle"
      confirm="Confirm"
      deny="Deny"
    >
      <Text>FooBar</Text>
    </Confirmation>
  );

  const transformedConfirm = confirmTransformer(confirm);
  const res = transformer(<Button
    actionId="actionId"
    url="someURL"
    value="someValue"
    style="danger"
    confirm={confirm}
  >
    FooBar
  </Button>);

  expect(res).toEqual({
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'FooBar',
    },
    action_id: 'actionId',
    url: 'someURL',
    value: 'someValue',
    style: 'danger',
    confirm: transformedConfirm,
  });
});

test('can set an accessibility label', () => {
  const res = transformer(<Button
    actionId="actionId"
    accessibilityLabel="Accessible"
  >
    FooBar
  </Button>);

  expect(res).toEqual({
    type: 'button',
    text: {
      type: 'plain_text',
      text: 'FooBar',
    },
    action_id: 'actionId',
    accessibility_label: 'Accessible',
  });
});
