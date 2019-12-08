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
    token: props.token,
    channel: props.channel,
    ...result
  };

  if (props.replyTo) {
    json.thread_ts = props.replyTo;
  }

  if (typeof props.markdown !== 'undefined') {
    json.mrkdwn = props.markdown;
  }

  json.text = props.text || '';

  if (props.iconEmoji) {
    json.icon_emoji = props.iconEmoji;
  }

  if (props.iconUrl) {
    json.icon_url = props.iconUrl;
  }

  if (props.parse) {
    json.parse = props.parse;
  }

  if (props.username) {
    json.username = props.username;
  }

  if (props.asUser) {
    json.as_user = props.asUser;
  }

  if (props.replyBroadcast) {
    json.reply_broadcast = props.replyBroadcast;
  }

  if (props.unfurlLinks) {
    json.unfurl_links = props.unfurlLinks;
  }

  if (typeof props.unfurlMedia !== 'undefined') {
    json.unfurl_media = props.unfurlMedia;
  }

  return json;
};

export default render;
