import {type Element} from '../../constants/types';
import {type Props as ContextProperties, type ImageOrText as ImageOrTextElement} from '../../components/layout/context';
import {type TextType} from '../block/text';
import {type ImageType} from '../block/image';
import {transform} from '..';

type ImageOrText = ImageType | TextType;
type ImageOrTextElementSet = ImageOrTextElement | ImageOrTextElement[];

type ContextType = {
  type: 'context';
  elements: ImageOrText | ImageOrText[];
  block_id?: string;
};

const transformContext = (child: Element): ContextType => {
  const {children, blockId}: ContextProperties = child.props;

  let elements = children as ImageOrTextElementSet;
  if (!Array.isArray(elements)) {
    elements = [elements] as ImageOrTextElement[];
  }

  const res: ContextType = {
    type: 'context',
    elements: elements.map(element => transform(element as Element) as ImageOrText),
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformContext;
