
import {type BlockElement} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

type TextElement = JSX.Element;

export type Props = {
  text: JSX.Element;
  blockId?: string;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- We actually want to handle null children
  children?: SingleOrArray<TextElement | null | undefined | false>;
  accessory?: BlockElement;
};

/**
 * A section block — the most versatile layout block.
 *
 * Displays a primary text label, optional two-column fields (children),
 * and an optional accessory element on the right.
 *
 * @example
 * ```tsx
 * <Section
 *   text={<Text>Hello *world*</Text>}
 *   accessory={<Button actionId="more">More</Button>}
 * >
 *   <Text plainText>Field A</Text>
 *   <Text plainText>Field B</Text>
 * </Section>
 * ```
 */
export default class Section {
  static slackType = 'Section';
  declare props: Props;
}
