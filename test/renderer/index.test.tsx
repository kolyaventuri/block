import test from 'ava';
import React from 'react';
import proxyquire from 'proxyquire';
import {stub} from 'sinon';

import Message from '../../src/components/message';
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
  const fn = () => render(<Message/>);

  t.throws(fn);
});
