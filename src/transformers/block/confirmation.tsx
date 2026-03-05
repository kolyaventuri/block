
import {type Element} from '../../constants/types';
import {transform} from '../transform';
import {type ConfirmationProps} from '../../components/block/confirmation';
import Text from '../../components/block/text';
import {warnIfTooLong} from '../../utils/validation';
import {MAX_CONFIRM_TITLE, MAX_CONFIRM_TEXT} from '../../constants/limits';

import {type TextType} from './text';

export type ConfirmationType = {
  title: TextType;
  text: TextType;
  confirm: TextType;
  deny: TextType;
};

const transformConfirmation = (child: Element): ConfirmationType => {
  const {title, confirm, deny, children} = child.props as ConfirmationProps;

  warnIfTooLong('Confirm title', title, MAX_CONFIRM_TITLE);

  const text = transform(children) as TextType;
  warnIfTooLong('Confirm text', text.text, MAX_CONFIRM_TEXT);

  const res: ConfirmationType = {
    title: transform(<Text plainText>{title}</Text>) as TextType,
    text,
    confirm: transform(<Text plainText>{confirm}</Text>) as TextType,
    deny: transform(<Text plainText>{deny}</Text>) as TextType,
  };

  return res;
};

export default transformConfirmation;
