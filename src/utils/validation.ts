import {report} from './validation-context';

const toKebab = (name: string): string => name.replaceAll(/([A-Z])/g, '-$1').toLowerCase();
const isMissing = (value: unknown): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string') {
    return value === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  return false;
};

export const warnIfTooLong = (name: string, value: string | undefined, max: number): void => {
  if (!value) {
    return;
  }

  if (value.length > max) {
    report({
      message: `${name} exceeds ${max} characters.`,
      rule: 'too-long',
      subcode: 'value-too-long',
    });
  }
};

export const warnIfTooMany = (name: string, values: unknown[] | undefined, max: number): void => {
  if (!values) {
    return;
  }

  if (values.length > max) {
    report({
      message: `${name} exceeds ${max} items.`,
      rule: 'too-many',
      subcode: 'too-many-items',
    });
  }
};

export const requireField = (fieldName: string, value: unknown): void => {
  if (isMissing(value)) {
    report({
      message: `${fieldName} is required.`,
      rule: 'required-field',
      subcode: `${toKebab(fieldName)}-required`,
      field: fieldName,
    });
  }
};

export const requireOneOf = (fieldNames: string[], values: unknown[]): void => {
  if (values.some(value => !isMissing(value))) {
    return;
  }

  report({
    message: `At least one of ${fieldNames.join(' or ')} is required.`,
    rule: 'invalid-structure',
    subcode: `${fieldNames.map(fieldName => toKebab(fieldName)).join('-or-')}-required`,
  });
};
