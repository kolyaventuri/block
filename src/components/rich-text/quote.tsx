
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<JSX.Element | string>;
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
export default class RichTextQuote {
  static slackType = 'RichTextQuote';
  declare props: Props;
}
