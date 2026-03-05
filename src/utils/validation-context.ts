import {SlackblockValidationError} from '../errors';

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

export const report = (message: string, rule: string): void => {
  if (context.mode === 'off') {
    return;
  }

  const path = getPath();

  if (context.mode === 'warn') {
    console.warn(`[slackblock] ${path}: ${message}`);
    return;
  }

  throw new SlackblockValidationError(message, path, rule);
};
