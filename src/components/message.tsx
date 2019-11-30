import React from 'react';
import {Block, Element} from '../constants/types'; 

type Props = {
  children: string | Element | Element[];
  channel?: string;
  replyTo?: string;
  markdown?: boolean;
  blocks?: Block[];
};

export default class Message extends React.Component<Props> {}
