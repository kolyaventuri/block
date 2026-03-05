
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<JSX.Element | string>;
};

/**
 * An inline container for rich text content within a `<RichText>` block.
 * Also used as individual list items inside `<RichTextList>`.
 *
 * @example
 * ```tsx
 * <RichTextSection>
 *   <RichTextText style={{ bold: true }}>Hello</RichTextText>
 *   {' world'}
 * </RichTextSection>
 * ```
 */
export default class RichTextSection {
  static slackType = 'RichTextSection';
  declare props: Props;
}
