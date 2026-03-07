import {SlackComponent} from '../base';
import {type RichTextInlineChild} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<RichTextInlineChild>;
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
export default class RichTextSection extends SlackComponent {
  static slackType = 'RichTextSection';
  declare props: Props;
}
