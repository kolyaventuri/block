import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import renderFn from '../../src/renderer';
import Message from '../../src/components/message';
import Text from '../../src/components/block/text';
import Container from '../../src/components/layout/container';
import Section from '../../src/components/layout/section';
import Context from '../../src/components/layout/context';
import Image from '../../src/components/block/image';
const parser = stub();
const render = proxyquire('../../src/renderer', {
  '../parser': { default: parser }
}).default

test('it passes a list of children to the parser', t => {
  const content = 'block-content';
  render(<Message>{content}</Message>);

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

test('can render all props', t => {
  const content = 'content-of-block';
  const res = render(
    <Message
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
  const res = render(<Message>Hello</Message>);

  t.is(res.text, '');
});

test('if a color is passed, transforms the block elements to be within an attachment', t => {
  const content = 'abc';
  const returnContent = '<CONTENT>abc</CONTENT>'
  parser.withArgs(content).returns({
    blocks: [returnContent]
  });
  const res = render(
    <Message color="#FF0000">
      {content}
    </Message>
  );

  t.deepEqual(res, {
    text: '',
    attachments: [
      {
        color: '#FF0000',
        blocks: [
          returnContent
        ]
      }
    ]
  })
});

test('can render with a container block', t => {
  const content = 'content-of-block';
  const res = render(
    <Message
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
      <Container>
        {content}
      </Container>
    </Message>
  );

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
    unfurl_media: true
  });

  t.true(parser.calledWith(content));
});

test('can render with an array of blocks', t => {
  const content = [
    <Text>Foo</Text>,
    <Text>Bar</Text>
  ];

  const result = renderFn(
    <Message>
      <Container>
        {content}
      </Container>
    </Message>
  ) as unknown;

  t.deepEqual(result, {
    text: '',
    blocks: [
      {
        type: 'mrkdwn',
        text: 'Foo'
      },
      {
        type: 'mrkdwn',
        text: 'Bar'
      }
    ]
  });
});

test('ignores nested nulls', t => {
  const result = renderFn(
    <Message>
      <Container>
        <Text>Foo</Text>
        {null}
        <Text>Bar</Text>
      </Container>
    </Message>
  ) as unknown;

  t.deepEqual(result, {
    text: '',
    blocks: [
      {
        type: 'mrkdwn',
        text: 'Foo'
      },
      {
        type: 'mrkdwn',
        text: 'Bar'
      }
    ]
  });
});

test('can correctly render a complex message', t => {
  const result = renderFn(
    <Message color='#FF0000'>
      <Section text={<Text>Section Header</Text>}>
        <Text>FooBar</Text>
        <Image url="someUrl" alt="someAlt"/>
      </Section>
      <Context>
        <Text plainText>Some Context</Text>
      </Context>
    </Message>
  ) as unknown;

  t.deepEqual(result, {
    text: '',
    attachments: [
      {
        color: '#FF0000',
        blocks: [
          {
            type: 'section',
            text: {
              type: 'mrkdwn',
              text: 'Section Header'
            },
            fields: [
              {
                type: 'mrkdwn',
                text: 'FooBar'
              },
              {
                type: 'image',
                url: 'someUrl',
                alt: 'someAlt'
              }
            ]
          },
          {
            type: 'context',
            elements: [
              {
                type: 'plain_text',
                text: 'Some Context'
              }
            ]
          }
        ]
      }
    ]
  });
});
