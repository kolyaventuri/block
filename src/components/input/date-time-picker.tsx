import {SlackComponent} from '../base';

export type Props = {
  actionId: string;
  initialDateTime?: number;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

/**
 * A combined date and time picker.
 *
 * `initialDateTime` is a Unix timestamp (seconds since epoch).
 *
 * @example
 * ```tsx
 * <Input label="Scheduled at" element={
 *   <DateTimePicker actionId="scheduled_at" initialDateTime={1700000000} />
 * } />
 * ```
 */
export default class DateTimePicker extends SlackComponent {
  static slackType = 'DateTimePicker';
  declare props: Props;
}
