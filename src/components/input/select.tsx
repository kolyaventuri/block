import React from 'react';
import Confirmation from '../block/confirmation';
import Option from './option';
import OptionGroup from './option-group';
import {SingleOrArray} from '../../utils/type-helpers';

export const selectTypes = {
  STATIC: 'static',
  EXTERNAL: 'external',
  USER: 'user',
  CONVERSATION: 'conversation',
  CHANNEL: 'channel'
};

type SelectType =
  'static' |
  'external' |
  'user' |
  'conversation' |
  'channel';

export type Props = {
  placeholder: string;
  actionId: string;
  type?: SelectType;
  children?: SingleOrArray<React.ReactElement<Option>> | SingleOrArray<React.ReactElement<OptionGroup>>;
  initialOptions?: React.ReactElement<Option>[];
  confirm?: React.ReactElement<Confirmation>;
  maxSelectedItems?: number;
  initialUsers?: string[];
  initialConversations?: string[];
  initialChannels?: string[];
}

export default class Select extends React.Component<Props> {}
