import {type Element} from '../../constants/types';
import {type Props as RichTextBroadcastProperties} from '../../components/rich-text/broadcast';
import {type RichTextBroadcastRange} from '../../components/rich-text/types';

export type RichTextBroadcastType = {
  type: 'broadcast';
  range: RichTextBroadcastRange;
};

const transformRichTextBroadcast = (child: Element): RichTextBroadcastType => {
  const {range} = child.props as RichTextBroadcastProperties;

  return {
    type: 'broadcast',
    range,
  };
};

export default transformRichTextBroadcast;
