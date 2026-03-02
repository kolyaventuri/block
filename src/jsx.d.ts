declare namespace JSX {
  type ComponentType = string | ((...parameters: unknown[]) => unknown) | (new (...parameters: unknown[]) => unknown);
  export type Element = {type: ComponentType; props: Record<string, unknown>; children: unknown[]};
  export type IntrinsicElements = Record<string, Record<string, unknown>>;
  export type ElementClass = {props: Record<string, unknown>};
  export type ElementAttributesProperty = {props: Record<string, unknown>};
}
