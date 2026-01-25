import {type Child, type Element} from '../constants/types';
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
import Header from './layout/header';
import ImageLayout from './layout/image';
import Input from './layout/input';
import RichText from './layout/rich-text';
import Video from './layout/video';
import TextInput from './input/text';
import DateTimePicker from './input/date-time-picker';
import DatePicker from './input/date-picker';
import Checkboxes from './input/checkboxes';
import Select from './input/select';
import Option from './input/option';
import OptionGroup from './input/option-group';
import Overflow from './input/overflow';
import RadioGroup from './input/radio-group';
import TimePicker from './input/time-picker';

type TransformersType = Record<string, (child: Child) => unknown>;

const Transformers: TransformersType = {
  Container,
  Section,
  Actions,
  Context,
  Divider,
  File,
  Header,
  ImageLayout,
  Input,
  RichText,
  Video,

  Text,
  Confirmation,
  Button,
  Image,

  TextInput,
  DateTimePicker,
  DatePicker,
  Checkboxes,
  Select,
  Overflow,
  RadioGroup,
  TimePicker,

  Option,
  OptionGroup,
};

export default Transformers;

export const transform = (element: Element): Record<string, any> => {
  const type = getType(element);

  if (!Transformers[type]) {
    throw new Error(`No transformer exists for type '${type}'`);
  }

  return Transformers[type](element);
};
