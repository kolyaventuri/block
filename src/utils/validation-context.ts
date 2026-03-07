import {SlackblockValidationError, type ValidationIssue, type ValidationRule} from '../errors';

/**
 * Controls how SlackBlock handles validation violations during rendering.
 *
 * - `'warn'`   — emit `console.warn` messages (default)
 * - `'strict'` — throw `SlackblockValidationError`
 * - `'off'`    — suppress all validation
 */
export type ValidationMode = 'off' | 'warn' | 'strict';
export type ValidationReporter = (issue: ValidationIssue) => void;

type ValidationContext = {
  mode: ValidationMode;
  path: string[];
  reporter?: ValidationReporter;
};

const context: ValidationContext = {
  mode: 'warn',
  path: [],
  reporter: undefined,
};

export const initContext = (mode: ValidationMode, reporter?: ValidationReporter): void => {
  context.mode = mode;
  context.path = [];
  context.reporter = reporter;
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
    if (context.reporter) {
      context.reporter(issue);
    } else {
      console.warn(`[slackblock] ${issue.path}: ${issue.message}`);
    }

    return;
  }

  throw new SlackblockValidationError(issue);
};
