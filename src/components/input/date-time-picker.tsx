import React from 'react';

import type Confirmation from '../block/confirmation';

export type Props = {
  actionId: string;
  initialDateTime?: number;
  confirm?: React.ReactElement<Confirmation>;
};

export default class DateTimePicker extends React.Component<Props> {
  static slackType = 'DateTimePicker';
}
