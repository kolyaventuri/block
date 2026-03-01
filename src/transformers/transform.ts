import {type Element} from '../constants/types';
import getType from '../utils/get-type';

import Transformers from './registry';

export const transform = (element: Element): Record<string, any> => {
  const type = getType(element);

  if (!Transformers[type]) {
    throw new Error(`No transformer exists for type '${type}'`);
  }

  return Transformers[type](element) as Record<string, any>;
};
