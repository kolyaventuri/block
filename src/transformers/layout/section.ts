import {type Element, type SerializedBlockElement} from '../../constants/types';
import {type Props as SectionComponentProps} from '../../components/layout/section';
import {type TextType as Text} from '../block/text';
import {transform} from '../transform';
import {warnIfTooLong, warnIfTooMany} from '../../utils/validation';

export type SectionType = {
  type: 'section';
  text: Text;
  block_id?: string;
  fields?: Text[];
  accessory?: SerializedBlockElement;
};

const transformSection = (element: Element): SectionType => {
  const {text, blockId, children, accessory} = element.props as SectionComponentProps;

  warnIfTooLong('block_id', blockId, 255);

  const res: SectionType = {
    type: 'section',
    text: transform(text as Element) as Text,
  };

  if (blockId) {
    res.block_id = blockId;
  }

  if (accessory) {
    res.accessory = transform(accessory) as SerializedBlockElement;
  }

  if (children) {
    res.fields = [];
    let fields = children;
    if (!Array.isArray(fields)) {
      fields = [fields];
    }

    for (const field of fields) {
      if (field) {
        const t = transform(field as Element) as Text;
        warnIfTooLong('Section field text', t.text, 2000);
        res.fields.push(t);
      }
    }

    warnIfTooMany('Section fields', res.fields, 10);
  }

  return res;
};

export default transformSection;
