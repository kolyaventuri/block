import React from 'react';
import Confirmation from './confirmation';

type TopProps = {
  children: string;
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
};

export type ButtonProps = TopProps & {
  confirm?: Confirmation;
};

type Props = TopProps & {
  confirm?: React.ReactElement<Confirmation>;
};

export default class Button extends React.Component<Props> {}
