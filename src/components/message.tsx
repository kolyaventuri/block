import React from 'react';
import {Element} from '../constants/types'; 
import Block from './block';
import Attachment from './attachment';

type Props = {
  children: string | Element | Element[];
  channel?: string;
  replyTo?: string;
  markdown?: boolean;
  blocks?: Block[];
  attachments?: Attachment[];
};

export default class Message extends React.Component<Props> {}
