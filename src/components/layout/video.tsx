import React from 'react';

export type Props = {
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  altText: string;
  titleUrl?: string;
  description?: string;
  authorName?: string;
  providerName?: string;
  providerIconUrl?: string;
  blockId?: string;
};

export default class Video extends React.Component<Props> {
  static slackType = 'Video';
}
