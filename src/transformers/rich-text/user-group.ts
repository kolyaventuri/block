import {type Element} from '../../constants/types';
import {type Props as RichTextUserGroupProperties} from '../../components/rich-text/user-group';

type RichTextUserGroupType = {
  type: 'usergroup';
  usergroup_id: string;
};

const transformRichTextUserGroup = (child: Element): RichTextUserGroupType => {
  const {usergroupId} = child.props as RichTextUserGroupProperties;

  return {
    type: 'usergroup',
    usergroup_id: usergroupId,
  };
};

export default transformRichTextUserGroup;
