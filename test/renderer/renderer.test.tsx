import {
  beforeEach,
  expect,
  test,
  vi,
} from 'vitest';

import Message from '../../src/components/message';
import Container from '../../src/components/layout/container';
import render from '../../src/renderer';
import {type SlackMessageDraft} from '../../src/constants/types';

const parser = vi.hoisted(() => vi.fn());

vi.mock('../../src/parser', () => ({
  default: parser,
}));

beforeEach(() => {
  parser.mockReset();
});

test('it passes a list of children to the parser', () => {
  const content = 'block-content';
  render(<Message>{content}</Message>);

  expect(parser).toHaveBeenCalledWith(content);
});

test('it throws an error if the passed component is not a <Message> component', () => {
  const function_ = () => render(<div/>);

  expect(function_).toThrow();
});

test('it throws an error if no children are passed', () => {
  // @ts-expect-error - We want to explicitly check the lack of children
  const function_ = () => render(<Message/>);

  expect(function_).toThrow();
});

test('can render all props', () => {
  const content = 'content-of-block';
  const res = render(<Message
    asUser
    replyBroadcast
    unfurlLinks
    unfurlMedia
    text="text"
    iconEmoji=":icon_emoji:"
    iconUrl="iconUrl"
    markdown={false}
    parse="none"
    username="username"
    replyTo="replyTo"
  >
    {content}
  </Message>);

  expect(res).toEqual({
    text: 'text',
    icon_emoji: ':icon_emoji:',
    icon_url: 'iconUrl',
    mrkdwn: false,
    parse: 'none',
    username: 'username',
    thread_ts: 'replyTo',
    as_user: true,
    reply_broadcast: true,
    unfurl_links: true,
    unfurl_media: true,
  });

  expect(parser).toHaveBeenCalledWith(content);
});

test('if no text prop is passed, falls back to the parser text result', () => {
  // Parser is mocked (returns undefined here), so text falls back to ''
  const res = render(<Message>Hello</Message>) as SlackMessageDraft;

  expect(res.text).toBe('');
});

test('if parser returns text (e.g. string children), it is used when no text prop is set', () => {
  parser.mockReturnValue({text: 'Hello from children'});
  const res = render(<Message>Hello from children</Message>) as SlackMessageDraft;

  expect(res.text).toBe('Hello from children');
});

test('explicit text prop takes priority over parser text result', () => {
  parser.mockReturnValue({text: 'children text'});
  const res = render(<Message text="explicit text">Hello</Message>) as SlackMessageDraft;

  expect(res.text).toBe('explicit text');
});

test('passes channel to output when provided', () => {
  const res = render(<Message channel="C123456">content</Message>);

  expect((res as SlackMessageDraft).channel).toBe('C123456');
});

test('passes user to output when provided', () => {
  const res = render(<Message channel="C123456" user="U789">content</Message>);

  expect((res as SlackMessageDraft).channel).toBe('C123456');
  expect((res as SlackMessageDraft).user).toBe('U789');
});

test('if a color is passed, transforms the block elements to be within an attachment', () => {
  const content = 'abc';
  const returnContent = '<CONTENT>abc</CONTENT>';
  parser.mockImplementation(value => value === content ? {blocks: [returnContent]} : undefined);
  const res = render(<Message color="#FF0000">
    {content}
  </Message>);

  expect(res).toEqual({
    text: '',
    attachments: [
      {
        fallback: '',
        color: '#FF0000',
        blocks: [
          returnContent,
        ],
      },
    ],
  });
});

test('can render with a container block', () => {
  const content = 'content-of-block';
  const res = render(<Message
    asUser
    replyBroadcast
    unfurlLinks
    unfurlMedia
    text="text"
    iconEmoji=":icon_emoji:"
    iconUrl="iconUrl"
    markdown={false}
    parse="none"
    username="username"
    replyTo="replyTo"
  >
    <Container>
      {content}
    </Container>
  </Message>);

  expect(res).toEqual({
    text: 'text',
    icon_emoji: ':icon_emoji:',
    icon_url: 'iconUrl',
    mrkdwn: false,
    parse: 'none',
    username: 'username',
    thread_ts: 'replyTo',
    as_user: true,
    reply_broadcast: true,
    unfurl_links: true,
    unfurl_media: true,
  });

  expect(parser).toHaveBeenCalled();
  expect(parser.mock.calls[0][0].props.children).toBe(content);
});
