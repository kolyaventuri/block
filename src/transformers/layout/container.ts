import {type Props as ContainerProperties} from '../../components/layout/container';
import {type Element, type Child} from '../../constants/types';
import {transform} from '..';

type ContainerType = Child[];

const transformContainer = (child: Element): ContainerType => {
  const {children}: ContainerProperties = child.props;

  let elements = children;
  if (!Array.isArray(elements)) {
    elements = [elements] as Child[];
  }

  return (elements as Element[]).map(element => transform(element)) as Child[];
};

export default transformContainer;
