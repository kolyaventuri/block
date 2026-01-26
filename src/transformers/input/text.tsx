import React from 'react';

import Text from '../../components/block/text';
import {type Props as TextInputProperties} from '../../components/input/text';
import {type TextType as TextProperties} from '../block/text';
import {type Element} from '../../constants/types';
import {transform} from '..';
import {warnIfTooLong} from '../../utils/validation';

export type TextType = {
  type: 'plain_text_input';
  action_id: string;
  placeholder?: TextProperties;
  initial_value?: string;
  multiline?: boolean;
  min_length?: number;
  max_length?: number;
  focus_on_load?: boolean;
  dispatch_action_config?: {
    trigger_actions_on: Array<'on_enter_pressed' | 'on_character_entered'>;
  };
};

const transformTextInput = (child: Element): TextType => {
  const {
    actionId,
    placeholder,
    initial,
    multiline,
    minLength,
    maxLength,
    focusOnLoad,
    dispatchActionConfig,
  }: TextInputProperties = child.props;

  warnIfTooLong('TextInput action_id', actionId, 255);
  if (placeholder) {
    warnIfTooLong('TextInput placeholder', placeholder, 150);
  }

  const res: TextType = {
    type: 'plain_text_input',
    action_id: actionId,
  };

  if (placeholder) {
    res.placeholder = transform(<Text plainText>{placeholder}</Text>) as TextProperties;
  }

  if (initial) {
    res.initial_value = initial;
  }

  if (multiline) {
    res.multiline = true;
  }

  if (minLength) {
    res.min_length = minLength;
  }

  if (maxLength) {
    res.max_length = maxLength;
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  if (dispatchActionConfig && dispatchActionConfig.triggerActionsOn.length > 0) {
    res.dispatch_action_config = {
      trigger_actions_on: dispatchActionConfig.triggerActionsOn,
    };
  }

  return res;
};

export default transformTextInput;
