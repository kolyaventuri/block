import {Child} from '../constants/types';

type TransformersType = {
  [index: string]: (child: Child) => {};
};

const Transformers: TransformersType = {};

export default Transformers;
