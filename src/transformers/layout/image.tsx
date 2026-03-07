
import {type Element} from '../../constants/types';
import {type TextType} from '../block/text';
import {type Props as ImageProperties} from '../../components/layout/image';
import {transform} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {
  MAX_IMAGE_URL, MAX_IMAGE_ALT_TEXT, MAX_IMAGE_TITLE, MAX_BLOCK_ID_LENGTH,
} from '../../constants/limits';

export type ImageType = {
  type: 'image';
  image_url: string;
  alt_text: string;
  title?: TextType;
  block_id?: string;
};

const transformImageLayout = (child: Element): ImageType => {
  const {url, alt, title, blockId} = child.props as ImageProperties;

  requireField('url', url);
  requireField('alt', alt);
  warnIfTooLong('Image image_url', url, MAX_IMAGE_URL);
  warnIfTooLong('Image alt_text', alt, MAX_IMAGE_ALT_TEXT);
  warnIfTooLong('block_id', blockId, MAX_BLOCK_ID_LENGTH);

  const res: ImageType = {
    type: 'image',
    image_url: url ?? '',
    alt_text: alt ?? '',
  };

  if (title) {
    warnIfTooLong('Image title', title, MAX_IMAGE_TITLE);
    res.title = transform(<Text plainText>{title}</Text>) as TextType;
  }

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformImageLayout;
