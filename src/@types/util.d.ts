type UnionToIntersection<U> = (
  U extends unknown ? (k: U) => void : never
) extends (k: infer I) => void
  ? I extends Record<string, unknown>
    ? I
    : never
  : never;

type Values = string | number | bigint | boolean | null | undefined;
type CSSVariableNames<
  T extends object,
  Prefix extends string = "",
  Acc extends null[] = []
> = {
  [P in keyof T]: Acc["length"] extends 5
    ? never
    : P extends infer K extends keyof T & Values
    ? NonNullable<T[K]> extends infer V
      ? V extends () => unknown
        ? never
        : V extends Values
        ? { [_ in `--${Prefix}-${string & K}`]: V }
        : V extends Record<string | number, any>
        ? CSSVariableNames<V, `${Prefix}-${K}`, [null, ...Acc]>
        : never
      : never
    : never;
}[keyof T];

type CSSVariableMaps<
  T extends object,
  Acc extends null[] = []
> = Acc["length"] extends 5
  ? never
  : {
      [P in keyof T]: P extends infer K extends keyof T & Values
        ? NonNullable<T[K]> extends infer V
          ? V extends () => unknown
            ? never
            : V extends Values
            ? string
            : V extends Record<string | number, any>
            ? CSSVariableMaps<V, [null, ...Acc]>
            : never
          : never
        : never;
    };

type RecordValues<R extends Record<any, any>> = R[keyof R];

type NonNullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [_K in K]: NonNullable<T[_K]>;
};
