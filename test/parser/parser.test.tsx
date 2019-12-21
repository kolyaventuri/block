import React from 'react';
import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const fooTransformer = stub();
const divTransformer = stub().callsFake(elem => {
  return {
    type: 'div',
    text: elem.props.children 
  }
});

const parser = proxyquire('../../src/parser', {
  '../transformers': {
    default: {
      Foo: fooTransformer,
      div: divTransformer
    }
  }
}).default;

test('it returns a basic message if the child is just a string', t => {
  const text = 'Hello, world!';
  const result = parser(text);
  const expected = {text};

  t.deepEqual(result, expected);
});

const Foo = () => <p>Test</p>;
test('it passes the item to the right transformer', t => {
  const elem = (
    <div>
      <p>Hi</p>
    </div>
  );

  const elem2 = <Foo/>;

  parser([elem, elem2]);

  t.true(divTransformer.calledWith(elem));
  t.true(fooTransformer.calledWith(elem2));
});

test('it returns the result of the transformers', t => {
  const res = parser(<div>Foo</div>);

  t.deepEqual(res, {
    blocks: [
      {type: 'div', text: 'Foo'}
    ]
  });
});

test('it does not transform unkown types', t => {
  const res = parser(<p>Hi</p>);

  t.deepEqual(res, {});
});

test('it does not explode on null', t => {
  const fn = () => parser(null);

  t.notThrows(fn);
});
