
export type Props = {
  actionId: string;
  placeholder?: string;
  initialDate?: string;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

/**
 * A date picker — a calendar-style date selector.
 *
 * `initialDate` must be in `YYYY-MM-DD` format.
 *
 * @example
 * ```tsx
 * <Input label="Due date" element={
 *   <DatePicker actionId="due_date" initialDate="2024-12-31" />
 * } />
 * ```
 */
export default class DatePicker {
  static slackType = 'DatePicker';
  declare props: Props;
}
