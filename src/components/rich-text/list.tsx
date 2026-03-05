
import {type SingleOrArray} from '../../utils/type-helpers';

import {type RichTextListStyle} from './types';

export type Props = {
  style: RichTextListStyle;
  children: SingleOrArray<JSX.Element | string>;
  indent?: number;
  border?: number;
};

/**
 * A bulleted or numbered list in rich text.
 *
 * Each list item should be a `<RichTextSection>` child.
 * Supports indentation (`indent` 0–6) and border styling.
 *
 * @example
 * ```tsx
 * <RichTextList style="bullet" indent={1}>
 *   <RichTextSection><RichTextText>Item one</RichTextText></RichTextSection>
 *   <RichTextSection><RichTextText>Item two</RichTextText></RichTextSection>
 * </RichTextList>
 * ```
 */
export default class RichTextList {
  static slackType = 'RichTextList';
  declare props: Props;
}
