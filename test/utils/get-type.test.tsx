import React from 'react';
import {test, expect} from 'vitest';

import getType from '../../src/utils/get-type';

class Foo extends React.Component {}

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
