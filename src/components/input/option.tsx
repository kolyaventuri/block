import React from 'react';

export type Props = {
  text: string;
  value: string;
  url?: string;
};

export default class Option extends React.Component<Props> {}
