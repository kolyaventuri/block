import {type Block as SlackBlock, type KnownBlock, type MessageAttachment} from '@slack/types';

import {type TextType as TextInputType} from '../transformers/input/text';
import {type DatePickerType} from '../transformers/input/date-picker';
import {type SelectType} from '../transformers/input/select';
import {type CheckboxesType} from '../transformers/input/checkboxes';
import {type TimePickerType} from '../transformers/input/time-picker';
import {type DateTimePickerType} from '../transformers/input/date-time-picker';
import {type OptionType} from '../transformers/input/option';
import {type OptionGroupType} from '../transformers/input/option-group';
import {type OverflowType} from '../transformers/input/overflow';
import {type RadioGroupType} from '../transformers/input/radio-group';
import {type TextType as BlockTextType} from '../transformers/block/text';
import {type ImageType as BlockImageType} from '../transformers/block/image';
import {type ButtonType} from '../transformers/block/button';
import {type ConfirmationType} from '../transformers/block/confirmation';
import {type ActionType as ActionsType} from '../transformers/layout/actions';
import {type ContextType} from '../transformers/layout/context';
import {type DividerType} from '../transformers/layout/divider';
import {type FileType} from '../transformers/layout/file';
import {type HeaderType} from '../transformers/layout/header';
import {type ImageType as ImageLayoutType} from '../transformers/layout/image';
import {type InputType} from '../transformers/layout/input';
import {type RichTextType} from '../transformers/layout/rich-text';
import {type SectionType} from '../transformers/layout/section';
import {type VideoType} from '../transformers/layout/video';

type ImageBlockType = BlockImageType | ImageLayoutType;

export type SerializedOption = OptionType | OptionGroupType;

export type SerializedInputBlockElement =
  | TextInputType
  | DatePickerType
  | DateTimePickerType
  | TimePickerType
  | CheckboxesType
  | SelectType
  | OverflowType
  | RadioGroupType;

export type SerializedInteractiveBlockElement =
  | ButtonType
  | SerializedInputBlockElement;

export type SerializedBlockElement =
  | BlockTextType
  | ImageBlockType
  | ConfirmationType
  | SerializedInteractiveBlockElement;

export type SerializedBlock =
  | SectionType
  | ActionsType
  | ContextType
  | DividerType
  | FileType
  | HeaderType
  | ImageBlockType
  | InputType
  | RichTextType
  | VideoType;

export type SerializedElement =
  | SerializedBlock
  | SerializedBlockElement
  | SerializedInputBlockElement
  | SerializedOption;

export type Block = KnownBlock | SlackBlock;
export type Attachment = MessageAttachment;

export type InteractiveBlockElement = JSX.Element;

export type InputBlockElement = JSX.Element;
export type BlockElement = JSX.Element;

/**
 * The concrete output of `render()`. A flat type containing exactly the fields
 * the renderer can produce, preserving `text: string` so spreads stay clean.
 */
export type SlackMessageDraft = {
  text: string;
  blocks?: Block[];
  attachments?: Attachment[];
  channel?: string;
  user?: string;
  thread_ts?: string;
  mrkdwn?: boolean;
  icon_emoji?: string;
  icon_url?: string;
  parse?: 'full' | 'none';
  username?: string;
  as_user?: boolean;
  reply_broadcast?: boolean;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
};

/**
 * Fields from `SlackMessageDraft` that are safe to pass directly to the Slack
 * SDK without casting. The SDK's `ChatPostMessageArguments` uses `?: never` to
 * enforce mutual exclusion (e.g. `icon_emoji` vs `icon_url`, `reply_broadcast`
 * vs `WithinThreadReply`) — those fields are omitted here so the payload type
 * is structurally assignable to `ChatPostMessageArguments`.
 *
 * The runtime object produced by `render()` still carries all the original
 * fields; only the declared type is narrowed for SDK compatibility.
 */
export type BoltCompatiblePayload = Omit<SlackMessageDraft, 'icon_emoji' | 'icon_url' | 'username' | 'as_user' | 'reply_broadcast' | 'channel' | 'user'>;

/**
 * Cast `render()` output to this when calling `client.chat.postMessage()` directly.
 * Assignable to `ChatPostMessageArguments` — no further cast needed.
 *
 * @example
 * ```ts
 * const msg = render(<Message channel={channel}>...</Message>);
 * await client.chat.postMessage(msg as SlackPostMessagePayload);
 * ```
 */
export type SlackPostMessagePayload = BoltCompatiblePayload & {channel: string};

/**
 * Cast `render()` output to this when calling `client.chat.postEphemeral()` directly.
 * Assignable to `ChatPostEphemeralArguments` — no further cast needed.
 *
 * @example
 * ```ts
 * const msg = render(<Message channel={channel} user={userId}>...</Message>);
 * await client.chat.postEphemeral(msg as SlackPostEphemeralPayload);
 * ```
 */
export type SlackPostEphemeralPayload = BoltCompatiblePayload & {channel: string; user: string};

type AnyFunction = (...parameters: unknown[]) => unknown;

type AnyConstructor = new (...parameters: unknown[]) => unknown;

type WithType = {
  type?: string | AnyFunction | AnyConstructor;
};
export type BElement = JSX.Element & WithType;
export type Element = BElement;

export type Child =
  | string
  | Element
  | Child[]
  | boolean
  | undefined
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- React children can be null.
  | null;
