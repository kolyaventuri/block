import React from 'react';

import {type Props as DatePickerProperties} from '../../components/input/date-picker';
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type ConfirmationType} from '../block/confirmation';
import {transform} from '..';
import Text from '../../components/block/text';

export type DatePickerType = {
  type: 'datepicker';
  action_id: string;
  placeholder?: TextType;
  initial_date?: string;
  confirm?: ConfirmationType;
};

const transformDatePicker = (child: Element): DatePickerType => {
  const {actionId, placeholder, initialDate, confirm}: DatePickerProperties = child.props;

  const res: DatePickerType = {
    type: 'datepicker',
    action_id: actionId,
  };

  if (placeholder) {
    res.placeholder = transform(<Text plainText>{placeholder}</Text>) as TextType;
  }

  if (initialDate) {
    const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/g;
    const date = new Date(initialDate);
    if (Number.isNaN(date.getTime()) || !dateRegex.test(initialDate)) {
      throw new Error('Date must be valid and in format YYY-MM-DD.');
    }

    res.initial_date = initialDate;
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  return res;
};

export default transformDatePicker;
