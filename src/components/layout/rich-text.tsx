
import {type SingleOrArray} from '../../utils/type-helpers';

export type RichTextElement = Record<string, any>;

export type Props = {
  elements?: RichTextElement[];
  children?: SingleOrArray<JSX.Element | string>;
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
export default class RichText {
  static slackType = 'RichText';
  declare props: Props;
}
