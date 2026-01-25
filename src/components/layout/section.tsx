import React from 'react';

import type Text from '../block/text';
import {type BlockElement} from '../../constants/types';

type TextElement = React.ReactElement<Text>;

export type Props = {
  text: React.ReactElement<Text>;
  blockId?: string;
  children?: TextElement | TextElement[];
  accessory?: BlockElement;
};

export default class Section extends React.Component<Props> {
  static slackType = 'Section';
}

