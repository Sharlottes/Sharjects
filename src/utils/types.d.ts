export type RecordValues<R extends Record<any, any>> = R[keyof R];
export type NonNullableKeys<T, K extends keyof T> = Omit<T, K> & {
  [_K in K]: NonNullable<T[_K]>;
};
