import React from 'react';

export type Props = {
  actionId: string;
  placeholder?: string;
  initial?: string;
  multiline?: boolean;
  minLength?: number;
  maxLength?: number;
  focusOnLoad?: boolean;
  dispatchActionConfig?: {
    triggerActionsOn: Array<'on_enter_pressed' | 'on_character_entered'>;
  };
};

export default class TextInput extends React.Component<Props> {
  static slackType = 'TextInput';
}
