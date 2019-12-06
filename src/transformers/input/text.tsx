import React from 'react';
import Text from '../../components/block/text';
import {Props as TextInputProps} from '../../components/input/text';
import {TextType as TextProps} from '../block/text';
import {Element} from '../../constants/types';
import { transform } from '..';

export type TextType = {
  type: 'plain_text_input';
  action_id: string;
  placeholder?: TextProps;
  initial_value?: string;
  multiline?: boolean;
  min_length?: number;
  max_length?: number;
};

export default (child: Element): TextType => {
  const {actionId, placeholder, initial, multiline, minLength, maxLength}: TextInputProps = child.props;

  const res: TextType = {
    type: 'plain_text_input',
    action_id: actionId
  };

  if (placeholder) {
    res.placeholder = transform(<Text plainText>{placeholder}</Text>) as TextProps;
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

  return res;
};
