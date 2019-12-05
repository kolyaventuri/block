import {Component, ReactElement} from 'react';
import Text from '../components/block/text';

export type Block = {};
export type BlockElement = ReactElement<Text>;
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
