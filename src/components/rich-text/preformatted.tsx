import React from 'react';

import {type SingleOrArray} from '../../utils/type-helpers';

export type Props = {
  children: SingleOrArray<React.ReactElement | string>;
};

export default class RichTextPreformatted extends React.Component<Props> {
  static slackType = 'RichTextPreformatted';
}
