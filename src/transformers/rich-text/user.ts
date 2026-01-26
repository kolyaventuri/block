import {type Element} from '../../constants/types';
import {type Props as RichTextUserProperties} from '../../components/rich-text/user';

export type RichTextUserType = {
  type: 'user';
  user_id: string;
};

const transformRichTextUser = (child: Element): RichTextUserType => {
  const {userId}: RichTextUserProperties = child.props;

  return {
    type: 'user',
    user_id: userId,
  };
};

export default transformRichTextUser;
