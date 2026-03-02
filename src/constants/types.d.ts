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

import {
  type BroadcastedThreadReply,
  type ChatPostMessageArguments,
  type ChatPostMessageMetadata,
  type ChannelAndAttachments,
  type ChannelAndBlocks,
  type ChannelAndMarkdownText,
  type ChannelAndText,
  type IconEmoji,
  type IconURL,
  type LinkNames,
  type Parse,
  type Unfurls,
  type Username,
  type WithinThreadReply,
} from './slack-message-types';

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
export type StandardBlockElement = JSX.Element;

export type InputBlockElement = JSX.Element;
export type BlockElement = JSX.Element;

type SlackMessageContents =
  | Omit<ChannelAndText, 'channel'>
  | Omit<ChannelAndBlocks, 'channel'>
  | Omit<ChannelAndAttachments, 'channel'>
  | Omit<ChannelAndMarkdownText, 'channel'>;

type SlackAuthorship =
  | ((IconEmoji | IconURL) & Username)
  | {
    as_user: true;
    icon_emoji?: never;
    icon_url?: never;
    username?: never;
  };

type SlackThreadReply = WithinThreadReply | BroadcastedThreadReply;

type SlackMessageBase = SlackMessageContents
  & SlackThreadReply
  & SlackAuthorship
  & Parse
  & LinkNames
  & Unfurls
  & ChatPostMessageMetadata
  & {mrkdwn?: boolean};

export type SlackMessage = SlackMessageBase & Omit<ChatPostMessageArguments, 'channel' | 'token'>;

export type SlackMessageDraft = SlackMessage & {
  text?: string;
  blocks?: Block[];
  attachments?: Attachment[];
  markdown_text?: string;
};

type AnyFunction = (...parameters: any[]) => any;

type AnyConstructor = new (...parameters: any[]) => any;

export type WithType = {
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
