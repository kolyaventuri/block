import {type Element} from '../../constants/types';
import {type Props as RichTextTextProperties} from '../../components/rich-text/text';
import {type RichTextStyle} from '../../components/rich-text/types';

export type RichTextTextType = {
  type: 'text';
  text: string;
  style?: RichTextStyle;
};

const transformRichTextText = (child: Element): RichTextTextType => {
  const {children, style}: RichTextTextProperties = child.props;

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
