import {Child} from '../constants/types';
import {ARRAY} from '../constants/special-types';

export default (element: Child): string => {
  if (typeof element === 'string') {
    return 'string';
  }

  if (element === null) {
    return 'null';
  }

  if (Array.isArray(element)) {
    return ARRAY;
  }

  const {type} = element;
  const fn = type as () => void;

  return fn.name || type as string;
};
