/**
 * Escapes Slack mrkdwn special characters in a string to prevent unintended
 * formatting. Use this for untrusted content that will be inserted into mrkdwn
 * fields. SlackBlock does not automatically escape every string for you.
 *
 * Escapes: `&` `<` `>` `*` `_` `~` `` ` ``
 *
 * @example
 * ```ts
 * import { escapeMrkdwn } from 'slackblock';
 *
 * const safe = escapeMrkdwn('Hello *world* <script>');
 * // → "Hello \u200B*world\u200B* &lt;script&gt;"
 * ```
 */
export const escapeMrkdwn = (text: string): string =>
  text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll(/[*_~`]/g, '\u200B$&');
