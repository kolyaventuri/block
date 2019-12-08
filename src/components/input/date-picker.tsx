import React from 'react';
import Confirmation from '../block/confirmation';

export type Props = {
  actionId: string;
  placeholder?: string;
  initialDate?: string;
  confirm?: React.ReactElement<Confirmation>;
};

export default class DatePicker extends React.Component<Props> {}
