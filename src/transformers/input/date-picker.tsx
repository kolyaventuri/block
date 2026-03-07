
import {type Props as DatePickerProperties} from '../../components/input/date-picker';
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type ConfirmationType} from '../block/confirmation';
import {transform, transformOptional} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {report} from '../../utils/validation-context';
import {MAX_ACTION_ID_LENGTH, MAX_PLACEHOLDER_LENGTH} from '../../constants/limits';

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
  const {actionId, placeholder, initialDate, confirm, focusOnLoad} = child.props as DatePickerProperties;

  requireField('actionId', actionId);
  warnIfTooLong('DatePicker action_id', actionId, MAX_ACTION_ID_LENGTH);
  if (placeholder) {
    warnIfTooLong('DatePicker placeholder', placeholder, MAX_PLACEHOLDER_LENGTH);
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
      report({
        message: 'Date must be valid and in format YYYY-MM-DD.',
        rule: 'invalid-format',
        subcode: 'invalid-date-format',
        field: 'initialDate',
      });
    }

    res.initial_date = initialDate;
  }

  if (confirm) {
    const transformedConfirm = transformOptional<ConfirmationType>(confirm as Element);
    if (transformedConfirm) {
      res.confirm = transformedConfirm;
    }
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformDatePicker;
