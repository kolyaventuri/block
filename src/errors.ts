export type ValidationRule =
  | 'required-field'
  | 'too-long'
  | 'too-many'
  | 'invalid-format'
  | 'invalid-value'
  | 'invalid-structure'
  | 'unsupported-prop'
  | 'unsupported-child';

export type ValidationIssue = {
  rule: ValidationRule;
  subcode?: string;
  message: string;
  path: string;
  component?: string;
  field?: string;
};

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
 *     console.error(err.subcode); // "value-too-long"
 *   }
 * }
 * ```
 */
export class SlackblockValidationError extends Error {
  readonly path: string;
  readonly rule: ValidationRule;
  readonly subcode?: string;
  readonly component?: string;
  readonly field?: string;
  readonly issue: ValidationIssue;

  constructor(issue: ValidationIssue) {
    super(`${issue.path}: ${issue.message}`);
    this.name = 'SlackblockValidationError';
    this.path = issue.path;
    this.rule = issue.rule;
    this.subcode = issue.subcode;
    this.component = issue.component;
    this.field = issue.field;
    this.issue = issue;
  }
}
