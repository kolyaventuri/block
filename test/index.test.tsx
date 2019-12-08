import test from 'ava';
import React from 'react';

import render from '../src';
import Message from '../src/components/message';

test('can accept React component without erroring', t => {
  const fn = () => render(<Message token="t" channel="t">child</Message>);

  t.notThrows(fn);
});
