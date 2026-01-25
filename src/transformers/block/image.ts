import {type Element} from '../../constants/types';
import {type Props as ImageProperties} from '../../components/block/image';

export type ImageType = {
  type: 'image';
  image_url: string;
  alt_text: string;
};

const transformImage = (child: Element): ImageType => {
  const {url, alt}: ImageProperties = child.props;

  return {
    type: 'image',
    image_url: url,
    alt_text: alt,
  };
};

export default transformImage;
