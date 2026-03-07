import {SlackComponent} from '../base';
import {type RichTextInlineChild} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<RichTextInlineChild>;
};

/**
 * A blockquote in rich text — displays content with a visual left-border indent.
 *
 * @example
 * ```tsx
 * <RichTextQuote>
 *   <RichTextText>This is a quoted passage.</RichTextText>
 * </RichTextQuote>
 * ```
 */
export default class RichTextQuote extends SlackComponent {
  static slackType = 'RichTextQuote';
  declare props: Props;
}
