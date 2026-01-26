import React from 'react';

import {type InteractiveBlockElement} from '../../constants/types';

export type Props = {
  children: InteractiveBlockElement | InteractiveBlockElement[];
  blockId?: string;
};

export default class Actions extends React.Component<Props> {
  static slackType = 'Actions';
}
