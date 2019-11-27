import React from 'react';
import {Element} from '../constants/types'; 

type Props = {
  channel?: string;
  children: string | Element | Element[];
};

export default class Message extends React.Component<Props> {
  transform() {
    return 'hi';
  }
}
