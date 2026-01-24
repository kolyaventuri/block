import {type Element} from '../../constants/types';

export type TextType = {
  type: 'plain_text' | 'mrkdwn';
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
};

const transformText = (element: Element): TextType => {
  const {
    props: {
      plainText,
      children,
      emoji,
      verbatim,
    },
  } = element;

  const res: TextType = {
    type: plainText ? 'plain_text' : 'mrkdwn',
    text: children,
  };

  if (emoji) {
    res.emoji = true;
  }

  if (verbatim) {
    res.verbatim = true;
  }

  return res;
};

export default transformText;
