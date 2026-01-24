import {type Element} from '../../constants/types';
import {type Props as ImageProperties} from '../../components/block/image';

export type ImageType = {
  type: 'image';
  url: string;
  alt: string;
};

const transformImage = (child: Element): ImageType => {
  const {url, alt}: ImageProperties = child.props;

  return {
    type: 'image',
    url,
    alt,
  };
};

export default transformImage;
