export function jsx(type: any, props: any) {
  const {children} = props;

  return {
    type,
    props,
    children: Array.isArray(children) ? children : (children === undefined ? [] : [children]),
  };
}

export const jsxs = jsx;
export const Fragment = 'fragment';
