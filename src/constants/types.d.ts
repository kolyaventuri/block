import {Component, ReactElement} from 'react';

import Text from '../components/block/text';
import Button from '../components/block/button';

import Section from '../components/layout/section';
import Actions from '../components/layout/actions';

import {ButtonType} from '../transformers/block/button';

export type Block = ReactElement<Section> | ReactElement<Actions>;

export type InteractiveBlockElement = ReactElement<Button>;
export type StandardBlockElement = ReactElement<Text>;
export type BlockElement = InteractiveBlockElement & StandardBlockElement;
export type SerializedBlockElement = {};

export type SerializedInteractiveBlockElement = ButtonType;

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
