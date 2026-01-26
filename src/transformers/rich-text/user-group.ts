import {type Element} from '../../constants/types';
import {type Props as RichTextUserGroupProperties} from '../../components/rich-text/user-group';

export type RichTextUserGroupType = {
  type: 'usergroup';
  usergroup_id: string;
};

const transformRichTextUserGroup = (child: Element): RichTextUserGroupType => {
  const {usergroupId}: RichTextUserGroupProperties = child.props;

  return {
    type: 'usergroup',
    usergroup_id: usergroupId,
  };
};

export default transformRichTextUserGroup;
