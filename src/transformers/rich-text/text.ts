import {type Element} from '../../constants/types';
import {type Props as RichTextTextProperties} from '../../components/rich-text/text';
import {type RichTextStyle} from '../../components/rich-text/types';

type RichTextTextType = {
  type: 'text';
  text: string;
  style?: RichTextStyle;
};

const transformRichTextText = (child: Element): RichTextTextType => {
  const {children, style} = child.props as RichTextTextProperties;

  const res: RichTextTextType = {
    type: 'text',
    text: children,
  };

  if (style) {
    res.style = style;
  }

  return res;
};

export default transformRichTextText;
