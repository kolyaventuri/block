import React from 'react';

import {type RichTextBroadcastRange} from './types';

export type Props = {
  range: RichTextBroadcastRange;
};

export default class RichTextBroadcast extends React.Component<Props> {
  static slackType = 'RichTextBroadcast';
}
