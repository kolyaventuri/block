import React from 'react';

export type Props = {
  channelId: string;
};

export default class RichTextChannel extends React.Component<Props> {
  static slackType = 'RichTextChannel';
}
