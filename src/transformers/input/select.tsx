
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type ConfirmationType} from '../block/confirmation';
import {type Props as SelectProperties, selectTypes} from '../../components/input/select';
import Text from '../../components/block/text';
import {transform, transformElements, transformOptional} from '../transform';
import getTransformerType from '../../utils/get-transformer-type';
import {warnIfTooLong, warnIfTooMany, requireField} from '../../utils/validation';
import {
  MAX_ACTION_ID_LENGTH,
  MAX_PLACEHOLDER_LENGTH,
  MAX_SELECT_OPTIONS,
  MAX_SELECT_OPTION_GROUPS,
} from '../../constants/limits';

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
  min_query_length?: number;
  focus_on_load?: boolean;
  initial_user?: string;
  initial_users?: string[];
  initial_conversation?: string;
  initial_conversations?: string[];
  initial_channel?: string;
  initial_channels?: string[];
  default_to_current_conversation?: boolean;
  response_url_enabled?: boolean;
  filter?: {
    include?: Array<'im' | 'mpim' | 'private' | 'public'>;
    exclude_external_shared_channels?: boolean;
    exclude_bot_users?: boolean;
  };
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

const normalizeElements = (elements?: SelectProperties['children']): JSX.Element[] => {
  if (!elements) {
    return [];
  }

  return Array.isArray(elements) ? elements : [elements];
};

const assignStaticOptions = (elements: JSX.Element[], result: SelectType): void => {
  const elementType = getTransformerType(elements[0] as Element);
  if (elements.some(element => getTransformerType(element as Element) !== elementType)) {
    if (elementType === OPTION && elements.some(element => getTransformerType(element as Element) !== OPTION_GROUP)) {
      throw new TypeError('You cannot mix OptionGroup types with Option types in a Select block.');
    } else if (elementType === OPTION_GROUP && elements.some(element => getTransformerType(element as Element) !== OPTION)) {
      throw new TypeError('You cannot mix OptionGroup types with Option types in a Select block.');
    }

    throw new TypeError('Only allowed types are Option OR OptionGroup');
  }

  if (elementType === OPTION) {
    result.options = transformElements<OptionType>(elements as Element[]);
  } else if (elementType === OPTION_GROUP) {
    result.option_groups = transformElements<OptionGroupType>(elements as Element[]);
  }
};

const applyConversationSettings = (
  result: SelectType,
  settings: Pick<SelectProperties, 'defaultToCurrentConversation' | 'responseUrlEnabled' | 'filter'>,
): void => {
  const {defaultToCurrentConversation, responseUrlEnabled, filter} = settings;

  if (defaultToCurrentConversation !== undefined) {
    result.default_to_current_conversation = defaultToCurrentConversation;
  }

  if (responseUrlEnabled !== undefined) {
    result.response_url_enabled = responseUrlEnabled;
  }

  if (!filter) {
    return;
  }

  const filterValue: SelectType['filter'] = {};

  if (filter.include && filter.include.length > 0) {
    filterValue.include = filter.include;
  }

  if (filter.excludeExternalSharedChannels !== undefined) {
    filterValue.exclude_external_shared_channels = filter.excludeExternalSharedChannels;
  }

  if (filter.excludeBotUsers !== undefined) {
    filterValue.exclude_bot_users = filter.excludeBotUsers;
  }

  if (Object.keys(filterValue).length > 0) {
    result.filter = filterValue;
  }
};

const applyInitialSelections = (
  type: SelectionType,
  isMulti: boolean,
  result: SelectType,
  initialValues: {
    initialOptions?: JSX.Element[];
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
        const transformedOptions = transformElements<OptionType>(initialOptions as Element[]);

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
    minQueryLength,
    focusOnLoad,
    defaultToCurrentConversation,
    responseUrlEnabled,
    filter,
  } = child.props as SelectProperties;

  const type: SelectionType = typeProperty ?? selectTypes.STATIC;
  const typeString = `${multi ? MULTI_PREFIX : ''}${types[type]}` as ValidSelectType;

  requireField('actionId', actionId);
  requireField('placeholder', placeholder);
  warnIfTooLong('Select action_id', actionId, MAX_ACTION_ID_LENGTH);
  warnIfTooLong('Select placeholder', placeholder, MAX_PLACEHOLDER_LENGTH);

  const result: SelectType = {
    type: typeString,
    placeholder: transform(<Text plainText>{placeholder ?? ''}</Text>) as TextType,
    action_id: actionId,
  };

  const elements = normalizeElements(children);
  const knownElements = elements.filter(element => {
    if (getTransformerType(element as Element)) {
      return true;
    }

    transformOptional(element as Element);
    return false;
  });

  if (type === selectTypes.STATIC) {
    requireField('options', elements);

    if (knownElements.length > 0) {
      assignStaticOptions(knownElements, result);
    }
  }

  if (confirm) {
    const transformedConfirm = transformOptional<ConfirmationType>(confirm as Element);
    if (transformedConfirm) {
      result.confirm = transformedConfirm;
    }
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

  if (focusOnLoad !== undefined) {
    result.focus_on_load = focusOnLoad;
  }

  if (type === selectTypes.EXTERNAL && minQueryLength !== undefined) {
    result.min_query_length = minQueryLength;
  }

  if (type === selectTypes.CONVERSATION) {
    applyConversationSettings(result, {defaultToCurrentConversation, responseUrlEnabled, filter});
  }

  if (result.options) {
    warnIfTooMany('Select options', result.options, MAX_SELECT_OPTIONS);
  }

  if (result.option_groups) {
    warnIfTooMany('Select option_groups', result.option_groups, MAX_SELECT_OPTION_GROUPS);
  }

  return result;
};

export default transformSelect;
