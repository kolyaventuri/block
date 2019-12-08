import React from 'react';
import Confirmation from '../block/confirmation';
import Option from './option';
import {SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  actionId: string;
  children: SingleOrArray<React.ReactElement<Option>>;
  confirm?: React.ReactElement<Confirmation>;
};

export default class Overflow extends React.Component<Props> {}
