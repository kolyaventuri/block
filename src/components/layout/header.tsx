import {SlackComponent} from '../base';

export type Props = {
  text: string;
  blockId?: string;
  emoji?: boolean;
};

/**
 * A header block — displays large, bold plain text at the top of a section.
 *
 * Maximum 150 characters.
 *
 * @example
 * ```tsx
 * <Header text="Deploy complete" emoji />
 * ```
 */
export default class Header extends SlackComponent {
  static slackType = 'Header';
  declare props: Props;
}
