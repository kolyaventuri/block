import {type Child} from '../constants/types';
import {isSlackComponentType} from '../components/base';

const getTransformerType = (element: Child): string | undefined => {
  if (typeof element === 'string') {
    return 'string';
  }

  if (element === null || element === undefined || typeof element === 'boolean') {
    return 'null';
  }

  if (Array.isArray(element)) {
    throw new TypeError('Cannot type arrays');
  }

  const {type} = element;

  if (typeof type === 'string') {
    return type;
  }

  if (isSlackComponentType(type)) {
    return type.slackType;
  }

  return undefined;
};

export default getTransformerType;
