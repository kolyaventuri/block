import React from 'react';

export type Props = {
  userId: string;
};

export default class RichTextUser extends React.Component<Props> {
  static slackType = 'RichTextUser';
}
