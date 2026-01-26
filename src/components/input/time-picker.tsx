import React from 'react';

import type Confirmation from '../block/confirmation';

export type Props = {
  actionId: string;
  placeholder?: string;
  initialTime?: string;
  confirm?: React.ReactElement<Confirmation>;
  focusOnLoad?: boolean;
};

export default class TimePicker extends React.Component<Props> {
  static slackType = 'TimePicker';
}
