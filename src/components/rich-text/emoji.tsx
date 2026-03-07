import {SlackComponent} from '../base';

export type Props = {
  name: string;
};

/**
 * Renders an emoji by name in rich text.
 *
 * @example
 * ```tsx
 * <RichTextEmoji name="wave" />
 * ```
 */
export default class RichTextEmoji extends SlackComponent {
  static slackType = 'RichTextEmoji';
  declare props: Props;
}
