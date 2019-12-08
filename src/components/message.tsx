import React from 'react';
import {Element} from '../constants/types'; 

type Props = {
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
};

export default class Message extends React.Component<Props> {}
