import {Element, BlockElement} from "../../constants/types";
import {Text} from "../block/text";
import {transform} from "..";
import Section from "../../components/layout/section";
import TextComponent from '../../components/block/text';

type SectionType = {
  type: 'section',
  text: Text,
  block_id?: string,
  fields?: Text[],
  accessory?: BlockElement
};

export default (elem: Section): SectionType => {
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
    text: transform(text) as Text
  };

  if (blockId) {
    // @ts-ignore
    res.block_id = blockId;
  }

  if (accessory) {
    res.accessory = accessory;
  }

  if (children) {
    res.fields = [];
    let fields = children;
    if (!Array.isArray(fields)) {
      fields = [fields];
    }

    for (const field of fields) {
      const t = transform(field as TextComponent);
      res.fields.push(t as Text);
    }
  }

  return res;
}
