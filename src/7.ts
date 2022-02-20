// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Length<T extends any[]> = T extends { length: infer L } ? L : never;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BuildTuple<L extends number, T extends any[] = []> = T extends {
  length: L;
}
  ? T
  : // eslint-disable-next-line @typescript-eslint/no-explicit-any
    BuildTuple<L, [...T, any]>;

type FIXME<A extends number, B extends number> = Length<
  [...BuildTuple<A>, ...BuildTuple<B>]
>;

type FIXMESUB<A extends number, B extends number> = BuildTuple<A> extends [
  ...infer U,
  ...BuildTuple<B>
]
  ? Length<U>
  : never;

type Equals<A, B> = A extends B ? (B extends A ? "success" : never) : never;

type Add<A extends number, B extends number> = FIXME<A, B>;
type Subtract<A extends number, B extends number> = FIXMESUB<A, B>;

export type OnePlusOneTest = Equals<Add<1, 1>, 2>;
export type TwoMinusOneTest = Equals<Subtract<2, 1>, 1>;
