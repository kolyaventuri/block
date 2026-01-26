import {type Element} from '../../constants/types';
import {type Props as DateTimePickerProperties} from '../../components/input/date-time-picker';
import {type ConfirmationType} from '../block/confirmation';
import {transform} from '..';
import {warnIfTooLong} from '../../utils/validation';

export type DateTimePickerType = {
  type: 'datetimepicker';
  action_id: string;
  initial_date_time?: number;
  confirm?: ConfirmationType;
  focus_on_load?: boolean;
};

const transformDateTimePicker = (child: Element): DateTimePickerType => {
  const {actionId, initialDateTime, confirm, focusOnLoad}: DateTimePickerProperties = child.props;

  warnIfTooLong('DateTimePicker action_id', actionId, 255);

  const res: DateTimePickerType = {
    type: 'datetimepicker',
    action_id: actionId,
  };

  if (initialDateTime !== undefined) {
    if (!Number.isInteger(initialDateTime)) {
      throw new TypeError('DateTime must be a unix timestamp in seconds.');
    }

    res.initial_date_time = initialDateTime;
  }

  if (confirm) {
    res.confirm = transform(confirm as Element) as ConfirmationType;
  }

  if (focusOnLoad !== undefined) {
    res.focus_on_load = focusOnLoad;
  }

  return res;
};

export default transformDateTimePicker;
