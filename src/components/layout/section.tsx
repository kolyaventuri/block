import React from 'react';
import Text from '../block/text';
import {BlockElement} from '../../constants/types';

type TextElem = React.ReactElement<Text>;

export type Props = {
  text: React.ReactElement<Text>;
  blockId?: string;
  children?: TextElem | TextElem[];
  accessory?: BlockElement;
};

export default class Section extends React.Component<Props> {}

