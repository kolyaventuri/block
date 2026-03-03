import {type Element} from '../../constants/types';
import {type Props as RichTextLinkProperties} from '../../components/rich-text/link';
import {type RichTextStyle} from '../../components/rich-text/types';

type RichTextLinkType = {
  type: 'link';
  url: string;
  text?: string;
  style?: RichTextStyle;
};

const transformRichTextLink = (child: Element): RichTextLinkType => {
  const {url, children, style} = child.props as RichTextLinkProperties;

  const res: RichTextLinkType = {
    type: 'link',
    url,
  };

  if (children) {
    res.text = children;
  }

  if (style) {
    res.style = style;
  }

  return res;
};

export default transformRichTextLink;
