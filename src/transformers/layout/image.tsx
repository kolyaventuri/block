
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type Props as ImageProperties} from '../../components/layout/image';
import {transform} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong} from '../../utils/validation';

export type ImageType = {
  type: 'image';
  image_url: string;
  alt_text: string;
  title?: TextType;
  block_id?: string;
};

const transformImageLayout = (child: Element): ImageType => {
  const {url, alt, title, blockId} = child.props as ImageProperties;

  warnIfTooLong('Image image_url', url, 3000);
  warnIfTooLong('Image alt_text', alt, 2000);
  warnIfTooLong('block_id', blockId, 255);

  const res: ImageType = {
    type: 'image',
    image_url: url,
    alt_text: alt,
  };

  if (title) {
    warnIfTooLong('Image title', title, 2000);
    res.title = transform(<Text plainText>{title}</Text>) as TextType;
  }

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformImageLayout;
