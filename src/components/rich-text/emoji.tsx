import React from 'react';

export type Props = {
  name: string;
};

export default class RichTextEmoji extends React.Component<Props> {
  static slackType = 'RichTextEmoji';
}
