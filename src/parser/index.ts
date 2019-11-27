import {Component, ReactElement} from 'react';
import {SlackMessage} from '../constants/types';

const parse = (element: Component | ReactElement): SlackMessage => {
  console.log(element);
  return {
    channel: ''
  };
};

export default parse;
