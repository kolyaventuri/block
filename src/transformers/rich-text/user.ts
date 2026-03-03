import {type Element} from '../../constants/types';
import {type Props as RichTextUserProperties} from '../../components/rich-text/user';

type RichTextUserType = {
  type: 'user';
  user_id: string;
};

const transformRichTextUser = (child: Element): RichTextUserType => {
  const {userId} = child.props as RichTextUserProperties;

  return {
    type: 'user',
    user_id: userId,
  };
};

export default transformRichTextUser;
