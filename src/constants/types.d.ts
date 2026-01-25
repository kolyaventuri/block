import {type ReactElement} from 'react';

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

export type Block = SerializedBlock;
export type Attachment = {
  color: string;
  blocks: Block[];
};

export type InteractiveBlockElement = ReactElement<any, any>;
export type StandardBlockElement = ReactElement<any, any>;

export type InputBlockElement = ReactElement<any, any>;
export type BlockElement = InteractiveBlockElement | StandardBlockElement | InputBlockElement;

export type SlackMessage = {
  text?: string;
  as_user?: boolean;
  blocks?: Block[];
  attachments?: Attachment[];
  icon_emoji?: string;
  icon_url?: string;
  link_names?: boolean;
  mrkdwn?: boolean;
  parse?: 'full' | 'none';
  reply_broadcast?: boolean;
  thread_ts?: string;
  unfurl_links?: boolean;
  unfurl_media?: boolean;
  username?: string;
};

type AnyFunction = (...parameters: any[]) => any;

type AnyConstructor = new (...parameters: any[]) => any;

export type WithType = {
  type?: string | AnyFunction | AnyConstructor;
};
export type BElement = ReactElement<any, any> & WithType;
export type Element = BElement;
export type Child =
  | string
  | Element
  | Child[]
  | boolean
  | undefined
  // eslint-disable-next-line @typescript-eslint/no-restricted-types -- React children can be null.
  | null;
