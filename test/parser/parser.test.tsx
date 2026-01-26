import React from 'react';
import {
  beforeEach,
  expect,
  test,
  vi,
} from 'vitest';

import parser from '../../src/parser';

const fooTransformer = vi.hoisted(() => vi.fn());
const divTransformer = vi.hoisted(() => vi.fn(element => ({
  type: 'div',
  text: element.props.children,
})));

vi.mock('../../src/transformers', () => ({
  default: {
    Foo: fooTransformer,
    div: divTransformer,
  },
}));

beforeEach(() => {
  fooTransformer.mockClear();
  divTransformer.mockClear();
});

test('it returns a basic message if the child is just a string', () => {
  const text = 'Hello, world!';
  const result = parser(text);
  const expected = {text};

  expect(result).toEqual(expected);
});

function Foo() {
  return <p>Test</p>;
}

test('it passes the item to the right transformer', () => {
  const element = (
    <div>
      <p>Hi</p>
    </div>
  );

  const element2 = <Foo/>;

  parser([element, element2]);

  expect(divTransformer).toHaveBeenCalledWith(element);
  expect(fooTransformer).toHaveBeenCalledWith(element2);
});

test('it returns the result of the transformers', () => {
  const res = parser(<div>Foo</div>);

  expect(res).toEqual({
    blocks: [
      {type: 'div', text: 'Foo'},
    ],
  });
});

test('it does not transform unkown types', () => {
  const res = parser(<p>Hi</p>);

  expect(res).toEqual({blocks: []});
});

test('it does not explode on null', () => {
  const function_ = () => parser(null);

  expect(function_).not.toThrow();
});

test('it ignores falsey children', () => {
  const element = <div>Hi</div>;

  const res = parser([false, undefined, null, element]);

  expect(res).toEqual({
    blocks: [
      {type: 'div', text: 'Hi'},
    ],
  });
});

test('it flattens nested child arrays', () => {
  const element = <div>One</div>;
  const element2 = <div>Two</div>;
  const element3 = <div>Three</div>;

  const res = parser([element, [element2, [element3]]]);

  expect(res).toEqual({
    blocks: [
      {type: 'div', text: 'One'},
      {type: 'div', text: 'Two'},
      {type: 'div', text: 'Three'},
    ],
  });
});
