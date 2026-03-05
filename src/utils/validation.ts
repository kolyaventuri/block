import {report} from './validation-context';

const toKebab = (name: string): string => name.replaceAll(/([A-Z])/g, '-$1').toLowerCase();

export const warnIfTooLong = (name: string, value: string | undefined, max: number): void => {
  if (!value) {
    return;
  }

  if (value.length > max) {
    report(`${name} exceeds ${max} characters.`, 'value-too-long');
  }
};

export const warnIfTooMany = (name: string, values: unknown[] | undefined, max: number): void => {
  if (!values) {
    return;
  }

  if (values.length > max) {
    report(`${name} exceeds ${max} items.`, 'too-many-items');
  }
};

export const requireField = (fieldName: string, value: unknown): void => {
  if (value === undefined || value === null || value === '') {
    report(`${fieldName} is required.`, `${toKebab(fieldName)}-required`);
  }
};
