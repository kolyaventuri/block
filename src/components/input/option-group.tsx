import React from 'react';
import Option from './option';

export type Props = {
  label: string;
  options: React.ReactElement<Option>;
};

export default class OptionGroup extends React.Component<Props> {}
