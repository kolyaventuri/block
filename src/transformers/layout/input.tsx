import React from 'react';
import {Element, SerializedInputBlockElement} from '../../constants/types';
import {TextType} from '../block/text';
import {Props as InputProps} from '../../components/layout/input';
import {transform} from '..';
import Text from '../../components/block/text';

type InputType = {
  type: 'input';
  label: TextType;
  element: SerializedInputBlockElement;
  hint?: TextType;
  optional?: boolean;
  block_id?: string;
}

export default (child: Element): InputType => {
  const {label, element, hint, optional, blockId}: InputProps = child.props;

  const res: InputType = {
    type: 'input',
    label: transform(<Text plainText>{label}</Text>) as TextType,
    element: transform(element as Element) as SerializedInputBlockElement
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
