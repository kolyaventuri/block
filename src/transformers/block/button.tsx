
import {type Element} from '../../constants/types';
import {type ButtonProps} from '../../components/block/button';
import {transform} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong} from '../../utils/validation';

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

  warnIfTooLong('Button action_id', actionId, 255);
  if (typeof children === 'string') {
    warnIfTooLong('Button text', children, 75);
  }

  warnIfTooLong('Button value', value, 2000);

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
