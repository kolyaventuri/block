import {type Props as ContainerProperties} from '../../components/layout/container';
import {type Element, type Child} from '../../constants/types';
import {transform} from '..';

type ContainerType = Child[];

const normalizeChildren = (children: Child): Child[] => {
  const result: Child[] = [];
  const stack = Array.isArray(children) ? [...children] : [children];

  while (stack.length > 0) {
    const child = stack.shift();

    if (child === null || child === undefined || typeof child === 'boolean') {
      continue;
    }

    if (Array.isArray(child)) {
      stack.unshift(...child);
      continue;
    }

    result.push(child);
  }

  return result;
};

const transformContainer = (child: Element): ContainerType => {
  const {children}: ContainerProperties = child.props;
  const elements = normalizeChildren(children);

  return (elements as Element[]).map(element => transform(element)) as Child[];
};

export default transformContainer;
