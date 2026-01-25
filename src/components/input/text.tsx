import React from 'react';

export type Props = {
  actionId: string;
  placeholder?: string;
  initial?: string;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
  focusOnLoad?: boolean;
};

export default class TextInput extends React.Component<Props> {
  static slackType = 'TextInput';
}
