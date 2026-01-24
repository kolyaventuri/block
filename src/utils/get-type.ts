import {type Child} from '../constants/types';

const getType = (element: Child): string => {
  if (typeof element === 'string') {
    return 'string';
  }

  if (element === null) {
    return 'null';
  }

  if (Array.isArray(element)) {
    throw new TypeError('Cannot type arrays');
  }

  const {type} = element;
  const function_ = type as () => void;

  return function_.name || type as string;
};

export default getType;
