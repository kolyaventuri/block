import {type Element} from '../../constants/types';
import {type Props as FileProperties} from '../../components/layout/file';

type FileType = {
  type: 'file';
  source: 'remote';
  external_id: string;
  block_id?: string;
};

const transformFile = (child: Element): FileType => {
  const {externalId, blockId}: FileProperties = child.props;
  const res: FileType = {
    type: 'file',
    source: 'remote',
    external_id: externalId,
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformFile;
