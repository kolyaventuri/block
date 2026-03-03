type ComponentType = string | ((...parameters: unknown[]) => unknown) | (new (...parameters: unknown[]) => unknown);

export function jsx(type: ComponentType, props: Record<string, unknown>) {
  const {children} = props;

  return {
    type,
    props,
    children: Array.isArray(children) ? children : (children === undefined ? [] : [children]),
  };
}

export function jsxs(type: ComponentType, props: Record<string, unknown>) {
  return jsx(type, props);
}

export const Fragment = 'fragment';
