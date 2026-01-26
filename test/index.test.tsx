import {test, expect} from 'vitest';
import React from 'react';

import render from '../src';
import Message from '../src/components/message';

test('can accept React component without erroring', () => {
  const function_ = () => render(<Message>child</Message>);

  expect(function_).not.toThrow();
});
