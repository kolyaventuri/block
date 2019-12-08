import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import Message from '../../src/components/message';
const parser = stub();
const render = proxyquire('../../src/renderer', {
  '../parser': { default: parser }
}).default

test('it passes a list of children to the parser', t => {
  const content = 'block-content';
  render(<Message token="t" channel="c">{content}</Message>);

  t.true(parser.calledWith(content));
});

test('it throws an error if the passed component is not a <Message> component', t => {
  const fn = () => render(<div/>);

  t.throws(fn);
});

test('it throws an error if no children are passed', t => {
  // @ts-ignore - We want to explicitly check the lack of children 
  const fn = () => render(<Message/>);

  t.throws(fn);
});

test('it accepts channel as a prop and renders it', t => {
  const channel = 'abcde12345';
  const result = render(<Message token="t" channel={channel}>Foo</Message>);

  t.is(result.channel, channel);
});

test('it accepts a replyTo prop and renders it', t => {
  const thread_ts = '12345.56';
  const result = render(<Message token="t" channel="c" replyTo={thread_ts}>Foo</Message>);

  t.is(result.thread_ts, thread_ts);
});

test('it accepts a markdown prop and renders it', t => {
  const result = render(<Message token="t" channel="c" markdown={false}>Foo</Message>);

  t.is(result.mrkdwn, false);
});

test('can render all props', t => {
  const content = 'content-of-block';
  const res = render(
    <Message
      token="token"
      channel="channel"
      text="text"
      iconEmoji=":icon_emoji:"
      iconUrl="iconUrl"
      markdown={false}
      parse="none"
      username="username"
      replyTo="replyTo"
      asUser
      replyBroadcast
      unfurlLinks
      unfurlMedia
    >
      {content}
    </Message>
  );

  t.deepEqual(res, {
    token: 'token',
    channel: 'channel',
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
    unfurl_media: true
  });

  t.true(parser.calledWith(content));
});

test('if no text prop is passed, uses a blank string', t => {
  const res = render(<Message token="t" channel="c">Hello</Message>);

  t.is(res.text, '');
});
