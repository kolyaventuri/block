import {Element} from '../../constants/types';

export type TextType = {
  type: 'plain_text' | 'mrkdwn';
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
};

export default (elem: Element): TextType => {
  const {
    props: {
      plainText,
      children,
      emoji,
      verbatim
    }
  } = elem;

  const res: TextType = {
    type: plainText ? 'plain_text' : 'mrkdwn',
    text: children
  };

  if (emoji) {
    res.emoji = true;
  }

  if (verbatim) {
    res.verbatim = true;
  }

  return res;
};
