import React from 'react';
import {Props as DatePickerProps} from '../../components/input/date-picker';
import {Element} from '../../constants/types';
import {TextType} from '../block/text';
import {ConfirmationType} from '../block/confirmation';
import {transform} from '..';
import Text from '../../components/block/text';

export type DatePickerType = {
  type: 'datepicker';
  action_id: string;
  placeholder?: TextType;
  initial_date?: string;
  confirm?: ConfirmationType;
};

export default (child: Element): DatePickerType => {
  const {actionId, placeholder, initialDate, confirm}: DatePickerProps = child.props;

  const res: DatePickerType = {
    type: 'datepicker',
    action_id: actionId
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
