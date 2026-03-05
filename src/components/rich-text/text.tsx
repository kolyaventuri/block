
import {type RichTextStyle} from './types';

export type Props = {
  children: string;
  style?: RichTextStyle;
};

/**
 * Styled text within a rich text block.
 *
 * Apply bold, italic, strikethrough, or inline code styling via `style`.
 *
 * @example
 * ```tsx
 * <RichTextText style={{ bold: true, italic: true }}>Bold italic</RichTextText>
 * <RichTextText style={{ code: true }}>inline code</RichTextText>
 * ```
 */
export default class RichTextText {
  static slackType = 'RichTextText';
  declare props: Props;
}
