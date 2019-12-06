import React from 'react';
import { InteractiveBlockElement } from '../../constants/types';

type Props = {
  elements: InteractiveBlockElement[];
  blockId?: string;
};

export class Actions extends React.Component<Props> {}
