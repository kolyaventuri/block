import React from 'react';

import {type SingleOrArray} from '../../utils/type-helpers';

export type RichTextElement = Record<string, any>;

export type Props = {
  elements?: RichTextElement[];
  children?: SingleOrArray<React.ReactElement | string>;
  blockId?: string;
};

export default class RichText extends React.Component<Props> {
  static slackType = 'RichText';
}
