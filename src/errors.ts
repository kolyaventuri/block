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
