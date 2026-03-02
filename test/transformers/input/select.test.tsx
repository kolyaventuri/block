import {test, expect} from 'vitest';

import transformer from '../../../src/transformers/input/select';
import Select from '../../../src/components/input/select';
import optionTransformer from '../../../src/transformers/input/option';
import Option from '../../../src/components/input/option';
import optionGroupTransformer from '../../../src/transformers/input/option-group';
import OptionGroup from '../../../src/components/input/option-group';
import confirmationTransformer from '../../../src/transformers/block/confirmation';
import Confirmation from '../../../src/components/block/confirmation';
import Text from '../../../src/components/block/text';

test('transforms a select with options', () => {
  const option = <Option value="v">O</Option>;
  const options = [optionTransformer(option)];

  const res = transformer(<Select placeholder="placeholder" actionId="aid">
    {option}
  </Select>);

  expect(res).toEqual({
    type: 'static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    action_id: 'aid',
    options,
  });
});

test('transforms multi-select with options', () => {
  const option = <Option value="v">O</Option>;
  const options = [optionTransformer(option)];

  const res = transformer(<Select multi placeholder="placeholder" actionId="aid">
    {option}
  </Select>);

  expect(res).toEqual({
    type: 'multi_static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    action_id: 'aid',
    options,
  });
});

test('transforms a select with OptionGroups', () => {
  const option = <Option value="v">O</Option>;
  const option2 = <Option value="O">V</Option>;

  const optionGroup = <OptionGroup label="ogLabel">{option}{option2}</OptionGroup>;
  const optionGroups = [optionGroupTransformer(optionGroup)];

  const res = transformer(<Select placeholder="placeholder" actionId="aid">
    {optionGroup}
  </Select>);

  expect(res).toEqual({
    type: 'static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    action_id: 'aid',
    option_groups: optionGroups,
  });
});

test('disallows options AND optionGroups in the same select block', () => {
  const function_ = () => transformer(<Select placeholder="p" actionId="a">
    <Option value="v">O</Option>
    <OptionGroup label="l">
      <Option value="o">V</Option>
    </OptionGroup>
  </Select>);

  expect(function_).toThrow();
});

test('it transforms additional options on the Select block', () => {
  const option = <Option value="v">O</Option>;
  const option2 = <Option value="c">C</Option>;
  const options = [option, option2].map(option => optionTransformer(option));

  const initialOptions = [option];
  const transformedInitialOptions = initialOptions.map(option => optionTransformer(option));

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

  const res = transformer(<Select
    placeholder="placeholder"
    actionId="aid"
    initialOptions={initialOptions}
    confirm={confirm}
    maxSelectedItems={2}
  >
    {option}
    {option2}
  </Select>);

  expect(res).toEqual({
    type: 'static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    action_id: 'aid',
    options,
    confirm: transformedConfirm,
    initial_option: transformedInitialOptions[0],
    max_selected_items: 2,
  });
});

test('can transform a selcet with external options', () => {
  const function_ = () => transformer(<Select
    type="external"
    placeholder="placeholder"
    actionId="aid"
  />);

  expect(function_).not.toThrow();
  const res = function_();

  expect(res).toEqual({
    type: 'external_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    action_id: 'aid',
  });
});

test('does not transform child options when not static type', () => {
  const res = transformer(<Select
    type="external"
    placeholder="p"
    actionId="aid"
  >
    <Option value="V">O</Option>
  </Select>);

  expect(res).toEqual({
    type: 'external_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
  });
});

test('allows initialUsers prop if type is a user select', () => {
  const users = ['A', 'B', 'C'];
  const res = transformer(<Select
    type="user"
    placeholder="p"
    actionId="aid"
    initialUsers={users}
  />);

  expect(res).toEqual({
    type: 'users_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
    initial_user: users[0],
  });
});

test('allows initialConversations prop if type is conversation', () => {
  const conversations = ['A', 'B', 'C'];
  const res = transformer(<Select
    type="conversation"
    placeholder="p"
    actionId="aid"
    initialConversations={conversations}
  />);

  expect(res).toEqual({
    type: 'conversations_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
    initial_conversation: conversations[0],
  });
});

test('allows initialChannels prop if type is channel', () => {
  const channels = ['A', 'B', 'C'];
  const res = transformer(<Select
    type="channel"
    placeholder="p"
    actionId="aid"
    initialChannels={channels}
  />);

  expect(res).toEqual({
    type: 'channels_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
    initial_channel: channels[0],
  });
});

test('applies min_query_length for external selects', () => {
  const res = transformer(<Select
    type="external"
    placeholder="p"
    actionId="aid"
    minQueryLength={3}
  />);

  expect(res).toEqual({
    type: 'external_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
    min_query_length: 3,
  });
});

test('applies focus_on_load for selects', () => {
  const res = transformer(<Select
    placeholder="p"
    actionId="aid"
    focusOnLoad
  />);

  expect(res).toEqual({
    type: 'static_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
    focus_on_load: true,
  });
});

test('applies conversation flags and filter', () => {
  const res = transformer(<Select
    type="conversation"
    placeholder="p"
    actionId="aid"
    defaultToCurrentConversation
    responseUrlEnabled={false}
    filter={{
      include: ['im', 'mpim'],
      excludeExternalSharedChannels: true,
      excludeBotUsers: false,
    }}
  />);

  expect(res).toEqual({
    type: 'conversations_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
    default_to_current_conversation: true,
    response_url_enabled: false,
    filter: {
      include: ['im', 'mpim'],
      exclude_external_shared_channels: true,
      exclude_bot_users: false,
    },
  });
});

test('uses initial_options for multi static select', () => {
  const option = <Option value="v">O</Option>;
  const option2 = <Option value="w">W</Option>;
  const initialOptions = [option, option2];
  const transformedInitialOptions = initialOptions.map(option => optionTransformer(option));

  const res = transformer(<Select
    multi
    placeholder="placeholder"
    actionId="aid"
    initialOptions={initialOptions}
  >
    {option}
    {option2}
  </Select>);

  expect(res).toEqual({
    type: 'multi_static_select',
    placeholder: {
      type: 'plain_text',
      text: 'placeholder',
    },
    action_id: 'aid',
    options: transformedInitialOptions,
    initial_options: transformedInitialOptions,
  });
});

test('uses initial_users for multi user select', () => {
  const users = ['A', 'B', 'C'];
  const res = transformer(<Select
    multi
    type="user"
    placeholder="p"
    actionId="aid"
    initialUsers={users}
  />);

  expect(res).toEqual({
    type: 'multi_users_select',
    placeholder: {
      type: 'plain_text',
      text: 'p',
    },
    action_id: 'aid',
    initial_users: users,
  });
});
