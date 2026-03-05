
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

/**
 * A select menu — supports static options, external data sources, and user /
 * channel / conversation lists. Can be single or multi-select.
 *
 * Use the `type` prop to switch data sources (default: `'static'`).
 * Pass `<Option>` or `<OptionGroup>` children for static selects.
 *
 * @example
 * ```tsx
 * // Static single-select
 * <Select placeholder="Pick one" actionId="color">
 *   <Option value="red">Red</Option>
 *   <Option value="blue">Blue</Option>
 * </Select>
 *
 * // User multi-select
 * <Select type="user" multi placeholder="Pick users" actionId="mentions" />
 * ```
 */
export default class Select {
  static slackType = 'Select';
  declare props: Props;
}
