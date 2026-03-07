import {type Element} from '../../constants/types';
import {transformOptional} from '../transform';

type RichTextChild = Element | string;

const normalizeRichTextChildren = (children: unknown): RichTextChild[] => {
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
  const elements: Array<Record<string, unknown>> = [];

  for (const item of items) {
    if (typeof item === 'string') {
      elements.push({type: 'text', text: item});
      continue;
    }

    const transformed = transformOptional<Record<string, unknown>>(item);
    if (transformed) {
      elements.push(transformed);
    }
  }

  return elements;
};

export const toBlockElements = (children: unknown): Array<Record<string, unknown>> => {
  const items = normalizeRichTextChildren(children);
  const elements: Array<Record<string, unknown>> = [];

  for (const item of items) {
    if (typeof item === 'string') {
      elements.push({
        type: 'rich_text_section',
        elements: [{type: 'text', text: item}],
      });
      continue;
    }

    const transformed = transformOptional<Record<string, unknown>>(item);
    if (transformed) {
      elements.push(transformed);
    }
  }

  return elements;
};
