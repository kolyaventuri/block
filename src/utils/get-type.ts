import {Child} from '../constants/types';

export default (element: Child): string => {
  if (typeof element === 'string') {
    return 'string';
  }

  if (Array.isArray(element)) {
    throw new TypeError('Cannot type arrays');
  }

  const {type} = element;
  const fn = type as () => void;

  return fn.name || type as string;
};
