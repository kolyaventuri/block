import React from 'react';
import test from 'ava';
import Section from '../../../src/components/layout/section';
import Text from '../../../src/components/block/text';
import transformer from '../../../src/transformers/layout/section';

test('it transforms a basic Section component', t => {
  const elem = (
    <Section
      text={ <Text>FooBar</Text> }
    />
  );

  const res = transformer(elem);

  t.deepEqual(res, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'FooBar'
    }
  });
});

test('it transforms a more complex Section', t => {
  const fields = [
    <Text>OtherText</Text>
  ];

  const res = transformer(
    <Section
      text={<Text>FooBar</Text>}
      blockId="abc123"
      accessory={<Text>Accessory</Text>}
    >
      <Text>OtherText</Text>
    </Section>
  );

  t.deepEqual(res, {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: 'FooBar'
    },
    block_id: 'abc123',
    fields: [
      {
        type: 'mrkdwn',
        text: 'OtherText'
      }
    ],
    accessory: {
      type: 'mrkdwn',
      text: 'Accessory'
    }
  });
});
