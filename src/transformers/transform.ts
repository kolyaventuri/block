import {type Element} from '../constants/types';
import getType from '../utils/get-type';
import {pushPath, popPath, report} from '../utils/validation-context';

import Transformers from './registry';

export const transform = (element: Element): unknown => {
  const type = getType(element);

  if (!Transformers[type]) {
    report(`No transformer for component type '${type}'.`, 'unknown-type');
    return {};
  }

  pushPath(type);
  try {
    return Transformers[type](element);
  } finally {
    popPath();
  }
};
