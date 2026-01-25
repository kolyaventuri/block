import React from 'react';

import type Text from '../block/text';
import {type BlockElement} from '../../constants/types';
import {type SingleOrArray} from '../../utils/type-helpers';

type TextElement = React.ReactElement<Text>;

export type Props = {
  text: React.ReactElement<Text>;
  blockId?: string;
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- We actually want to handle null children
  children?: SingleOrArray<TextElement | null | undefined | false>;
  accessory?: BlockElement;
};

export default class Section extends React.Component<Props> {
  static slackType = 'Section';
}
