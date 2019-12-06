import {Child, Element} from '../constants/types';
import getType from '../utils/get-type';

import Text from './block/text';
import Confirmation from './block/confirmation';
import Button from './block/button';

import Section from './layout/section';
import Actions from './layout/actions';

type TransformersType = {
  [index: string]: (child: Child) => {};
};

const Transformers: TransformersType = {
  Section,
  Actions,

  Text,
  Confirmation,
  Button
};

export default Transformers;

export const transform = (elem: Element): {[index: string]: any} => {
  const type = getType(elem);

  if (!Transformers[type]) {
    throw new Error(`No transformer exists for type '${type}'`);
  }

  return Transformers[type](elem);
};
