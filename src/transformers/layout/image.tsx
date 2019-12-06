import React from 'react';
import {Element} from '../../constants/types';
import {TextProps as TextType} from '../block/text';
import {Props as ImageProps} from '../../components/layout/image';
import { transform } from '..';
import Text from '../../components/block/text';

type ImageType = {
  type: 'image';
  image_url: string;
  alt_text: string;
  title?: TextType;
  block_id?: string;
};

export default (child: Element): ImageType => {
  const {url, alt, title, blockId}: ImageProps = child.props;

  const res: ImageType = {
    type: 'image',
    image_url: url,
    alt_text: alt
  };

  if (title) {
    res.title = transform(<Text plainText>{title}</Text>) as TextType;
  }

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};
