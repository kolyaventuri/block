import React from 'react';

import {type Element} from '../constants/types';

type Properties = {
  children: string | Element | Element[];
  text?: string;
  asUser?: boolean;
  iconEmoji?: string;
  iconUrl?: string;
  markdown?: boolean;
  parse?: 'full' | 'none';
  replyBroadcast?: boolean;
  replyTo?: string;
  unfurlLinks?: boolean;
  unfurlMedia?: boolean;
  username?: string;
  color?: string;
};

export default class Message extends React.Component<Properties> {}
