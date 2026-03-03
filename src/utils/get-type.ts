import {type Child} from '../constants/types';

const getType = (element: Child): string => {
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

  const {slackType, displayName, name} = type as {
    slackType?: string;
    displayName?: string;
    name?: string;
  };

  return slackType ?? displayName ?? name ?? (type as unknown as string);
};

export default getType;
