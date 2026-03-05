
export type Props = {
  blockId?: string;
};

/**
 * A divider block — renders a horizontal rule between blocks.
 *
 * @example
 * ```tsx
 * <Divider />
 * ```
 */
export default class Divider {
  static slackType = 'Divider';
  declare props: Props;
}
