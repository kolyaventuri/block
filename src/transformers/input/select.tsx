import React from 'react';
import {Element} from '../../constants/types';
import {TextType} from '../block/text';
import {OptionType} from './option';
import {OptionGroupType} from './option-group';
import {ConfirmationType} from '../block/confirmation';
import {Props as SelectProps, selectTypes} from '../../components/input/select';
import Option from '../../components/input/option';
import Text from '../../components/block/text';
import {transform} from '..';
import getType from '../../utils/get-type';
import OptionGroup from '../../components/input/option-group';

type ValidSelectType =
  'multi_static_select' |
  'multi_external_select' |
  'multi_users_select' |
  'multi_conversations_select' |
  'multi_channels_select';
export type SelectType = {
  type: ValidSelectType;
  placeholder: TextType;
  action_id: string;
  options?: OptionType[];
  option_groups?: OptionGroupType[];
  initial_options?: OptionType[];
  confirm?: ConfirmationType;
  max_selected_items?: number;
  initial_users?: string[];
  initial_conversations?: string[];
  initial_channels?: string[];
};

const OPTION = 'Option';
const OPTION_GROUP = 'OptionGroup';

const types = {
  [selectTypes.STATIC]: 'multi_static_select',
  [selectTypes.EXTERNAL]: 'multi_external_select',
  [selectTypes.USER]: 'multi_users_select',
  [selectTypes.CONVERSATION]: 'multi_conversations_select',
  [selectTypes.CHANNEL]: 'multi_channels_select'
};

export default (child: Element): SelectType => {
  const {
    placeholder,
    actionId,
    children,
    initialOptions,
    confirm,
    maxSelectedItems,
    type: typeProp,
    initialUsers,
    initialConversations,
    initialChannels
  }: SelectProps = child.props;

  const type = typeProp || selectTypes.STATIC;
  const res: SelectType = {
    type: types[type] as ValidSelectType,
    placeholder: transform(<Text plainText>{placeholder}</Text>) as TextType,
    action_id: actionId
  };

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements] as React.ReactElement[];
  }

  if (type === selectTypes.STATIC) {
    const type = getType(elements[0] as Element);
    if (elements.some((element: React.ReactElement) => getType(element as Element) !== type)) {
      if (type === OPTION && elements.some((element: React.ReactElement) => getType(element as Element) !== OPTION_GROUP)) {
        throw new TypeError('You cannot mix OptionGroup types with Option types in a Select block.');
      } else if (type === OPTION_GROUP && elements.some((element: React.ReactElement) => getType(element as Element) !== OPTION)) {
        throw new TypeError('You cannot mix OptionGroup types with Option types in a Select block.');
      }
      throw new TypeError('Only allowed types are Option OR OptionGroup');
    }

    if (type === OPTION) {
      elements = elements as React.ReactElement<Option>[];

      res.options = elements.map(element => transform(element as Element)) as OptionType[];
    } else if (type === OPTION_GROUP) {
      elements = elements as React.ReactElement<OptionGroup>[];

      res.option_groups = elements.map(element => transform(element as Element)) as OptionGroupType[];
    }
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  if (type !== selectTypes.USER && initialOptions) {
  }

  switch (type) {
    case selectTypes.USER:
      if (initialUsers) {
        res.initial_users = initialUsers;
      }
      break;
    case selectTypes.CONVERSATION:
      if (initialConversations) {
        res.initial_conversations = initialConversations;
      }
      break;
    case selectTypes.CHANNEL:
      if (initialChannels) {
        res.initial_channels = initialChannels;
      }
    default:
      if (initialOptions) {
        res.initial_options = initialOptions.map(element => transform(element as Element)) as OptionType[];
      }
  }

  if (maxSelectedItems) {
    res.max_selected_items = maxSelectedItems;
  }

  return res;
};
