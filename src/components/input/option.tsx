import React from 'react';

export type Props = {
  children: string;
  value: string;
  url?: string;
  description?: string;
};

export default class Option extends React.Component<Props> {
  static slackType = 'Option';
}
