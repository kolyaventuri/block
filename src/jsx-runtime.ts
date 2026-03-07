type ComponentType = string | ((...parameters: unknown[]) => unknown) | (new (...parameters: unknown[]) => unknown);

export type SlackJsxElement<
  TType extends ComponentType = ComponentType,
  TProps extends Record<string, unknown> = Record<string, unknown>,
> = {type: TType; props: TProps; children: unknown[]};

export function jsx<TType extends ComponentType, TProps extends Record<string, unknown>>(
  type: TType,
  props: TProps,
): SlackJsxElement<TType, TProps> {
  const {children} = props;

  return {
    type,
    props,
    children: Array.isArray(children) ? children as unknown[] : (children === undefined ? [] : [children]),
  };
}

export function jsxs<TType extends ComponentType, TProps extends Record<string, unknown>>(
  type: TType,
  props: TProps,
): SlackJsxElement<TType, TProps> {
  return jsx(type, props);
}

export const Fragment = 'fragment';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace JSX {
  export type Element = SlackJsxElement;
  export type IntrinsicElements = Record<string, Record<string, unknown>>;
  export type ElementClass = {props: Record<string, unknown>};
  export type ElementAttributesProperty = {props: Record<string, unknown>};
}
