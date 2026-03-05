/**
 * Error thrown by `render()` / `renderToBlocks()` when `validate: 'strict'`
 * is set and a validation rule is violated.
 *
 * @example
 * ```ts
 * import { SlackblockValidationError } from 'slackblock';
 *
 * try {
 *   render(<Message>...</Message>, { validate: 'strict' });
 * } catch (err) {
 *   if (err instanceof SlackblockValidationError) {
 *     console.error(err.message); // "Message > Header: Header text exceeds 150 characters."
 *     console.error(err.path);    // "Message > Header"
 *     console.error(err.rule);    // "too-long"
 *   }
 * }
 * ```
 */
export class SlackblockValidationError extends Error {
  readonly path: string;
  readonly rule: string;
  constructor(message: string, path: string, rule: string) {
    super(`${path}: ${message}`);
    this.name = 'SlackblockValidationError';
    this.path = path;
    this.rule = rule;
  }
}
