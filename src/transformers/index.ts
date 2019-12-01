import {Child, Element} from '../constants/types';
import Section from './layout/section';
import Text from './block/text';
import getType from '../utils/get-type';

type TransformersType = {
  [index: string]: (child: Child) => {};
};

const Transformers: TransformersType = {
  Section,
  Text
};

export default Transformers;

export const transform = (elem: Element): {[index: string]: any} => {
  const type = getType(elem);
  
  if (!Transformers[type]) {
    throw new Error(`No transformer exists for type '${type}'`);
  }

  return Transformers[type](elem);
};
