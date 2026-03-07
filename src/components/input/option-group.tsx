import {SlackComponent} from '../base';
import {type OptionElement} from '../../constants/types';

export type Props = {
  label: string;
  children: OptionElement | OptionElement[];
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
export default class OptionGroup extends SlackComponent {
  static slackType = 'OptionGroup';
  declare props: Props;
}
