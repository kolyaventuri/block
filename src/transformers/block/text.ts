import {Child, Element} from "../../constants/types";

export type Text = {
  type: 'plain_text' | 'mrkdwn',
  text: string
  emoji?: boolean,
  verbatim?: boolean
};

export default (child: Child): Text => {
  const elem = child as Element;
  const {
    props: {
      plainText,
      children,
      emoji,
      verbatim
    }
  } = elem;

  const res: Text = {
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
