import {SlackComponent} from '../base';
import {type InputBlockElement} from '../../constants/types';

export type Props = {
  label: string;
  element: InputBlockElement;
  hint?: string;
  optional?: boolean;
  blockId?: string;
};

/**
 * An input block — wraps a single interactive input element with a label.
 *
 * Pass the input element via the `element` prop (not as a child).
 *
 * @example
 * ```tsx
 * <Input
 *   label="Your name"
 *   hint="Use your full name"
 *   element={<TextInput actionId="name" placeholder="Jane Doe" />}
 * />
 * ```
 */
export default class Input extends SlackComponent {
  static slackType = 'Input';
  declare props: Props;
}
