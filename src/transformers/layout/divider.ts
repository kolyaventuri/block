import {type Element} from '../../constants/types';
import {type Props as DividerProperties} from '../../components/layout/divider';
import {warnIfTooLong} from '../../utils/validation';

export type DividerType = {
  type: 'divider';
  block_id?: string;
};

const transformDivider = (child: Element): DividerType => {
  const {blockId}: DividerProperties = child.props;

  warnIfTooLong('block_id', blockId, 255);

  const res: DividerType = {type: 'divider'};

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformDivider;
