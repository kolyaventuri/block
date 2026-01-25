import React from 'react';

import {type Element} from '../../constants/types';
import {type Props as HeaderProperties} from '../../components/layout/header';
import {type TextType} from '../block/text';
import {transform} from '..';
import Text from '../../components/block/text';

export type HeaderType = {
  type: 'header';
  text: TextType;
  block_id?: string;
};

const transformHeader = (child: Element): HeaderType => {
  const {text, blockId, emoji}: HeaderProperties = child.props;

  const res: HeaderType = {
    type: 'header',
    text: transform(<Text plainText emoji={emoji}>{text}</Text>) as TextType,
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformHeader;
