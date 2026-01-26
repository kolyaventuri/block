import React from 'react';

export type Props = {
  usergroupId: string;
};

export default class RichTextUserGroup extends React.Component<Props> {
  static slackType = 'RichTextUserGroup';
}
