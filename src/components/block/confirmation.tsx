import React from 'react';

import type Text from './text';

type TopProperties = {
  title: string;
  confirm: string;
  deny: string;
};

/* This is a dumb workaround to merging props */
export type ConfirmationProps = TopProperties & {
  children: React.ReactElement<Text>;
};

type Properties = ConfirmationProps;

export default class Confirmation extends React.Component<Properties> {
  static slackType = 'Confirmation';
}
