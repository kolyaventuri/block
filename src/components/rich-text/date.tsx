import React from 'react';

export type Props = {
  timestamp: number;
  format: string;
  fallback: string;
  link?: string;
};

export default class RichTextDate extends React.Component<Props> {
  static slackType = 'RichTextDate';
}
