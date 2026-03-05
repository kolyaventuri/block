
export type Props = {
  children: string;
  value: string;
  url?: string;
  description?: string;
};

/**
 * An option item for `<Select>`, `<Checkboxes>`, `<RadioGroup>`, or `<Overflow>`.
 *
 * The children (text) is the display label; `value` is sent in the action payload.
 *
 * @example
 * ```tsx
 * <Option value="opt_a" description="The first option">Option A</Option>
 * ```
 */
export default class Option {
  static slackType = 'Option';
  declare props: Props;
}
