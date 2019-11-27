import {SlackMessage, Element} from '../constants/types';
import parser from '../parser';

const render = (element: Element): SlackMessage => {
  const {type, props = {}} = element || {};

  const fnType = type as () => void;
  if (type !== 'Message' && fnType.name !== 'Message') {
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
    // eslint-disable-next-line @typescript-eslint/camelcase
    json.thread_ts = props.replyTo;
  }

  if (typeof props.markdown !== 'undefined') {
    json.mrkdwn = props.markdown;
  }

  return json;
};

export default render;
