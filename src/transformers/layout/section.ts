import {Element, SerializedBlockElement} from '../../constants/types';
import {TextType as Text} from '../block/text';
import TextComponent from '../../components/block/text';
import {transform} from '..';

type SectionType = {
  type: 'section';
  text: Text;
  block_id?: string;
  fields?: Text[];
  accessory?: SerializedBlockElement;
};

export default (elem: Element): SectionType => {
  const {
    props: {
      text,
      blockId,
      children,
      accessory
    }
  } = elem;

  const res: SectionType = {
    type: 'section',
    text: transform(text as Element) as Text
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
        const t = transform(field as TextComponent);
        res.fields.push(t as Text);
      }
    }
  }

  return res;
};
