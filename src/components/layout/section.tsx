import React from 'react';
import Text from '../block/text';
import {BlockElement} from '../../constants/types';

export type Props = {
  text: React.ReactElement<Text>;
  blockId?: string;
  children?: Text | Text[];
  accessory?: BlockElement[];
};

export default class Section extends React.Component<Props> {}

