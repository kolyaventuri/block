import React from 'react';

export type Props = {
  children: string;
  value: string;
  url?: string;
};

export default class Option extends React.Component<Props> {}
