
export type Props = {
  actionId: string;
  placeholder?: string;
  initialTime?: string;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

/**
 * A time picker — a clock-style time selector.
 *
 * `initialTime` must be in `HH:mm` (24-hour) format.
 *
 * @example
 * ```tsx
 * <Input label="Meeting time" element={
 *   <TimePicker actionId="meeting_time" initialTime="09:00" />
 * } />
 * ```
 */
export default class TimePicker {
  static slackType = 'TimePicker';
  declare props: Props;
}
