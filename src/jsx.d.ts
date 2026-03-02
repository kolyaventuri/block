declare namespace JSX {
  export type Element = {type: any; props: any; children: any[]};
  export type IntrinsicElements = Record<string, any>;
  export type ElementClass = {props: any};
  export type ElementAttributesProperty = {props: Record<string, any>};
}
