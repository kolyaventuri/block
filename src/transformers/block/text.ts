import {type Element} from '../../constants/types';
import {type Props as TextProps} from '../../components/block/text';
import {warnIfTooLong} from '../../utils/validation';

export type TextType = {
  type: 'plain_text' | 'mrkdwn';
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
};

const transformText = (element: Element): TextType => {
  const {plainText, children, emoji, verbatim} = element.props as TextProps;

  const res: TextType = {
    type: plainText ? 'plain_text' : 'mrkdwn',
    text: children,
  };

  if (typeof children === 'string') {
    warnIfTooLong('Text', children, 3000);
  }

  if (emoji) {
    res.emoji = true;
  }

  if (verbatim) {
    res.verbatim = true;
  }

  return res;
};

export default transformText;
