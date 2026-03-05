
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  actionId: string;
  children: SingleOrArray<JSX.Element>;
  initialOption?: JSX.Element;
  confirm?: JSX.Element;
  focusOnLoad?: boolean;
};

/**
 * A radio button group — allows exactly one selection from a list of options.
 *
 * Pass `<Option>` elements as children. Pre-select an option via `initialOption`.
 *
 * @example
 * ```tsx
 * <RadioGroup actionId="size" initialOption={<Option value="m">Medium</Option>}>
 *   <Option value="s">Small</Option>
 *   <Option value="m">Medium</Option>
 *   <Option value="l">Large</Option>
 * </RadioGroup>
 * ```
 */
export default class RadioGroup {
  static slackType = 'RadioGroup';
  declare props: Props;
}
