
export type Props = {
  label: string;
  children: JSX.Element | JSX.Element[];
};

/**
 * Groups options under a labeled heading inside a `<Select>`.
 *
 * @example
 * ```tsx
 * <Select placeholder="Pick one" actionId="grouped">
 *   <OptionGroup label="Fruits">
 *     <Option value="apple">Apple</Option>
 *   </OptionGroup>
 * </Select>
 * ```
 */
export default class OptionGroup {
  static slackType = 'OptionGroup';
  declare props: Props;
}
