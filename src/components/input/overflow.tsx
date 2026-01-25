import React from 'react';

import type Confirmation from '../block/confirmation';
import {type SingleOrArray} from '../../utils/type-helpers';

import type Option from './option';

export type Props = {
  actionId: string;
  children: SingleOrArray<React.ReactElement<Option>>;
  confirm?: React.ReactElement<Confirmation>;
  focusOnLoad?: boolean;
};

export default class Overflow extends React.Component<Props> {
  static slackType = 'Overflow';
}
