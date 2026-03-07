const slackComponentBrand = Symbol('slackblock.component');

type AbstractConstructor<T = Record<string, unknown>> = abstract new (...parameters: unknown[]) => T;

export type SlackComponentType<
  TProps = Record<string, unknown>,
  TSlackType extends string = string,
> = AbstractConstructor<{props: TProps}> & {
  readonly [slackComponentBrand]: true;
  slackType: TSlackType;
};

export type SlackElement<TComponent extends SlackComponentType = SlackComponentType> = JSX.Element & {
  type: TComponent;
  props: InstanceType<TComponent>['props'];
};

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export abstract class SlackComponent {
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  static readonly [slackComponentBrand] = true;
}

export const isSlackComponentType = (value: unknown): value is SlackComponentType =>
  typeof value === 'function'
  && value !== null
  && (value as unknown as Record<PropertyKey, unknown>)[slackComponentBrand] === true
  && typeof (value as {slackType?: unknown}).slackType === 'string';
