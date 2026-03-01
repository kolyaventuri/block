import {type Child} from '../constants/types';

const normalizeChildren = (children: Child): Child[] => {
  const result: Child[] = [];
  const stack = Array.isArray(children) ? [...children] : [children];

  while (stack.length > 0) {
    const child = stack.shift();

    if (child === null || child === undefined || typeof child === 'boolean') {
      continue;
    }

    if (Array.isArray(child)) {
      stack.unshift(...child);
      continue;
    }

    result.push(child);
  }

  return result;
};

export default normalizeChildren;
