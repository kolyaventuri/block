import {Element} from '../../constants/types';
import {Props as ImageProps} from '../../components/block/image';

export type ImageType = {
  type: 'image';
  url: string;
  alt: string;
};

export default (child: Element): ImageType => {
  const {url, alt}: ImageProps = child.props;

  return {
    type: 'image',
    url,
    alt
  };
};
