import React from 'react';

import {type Props as DatePickerProperties} from '../../components/input/date-picker';
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type ConfirmationType} from '../block/confirmation';
import {transform} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong} from '../../utils/validation';

export type DatePickerType = {
  type: 'datepicker';
  action_id: string;
  placeholder?: TextType;
  initial_date?: string;
  confirm?: ConfirmationType;
  focus_on_load?: boolean;
};

const isValidDateString = (value: string): boolean => {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);

  if (month < 1 || month > 12) {
    return false;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  return date.getUTCFullYear() === year
    && date.getUTCMonth() === month - 1
    && date.getUTCDate() === day;
};

const transformDatePicker = (child: Element): DatePickerType => {
  const {actionId, placeholder, initialDate, confirm, focusOnLoad}: DatePickerProperties = child.props;

  warnIfTooLong('DatePicker action_id', actionId, 255);
  if (placeholder) {
    warnIfTooLong('DatePicker placeholder', placeholder, 150);
  }

  const res: DatePickerType = {
    type: 'datepicker',
    action_id: actionId,
  };

  if (placeholder) {
    res.placeholder = transform(<Text plainText>{placeholder}</Text>) as TextType;
  }

  if (initialDate) {
    if (!isValidDateString(initialDate)) {
      throw new Error('Date must be valid and in format YYYY-MM-DD.');
    }

    res.initial_date = initialDate;
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformDatePicker;
