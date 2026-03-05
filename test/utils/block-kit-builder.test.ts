import {test, expect} from 'vitest';

import {blockKitBuilderUrl} from '../../src/utils/block-kit-builder';

const PREFIX = 'https://app.slack.com/block-kit-builder#';

test('returns a string starting with the Block Kit Builder URL prefix', () => {
  const url = blockKitBuilderUrl([]);

  expect(url.startsWith(PREFIX)).toBe(true);
});

test('works with empty blocks array', () => {
  const url = blockKitBuilderUrl([]);
  const fragment = url.slice(PREFIX.length);
  const parsed = JSON.parse(fragment) as {blocks: unknown[]};

  expect(parsed).toEqual({blocks: []});
});

test('encodes blocks as valid JSON in the fragment', () => {
  const blocks = [{type: 'section', text: {type: 'mrkdwn', text: 'Hello'}}];
  const url = blockKitBuilderUrl(blocks as Parameters<typeof blockKitBuilderUrl>[0]);
  const fragment = url.slice(PREFIX.length);
  const parsed = JSON.parse(fragment) as {blocks: unknown[]};

  expect(parsed.blocks).toEqual(blocks);
});

test('the fragment contains the blocks key matching input', () => {
  const blocks = [
    {type: 'divider'},
    {type: 'section', text: {type: 'plain_text', text: 'Test'}},
  ] as Parameters<typeof blockKitBuilderUrl>[0];
  const url = blockKitBuilderUrl(blocks);
  const parsed = JSON.parse(url.slice(PREFIX.length)) as {blocks: unknown[]};

  expect(parsed.blocks).toHaveLength(2);
  expect(parsed.blocks[0]).toEqual({type: 'divider'});
});
