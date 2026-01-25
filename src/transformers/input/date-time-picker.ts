import {type Element} from '../../constants/types';
import {type Props as DateTimePickerProperties} from '../../components/input/date-time-picker';
import {type ConfirmationType} from '../block/confirmation';
import {transform} from '..';

export type DateTimePickerType = {
  type: 'datetimepicker';
  action_id: string;
  initial_date_time?: number;
  confirm?: ConfirmationType;
};

const transformDateTimePicker = (child: Element): DateTimePickerType => {
  const {actionId, initialDateTime, confirm}: DateTimePickerProperties = child.props;

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

  return res;
};

export default transformDateTimePicker;
