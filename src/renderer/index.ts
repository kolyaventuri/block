import {type SlackMessage, type Element} from '../constants/types';
import parser from '../parser';
import getType from '../utils/get-type';
import {warnIfTooMany} from '../utils/validation';

const render = (element: Element): SlackMessage => {
  const {props: properties = {}} = element || {};

  const typeName = getType(element);
  if (typeName !== 'Message') {
    throw new TypeError('Provided top-level element must be a Message type.');
  }

  if (!properties.children) {
    throw new Error('Cannot render a Message with no children.');
  }

  const json = {...parser(properties.children)};

  if (properties.replyTo) {
    json.thread_ts = properties.replyTo;
  }

  if (properties.markdown !== undefined) {
    json.mrkdwn = properties.markdown;
  }

  json.text = properties.text || '';

  if (properties.iconEmoji) {
    json.icon_emoji = properties.iconEmoji;
  }

  if (properties.iconUrl) {
    json.icon_url = properties.iconUrl;
  }

  if (properties.parse) {
    json.parse = properties.parse;
  }

  if (properties.username) {
    json.username = properties.username;
  }

  if (properties.asUser) {
    json.as_user = properties.asUser;
  }

  if (properties.replyBroadcast) {
    json.reply_broadcast = properties.replyBroadcast;
  }

  if (properties.unfurlLinks) {
    json.unfurl_links = properties.unfurlLinks;
  }

  if (properties.unfurlMedia !== undefined) {
    json.unfurl_media = properties.unfurlMedia;
  }

  if (properties.color && json.blocks) {
    json.attachments = [
      {
        color: properties.color as string,
        blocks: json.blocks,
      },
    ];

    delete json.blocks;
  }

  if (json.blocks) {
    warnIfTooMany('Message blocks', json.blocks, 50);
  }

  return json;
};

export default render;
