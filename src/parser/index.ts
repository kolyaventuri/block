import {SlackMessage} from '../constants/types';

export default (children: string | Element | Element[]): SlackMessage => {
  if (typeof children === 'string') {
    return {text: children};
  }
};
