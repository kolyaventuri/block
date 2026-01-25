import {type Element} from '../../constants/types';
import {type Props as RichTextEmojiProperties} from '../../components/rich-text/emoji';

export type RichTextEmojiType = {
  type: 'emoji';
  name: string;
};

const transformRichTextEmoji = (child: Element): RichTextEmojiType => {
  const {name}: RichTextEmojiProperties = child.props;

  return {
    type: 'emoji',
    name,
  };
};

export default transformRichTextEmoji;
