import React from 'react';

import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type ConfirmationType} from '../block/confirmation';
import {type Props as SelectProperties, selectTypes} from '../../components/input/select';
import type Option from '../../components/input/option';
import Text from '../../components/block/text';
import {transform} from '..';
import getType from '../../utils/get-type';
import type OptionGroup from '../../components/input/option-group';

import {type OptionGroupType} from './option-group';
import {type OptionType} from './option';

type ValidSelectType =
  'static_select' |
  'multi_static_select' |
  'external_select' |
  'multi_external_select' |
  'users_select' |
  'multi_users_select' |
  'conversations_select' |
  'multi_conversations_select' |
  'channels_select' |
  'multi_channels_select';

type SelectionType = NonNullable<SelectProperties['type']>;

export type SelectType = {
  type: ValidSelectType;
  placeholder: TextType;
  action_id: string;
  options?: OptionType[];
  option_groups?: OptionGroupType[];
  initial_option?: OptionType;
  initial_options?: OptionType[];
  confirm?: ConfirmationType;
  max_selected_items?: number;
  initial_user?: string;
  initial_users?: string[];
  initial_conversation?: string;
  initial_conversations?: string[];
  initial_channel?: string;
  initial_channels?: string[];
};

const OPTION = 'Option';
const OPTION_GROUP = 'OptionGroup';

const types = {
  [selectTypes.STATIC]: 'static_select',
  [selectTypes.EXTERNAL]: 'external_select',
  [selectTypes.USER]: 'users_select',
  [selectTypes.CONVERSATION]: 'conversations_select',
  [selectTypes.CHANNEL]: 'channels_select',
};
const MULTI_PREFIX = 'multi_';

const normalizeElements = (elements?: SelectProperties['children']): React.ReactElement[] => {
  if (!elements) {
    return [];
  }

  return Array.isArray(elements) ? elements : [elements];
};

const assignStaticOptions = (elements: React.ReactElement[], result: SelectType): void => {
  const elementType = getType(elements[0] as Element);
  if (elements.some(element => getType(element as Element) !== elementType)) {
    if (elementType === OPTION && elements.some(element => getType(element as Element) !== OPTION_GROUP)) {
      throw new TypeError('You cannot mix OptionGroup types with Option types in a Select block.');
    } else if (elementType === OPTION_GROUP && elements.some(element => getType(element as Element) !== OPTION)) {
      throw new TypeError('You cannot mix OptionGroup types with Option types in a Select block.');
    }

    throw new TypeError('Only allowed types are Option OR OptionGroup');
  }

  if (elementType === OPTION) {
    const options = elements as Array<React.ReactElement<Option>>;
    result.options = options.map(element => transform(element as Element)) as OptionType[];
  } else if (elementType === OPTION_GROUP) {
    const optionGroups = elements as Array<React.ReactElement<OptionGroup>>;
    result.option_groups = optionGroups.map(element => transform(element as Element)) as OptionGroupType[];
  }
};

const applyInitialSelections = (
  type: SelectionType,
  isMulti: boolean,
  result: SelectType,
  initialValues: {
    initialOptions?: Array<React.ReactElement<Option>>;
    initialUsers?: string[];
    initialConversations?: string[];
    initialChannels?: string[];
  },
): void => {
  const {initialOptions, initialUsers, initialConversations, initialChannels} = initialValues;

  switch (type) {
    case selectTypes.USER: {
      if (initialUsers && initialUsers.length > 0) {
        if (isMulti) {
          result.initial_users = initialUsers;
        } else {
          result.initial_user = initialUsers[0];
        }
      }

      break;
    }

    case selectTypes.CONVERSATION: {
      if (initialConversations && initialConversations.length > 0) {
        if (isMulti) {
          result.initial_conversations = initialConversations;
        } else {
          result.initial_conversation = initialConversations[0];
        }
      }

      break;
    }

    case selectTypes.CHANNEL: {
      if (initialChannels && initialChannels.length > 0) {
        if (isMulti) {
          result.initial_channels = initialChannels;
        } else {
          result.initial_channel = initialChannels[0];
        }
      }

      break;
    }

    case selectTypes.STATIC:
    case selectTypes.EXTERNAL: {
      if (initialOptions && initialOptions.length > 0) {
        const transformedOptions = initialOptions.map(element => transform(element as Element)) as OptionType[];

        if (isMulti) {
          result.initial_options = transformedOptions;
        } else {
          result.initial_option = transformedOptions[0];
        }
      }

      break;
    }
  }
};

const transformSelect = (child: Element): SelectType => {
  const {
    placeholder,
    actionId,
    multi,
    children,
    initialOptions,
    confirm,
    maxSelectedItems,
    type: typeProperty,
    initialUsers,
    initialConversations,
    initialChannels,
  }: SelectProperties = child.props;

  const type: SelectionType = typeProperty ?? selectTypes.STATIC;
  const typeString = `${multi ? MULTI_PREFIX : ''}${types[type]}` as ValidSelectType;

  const result: SelectType = {
    type: typeString,
    placeholder: transform(<Text plainText>{placeholder}</Text>) as TextType,
    action_id: actionId,
  };

  const elements = normalizeElements(children);

  if (type === selectTypes.STATIC) {
    assignStaticOptions(elements, result);
  }

  if (confirm) {
    result.confirm = transform(confirm as Element) as ConfirmationType;
  }

  applyInitialSelections(type, Boolean(multi), result, {
    initialOptions,
    initialUsers,
    initialConversations,
    initialChannels,
  });

  if (maxSelectedItems) {
    result.max_selected_items = maxSelectedItems;
  }

  return result;
};

export default transformSelect;
