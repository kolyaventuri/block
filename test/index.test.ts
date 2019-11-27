import test from 'ava';

import testFn from '../src';

test('works', t => {
  t.is(testFn('Joe'), true);
});
