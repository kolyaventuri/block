import React from 'react';
import {InputBlockElement} from '../../constants/types';

export type Props = {
  label: string;
  element: InputBlockElement;
  hint?: string;
  optional?: boolean;
  blockId?: string;
};

export default class Input extends React.Component<Props> {}
