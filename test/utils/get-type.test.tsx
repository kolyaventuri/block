import {test, expect} from 'vitest';

import getType from '../../src/utils/get-type';

class Foo {
  static slackType = 'Foo';
  declare props: Record<string, unknown>;
}

test('it recognizes strings', () => {
  expect(getType('Hello')).toBe('string');
});

test('it recognizes DOM elements', () => {
  expect(getType(<div/>)).toBe('div');
});

test('it recognizes react elements', () => {
  expect(getType(<Foo/>)).toBe('Foo');
});

test('it recognizes null', () => {
  expect(getType(null)).toBe('null');
});
