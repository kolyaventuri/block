import React from 'react';
import Option from './option';
import Confirmation from '../block/confirmation';
import {SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  actionId: string;
  children: SingleOrArray<React.ReactElement<Option>>;
  initialOption?: React.ReactElement<Option>;
  confirm?: React.ReactElement<Confirmation>;
};

export default class RadioGroup extends React.Component<Props> {}
