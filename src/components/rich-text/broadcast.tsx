
import {type RichTextBroadcastRange} from './types';

export type Props = {
  range: RichTextBroadcastRange;
};

export default class RichTextBroadcast {
  static slackType = 'RichTextBroadcast';
  declare props: Props;
}
