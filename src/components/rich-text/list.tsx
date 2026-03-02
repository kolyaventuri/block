
import {type SingleOrArray} from '../../utils/type-helpers';

import {type RichTextListStyle} from './types';

export type Props = {
  style: RichTextListStyle;
  children: SingleOrArray<JSX.Element | string>;
  indent?: number;
  border?: number;
};

export default class RichTextList {
  static slackType = 'RichTextList';
  declare props: Props;
}
