import {Props as ContainerProps} from '../../components/layout/container';
import {Element, Child} from '../../constants/types';
import {transform} from '..';

type ContainerType = Child[];

export default (child: Element): ContainerType => {
  const {children}: ContainerProps = child.props;

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements] as Child[];
  }

  return (elements as Element[]).map(element => transform(element)) as Child[];
};
