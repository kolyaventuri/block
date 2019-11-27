import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import Block from '../../src/components/block';
const parser = stub();
const render = proxyquire('../../src/renderer', {
  '../parser': { default: parser }
}).default

test('it passes a list of children to the parser', t => {
  const content = 'block-content';
  render(<Block>{content}</Block>);

  t.true(parser.calledWith(content));
});

test('it throws an error if the passed component is not a <Block> component', t => {
  const fn = () => render(<div/>);

  t.throws(fn);
});

test('it throws an error if no children are passed', t => {
  const fn = () => render(<Block/>);

  t.throws(fn);
});
