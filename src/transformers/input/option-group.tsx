import React from 'react';

import Text from '../../components/block/text';
import {type Props as OptionGroupProperties} from '../../components/input/option-group';
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {transform} from '../transform';
import {warnIfTooLong} from '../../utils/validation';

import {type OptionType} from './option';

export type OptionGroupType = {
  label: TextType;
  options: OptionType[];
};

const transformOptionGroup = (child: Element): OptionGroupType => {
  const {label, children}: OptionGroupProperties = child.props;

  warnIfTooLong('OptionGroup label', label, 75);

  let options = children;
  if (!Array.isArray(options)) {
    options = [options];
  }

  return {
    label: transform(<Text plainText>{label}</Text>) as TextType,
    options: options.map(option => transform(option as Element)) as OptionType[],
  };
};

export default transformOptionGroup;
