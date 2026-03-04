
import {type Element} from '../../constants/types';
import {transform} from '../transform';
import {type ConfirmationProps} from '../../components/block/confirmation';
import Text from '../../components/block/text';
import {warnIfTooLong} from '../../utils/validation';

import {type TextType} from './text';

export type ConfirmationType = {
  title: TextType;
  text: TextType;
  confirm: TextType;
  deny: TextType;
};

const transformConfirmation = (child: Element): ConfirmationType => {
  const {title, confirm, deny, children} = child.props as ConfirmationProps;

  warnIfTooLong('Confirm title', title, 100);

  const text = transform(children) as TextType;
  warnIfTooLong('Confirm text', text.text, 300);

  const res: ConfirmationType = {
    title: transform(<Text plainText>{title}</Text>) as TextType,
    text,
    confirm: transform(<Text plainText>{confirm}</Text>) as TextType,
    deny: transform(<Text plainText>{deny}</Text>) as TextType,
  };

  return res;
};

export default transformConfirmation;
