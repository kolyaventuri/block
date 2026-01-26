import React from 'react';

import type Confirmation from './confirmation';

type TopProperties = {
  children: string;
  actionId: string;
  url?: string;
  value?: string;
  style?: 'primary' | 'danger';
  accessibilityLabel?: string;
};

export type ButtonProps = TopProperties & {
  confirm?: React.ReactElement<Confirmation>;
};

type Properties = ButtonProps;

export default class Button extends React.Component<Properties> {
  static slackType = 'Button';
}
