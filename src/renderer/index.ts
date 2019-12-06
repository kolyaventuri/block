import {SlackMessage, Element} from '../constants/types';
import parser from '../parser';
import getType from '../utils/get-type';

const render = (element: Element): SlackMessage => {
  const {props = {}} = element || {};

  const typeName = getType(element);
  if (typeName !== 'Message') {
    throw new TypeError('Provided top-level element must be a Message type.');
  }

  if (!props.children) {
    throw new Error('Cannot render a Message with no children.');
  }

  const result = parser(props.children);

  const json = {
    channel: props.channel || null,
    ...result
  };

  if (props.replyTo) {
    json.thread_ts = props.replyTo;
  }

  if (typeof props.markdown !== 'undefined') {
    json.mrkdwn = props.markdown;
  }

  return json;
};

export default render;
