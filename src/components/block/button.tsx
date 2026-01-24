import React from 'react';

import type Confirmation from './confirmation';

type TopProperties = {
  children: string;
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
};

export type ButtonProps = TopProperties & {
  confirm?: Confirmation;
};

type Properties = TopProperties & {
  confirm?: React.ReactElement<Confirmation>;
};

export default class Button extends React.Component<Properties> {}
