import React from 'react';
import Text from '../../components/block/text';
import {Props as OptionGroupProps} from '../../components/input/option-group';
import {Element} from '../../constants/types';
import {TextType} from '../block/text';
import {OptionType} from './option';
import {transform} from '..';

export type OptionGroupType = {
  label: TextType;
  options: OptionType[];
};

export default (child: Element): OptionGroupType => {
  const {label, children}: OptionGroupProps = child.props;

  let options = children;
  if (!Array.isArray(options)) {
    options = [options];
  }

  return {
    label: transform(<Text plainText>{label}</Text>) as TextType,
    options: options.map(option => transform(option as Element)) as OptionType[]
  };
};
