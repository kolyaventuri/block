import React from 'react';
import test from 'ava';
import getType from '../../src/utils/get-type';

class Foo extends React.Component {}

test('it recognizes strings', t => {
  t.is(getType('Hello'), 'string');
});

test('it recognizes DOM elements', t => {
  t.is(getType(<div/>), 'div');
});

test('it recognizes react elements', t => {
  t.is(getType(<Foo/>), 'Foo');
});

test('it recognizes null', t => {
  t.is(getType(null), 'null');
});
