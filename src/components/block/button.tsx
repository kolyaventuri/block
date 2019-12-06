import React from 'react';
import Confirmation from './confirmation';

type Props = {
  text: string;
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger'
  confirm?: React.ReactElement<Confirmation>
};

export default class Button extends React.Component<Props> {}
