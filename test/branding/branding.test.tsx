import {expect, test, vi} from 'vitest';

import render from '../../src';
import SlackMessage from '../../src/components/message';
import Section from '../../src/components/layout/section';
import SlackText from '../../src/components/block/text';

function Message() {
  return null as unknown as JSX.Element;
}

function Text() {
  return null as unknown as JSX.Element;
}

Object.assign(Message, {slackType: 'Message'});
Object.assign(Text, {slackType: 'Text'});

test('rejects an unbranded top-level Message lookalike', () => {
  expect(() => render(<Message/> as never)).toThrow('Provided top-level element must be a Message type.');
});

test('ignores an unbranded nested Text lookalike even when the name matches', () => {
  const onValidation = vi.fn();

  const result = render(
    <SlackMessage>
      <Section
        text={<SlackText>Visible</SlackText>}
        fields={<Text/> as never}
      />
    </SlackMessage>,
    {validate: 'warn', onValidation},
  );

  expect(result.blocks).toEqual([
    {
      type: 'section',
      text: {
        type: 'mrkdwn',
        text: 'Visible',
      },
    },
  ]);

  expect(onValidation).toHaveBeenCalledWith(expect.objectContaining({
    rule: 'unsupported-child',
    subcode: 'unknown-type',
    component: 'Text',
  }));
});
