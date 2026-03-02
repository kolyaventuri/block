import {type Element} from '../../constants/types';
import {type Props as RichTextDateProperties} from '../../components/rich-text/date';

export type RichTextDateType = {
  type: 'date';
  timestamp: number;
  format: string;
  fallback: string;
  link?: string;
};

const transformRichTextDate = (child: Element): RichTextDateType => {
  const {timestamp, format, fallback, link} = child.props as RichTextDateProperties;

  const res: RichTextDateType = {
    type: 'date',
    timestamp,
    format,
    fallback,
  };

  if (link) {
    res.link = link;
  }

  return res;
};

export default transformRichTextDate;
