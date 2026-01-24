import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import Message from '../../src/components/message';
import Container from '../../src/components/layout/container';

const parser = stub();
const render = proxyquire('../../src/renderer', {
  '../parser': {default: parser},
}).default;

test('it passes a list of children to the parser', t => {
  const content = 'block-content';
  render(<Message>{content}</Message>);

  t.true(parser.calledWith(content));
});

test('it throws an error if the passed component is not a <Message> component', t => {
  const function_ = () => render(<div/>);

  t.throws(function_);
});

test('it throws an error if no children are passed', t => {
  // @ts-expect-error - We want to explicitly check the lack of children
  const function_ = () => render(<Message/>);

  t.throws(function_);
});

test('can render all props', t => {
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

  t.deepEqual(res, {
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

  t.true(parser.calledWith(content));
});

test('if no text prop is passed, uses a blank string', t => {
  const res = render(<Message>Hello</Message>);

  t.is(res.text, '');
});

test('if a color is passed, transforms the block elements to be within an attachment', t => {
  const content = 'abc';
  const returnContent = '<CONTENT>abc</CONTENT>';
  parser.withArgs(content).returns({
    blocks: [returnContent],
  });
  const res = render(<Message color="#FF0000">
    {content}
  </Message>);

  t.deepEqual(res, {
    text: '',
    attachments: [
      {
        color: '#FF0000',
        blocks: [
          returnContent,
        ],
      },
    ],
  });
});

test('can render with a container block', t => {
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

  t.deepEqual(res, {
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

  t.true(parser.calledWith(content));
});
