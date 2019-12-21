import React from 'react';
import test from 'ava';

import Container from '../../../src/components/layout/container';
import Text from '../../../src/components/block/text';
import transformer from '../../../src/transformers/layout/container';
import textTransformer from '../../../src/transformers/block/text';
import { Child } from '../../../src/constants/types';

test('passes elements through', t => {
  const elem = <Text>Foo</Text>

  const res = transformer(
    <Container>
      {elem}
    </Container>
  );

  t.deepEqual(res, [textTransformer(elem)] as any[]);
});

test('can pass multiple elements through', t => {
  const elem = <Text>Foo</Text>;
  const elem2 = <Text>Bar</Text>;

  const res = transformer(
    <Container>
      {elem}
      {elem2}
    </Container>
  );

  t.deepEqual(res, [elem, elem2].map(textTransformer) as any[]);
});
