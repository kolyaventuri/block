import {test, expect} from 'vitest';

import Divider from '../../src/components/layout/divider';
import Header from '../../src/components/layout/header';
import {renderToBlocks} from '../../src/renderer';

test('returns Block[] from a JSX element without a <Message> wrapper', () => {
  const blocks = renderToBlocks(<Divider/>);

  expect(Array.isArray(blocks)).toBe(true);
  expect(blocks.length).toBe(1);
  expect((blocks[0] as {type: string}).type).toBe('divider');
});

test('returns [] for an empty fragment', () => {
  const blocks = renderToBlocks(<></>);

  expect(blocks).toEqual([]);
});

test('returns multiple blocks from a fragment with multiple children', () => {
  const blocks = renderToBlocks(<>
    <Header text="First"/>
    <Divider/>
  </>);

  expect(blocks.length).toBe(2);
  expect((blocks[0] as {type: string}).type).toBe('header');
  expect((blocks[1] as {type: string}).type).toBe('divider');
});

test('passes validate option through — strict mode throws on unknown types', () => {
  const render = () => renderToBlocks(<div/>, {validate: 'strict'});

  expect(render).toThrow();
});

test('works with a single element (no fragment)', () => {
  const blocks = renderToBlocks(<Header text="Hello"/>);

  expect(blocks.length).toBe(1);
  expect((blocks[0] as {type: string}).type).toBe('header');
});
