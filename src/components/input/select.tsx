import React from 'react';
import Confirmation from '../block/confirmation';
import Option from './option';
import OptionGroup from './option-group';

export type Props = {
  placeholder: string;
  action_id: string;
  options?: React.ReactElement<Option>[];
  optionGroups?: React.ReactElement<OptionGroup>[];
  initialOptions?: React.ReactElement<Option>[];
  confirm?: Confirmation;
  maxSelectedItems?: number;
}

export default class Select extends React.Component<Props> {}
