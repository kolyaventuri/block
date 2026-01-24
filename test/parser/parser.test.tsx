import React from 'react';
import test from 'ava';
import {stub} from 'sinon';
import proxyquire from 'proxyquire';

const fooTransformer = stub();
const divTransformer = stub().callsFake(element => ({
  type: 'div',
  text: element.props.children,
}));

const parser = proxyquire('../../src/parser', {
  '../transformers': {
    default: {
      Foo: fooTransformer,
      div: divTransformer,
    },
  },
}).default;

test('it returns a basic message if the child is just a string', t => {
  const text = 'Hello, world!';
  const result = parser(text);
  const expected = {text};

  t.deepEqual(result, expected);
});

function Foo() {
  return <p>Test</p>;
}

test('it passes the item to the right transformer', t => {
  const element = (
    <div>
      <p>Hi</p>
    </div>
  );

  const element2 = <Foo/>;

  parser([element, element2]);

  t.true(divTransformer.calledWith(element));
  t.true(fooTransformer.calledWith(element2));
});

test('it returns the result of the transformers', t => {
  const res = parser(<div>Foo</div>);

  t.deepEqual(res, {
    blocks: [
      {type: 'div', text: 'Foo'},
    ],
  });
});

test('it does not transform unkown types', t => {
  const res = parser(<p>Hi</p>);

  t.deepEqual(res, {});
});

test('it does not explode on null', t => {
  const function_ = () => parser(null);

  t.notThrows(function_);
});
