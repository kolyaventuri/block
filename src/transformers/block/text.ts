import {Child, Element} from '../../constants/types';

export type TextProps = {
  type: 'plain_text' | 'mrkdwn';
  text: string;
  emoji?: boolean;
  verbatim?: boolean;
};

export default (elem: Element): TextProps => {
  const {
    props: {
      plainText,
      children,
      emoji,
      verbatim
    }
  } = elem;

  const res: TextProps = {
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
