
import {type Child} from '../constants/types';

/**
 * Props for the `<Message>` component.
 *
 * The top-level element required by `render()` / `renderToMessage()`.
 * Add blocks as children; use `text` as a fallback for notifications.
 */
export type Properties = {
  children: Child;
  channel?: string;
  user?: string;
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

/**
 * Root element for a Slack chat message.
 *
 * Must be the top-level element passed to `render()`.
 * Add layout blocks as children.
 *
 * @example
 * ```tsx
 * render(
 *   <Message text="Fallback">
 *     <Header text="Hello" />
 *   </Message>
 * );
 * ```
 */
export default class Message {
  static slackType = 'Message';
  declare props: Properties;
}
