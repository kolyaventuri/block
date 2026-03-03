
import {type SingleOrArray} from '../../utils/type-helpers';

export const selectTypes = {
  STATIC: 'static',
  EXTERNAL: 'external',
  USER: 'user',
  CONVERSATION: 'conversation',
  CHANNEL: 'channel',
} as const;

type SelectType = typeof selectTypes[keyof typeof selectTypes];

type ConversationFilter = {
  include?: Array<'im' | 'mpim' | 'private' | 'public'>;
  excludeExternalSharedChannels?: boolean;
  excludeBotUsers?: boolean;
};

export type Props = {
  placeholder: string;
  actionId: string;
  type?: SelectType;
  multi?: boolean;
  children?: SingleOrArray<JSX.Element>;
  initialOptions?: JSX.Element[];
  confirm?: JSX.Element;
  maxSelectedItems?: number;
  minQueryLength?: number;
  focusOnLoad?: boolean;
  initialUsers?: string[];
  initialConversations?: string[];
  initialChannels?: string[];
  defaultToCurrentConversation?: boolean;
  responseUrlEnabled?: boolean;
  filter?: ConversationFilter;
};

export default class Select {
  static slackType = 'Select';
  declare props: Props;
}
