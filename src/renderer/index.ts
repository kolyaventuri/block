import {
  type SlackMessage, type SlackMessageDraft, type Element, type Block, type Child,
} from '../constants/types';
import {type Properties as MessageProperties} from '../components/message';
import parser from '../parser';
import getType from '../utils/get-type';
import {warnIfTooMany, warnIfTooLong} from '../utils/validation';
import {
  initContext, pushPath, popPath, type ValidationMode,
} from '../utils/validation-context';
import {MAX_BLOCKS, MAX_MESSAGE_TEXT, RECOMMENDED_MESSAGE_TEXT} from '../constants/limits';

/**
 * Options passed to `render()`, `renderToMessage()`, and `renderToBlocks()`.
 *
 * @property validate - Validation mode. Defaults to `'warn'`.
 *   - `'warn'`   — log warnings via `console.warn` (default)
 *   - `'strict'` — throw `SlackblockValidationError` on any violation
 *   - `'off'`    — disable validation entirely
 */
export type RenderOptions = {validate?: ValidationMode};

/**
 * Renders JSX children directly to a `Block[]` array, without requiring a
 * `<Message>` wrapper. Useful for modals, home tabs, and other surfaces that
 * accept a blocks array rather than a full message payload.
 */
export const renderToBlocks = (element: Child, options?: RenderOptions): Block[] => {
  initContext(options?.validate ?? 'warn');
  // Unwrap top-level fragments so the parser receives their children directly.
  const child: Child
    = typeof element === 'object'
      && element !== null
      && !Array.isArray(element)
      && (element).type === 'fragment'
      ? (element).props.children as Child
      : element;
  const result = parser(child);
  return result.blocks ?? [];
};

const applyMessageMetadata = (json: SlackMessageDraft, properties: MessageProperties): void => {
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
};

/**
 * Renders a `<Message>` JSX tree to a full Slack message payload.
 *
 * The result is a plain object ready to spread into `chat.postMessage`.
 * The top-level element must be a `<Message>` — a `TypeError` is thrown otherwise.
 *
 * @example
 * ```tsx
 * import render from 'slackblock';
 * import { Message, Header } from 'slackblock/block';
 *
 * const message = render(
 *   <Message text="Hello">
 *     <Header text="Hello world" />
 *   </Message>
 * );
 *
 * await slackClient.chat.postMessage({ channel: '#general', ...message });
 * ```
 */
const render = (element: Element, options?: RenderOptions): SlackMessage => {
  initContext(options?.validate ?? 'warn');

  const properties = element.props as MessageProperties;

  const typeName = getType(element);
  if (typeName !== 'Message') {
    throw new TypeError('Provided top-level element must be a Message type.');
  }

  if (!properties.children) {
    throw new Error('Cannot render a Message with no children.');
  }

  pushPath('Message');
  let json: SlackMessageDraft;
  try {
    json = {...parser(properties.children)};

    if (properties.replyTo) {
      json.thread_ts = properties.replyTo;
    }

    if (properties.markdown !== undefined) {
      json.mrkdwn = properties.markdown;
    }

    json.text = properties.text ?? '';

    if (properties.text && properties.text.length > MAX_MESSAGE_TEXT) {
      warnIfTooLong(`Message text (Slack will truncate beyond ${MAX_MESSAGE_TEXT} chars)`, properties.text, MAX_MESSAGE_TEXT);
    } else if (properties.text) {
      warnIfTooLong('Message text (recommended max for best results)', properties.text, RECOMMENDED_MESSAGE_TEXT);
    }

    applyMessageMetadata(json, properties);

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
      warnIfTooMany('Message blocks', json.blocks, MAX_BLOCKS);
    }
  } finally {
    popPath();
  }

  return json as SlackMessage;
};

export default render;

/**
 * Named alias for {@link render}. Produces a full Slack message payload
 * (including `text`, `blocks`, and optional `attachments` when `color` is set).
 */
export {render as renderToMessage};
