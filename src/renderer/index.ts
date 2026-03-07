import {
  type SlackMessageDraft, type Element, type Block, type Child,
  type SlackPostMessagePayload, type SlackPostEphemeralPayload, type BoltCompatiblePayload,
} from '../constants/types';
import {type Properties as MessageProperties} from '../components/message';
import parser from '../parser';
import getType from '../utils/get-type';
import {warnIfTooMany, warnIfTooLong} from '../utils/validation';
import {
  initContext, pushPath, popPath, type ValidationMode, type ValidationReporter,
} from '../utils/validation-context';
import {MAX_BLOCKS, MAX_MESSAGE_TEXT, RECOMMENDED_MESSAGE_TEXT} from '../constants/limits';

/**
 * Options passed to `render()`, `renderToMessage()`, and `renderToBlocks()`.
 *
 * @property validate - Validation mode. Defaults to `'warn'`.
 *   - `'warn'`   — log warnings via `console.warn` (default)
 *   - `'strict'` — throw `SlackblockValidationError` on any violation
 *   - `'off'`    — disable validation entirely
 * @property onValidation - Optional warn-mode hook. When provided alongside
 *   warn mode, SlackBlock calls this reporter with the normalized issue
 *   instead of writing to `console.warn`.
 * @property channel - When provided, the result includes `channel` and is typed
 *   as `SlackPostMessagePayload` (directly usable with `chat.postMessage`).
 * @property user - When provided alongside `channel`, the result is typed as
 *   `SlackPostEphemeralPayload` (directly usable with `chat.postEphemeral`).
 *   Has no effect without `channel`.
 */
export type RenderOptions = {
  validate?: ValidationMode;
  onValidation?: ValidationReporter;
  channel?: string;
  user?: string;
};

/**
 * Renders JSX children directly to a `Block[]` array, without requiring a
 * `<Message>` wrapper. Useful for modals, home tabs, and other surfaces that
 * accept a blocks array rather than a full message payload.
 */
export const renderToBlocks = (element: Child, options?: RenderOptions): Block[] => {
  initContext(options?.validate ?? 'warn', options?.onValidation);
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
 * Pass `channel` (and optionally `user`) in the `options` argument to get a
 * fully-typed payload that can be passed directly to the Slack SDK without any
 * cast:
 *
 * @example
 * ```tsx
 * // say / respond — no options needed
 * await say(render(<Message text="Hello"><Header text="Hi" /></Message>));
 *
 * // chat.postMessage — channel in options → SlackPostMessagePayload, no cast
 * const msg = render(<Message text="Hello">...</Message>, {channel: '#general'});
 * await client.chat.postMessage(msg);
 *
 * // chat.postEphemeral — channel + user in options → SlackPostEphemeralPayload, no cast
 * const msg = render(<Message text="Hello" />, {channel: '#general', user: userId});
 * await client.chat.postEphemeral(msg);
 * ```
 */
function render(element: Element, options: RenderOptions & {channel: string; user: string}): SlackPostEphemeralPayload;
function render(element: Element, options: RenderOptions & {channel: string}): SlackPostMessagePayload;
function render(element: Element, options?: RenderOptions): BoltCompatiblePayload;
function render(element: Element, options?: RenderOptions): SlackMessageDraft {
  initContext(options?.validate ?? 'warn', options?.onValidation);

  const properties = element.props as MessageProperties;

  const typeName = getType(element);
  if (typeName !== 'Message') {
    throw new TypeError('Provided top-level element must be a Message type.');
  }

  if (!properties.children && !properties.text) {
    throw new Error('Cannot render a Message with no children or text.');
  }

  pushPath('Message');
  let json: SlackMessageDraft;
  try {
    // Parser returns a partial message (no required `text`); renderer sets it below.
    // eslint-disable-next-line prefer-object-spread -- Object.assign avoids object-literal type assertion lint conflict
    json = Object.assign({}, parser(properties.children)) as SlackMessageDraft;

    if (properties.replyTo) {
      json.thread_ts = properties.replyTo;
    }

    if (properties.markdown !== undefined) {
      json.mrkdwn = properties.markdown;
    }

    // String children produce {text} from the parser; fall back to that if no explicit text prop.
    json.text = properties.text ?? json.text ?? '';

    if (properties.text && properties.text.length > MAX_MESSAGE_TEXT) {
      warnIfTooLong(`Message text (Slack will truncate beyond ${MAX_MESSAGE_TEXT} chars)`, properties.text, MAX_MESSAGE_TEXT);
    } else if (properties.text) {
      warnIfTooLong('Message text (recommended max for best results)', properties.text, RECOMMENDED_MESSAGE_TEXT);
    }

    // Options.channel / options.user take precedence over the Message JSX props.
    const channel = options?.channel ?? properties.channel;
    const user = options?.user ?? properties.user;

    if (channel) {
      json.channel = channel;
    }

    if (user) {
      json.user = user;
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

  return json;
}

export default render;

/**
 * Named alias for {@link render}. Produces a full Slack message payload
 * (including `text`, `blocks`, and optional `attachments` when `color` is set).
 */
export {render as renderToMessage};
