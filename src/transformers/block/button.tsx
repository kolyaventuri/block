
import {type Element} from '../../constants/types';
import {type ButtonProps} from '../../components/block/button';
import {transform} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {MAX_ACTION_ID_LENGTH, MAX_BUTTON_TEXT, MAX_BUTTON_VALUE} from '../../constants/limits';

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
  accessibility_label?: string;
};

const transformButton = (child: Element): ButtonType => {
  const {actionId, children, url, value, style, confirm, accessibilityLabel} = child.props as ButtonProps;

  requireField('actionId', actionId);
  warnIfTooLong('Button action_id', actionId, MAX_ACTION_ID_LENGTH);
  if (typeof children === 'string') {
    warnIfTooLong('Button text', children, MAX_BUTTON_TEXT);
  }

  warnIfTooLong('Button value', value, MAX_BUTTON_VALUE);

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

  if (accessibilityLabel) {
    res.accessibility_label = accessibilityLabel;
  }

  return res;
};

export default transformButton;
