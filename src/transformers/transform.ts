import {type Element} from '../constants/types';
import getType from '../utils/get-type';
import getTransformerType from '../utils/get-transformer-type';
import {pushPath, popPath, report} from '../utils/validation-context';

import Transformers from './registry';

export const transform = (element: Element): unknown => {
  const type = getTransformerType(element);
  const component = getType(element);

  if (!type || !Transformers[type]) {
    report({
      message: `No transformer for component type '${component}'.`,
      rule: 'unsupported-child',
      subcode: 'unknown-type',
      component,
    });
    return undefined;
  }

  pushPath(type);
  try {
    return Transformers[type](element);
  } finally {
    popPath();
  }
};

export const transformElements = <T>(elements: readonly Element[]): T[] =>
  elements.flatMap(element => {
    const transformed = transform(element);
    return transformed === undefined ? [] : [transformed as T];
  });

export const transformOptional = <T>(element?: Element): T | undefined => {
  if (!element) {
    return undefined;
  }

  return transform(element) as T | undefined;
};
