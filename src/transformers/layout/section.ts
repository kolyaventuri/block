import {type Element, type SerializedBlockElement} from '../../constants/types';
import {type Props as SectionComponentProps} from '../../components/layout/section';
import {type TextType as Text} from '../block/text';
import {transform, transformOptional} from '../transform';
import {warnIfTooLong, warnIfTooMany, requireOneOf} from '../../utils/validation';
import {MAX_BLOCK_ID_LENGTH, MAX_SECTION_FIELD_TEXT, MAX_SECTION_FIELDS} from '../../constants/limits';
import TextComponent from '../../components/block/text';

export type SectionType = {
  type: 'section';
  text?: Text;
  block_id?: string;
  fields?: Text[];
  accessory?: SerializedBlockElement;
  expand?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-restricted-types -- Section fields intentionally allow nullish children.
type SectionFieldValue = string | JSX.Element | null | undefined | false;

const toTextElement = (value: string | JSX.Element): Element => {
  if (typeof value === 'string') {
    return {
      children: [],
      type: TextComponent,
      props: {children: value},
    } as unknown as Element;
  }

  return value as Element;
};

const normalizeFields = (values?: SectionComponentProps['fields']): SectionFieldValue[] => {
  if (!values) {
    return [];
  }

  return Array.isArray(values) ? values : [values];
};

const transformSection = (element: Element): SectionType => {
  const {
    text,
    fields,
    blockId,
    children,
    accessory,
    expand,
  } = element.props as SectionComponentProps;
  const normalizedFields = [...normalizeFields(fields), ...normalizeFields(children)];

  warnIfTooLong('block_id', blockId, MAX_BLOCK_ID_LENGTH);

  const res: SectionType = {
    type: 'section',
  };

  if (text !== undefined) {
    res.text = transform(toTextElement(text)) as Text;
  }

  if (blockId) {
    res.block_id = blockId;
  }

  if (accessory) {
    const transformedAccessory = transformOptional<SerializedBlockElement>(accessory);
    if (transformedAccessory) {
      res.accessory = transformedAccessory;
    }
  }

  if (expand !== undefined) {
    res.expand = expand;
  }

  if (normalizedFields.length > 0) {
    res.fields = [];
    for (const field of normalizedFields) {
      if (field) {
        const transformedField = transformOptional<Text>(toTextElement(field));
        if (transformedField) {
          warnIfTooLong('Section field text', transformedField.text, MAX_SECTION_FIELD_TEXT);
          res.fields.push(transformedField);
        }
      }
    }

    warnIfTooMany('Section fields', res.fields, MAX_SECTION_FIELDS);

    if (res.fields.length === 0) {
      delete res.fields;
    }
  }

  requireOneOf(['text', 'fields'], [res.text, res.fields]);

  return res;
};

export default transformSection;
