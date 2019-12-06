import {Element} from '../../constants/types';
import {Props as FileProps} from '../../components/layout/file';

type FileType = {
  type: 'file';
  source: 'remote';
  external_id: string;
  block_id?: string;
};

export default (child: Element): FileType => {
  const {externalId, blockId}: FileProps = child.props;
  const res: FileType = {
    type: 'file',
    source: 'remote',
    external_id: externalId
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};
