import React from 'react';

import {type Element, type SerializedInputBlockElement} from '../../constants/types';
import {type TextType} from '../block/text';
import {type Props as InputProperties} from '../../components/layout/input';
import {transform} from '..';
import Text from '../../components/block/text';

type InputType = {
  type: 'input';
  label: TextType;
  element: SerializedInputBlockElement;
  hint?: TextType;
  optional?: boolean;
  block_id?: string;
};

const transformInput = (child: Element): InputType => {
  const {label, element, hint, optional, blockId}: InputProperties = child.props;

  const res: InputType = {
    type: 'input',
    label: transform(<Text plainText>{label}</Text>) as TextType,
    element: transform(element as Element) as SerializedInputBlockElement,
  };

  if (hint) {
    res.hint = transform(<Text plainText>{hint}</Text>) as TextType;
  }

  if (optional) {
    res.optional = true;
  }

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformInput;
