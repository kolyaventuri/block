import {SlackComponent} from '../base';
import {type ConfirmationElement, type OptionElement} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  actionId: string;
  children: SingleOrArray<OptionElement>;
  initialOptions?: OptionElement[];
  confirm?: ConfirmationElement;
  focusOnLoad?: boolean;
};

/**
 * A checkbox group — allows multiple selections from a list of options.
 *
 * Pass `<Option>` elements as children. Pre-check options via `initialOptions`.
 *
 * @example
 * ```tsx
 * <Checkboxes actionId="prefs" initialOptions={[slackOption]}>
 *   <Option value="emails">Emails</Option>
 *   <Option value="slack">Slack</Option>
 * </Checkboxes>
 * ```
 */
export default class Checkboxes extends SlackComponent {
  static slackType = 'Checkboxes';
  declare props: Props;
}
