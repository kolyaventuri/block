import React from 'react';
import Text from './text';

type Props = {
  title: string;
  text: React.ReactElement<Text>;
  confirm: string;
  deny: string;
};

export default class Confirmation extends React.Component<Props> {}
