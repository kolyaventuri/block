import {type Props as ContainerProperties} from '../../components/layout/container';
import {type Element, type Child} from '../../constants/types';
import {transform} from '../transform';
import normalizeChildren from '../../utils/normalize-children';

type ContainerType = Child[];

const transformContainer = (child: Element): ContainerType => {
  const {children} = child.props as ContainerProperties;
  const elements = normalizeChildren(children);

  return (elements as Element[]).map(element => transform(element)) as Child[];
};

export default transformContainer;
