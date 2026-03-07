import {SlackComponent} from '../base';
import {type ContextElement} from '../../constants/types';

export type ImageOrText = ContextElement;

export type Props = {
  children: ImageOrText | ImageOrText[];
  blockId?: string;
};

/**
 * A context block — displays small text and images in a horizontal row.
 *
 * Accepts up to 10 `<Text>` or `<Image>` elements as children.
 *
 * @example
 * ```tsx
 * <Context>
 *   <Image url="https://example.com/avatar.png" alt="avatar" />
 *   <Text>Posted by *Jane Doe*</Text>
 * </Context>
 * ```
 */
export default class Context extends SlackComponent {
  static slackType = 'Context';
  declare props: Props;
}
