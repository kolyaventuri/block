
export type Props = {
  timestamp: number;
  format: string;
  fallback: string;
};

/**
 * Renders a formatted date that adapts to each viewer's local timezone.
 *
 * `timestamp` is a Unix timestamp. `format` uses Slack's date format tokens
 * (e.g. `"{date_long} at {time}"`). `fallback` is shown if rendering fails.
 *
 * @see https://api.slack.com/reference/surfaces/formatting#date-formatting
 *
 * @example
 * ```tsx
 * <RichTextDate
 *   timestamp={1700000000}
 *   format="{date_long} at {time}"
 *   fallback="Nov 14, 2023 at 22:13"
 * />
 * ```
 */
export default class RichTextDate {
  static slackType = 'RichTextDate';
  declare props: Props;
}
