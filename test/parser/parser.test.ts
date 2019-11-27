import test from 'ava';

import parser from '../../src/parser';

test('it returns a basic message if the child is just a string', t => {
  const text = 'Hello, world!';
  const result = parser(text);
  const expected = {text};

  t.deepEqual(result, expected);
});
