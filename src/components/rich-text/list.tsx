import React from 'react';

import {type SingleOrArray} from '../../utils/type-helpers';

import {type RichTextListStyle} from './types';

export type Props = {
  style: RichTextListStyle;
  children: SingleOrArray<React.ReactElement | string>;
  indent?: number;
  border?: number;
};

export default class RichTextList extends React.Component<Props> {
  static slackType = 'RichTextList';
}
