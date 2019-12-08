import {Child, Block, SlackMessage} from '../constants/types';
import transformers from '../transformers';
import getType from '../utils/get-type';

export default (children: Child): SlackMessage => {
  if (typeof children === 'string') {
    return {text: children};
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  const transformedBlocks: any[] = [];
  for (const child of children) {
    const type = getType(child);
    const transformer = transformers[type];

    if (transformer) {
      transformedBlocks.push(transformer(child));
    } else {
      console.warn(`No transformer for child type '${type}' exists and will be ignored.`);
    }
  }

  const result: {blocks?: Block[]} = {};
  if (transformedBlocks.length > 0) {
    result.blocks = transformedBlocks;
  }

  return result;
};
