import {type Element} from '../../constants/types';
import {type Props as RichTextChannelProperties} from '../../components/rich-text/channel';

export type RichTextChannelType = {
  type: 'channel';
  channel_id: string;
};

const transformRichTextChannel = (child: Element): RichTextChannelType => {
  const {channelId}: RichTextChannelProperties = child.props;

  return {
    type: 'channel',
    channel_id: channelId,
  };
};

export default transformRichTextChannel;
