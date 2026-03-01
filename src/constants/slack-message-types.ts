import {
  type Block as SlackBlock,
  type EntityMetadata,
  type KnownBlock,
  type MessageAttachment,
  type MessageMetadata,
} from '@slack/types';

// ---------------------------------------------------------------------------
// Minimal local replicas of types previously imported from @slack/web-api.
// Only the fields actually consumed by this package are kept.
// ---------------------------------------------------------------------------

type Channel = {
  channel: string;
};

type Text = {
  text: string;
};

type MarkdownText = {
  markdown_text: string;
};

export type ChannelAndText = Channel & Text;

export type ChannelAndBlocks = Channel & Partial<Text> & {
  blocks: Array<KnownBlock | SlackBlock>;
};

export type ChannelAndAttachments = Channel & Partial<Text> & {
  attachments: MessageAttachment[];
};

export type ChannelAndMarkdownText = Channel & MarkdownText;

export type LinkNames = {
  link_names?: boolean;
};

export type Parse = {
  parse?: 'full' | 'none';
};

export type Unfurls = {
  unfurl_links?: boolean;
  unfurl_media?: boolean;
};

export type IconEmoji = {
  as_user?: false;
  icon_url?: never;
  icon_emoji?: string;
};

export type IconURL = {
  as_user?: false;
  icon_emoji?: never;
  icon_url?: string;
};

export type Username = {
  as_user?: false;
  username?: string;
};

export type WithinThreadReply = {
  thread_ts?: string;
  reply_broadcast?: false;
};

export type BroadcastedThreadReply = {
  thread_ts: string;
  reply_broadcast: boolean;
};

export type ChatPostMessageMetadata = {
  metadata?: Partial<MessageMetadata> & {
    entities?: EntityMetadata[];
  };
};

type MessageContents =
  | ChannelAndText
  | ChannelAndBlocks
  | ChannelAndAttachments
  | ChannelAndMarkdownText;

type ReplyInThread = WithinThreadReply | BroadcastedThreadReply;

type Authorship =
  | ((IconEmoji | IconURL) & Username)
  | {
    as_user: true;
    icon_emoji?: never;
    icon_url?: never;
    username?: never;
  };

export type ChatPostMessageArguments = {token?: string}
  & MessageContents
  & ReplyInThread
  & Authorship
  & Parse
  & LinkNames
  & ChatPostMessageMetadata
  & Unfurls
  & {mrkdwn?: boolean};
