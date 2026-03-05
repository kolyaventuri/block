import {type Element} from '../constants/types';
import getType from '../utils/get-type';
import {pushPath, popPath} from '../utils/validation-context';

import Transformers from './registry';

export const transform = (element: Element): unknown => {
  const type = getType(element);

  if (!Transformers[type]) {
    throw new Error(`No transformer exists for type '${type}'`);
  }

  pushPath(type);
  try {
    return Transformers[type](element);
  } finally {
    popPath();
  }
};
