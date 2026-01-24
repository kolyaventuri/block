import React from 'react';

import type Option from './option';

export type Props = {
  label: string;
  children: React.ReactElement<Option> | Array<React.ReactElement<Option>>;
};

export default class OptionGroup extends React.Component<Props> {}
