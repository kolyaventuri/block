
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import Text from '../../components/block/text';
import {type Props as OptionProperties} from '../../components/input/option';
import {transform} from '../transform';
import {warnIfTooLong} from '../../utils/validation';

export type OptionType = {
  text: TextType;
  value: string;
  description?: TextType;
  url?: string;
};

const transformOption = (child: Element): OptionType => {
  const {children: text, value, url, description} = child.props as OptionProperties;

  warnIfTooLong('Option text', text, 75);
  warnIfTooLong('Option value', value, 150);
  warnIfTooLong('Option description', description, 75);
  warnIfTooLong('Option url', url, 3000);

  const res: OptionType = {
    text: transform(<Text plainText>{text}</Text>) as TextType,
    value,
  };

  if (description) {
    res.description = transform(<Text plainText>{description}</Text>) as TextType;
  }

  if (url) {
    res.url = url;
  }

  return res;
};

export default transformOption;
