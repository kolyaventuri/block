import {Component, ReactElement} from 'react';
import Text from '../components/block/text';
import Button from '../components/block/button';

export type Block = {};
export type InteractiveBlockElement = ReactElement<Button>;
export type StandardBlockElement = ReactElement<Text>;
export type BlockElement = InteractiveBlockElement & StandardBlockElement;
export type SerializedBlockElement = {};

export type SlackMessage = {
  channel?: string;
  text?: string;
  blocks?: Block[];
  // eslint-disable-next-line @typescript-eslint/camelcase
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
