import {SlackComponent} from '../base';

export type Props = {
  children: string;
  plainText?: boolean;
  emoji?: boolean;
  verbatim?: boolean;
};

/**
 * A text object — renders as `mrkdwn` (default) or `plain_text`.
 *
 * Used as the `text` prop on `<Section>`, `<Header>`, inside `<Context>`,
 * and as a child of `<Section>` for fields.
 *
 * @example
 * ```tsx
 * <Text>Hello *world*</Text>
 * <Text plainText emoji>Hello :wave:</Text>
 * ```
 */
export default class Text extends SlackComponent {
  static slackType = 'Text';
  declare props: Props;
}
