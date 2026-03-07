import {SlackblockValidationError, type ValidationIssue, type ValidationRule} from '../errors';

/**
 * Controls how SlackBlock handles validation violations during rendering.
 *
 * - `'warn'`   — emit `console.warn` messages (default)
 * - `'strict'` — throw `SlackblockValidationError`
 * - `'off'`    — suppress all validation
 */
export type ValidationMode = 'off' | 'warn' | 'strict';

type ValidationContext = {
  mode: ValidationMode;
  path: string[];
};

const context: ValidationContext = {
  mode: 'warn',
  path: [],
};

export const initContext = (mode: ValidationMode): void => {
  context.mode = mode;
  context.path = [];
};

export const pushPath = (segment: string): void => {
  context.path.push(segment);
};

export const popPath = (): void => {
  context.path.pop();
};

const getPath = (): string => context.path.join(' > ');

type ReportInput = {
  message: string;
  rule: ValidationRule;
  subcode?: string;
  component?: string;
  field?: string;
};

const getCurrentComponent = (): string | undefined => {
  for (let index = context.path.length - 1; index >= 0; index--) {
    const segment = context.path[index];

    if (segment !== 'Message') {
      return segment;
    }
  }

  return context.path.at(-1);
};

const toIssue = (input: ReportInput): ValidationIssue => ({
  ...input,
  path: getPath(),
  component: input.component ?? getCurrentComponent(),
});

export const report = (input: ReportInput): void => {
  if (context.mode === 'off') {
    return;
  }

  const issue = toIssue(input);

  if (context.mode === 'warn') {
    console.warn(`[slackblock] ${issue.path}: ${issue.message}`);
    return;
  }

  throw new SlackblockValidationError(issue);
};
