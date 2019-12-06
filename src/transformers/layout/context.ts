import {Element} from '../../constants/types';

import {Props as ContextProps, ImageOrText as ImageOrTextElem} from '../../components/layout/context';
import {TextType} from '../block/text';
import {ImageType} from '../block/image';
import {transform} from '..';

type ImageOrText = ImageType | TextType;
type ImageOrTextElemSet = ImageOrTextElem | ImageOrTextElem[];

type ContextType = {
  type: 'context';
  elements: ImageOrText | ImageOrText[];
  block_id?: string;
};

export default (child: Element): ContextType => {
  const {children, blockId}: ContextProps = child.props;

  let elements = children as ImageOrTextElemSet;
  if (!Array.isArray(elements)) {
    elements = [elements] as ImageOrTextElem[];
  }

  const res: ContextType = {
    type: 'context',
    elements: elements.map(element => transform(element as Element) as ImageOrText)
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};
