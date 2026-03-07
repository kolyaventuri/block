import {type Element} from '../../constants/types';
import {type Props as ImageProperties} from '../../components/block/image';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {MAX_IMAGE_ALT_TEXT, MAX_IMAGE_URL} from '../../constants/limits';

export type ImageType = {
  type: 'image';
  image_url: string;
  alt_text: string;
};

const transformImage = (child: Element): ImageType => {
  const {url, alt} = child.props as ImageProperties;
  requireField('url', url);
  requireField('alt', alt);
  warnIfTooLong('Image image_url', url, MAX_IMAGE_URL);
  warnIfTooLong('Image alt_text', alt, MAX_IMAGE_ALT_TEXT);

  return {
    type: 'image',
    image_url: url ?? '',
    alt_text: alt ?? '',
  };
};

export default transformImage;
