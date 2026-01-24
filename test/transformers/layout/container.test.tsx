import React from 'react';
import test from 'ava';

import Container from '../../../src/components/layout/container';
import Text from '../../../src/components/block/text';
import transformer from '../../../src/transformers/layout/container';
import textTransformer from '../../../src/transformers/block/text';
import {Child} from '../../../src/constants/types';

test('passes elements through', t => {
  const element = <Text>Foo</Text>;

  const res = transformer(<Container>
    {element}
  </Container>);

  t.deepEqual(res, [textTransformer(element)] as any[]);
});

test('can pass multiple elements through', t => {
  const element = <Text>Foo</Text>;
  const element2 = <Text>Bar</Text>;

  const res = transformer(<Container>
    {element}
    {element2}
  </Container>);

  t.deepEqual(res, [element, element2].map(element => textTransformer(element)) as any[]);
});
