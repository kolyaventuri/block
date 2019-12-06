import React from 'react';
import Text from '../block/text';
import Image from '../block/image';

export type ImageOrText = React.ReactElement<Text> | React.ReactElement<Image>;

export type Props = {
  children: ImageOrText | ImageOrText[];
  blockId?: string;
};

export default class Context extends React.Component<Props> {}
