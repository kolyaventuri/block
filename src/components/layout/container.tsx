import React from 'react';
import {SingleOrArray} from '../../utils/type-helpers';
import {Child} from '../../constants/types';

export type Props = {
  children: SingleOrArray<Child>
};

export default class Container extends React.Component<Props> {}
