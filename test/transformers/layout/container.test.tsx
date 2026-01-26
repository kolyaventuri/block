import React from 'react';
import {test, expect} from 'vitest';

import Container from '../../../src/components/layout/container';
import Text from '../../../src/components/block/text';
import transformer from '../../../src/transformers/layout/container';
import textTransformer from '../../../src/transformers/block/text';
import type {Child} from '../../../src/constants/types';

test('passes elements through', () => {
  const element = <Text>Foo</Text>;

  const res = transformer(<Container>
    {element}
  </Container>);

  expect(res).toEqual([textTransformer(element)] as any[]);
});

test('can pass multiple elements through', () => {
  const element = <Text>Foo</Text>;
  const element2 = <Text>Bar</Text>;

  const res = transformer(<Container>
    {element}
    {element2}
  </Container>);

  expect(res).toEqual([element, element2].map(element => textTransformer(element)) as any[]);
});

test('ignores falsey children', () => {
  const element = <Text>Foo</Text>;

  const res = transformer(<Container>
    {false}
    {null}
    {undefined}
    {element}
  </Container>);

  expect(res).toEqual([textTransformer(element)] as any[]);
});

test('flattens nested child arrays', () => {
  const element = <Text>Foo</Text>;
  const element2 = <Text>Bar</Text>;

  const res = transformer(<Container>
    {[element, [element2]] as Child}
  </Container>);

  expect(res).toEqual([element, element2].map(element => textTransformer(element)) as any[]);
});
