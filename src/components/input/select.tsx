import React from 'react';
import Confirmation from '../block/confirmation';
import Option from './option';
import OptionGroup from './option-group';

type SingleOrArray<P> = P | P[];

export type Props = {
  placeholder: string;
  actionId: string;
  children: SingleOrArray<React.ReactElement<Option>> | SingleOrArray<React.ReactElement<OptionGroup>>;
  initialOptions?: React.ReactElement<Option>[];
  confirm?: React.ReactElement<Confirmation>;
  maxSelectedItems?: number;
}

export default class Select extends React.Component<Props> {}
