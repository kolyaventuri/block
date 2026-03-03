import {type Element} from '../../constants/types';
import {type Props as RichTextChannelProperties} from '../../components/rich-text/channel';

type RichTextChannelType = {
  type: 'channel';
  channel_id: string;
};

const transformRichTextChannel = (child: Element): RichTextChannelType => {
  const {channelId} = child.props as RichTextChannelProperties;

  return {
    type: 'channel',
    channel_id: channelId,
  };
};

export default transformRichTextChannel;
