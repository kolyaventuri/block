
import {type RichTextStyle} from './types';

export type Props = {
  url: string;
  children?: string;
  style?: RichTextStyle;
};

export default class RichTextLink {
  static slackType = 'RichTextLink';
  declare props: Props;
}
