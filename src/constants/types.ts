import {Component, ReactElement} from 'react';

export type Block = {};

export type SlackMessage = {
  channel: string;
  blocks?: Block[];
};

type AnyFunction = () => any;

export type WithType = {
  type?: string | AnyFunction;
};
export type BComponent = Component & WithType;
export type BElement = ReactElement & WithType;
export type Element = BComponent | BElement;
