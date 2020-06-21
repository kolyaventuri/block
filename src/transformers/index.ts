import {Child, Element} from '../constants/types';
import {ARRAY} from '../constants/special-types';
import getType from '../utils/get-type';

import Text from './block/text';
import Confirmation from './block/confirmation';
import Button from './block/button';
import Image from './block/image';

import Container from './layout/container';
import Section from './layout/section';
import Actions from './layout/actions';
import Context from './layout/context';
import Divider from './layout/divider';
import File from './layout/file';
import ImageLayout from './layout/image';
import Input from './layout/input';

import TextInput from './input/text';
import DatePicker from './input/date-picker';
import Select from './input/select';
import Option from './input/option';
import OptionGroup from './input/option-group';
import Overflow from './input/overflow';
import RadioGroup from './input/radio-group';

type TransformersType = {
  [index: string]: (child: Child) => {};
};

type TransformResult = {[index: string]: any};

const Transformers: TransformersType = {
  Container,
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
  Select,
  Overflow,
  RadioGroup,

  Option,
  OptionGroup
};

export default Transformers;

const doTransform = (elem: Element, type: string): TransformResult => {
  const transformer = Transformers[type];

  if (!transformer) {
    throw new Error(`No transformer exists for type '${type}'`);
  }

  return transformer(elem);
};

export const transform = (elem: Element | Element[]): TransformResult | TransformResult[] => {
  const type = getType(elem);

  if (type === ARRAY) {
    return (elem as Element[]).map(item => {
      const subType = getType(item);
      return doTransform(item, subType);
    });
  }

  return doTransform(elem as Element, type);
};
