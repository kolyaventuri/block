
import {type RichTextStyle} from './types';

export type Props = {
  url: string;
  children?: string;
  style?: RichTextStyle;
};

/**
 * A hyperlink within rich text. Displays `children` as the link text,
 * or falls back to the URL if `children` is omitted.
 *
 * @example
 * ```tsx
 * <RichTextLink url="https://example.com" style={{ bold: true }}>Visit us</RichTextLink>
 * ```
 */
export default class RichTextLink {
  static slackType = 'RichTextLink';
  declare props: Props;
}
