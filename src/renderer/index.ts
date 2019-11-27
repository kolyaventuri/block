import {SlackMessage, Element} from '../constants/types';
import parser from '../parser';

const render = (element: Element): SlackMessage => {
  const {type, props = {}} = element || {};

  const fnType = type as () => void;
  if (type !== 'Block' && fnType.name !== 'Block') {
    throw new TypeError('Provided top-level element must be a Block type.');
  }

  if (!props.children) {
    throw new Error('Cannot render a Block with no children.');
  }

  const result = parser(props.children);

  return {
    channel: ''
  };
};

export default render;
