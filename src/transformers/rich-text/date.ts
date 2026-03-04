import {type Element} from '../../constants/types';
import {type Props as RichTextDateProperties} from '../../components/rich-text/date';

type RichTextDateType = {
  type: 'date';
  timestamp: number;
  format: string;
  fallback: string;
};

const transformRichTextDate = (child: Element): RichTextDateType => {
  const {timestamp, format, fallback} = child.props as RichTextDateProperties;

  return {
    type: 'date',
    timestamp,
    format,
    fallback,
  };
};

export default transformRichTextDate;
