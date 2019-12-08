import React from 'react';
import Option from './option';

export type Props = {
  label: string;
  children: React.ReactElement<Option> | React.ReactElement<Option>[];
};

export default class OptionGroup extends React.Component<Props> {}
