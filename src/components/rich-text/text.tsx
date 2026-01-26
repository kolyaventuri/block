import React from 'react';

import {type RichTextStyle} from './types';

export type Props = {
  children: string;
  style?: RichTextStyle;
};

export default class RichTextText extends React.Component<Props> {
  static slackType = 'RichTextText';
}
