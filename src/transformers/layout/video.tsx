
import {type Element} from '../../constants/types';
import {type Props as VideoProperties} from '../../components/layout/video';
import {type TextType} from '../block/text';
import {transform} from '../transform';
import Text from '../../components/block/text';
import {warnIfTooLong, requireField} from '../../utils/validation';
import {
  MAX_BLOCK_ID_LENGTH,
  MAX_VIDEO_AUTHOR_NAME,
  MAX_VIDEO_DESCRIPTION,
  MAX_VIDEO_TITLE,
} from '../../constants/limits';

export type VideoType = {
  type: 'video';
  title: TextType;
  video_url: string;
  thumbnail_url: string;
  alt_text: string;
  title_url?: string;
  description?: TextType;
  author_name?: string;
  provider_name?: string;
  provider_icon_url?: string;
  block_id?: string;
};

const transformVideo = (child: Element): VideoType => {
  const {
    title,
    videoUrl,
    thumbnailUrl,
    altText,
    titleUrl,
    description,
    authorName,
    providerName,
    providerIconUrl,
    blockId,
  } = child.props as VideoProperties;

  requireField('title', title);
  requireField('videoUrl', videoUrl);
  requireField('thumbnailUrl', thumbnailUrl);
  requireField('altText', altText);
  warnIfTooLong('Video title', title, MAX_VIDEO_TITLE);
  warnIfTooLong('Video author_name', authorName, MAX_VIDEO_AUTHOR_NAME);
  warnIfTooLong('block_id', blockId, MAX_BLOCK_ID_LENGTH);

  const res: VideoType = {
    type: 'video',
    title: transform(<Text plainText>{title ?? ''}</Text>) as TextType,
    video_url: videoUrl ?? '',
    thumbnail_url: thumbnailUrl ?? '',
    alt_text: altText ?? '',
  };

  if (titleUrl) {
    res.title_url = titleUrl;
  }

  if (description) {
    warnIfTooLong('Video description', description, MAX_VIDEO_DESCRIPTION);
    res.description = transform(<Text plainText>{description}</Text>) as TextType;
  }

  if (authorName) {
    res.author_name = authorName;
  }

  if (providerName) {
    res.provider_name = providerName;
  }

  if (providerIconUrl) {
    res.provider_icon_url = providerIconUrl;
  }

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformVideo;
