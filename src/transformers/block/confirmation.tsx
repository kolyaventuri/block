
import {type Element} from '../../constants/types';
import {transform, transformOptional} from '../transform';
import {type ConfirmationProps} from '../../components/block/confirmation';
import Text from '../../components/block/text';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {MAX_CONFIRM_BUTTON_TEXT, MAX_CONFIRM_TITLE, MAX_CONFIRM_TEXT} from '../../constants/limits';

import {type TextType} from './text';

export type ConfirmationType = {
  title: TextType;
  text: TextType;
  confirm: TextType;
  deny: TextType;
};

const transformConfirmation = (child: Element): ConfirmationType => {
  const {title, confirm, deny, children} = child.props as ConfirmationProps;
  requireField('title', title);
  requireField('confirm', confirm);
  requireField('deny', deny);
  requireField('text', children);

  warnIfTooLong('Confirm title', title, MAX_CONFIRM_TITLE);
  warnIfTooLong('Confirm confirm', confirm, MAX_CONFIRM_BUTTON_TEXT);
  warnIfTooLong('Confirm deny', deny, MAX_CONFIRM_BUTTON_TEXT);
  const text = transformOptional<TextType>(children ?? <Text plainText>{''}</Text>) ?? transform(<Text plainText>{''}</Text>) as TextType;
  warnIfTooLong('Confirm text', text.text, MAX_CONFIRM_TEXT);

  const res: ConfirmationType = {
    title: transform(<Text plainText>{title ?? ''}</Text>) as TextType,
    text,
    confirm: transform(<Text plainText>{confirm ?? ''}</Text>) as TextType,
    deny: transform(<Text plainText>{deny ?? ''}</Text>) as TextType,
  };

  return res;
};

export default transformConfirmation;
