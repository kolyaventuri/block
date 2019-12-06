import React from 'react';
import Text from '../block/text';
import Image from '../block/image';

type ImageOrText = React.ReactElement<Text> | React.ReactElement<Image>;

export type Props = {
  children: ImageOrText[];
  blockId?: string;
};

export default class Context extends React.Component<Props> {}
