import React from 'react';

export type Props = {
  url: string;
  alt: string;
  title?: string;
  blockId?: string;
};

export default class Image extends React.Component<Props> {}
