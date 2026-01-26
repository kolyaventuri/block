import React from 'react';

import {type RichTextStyle} from './types';

export type Props = {
  url: string;
  children?: string;
  style?: RichTextStyle;
};

export default class RichTextLink extends React.Component<Props> {
  static slackType = 'RichTextLink';
}
