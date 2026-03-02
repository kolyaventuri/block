type ComponentType = string | ((...parameters: unknown[]) => unknown) | (new (...parameters: unknown[]) => unknown);

export function jsx(type: ComponentType, props: Record<string, unknown>) {
  const {children} = props;

  return {
    type,
    props,
    children: Array.isArray(children) ? children : (children === undefined ? [] : [children]),
  };
}

export const jsxs = jsx;
export const Fragment = 'fragment';
