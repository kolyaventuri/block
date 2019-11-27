import test from 'ava';
import React from 'react';

import parse from '../src';

test('can accept React component without erroring', t => {
  const fn = () => parse(<div/>);

  t.notThrows(fn);
});
