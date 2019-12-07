import {Child, Element} from '../constants/types';
import getType from '../utils/get-type';

import Text from './block/text';
import Confirmation from './block/confirmation';
import Button from './block/button';
import Image from './block/image';

import Section from './layout/section';
import Actions from './layout/actions';
import Context from './layout/context';
import Divider from './layout/divider';
import File from './layout/file';
import ImageLayout from './layout/image';
import Input from './layout/input';

import TextInput from './input/text';
import DatePicker from './input/date-picker';
import Option from './input/option';

type TransformersType = {
  [index: string]: (child: Child) => {};
};

const Transformers: TransformersType = {
  Section,
  Actions,
  Context,
  Divider,
  File,
  ImageLayout,
  Input,

  Text,
  Confirmation,
  Button,
  Image,

  TextInput,
  DatePicker,

  Option
};

export default Transformers;

export const transform = (elem: Element): {[index: string]: any} => {
  const type = getType(elem);

  if (!Transformers[type]) {
    throw new Error(`No transformer exists for type '${type}'`);
  }

  return Transformers[type](elem);
};
