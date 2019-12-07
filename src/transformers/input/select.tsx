import React from 'react';
import {Element} from '../../constants/types';
import {TextType} from '../block/text';
import {OptionType} from './option';
import {OptionGroupType} from './option-group';
import {ConfirmationType} from '../block/confirmation';
import {Props as SelectProps } from '../../components/input/select';
import Option from '../../components/input/option';
import Text from '../../components/block/text';
import {transform} from '..';
import getType from '../../utils/get-type';

export type SelectType = {
  type: 'multi_static_select';
  placeholder: TextType;
  action_id: string;
  options?: OptionType[];
  option_groups?: OptionGroupType[];
  initial_options?: OptionType[];
  confirm?: ConfirmationType;
  max_selected_items?: number;
};

const OPTION = 'Option';
const OPTION_GROUP = 'OptionGroup';

export default (child: Element): SelectType => {
  const {placeholder, actionId, children, initialOptions, confirm, maxSelectedItems}: SelectProps = child.props;

  const res: SelectType = {
    type: 'multi_static_select',
    placeholder: transform(<Text plainText>{placeholder}</Text>) as TextType,
    action_id: actionId
  };

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements] as React.ReactElement[];
  }

  const type = getType(elements[0] as Element);
  if (type === OPTION) {
    elements = elements as React.ReactElement<Option>[];

    res.options = elements.map(element => transform(element as Element)) as OptionType[];
  }

  return res;
};
