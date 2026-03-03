import {type Element} from '../../constants/types';
import {type Props as RichTextEmojiProperties} from '../../components/rich-text/emoji';

type RichTextEmojiType = {
  type: 'emoji';
  name: string;
};

const transformRichTextEmoji = (child: Element): RichTextEmojiType => {
  const {name} = child.props as RichTextEmojiProperties;

  return {
    type: 'emoji',
    name,
  };
};

export default transformRichTextEmoji;
