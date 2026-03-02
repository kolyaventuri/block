
import {type RichTextStyle} from './types';

export type Props = {
  children: string;
  style?: RichTextStyle;
};

export default class RichTextText {
  static slackType = 'RichTextText';
  declare props: Props;
}
