import {SlackComponent} from '../base';
import {type SingleOrArray} from '../../utils/type-helpers';
import {type Child} from '../../constants/types';

export type Props = {
  children: SingleOrArray<Child>;
};

/**
 * A pass-through utility component that renders its children without adding
 * any wrapper block. Useful for conditional rendering and mapping arrays
 * without introducing an extra layout layer.
 *
 * @example
 * ```tsx
 * <Message text="Hello">
 *   {isAdmin && (
 *     <Container>
 *       <Section text={<Text>Admin section</Text>} />
 *       <Divider />
 *     </Container>
 *   )}
 * </Message>
 * ```
 */
export default class Container extends SlackComponent {
  static slackType = 'Container';
  declare props: Props;
}
