import {type Element} from '../../constants/types';
import {type Props as DividerProperties} from '../../components/layout/divider';

type DividerType = {
  type: 'divider';
  block_id?: string;
};

const transformDivider = (child: Element): DividerType => {
  const {blockId}: DividerProperties = child.props;

  const res: DividerType = {type: 'divider'};

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformDivider;
