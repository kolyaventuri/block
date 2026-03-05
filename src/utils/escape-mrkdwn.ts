/**
 * Escapes Slack mrkdwn special characters in a string to prevent unintended
 * formatting. Use this when inserting untrusted user content into mrkdwn fields.
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
