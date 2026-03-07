import {SlackComponent} from '../base';
import {type RichTextInlineChild} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<RichTextInlineChild>;
};

/**
 * A preformatted code block in rich text — monospaced, no line wrapping.
 *
 * @example
 * ```tsx
 * <RichTextPreformatted>
 *   <RichTextText style={{ code: true }}>const x = 1;</RichTextText>
 * </RichTextPreformatted>
 * ```
 */
export default class RichTextPreformatted extends SlackComponent {
  static slackType = 'RichTextPreformatted';
  declare props: Props;
}
