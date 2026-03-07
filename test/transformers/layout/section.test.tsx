import {test, expect} from 'vitest';

import Section from '../../../src/components/layout/section';
import Text from '../../../src/components/block/text';
import transformer from '../../../src/transformers/layout/section';

test('it transforms a basic Section component', () => {
  const element = (
    <Section
      text="FooBar"
    />
  );

  const res = transformer(element);

  expect(res).toEqual({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'FooBar',
    },
  });
});

test('it transforms a more complex Section', () => {
  const res = transformer(<Section
    text={<Text>FooBar</Text>}
    fields={<Text>OtherText</Text>}
    blockId="abc123"
    accessory={<Text>Accessory</Text>}
    expand
  />);

  expect(res).toEqual({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'FooBar',
    },
    block_id: 'abc123',
    fields: [
      {
        type: 'mrkdwn',
        text: 'OtherText',
      },
    ],
    accessory: {
      type: 'mrkdwn',
      text: 'Accessory',
    },
    expand: true,
  });
});

test('it does not break if there is a null field', () => {
  const function_ = () => transformer(<Section text={<Text>Foo</Text>}>
    <Text>More text</Text>
    {null}
    <Text>Even more</Text>
  </Section>);

  expect(function_).not.toThrow();
  const res = function_();

  expect(res).toEqual({
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'Foo',
    },
    fields: [
      {
        type: 'mrkdwn',
        text: 'More text',
      },
      {
        type: 'mrkdwn',
        text: 'Even more',
      },
    ],
  });
});

test('it supports fields-only sections via the fields prop', () => {
  const fields = [<Text>More text</Text>, null, <Text>Even more</Text>];
  const res = transformer(<Section fields={fields}/>);

  expect(res).toEqual({
    type: 'section',
    fields: [
      {
        type: 'mrkdwn',
        text: 'More text',
      },
      {
        type: 'mrkdwn',
        text: 'Even more',
      },
    ],
  });
});
