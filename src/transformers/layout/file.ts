import {type Element} from '../../constants/types';
import {type Props as FileProperties} from '../../components/layout/file';
import {warnIfTooLong, requireField} from '../../utils/validation';

export type FileType = {
  type: 'file';
  source: 'remote';
  external_id: string;
  block_id?: string;
};

const transformFile = (child: Element): FileType => {
  const {externalId, blockId} = child.props as FileProperties;
  requireField('externalId', externalId);
  warnIfTooLong('block_id', blockId, 255);
  const res: FileType = {
    type: 'file',
    source: 'remote',
    external_id: externalId ?? '',
  };

  if (blockId) {
    res.block_id = blockId;
  }

  return res;
};

export default transformFile;
