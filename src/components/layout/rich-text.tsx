import React from 'react';

export type RichTextElement = Record<string, any>;

export type Props = {
  elements: RichTextElement[];
  blockId?: string;
};

export default class RichText extends React.Component<Props> {
  static slackType = 'RichText';
}
