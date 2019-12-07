import React from 'react';
import {Element} from '../../constants/types';
import {TextType} from '../block/text';
import Text from '../../components/block/text';
import {Props as OptionProps} from '../../components/input/option';
import {transform} from '..';

export type OptionType = {
  text: TextType;
  value: string;
  url?: string;
};

export default (child: Element): OptionType => {
  const {children: text, value, url}: OptionProps = child.props;

  const res: OptionType = {
    text: transform(<Text plainText>{text}</Text>) as TextType,
    value
  };

  if (url) {
    res.url = url;
  }

  return res;
};
