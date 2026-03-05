
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import Text from '../../components/block/text';
import {type Props as OptionProperties} from '../../components/input/option';
import {transform} from '../transform';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {
  MAX_OPTION_TEXT, MAX_OPTION_VALUE, MAX_OPTION_DESCRIPTION, MAX_OPTION_URL,
} from '../../constants/limits';

export type OptionType = {
  text: TextType;
  value: string;
  description?: TextType;
  url?: string;
};

const transformOption = (child: Element): OptionType => {
  const {children: text, value, url, description} = child.props as OptionProperties;

  requireField('value', value);
  warnIfTooLong('Option text', text, MAX_OPTION_TEXT);
  warnIfTooLong('Option value', value, MAX_OPTION_VALUE);
  warnIfTooLong('Option description', description, MAX_OPTION_DESCRIPTION);
  warnIfTooLong('Option url', url, MAX_OPTION_URL);

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
