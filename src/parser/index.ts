import {type Child, type Block, type SlackMessageDraft} from '../constants/types';
import transformers from '../transformers';
import getType from '../utils/get-type';
import normalizeChildren from '../utils/normalize-children';

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

const parseChildren = (children: Child): SlackMessageDraft => {
  if (typeof children === 'string') {
    return {text: children};
  }

  const normalizedChildren = normalizeChildren(children);

  const transformedBlocks: Block[] = [];
  for (const child of normalizedChildren) {
    const type = getType(child);
    const transformer = transformers[type];

    if (transformer) {
      appendTransformed(transformer(child), transformedBlocks);
    } else if (type !== 'null') {
      console.warn(`No transformer for child type '${type}' exists and will be ignored.`);
    }
  }

  if (transformedBlocks.length === 0) {
    return {blocks: []};
  }

  return {blocks: transformedBlocks};
};

export default parseChildren;
