import {type Child, type Block} from '../constants/types';
import transformers from '../transformers';
import getType from '../utils/get-type';
import normalizeChildren from '../utils/normalize-children';
import {pushPath, popPath, report} from '../utils/validation-context';

/** Internal parser output — partial message assembled by the renderer. */
type ParsedMessage = {text?: string; blocks?: Block[]};

const appendTransformed = (value: unknown, blocks: Block[]): void => {
  if (value === null || value === undefined || typeof value === 'boolean') {
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      appendTransformed(item, blocks);
    }

    return;
  }

  blocks.push(value as Block);
};

const parseChildren = (children: Child): ParsedMessage => {
  if (typeof children === 'string') {
    return {text: children};
  }

  const normalizedChildren = normalizeChildren(children);

  const transformedBlocks: Block[] = [];
  for (const child of normalizedChildren) {
    const type = getType(child);
    const transformer = transformers[type];

    if (transformer) {
      pushPath(type);
      try {
        appendTransformed(transformer(child), transformedBlocks);
      } finally {
        popPath();
      }
    } else if (type !== 'null') {
      report(`No transformer for component type '${type}'.`, 'unknown-type');
    }
  }

  if (transformedBlocks.length === 0) {
    return {blocks: []};
  }

  return {blocks: transformedBlocks};
};

export default parseChildren;
