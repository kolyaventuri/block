const warn = (message: string): void => {
  console.warn(message);
};

export const warnIfTooLong = (name: string, value: string | undefined, max: number): void => {
  if (!value) {
    return;
  }

  if (value.length > max) {
    warn(`${name} exceeds ${max} characters.`);
  }
};

export const warnIfTooMany = (name: string, values: unknown[] | undefined, max: number): void => {
  if (!values) {
    return;
  }

  if (values.length > max) {
    warn(`${name} exceeds ${max} items.`);
  }
};
