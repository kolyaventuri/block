import React from 'react';

export type Props = {
  text: string;
  blockId?: string;
  emoji?: boolean;
};

export default class Header extends React.Component<Props> {
  static slackType = 'Header';
}
