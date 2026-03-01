import {type Element} from '../../constants/types';
import {transform} from '../transform';

type RichTextChild = Element | string;

export const normalizeRichTextChildren = (children: unknown): RichTextChild[] => {
  const result: RichTextChild[] = [];
  const stack = Array.isArray(children) ? [...children] : [children];

  while (stack.length > 0) {
    const child = stack.shift();

    if (child === null || child === undefined || typeof child === 'boolean') {
      continue;
    }

    if (Array.isArray(child)) {
      stack.unshift(...child);
      continue;
    }

    result.push(child as RichTextChild);
  }

  return result;
};

export const toInlineElements = (children: unknown): Array<Record<string, unknown>> => {
  const items = normalizeRichTextChildren(children);

  return items.map(item => {
    if (typeof item === 'string') {
      return {type: 'text', text: item};
    }

    return transform(item) as Record<string, unknown>;
  });
};

export const toBlockElements = (children: unknown): Array<Record<string, unknown>> => {
  const items = normalizeRichTextChildren(children);

  return items.map(item => {
    if (typeof item === 'string') {
      return {
        type: 'rich_text_section',
        elements: [{type: 'text', text: item}],
      };
    }

    return transform(item) as Record<string, unknown>;
  });
};
