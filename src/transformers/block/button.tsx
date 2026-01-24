import React from 'react';

import {type Element} from '../../constants/types';
import {type ButtonProps} from '../../components/block/button';
import {transform} from '..';
import Text from '../../components/block/text';
import Confirmation from '../../components/block/confirmation';

import {type ConfirmationType} from './confirmation';
import {type TextType} from './text';

export type ButtonType = {
  type: 'button';
  text: TextType;
  action_id: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
  confirm?: ConfirmationType;
};

const transformButton = (child: Element): ButtonType => {
  const {actionId, children, url, value, style, confirm}: ButtonProps = child.props;

  const res: ButtonType = {
    type: 'button',
    text: transform(<Text plainText>{children}</Text>) as TextType,
    action_id: actionId,
  };

  if (url) {
    res.url = url;
  }

  if (value) {
    res.value = value;
  }

  if (style) {
    res.style = style;
  }

  if (confirm) {
    res.confirm = transform(confirm) as ConfirmationType;
  }

  return res;
};

export default transformButton;
