import React from 'react';

import {type Element} from '../../constants/types';
import {transform} from '../transform';
import {type ConfirmationProps} from '../../components/block/confirmation';
import Text from '../../components/block/text';

import {type TextType} from './text';

export type ConfirmationType = {
  title: TextType;
  text: TextType;
  confirm: TextType;
  deny: TextType;
};

const transformConfirmation = (child: Element): ConfirmationType => {
  const {title, confirm, deny, children}: ConfirmationProps = child.props;

  const res: ConfirmationType = {
    title: transform(<Text plainText>{title}</Text>) as TextType,
    text: transform(children) as TextType,
    confirm: transform(<Text plainText>{confirm}</Text>) as TextType,
    deny: transform(<Text plainText>{deny}</Text>) as TextType,
  };

  return res;
};

export default transformConfirmation;
