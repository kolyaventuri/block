import React from 'react';

import type Confirmation from '../block/confirmation';
import {type SingleOrArray} from '../../utils/type-helpers';

import type Option from './option';
import type OptionGroup from './option-group';

export const selectTypes = {
  STATIC: 'static',
  EXTERNAL: 'external',
  USER: 'user',
  CONVERSATION: 'conversation',
  CHANNEL: 'channel',
} as const;

type SelectType = typeof selectTypes[keyof typeof selectTypes];

export type Props = {
  placeholder: string;
  actionId: string;
  type?: SelectType;
  multi?: boolean;
  children?: SingleOrArray<React.ReactElement<Option>> | SingleOrArray<React.ReactElement<OptionGroup>>;
  initialOptions?: Array<React.ReactElement<Option>>;
  confirm?: React.ReactElement<Confirmation>;
  maxSelectedItems?: number;
  initialUsers?: string[];
  initialConversations?: string[];
  initialChannels?: string[];
};

export default class Select extends React.Component<Props> {
  static slackType = 'Select';
}
