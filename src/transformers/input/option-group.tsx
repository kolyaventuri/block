
import Text from '../../components/block/text';
import {type Props as OptionGroupProperties} from '../../components/input/option-group';
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {transform} from '../transform';
import {warnIfTooLong, warnIfTooMany, requireField} from '../../utils/validation';
import {MAX_OPTION_GROUP_LABEL, MAX_OPTION_GROUP_OPTIONS} from '../../constants/limits';

import {type OptionType} from './option';

export type OptionGroupType = {
  label: TextType;
  options: OptionType[];
};

const transformOptionGroup = (child: Element): OptionGroupType => {
  const {label, children} = child.props as OptionGroupProperties;
  const options = Array.isArray(children) ? children : [children];

  requireField('label', label);
  requireField('options', options);
  warnIfTooLong('OptionGroup label', label, MAX_OPTION_GROUP_LABEL);

  warnIfTooMany('OptionGroup options', options, MAX_OPTION_GROUP_OPTIONS);

  return {
    label: transform(<Text plainText>{label ?? ''}</Text>) as TextType,
    options: options.map(option => transform(option as Element)) as OptionType[],
  };
};

export default transformOptionGroup;
