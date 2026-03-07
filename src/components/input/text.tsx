import {SlackComponent} from '../base';

export type Props = {
  actionId: string;
  placeholder?: string;
  initial?: string;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
  focusOnLoad?: boolean;
  dispatchActionConfig?: {
    triggerActionsOn: Array<'on_enter_pressed' | 'on_character_entered'>;
  };
};

/**
 * A plain-text input field — used as the `element` prop inside `<Input>`.
 *
 * @example
 * ```tsx
 * <Input label="Your name" element={
 *   <TextInput
 *     actionId="name"
 *     placeholder="Jane Doe"
 *     maxLength={80}
 *     focusOnLoad
 *   />
 * } />
 * ```
 */
export default class TextInput extends SlackComponent {
  static slackType = 'TextInput';
  declare props: Props;
}
