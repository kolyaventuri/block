
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<JSX.Element | string>;
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
export default class RichTextPreformatted {
  static slackType = 'RichTextPreformatted';
  declare props: Props;
}
