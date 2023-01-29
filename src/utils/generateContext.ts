import React from "react";

type Pair = [string, any];
type UseStateType<Name extends string, Type> = Record<Name, Type> &
  Record<`set${Capitalize<Name>}`, (value: Type) => void>;
export type ContextStateType<Pairs extends Array<Pair>> = Pairs extends [
  [infer K extends string, infer V],
  ...infer Rest extends Array<Pair>
]
  ? UseStateType<K, V> & ContextStateType<Rest>
  : {};

const generateContextValue = <CTXT extends Record<string, any>>(
  value?: Record<string, any>
): CTXT => {
  if (!value) return value as any;

  const obj: CTXT = {} as CTXT;
  for (const [k, v] of Object.entries(value)) {
    Object.assign(obj, {
      [k]: v,
      [`set${k[0].toUpperCase()}${k.slice(1).toLowerCase()}`]: () => {
        throw new Error("unsubscribed component");
      },
    });
  }
  return obj;
};

export default <Pairs extends Array<[string, any]>>(
  defaultValue?: Record<string, any>
): React.Context<ContextStateType<Pairs>> => {
  return React.createContext<ContextStateType<Pairs>>(
    generateContextValue(defaultValue)
  );
};
