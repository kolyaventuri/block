import {expect, test} from 'vitest';

import transformer from '../../../src/transformers/layout/video';
import Video from '../../../src/components/layout/video';

test('transforms a video block', () => {
  const res = transformer(<Video
    title="Title"
    videoUrl="https://example.com/video"
    thumbnailUrl="https://example.com/thumb"
    altText="Alt"
  />);

  expect(res).toEqual({
    type: 'video',
    title: {
      type: 'plain_text',
      text: 'Title',
    },
    video_url: 'https://example.com/video',
    thumbnail_url: 'https://example.com/thumb',
    alt_text: 'Alt',
  });
});

test('transforms a detailed video block', () => {
  const res = transformer(<Video
    title="Title"
    videoUrl="https://example.com/video"
    thumbnailUrl="https://example.com/thumb"
    altText="Alt"
    titleUrl="https://example.com/title"
    description="Description"
    authorName="Author"
    providerName="Provider"
    providerIconUrl="https://example.com/icon"
    blockId="blockId"
  />);

  expect(res).toEqual({
    type: 'video',
    title: {
      type: 'plain_text',
      text: 'Title',
    },
    video_url: 'https://example.com/video',
    thumbnail_url: 'https://example.com/thumb',
    alt_text: 'Alt',
    title_url: 'https://example.com/title',
    description: {
      type: 'plain_text',
      text: 'Description',
    },
    author_name: 'Author',
    provider_name: 'Provider',
    provider_icon_url: 'https://example.com/icon',
    block_id: 'blockId',
  });
});
