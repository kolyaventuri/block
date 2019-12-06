import React from 'react';
import { InteractiveBlockElement } from '../../constants/types';

export type Props = {
  children: InteractiveBlockElement | InteractiveBlockElement[];
  blockId?: string;
};

export default class Actions extends React.Component<Props> {}
