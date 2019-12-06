import {Element} from '../../constants/types';

import {Props as DividerProps} from '../../components/layout/divider';

type DividerType = {
  type: 'divider';
  block_id?: string;
};

export default (child: Element): DividerType => {
  const {blockId}: DividerProps = child.props;

  const res: DividerType = {type: 'divider'};

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};
