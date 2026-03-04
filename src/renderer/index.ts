import {type SlackMessage, type SlackMessageDraft, type Element} from '../constants/types';
import {type Properties as MessageProperties} from '../components/message';
import parser from '../parser';
import getType from '../utils/get-type';
import {warnIfTooMany, warnIfTooLong} from '../utils/validation';

const render = (element: Element): SlackMessage => {
  const properties = element.props as MessageProperties;

  const typeName = getType(element);
  if (typeName !== 'Message') {
    throw new TypeError('Provided top-level element must be a Message type.');
  }

  if (!properties.children) {
    throw new Error('Cannot render a Message with no children.');
  }

  const json: SlackMessageDraft = {...parser(properties.children)};

  if (properties.replyTo) {
    json.thread_ts = properties.replyTo;
  }

  if (properties.markdown !== undefined) {
    json.mrkdwn = properties.markdown;
  }

  json.text = properties.text ?? '';

  if (properties.text && properties.text.length > 40_000) {
    warnIfTooLong('Message text (Slack will truncate beyond 40,000 chars)', properties.text, 40_000);
  } else if (properties.text) {
    warnIfTooLong('Message text (recommended max for best results)', properties.text, 4000);
  }

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
        fallback: json.text,
        color: properties.color,
        blocks: json.blocks,
      },
    ];

    delete json.blocks;
  }

  if (json.blocks) {
    warnIfTooMany('Message blocks', json.blocks, 50);
  }

  return json as SlackMessage;
};

export default render;
