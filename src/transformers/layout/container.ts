import {type Props as ContainerProperties} from '../../components/layout/container';
import {type Element, type Child} from '../../constants/types';
import {transformElements} from '../transform';
import normalizeChildren from '../../utils/normalize-children';

type ContainerType = Child[];

const transformContainer = (child: Element): ContainerType => {
  const {children} = child.props as ContainerProperties;
  const elements = normalizeChildren(children);

  return transformElements<Child>(elements as Element[]);
};

export default transformContainer;
