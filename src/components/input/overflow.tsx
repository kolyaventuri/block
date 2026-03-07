import {SlackComponent} from '../base';
import {type ConfirmationElement, type OptionElement} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  actionId: string;
  children: SingleOrArray<OptionElement>;
  confirm?: ConfirmationElement;
};

/**
 * An overflow menu — the "⋯" button that reveals a list of options.
 *
 * Requires at least 2 `<Option>` children. Options can include a `url` to open a link.
 *
 * @example
 * ```tsx
 * <Overflow actionId="more">
 *   <Option value="edit">Edit</Option>
 *   <Option value="delete">Delete</Option>
 *   <Option value="docs" url="https://example.com/docs">View docs</Option>
 * </Overflow>
 * ```
 */
export default class Overflow extends SlackComponent {
  static slackType = 'Overflow';
  declare props: Props;
}
