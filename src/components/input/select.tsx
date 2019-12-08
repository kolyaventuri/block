import React from 'react';
import Confirmation from '../block/confirmation';
import Option from './option';
import OptionGroup from './option-group';

type SingleOrArray<P> = P | P[];

export const selectTypes = {
  STATIC: 'static',
  EXTERNAL: 'external'
};

type SelectType =
  'static' |
  'external';

export type Props = {
  placeholder: string;
  actionId: string;
  type?: SelectType;
  children?: SingleOrArray<React.ReactElement<Option>> | SingleOrArray<React.ReactElement<OptionGroup>>;
  initialOptions?: React.ReactElement<Option>[];
  confirm?: React.ReactElement<Confirmation>;
  maxSelectedItems?: number;
  external?: boolean;
}

export default class Select extends React.Component<Props> {}
