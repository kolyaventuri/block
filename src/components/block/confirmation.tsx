import React from 'react';
import Text from './text';

type TopProps = {
  title: string;
  confirm: string;
  deny: string;
};

/* This is a dumb workaround to merging props */
export type ConfirmationProps = TopProps & {
  children: Text;
};

type Props = TopProps & {
  children: React.ReactElement<Text>;
};

export default class Confirmation extends React.Component<Props> {}
