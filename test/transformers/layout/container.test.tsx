import React from 'react';
import test from 'ava';

import Container from '../../../src/components/layout/container';
import transformer from '../../../src/transformers/layout/container';

test('passes elements through', t => {
  const elem = <p>FooBar</p>;

  const res = transformer(
    <Container>
      {elem}
    </Container>
  );

  t.deepEqual(res, [elem]);
});

test('can pass multiple elements through', t => {
  const elem = <p>FooBar</p>;
  const elem2 = <div>BarFoo</div>;

  const res = transformer(
    <Container>
      {elem}
      {elem2}
    </Container>
  );

  t.deepEqual(res, [elem, elem2]);
});
