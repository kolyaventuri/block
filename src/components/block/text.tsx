import React from 'react';

export type Props = {
  children: string;
  plainText?: boolean;
  emoji?: boolean;
  verbatim?: boolean;
}

export default class Text extends React.Component<Props> {}
