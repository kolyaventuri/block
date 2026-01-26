import React from 'react';

import type Text from '../block/text';
import type Image from '../block/image';

export type ImageOrText = React.ReactElement<Text> | React.ReactElement<Image>;

export type Props = {
  children: ImageOrText | ImageOrText[];
  blockId?: string;
};

export default class Context extends React.Component<Props> {
  static slackType = 'Context';
}
