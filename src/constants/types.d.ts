import {Component, ReactElement} from 'react';

import Text from '../components/block/text';
import Button from '../components/block/button';
import Image from '../components/block/image';
import Confirmation from '../components/block/confirmation';

import Section from '../components/layout/section';
import Actions from '../components/layout/actions';

import TextInput from '../components/input/text';
import DatePicker from '../components/input/date-picker';
import Select from '../components/input/select';
import Option from '../components/input/option';
import OptionGroup from '../components/input/option-group';
import Overflow from '../components/input/overflow';

import {TextType as TextInputType} from '../transformers/input/text';
import {DatePickerType} from '../transformers/input/date-picker';
import {SelectType} from '../transformers/input/select';
import {OptionType} from '../transformers/input/option';
import {OptionGroupType} from '../transformers/input/option-group';
import {OverflowType} from '../transformers/input/overflow';

import {TextType} from '../transformers/block/text';
import {ImageType} from '../transformers/block/image';
import {ButtonType} from '../transformers/block/button';

export type Block = ReactElement<Section> | ReactElement<Actions>;

export type InteractiveBlockElement = ReactElement<Button>;
export type SerializedInteractiveBlockElement = ButtonType;

export type StandardBlockElement = ReactElement<Text> | ReactElement<Image> | ReactElement<Confirmation>;
export type InputBlockElement = ReactElement<TextInput> | ReactElement<DatePicker> | ReactElement<Option> | ReactElement<OptionGroup> | ReactElement<Select> | ReactElement<Overflow>;
export type SerializedInputBlockElement = TextInputType | DatePickerType | OptionType | OptionGroupType | SelectType | OverflowType;

export type BlockElement = InteractiveBlockElement & StandardBlockElement & InputBlockElement;
export type SerializedBlockElement = TextType | ImageType;

export type SlackMessage = {
  channel?: string;
  text?: string;
  blocks?: Block[];
  thread_ts?: string;
  mrkdwn?: boolean;
};

type AnyFunction = () => any;

export type WithType = {
  type?: string | AnyFunction;
};
export type BComponent = Component & WithType;
export type BElement = ReactElement & WithType;
export type Element = BComponent | BElement;
export type Child = string | Element | Element[];
