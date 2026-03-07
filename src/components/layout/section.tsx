
import {type BlockElement} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

type TextElement = JSX.Element | string;
type FieldElement = JSX.Element | string;

export type Props = {
  text?: TextElement;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- We actually want to handle null fields
  fields?: SingleOrArray<FieldElement | null | undefined | false>;
  blockId?: string;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- We actually want to handle null children
  children?: SingleOrArray<FieldElement | null | undefined | false>;
  accessory?: BlockElement;
  expand?: boolean;
};

/**
 * A section block — the most versatile layout block.
 *
 * Displays primary text, optional two-column fields, and an optional
 * accessory element on the right.
 *
 * `fields` is the explicit API for section fields. Children are still
 * supported as a backward-compatible alias for fields.
 *
 * At least one of `text` or non-empty `fields` / children is required.
 *
 * @example
 * ```tsx
 * <Section text="Hello *world*" />
 *
 * <Section
 *   text={<Text>Hello *world*</Text>}
 *   fields={[<Text plainText>Field A</Text>, <Text plainText>Field B</Text>]}
 *   accessory={<Button actionId="more">More</Button>}
 * />
 *
 * <Section expand fields={<Text>Status</Text>} />
 * ```
 */
export default class Section {
  static slackType = 'Section';
  declare props: Props;
}
