import test from 'ava';
import React from 'react';

import render from '../src';
import Block from '../src/components/block';

test('can accept React component without erroring', t => {
  const fn = () => render(<Block>child</Block>);

  t.notThrows(fn);
});
