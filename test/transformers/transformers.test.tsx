import React from 'react';
import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const TextTransformer = stub().callsFake(elem => ({
  type: 'Text',
  text: elem.props.children
}));

const transform = proxyquire.noCallThru()('../../src/transformers', {
  './block/text': TextTransformer
}).transform;

const Text = (_: {[k: string]: any}): null => null;
test('it transforms passed element', t => {
  const result = transform(<Text>Hello!</Text>);
  t.deepEqual(result, {
    type: 'Text',
    text: 'Hello!'
  });
});

test('if a transformer does not exist, throw an error', t => {
  const fn = () => transform(<p>Nope</p>);

  t.throws(fn);
});

test('can transform an array and return an array', t => {
  const result = transform([
    <Text>Foo</Text>,
    <Text>Bar</Text>
  ]);

  t.deepEqual(result, [
    {
      type: 'Text',
      text: 'Foo'
    },
    {
      type: 'Text',
      text: 'Bar'
    }
  ]);
});
