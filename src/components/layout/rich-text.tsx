import {SlackComponent} from '../base';
import {type RichTextBlockChild} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

export type RichTextElement = Record<string, unknown>;

export type Props = {
  elements?: RichTextElement[];
  children?: SingleOrArray<RichTextBlockChild>;
  blockId?: string;
};

/**
 * A rich text block — contains formatted text with inline styling, lists,
 * quotes, and preformatted code.
 *
 * Accepts `<RichTextSection>`, `<RichTextList>`, `<RichTextQuote>`, and
 * `<RichTextPreformatted>` as children.
 *
 * @example
 * ```tsx
 * <RichText>
 *   <RichTextSection>
 *     <RichTextText style={{ bold: true }}>Hello</RichTextText>
 *   </RichTextSection>
 * </RichText>
 * ```
 */
export default class RichText extends SlackComponent {
  static slackType = 'RichText';
  declare props: Props;
}
