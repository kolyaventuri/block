
import {type Child} from '../constants/types';

export type Properties = {
  children: Child;
  text?: string;
  asUser?: boolean;
  iconEmoji?: string;
  iconUrl?: string;
  markdown?: boolean;
  parse?: 'full' | 'none';
  replyBroadcast?: boolean;
  replyTo?: string;
  unfurlLinks?: boolean;
  unfurlMedia?: boolean;
  username?: string;
  color?: string;
};

export default class Message {
  static slackType = 'Message';
  declare props: Properties;
}
