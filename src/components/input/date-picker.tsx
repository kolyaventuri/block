import React from 'react';

import type Confirmation from '../block/confirmation';

export type Props = {
  actionId: string;
  placeholder?: string;
  initialDate?: string;
  confirm?: React.ReactElement<Confirmation>;
  focusOnLoad?: boolean;
};

export default class DatePicker extends React.Component<Props> {
  static slackType = 'DatePicker';
}
