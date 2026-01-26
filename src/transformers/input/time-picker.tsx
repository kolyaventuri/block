import React from 'react';

import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type ConfirmationType} from '../block/confirmation';
import {type Props as TimePickerProperties} from '../../components/input/time-picker';
import {transform} from '..';
import Text from '../../components/block/text';
import {warnIfTooLong} from '../../utils/validation';

export type TimePickerType = {
  type: 'timepicker';
  action_id: string;
  placeholder?: TextType;
  initial_time?: string;
  confirm?: ConfirmationType;
  focus_on_load?: boolean;
};

const isValidTimeString = (value: string): boolean => {
  const match = /^(\d{2}):(\d{2})$/.exec(value);
  if (!match) {
    return false;
  }

  const hours = Number(match[1]);
  const minutes = Number(match[2]);

  return hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
};

const transformTimePicker = (child: Element): TimePickerType => {
  const {actionId, placeholder, initialTime, confirm, focusOnLoad}: TimePickerProperties = child.props;

  warnIfTooLong('TimePicker action_id', actionId, 255);
  if (placeholder) {
    warnIfTooLong('TimePicker placeholder', placeholder, 150);
  }

  const res: TimePickerType = {
    type: 'timepicker',
    action_id: actionId,
  };

  if (placeholder) {
    res.placeholder = transform(<Text plainText>{placeholder}</Text>) as TextType;
  }

  if (initialTime) {
    if (!isValidTimeString(initialTime)) {
      throw new Error('Time must be valid and in format HH:MM.');
    }

    res.initial_time = initialTime;
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformTimePicker;
