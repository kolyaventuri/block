import React from 'react';
import Text from '../block/text';
import {BlockElement} from '../../constants/types';

type Props = {
  text: Text;
  blockId?: string;
  children?: Text | Text[];
  accessory?: BlockElement[];
  [index: string]: any;
};

export default class Section extends React.Component<Props> {}
