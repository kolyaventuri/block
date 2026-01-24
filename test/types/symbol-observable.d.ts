/* eslint-disable @typescript-eslint/consistent-type-definitions */
export {};

declare global {
  interface SymbolConstructor {
    readonly observable: symbol;
  }
}
