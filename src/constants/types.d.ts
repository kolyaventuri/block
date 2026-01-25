import {type ReactElement} from 'react';

import {type TextType as TextInputType} from '../transformers/input/text';
import {type DatePickerType} from '../transformers/input/date-picker';
import {type SelectType} from '../transformers/input/select';
import {type OptionType} from '../transformers/input/option';
import {type OptionGroupType} from '../transformers/input/option-group';
import {type OverflowType} from '../transformers/input/overflow';
import {type RadioGroupType} from '../transformers/input/radio-group';
import {type TextType} from '../transformers/block/text';
import {type ImageType} from '../transformers/block/image';
import {type ButtonType} from '../transformers/block/button';
import {type ConfirmationType} from '../transformers/block/confirmation';

export type Block = ReactElement<any, any>;
export type Attachment = {
  color: string;
  blocks: Block[];
};

export type InteractiveBlockElement = ReactElement<any, any>;
export type SerializedInteractiveBlockElement = ButtonType;

export type StandardBlockElement = ReactElement<any, any>;

export type InputBlockElement = ReactElement<any, any>;

export type SerializedInputBlockElement =
  TextInputType |
  DatePickerType |
  OptionType |
  OptionGroupType |
  SelectType |
  OverflowType |
  RadioGroupType;

export type BlockElement = InteractiveBlockElement & StandardBlockElement & InputBlockElement;
export type SerializedBlockElement = TextType | ImageType | ConfirmationType;

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
